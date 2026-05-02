const ASSET_PATH_PATTERN =
  /\.(?:avif|css|gif|ico|jpe?g|js|json|map|png|svg|txt|webmanifest|webp|woff2?)$/i;

const BOT_USER_AGENT_PATTERN =
  /\b(?:bot|crawler|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|quora link preview|pinterest|redditbot|whatsapp|telegrambot|discordbot|linkedinbot|curl|wget|python-requests|httpclient|headlesschrome|playwright|puppeteer)\b/i;

const DATAFAST_SCRIPT_SRC = "https://datafa.st/js/script.js";

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function truncate(value, maxLength = 255) {
  if (!value) return "";
  return String(value).slice(0, maxLength);
}

function getRefererHost(request) {
  const referer = request.headers.get("referer");
  if (!referer) return "";

  try {
    return new URL(referer).hostname;
  } catch {
    return "";
  }
}

function shouldLogVisit(request, response) {
  const url = new URL(request.url);

  if (!["GET", "HEAD", "POST"].includes(request.method)) return true;
  if (url.pathname === "/robots.txt" || url.pathname === "/sitemap.xml") return true;
  if (response.status >= 400) return true;
  if (ASSET_PATH_PATTERN.test(url.pathname)) return false;

  const accept = request.headers.get("accept") || "";
  return request.method === "POST" || accept.includes("text/html") || !url.pathname.includes(".");
}

function classifyVisitor(request) {
  const userAgent = request.headers.get("user-agent") || "";
  const accept = request.headers.get("accept") || "";
  const secFetchMode = request.headers.get("sec-fetch-mode") || "";
  const cf = request.cf || {};
  const botManagement = cf.botManagement || null;
  const botScore = typeof botManagement?.score === "number" ? botManagement.score : null;
  const verifiedBotCategory = cf.verifiedBotCategory || "";

  if (botManagement?.verifiedBot || verifiedBotCategory) {
    return {
      type: "bot",
      reason: "cloudflare_verified_bot",
      botScore,
      verifiedBotCategory,
    };
  }

  if (BOT_USER_AGENT_PATTERN.test(userAgent)) {
    return {
      type: "bot",
      reason: "user_agent",
      botScore,
      verifiedBotCategory,
    };
  }

  if (typeof botScore === "number") {
    if (botScore < 30) {
      return {
        type: "likely_bot",
        reason: "cloudflare_bot_score",
        botScore,
        verifiedBotCategory,
      };
    }

    return {
      type: "likely_human",
      reason: "cloudflare_bot_score",
      botScore,
      verifiedBotCategory,
    };
  }

  if (secFetchMode === "navigate" || accept.includes("text/html")) {
    return {
      type: "likely_human",
      reason: "browser_navigation",
      botScore,
      verifiedBotCategory,
    };
  }

  return {
    type: "unknown",
    reason: "insufficient_signals",
    botScore,
    verifiedBotCategory,
  };
}

function logVisit(request, response) {
  if (!shouldLogVisit(request, response)) return;

  const url = new URL(request.url);
  const visitor = classifyVisitor(request);
  const cf = request.cf || {};

  console.log(
    JSON.stringify({
      event: "edge_visit",
      timestamp: new Date().toISOString(),
      request: {
        method: request.method,
        host: url.hostname,
        path: url.pathname,
        query: url.search ? "present" : "none",
        status: response.status,
        referer_host: getRefererHost(request),
      },
      visitor: {
        type: visitor.type,
        reason: visitor.reason,
        bot_score: visitor.botScore,
        verified_bot_category: visitor.verifiedBotCategory,
        user_agent: truncate(request.headers.get("user-agent")),
        country: cf.country || "",
        colo: cf.colo || "",
        asn: cf.asn || "",
        as_organization: truncate(cf.asOrganization, 120),
      },
      cloudflare: {
        ray: request.headers.get("cf-ray") || "",
        sec_fetch_mode: request.headers.get("sec-fetch-mode") || "",
      },
    })
  );
}

function shouldInjectDataFast(response, env) {
  const contentType = response.headers.get("content-type") || "";
  return Boolean(env.DATAFAST_WEBSITE_ID) && contentType.includes("text/html");
}

function buildDataFastScript(env) {
  const websiteId = escapeAttribute(env.DATAFAST_WEBSITE_ID);
  const domain = escapeAttribute(env.DATAFAST_DOMAIN || "shutdownassistant.com");
  const scriptSrc = escapeAttribute(env.DATAFAST_SCRIPT_SRC || DATAFAST_SCRIPT_SRC);
  const allowLocalhost =
    env.DATAFAST_ALLOW_LOCALHOST === "true" ? ' data-allow-localhost="true"' : "";
  const disableConsole =
    env.DATAFAST_DISABLE_CONSOLE === "false" ? "" : ' data-disable-console="true"';

  return `<script defer data-website-id="${websiteId}" data-domain="${domain}"${disableConsole}${allowLocalhost} src="${scriptSrc}"></script>`;
}

function injectDataFast(response, env) {
  if (!shouldInjectDataFast(response, env)) return response;

  return new HTMLRewriter()
    .on("head", {
      element(element) {
        element.append(buildDataFastScript(env), { html: true });
      },
    })
    .transform(response);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === "es.shutdownassistant.com") {
      url.hostname = "shutdownassistant.com";

      if (url.pathname === "/" || url.pathname === "") {
        url.pathname = "/es/";
      } else if (url.pathname !== "/es" && !url.pathname.startsWith("/es/")) {
        url.pathname = `/es${url.pathname}`;
      }

      const response = Response.redirect(url.toString(), 301);
      logVisit(request, response);
      return response;
    }

    let response;

    try {
      response = await env.ASSETS.fetch(request);
    } catch (error) {
      console.log(
        JSON.stringify({
          event: "edge_visit_error",
          timestamp: new Date().toISOString(),
          request: {
            method: request.method,
            host: url.hostname,
            path: url.pathname,
          },
          error: truncate(error?.message || error, 500),
        })
      );
      throw error;
    }

    const analyticsResponse = injectDataFast(response, env);
    logVisit(request, analyticsResponse);
    return analyticsResponse;
  },
};

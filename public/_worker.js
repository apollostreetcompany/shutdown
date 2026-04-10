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

      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};

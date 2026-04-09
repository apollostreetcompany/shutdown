/**
 * Translation strings for state guide sales pages.
 */

export interface GuideTranslations {
  locale: 'en' | 'es';
  // Header
  brandName: string;
  brandTagline: string;
  buyNow: string;
  offerEnds: string;
  // Hero
  heroPreBadge: string;
  heroBoughtToday: string;
  heroFounders: string;
  heroTaglineTemplate: string; // uses {state}
  heroSubheadTemplate: string; // uses {state}, {agency}
  heroPresents: string;
  heroProductTitle: string;
  heroGuideFor: string; // uses {state}
  heroPriceWas: string;
  heroPriceOneTime: string;
  heroInstantAccess: string;
  heroSecureCheckout: string;
  heroPriceGoesUp: string;
  heroPriceSubtext: string;
  heroHrs: string;
  heroMin: string;
  heroSec: string;
  // Special launch
  specialLaunch: string;
  // Guide contents
  guideContentsPreTitle: string;
  guideContentsTitle: string;
  guideContentsSubtitle: string;
  guideContentsTocLabel: string;
  guideContentsHot: string;
  guideContentsChapters: string;
  // Difficulty
  difficultyPreTitle: string;
  difficultyTitle: string;
  difficultySubtitle: string;
  difficultyIndexLabel: string;
  difficultyFootnote: string;
  // Cost
  costPreTitle: string;
  costTitle: string;
  costSubtitleTemplate: string; // uses {state}
  costFootnote: string;
  // Comparison
  comparisonPreTitle: string;
  comparisonTitle: string;
  comparisonSubtitleTemplate: string; // uses {state}
  easyLabel: string;
  hardLabel: string;
  comparisonFooter: string;
  // Testimonials
  testimonialsPreTitle: string;
  testimonialsTitle: string;
  // Urgency
  urgencyItems: Array<{ label: string }>;
  // CTA
  ctaPreTitle: string;
  ctaTitleLine1: string;
  ctaTitleLine2Template: string; // uses {state}
  ctaGuaranteeTitle: string;
  ctaGuaranteeText: string;
  ctaBuyButton: string;
  ctaSecure: string;
  ctaInstant: string;
  ctaGuarantee: string;
  ctaDisclaimer: string;
  ctaTodayOnly: string;
  // Related
  relatedTitle: string;
  relatedViewGuide: string;
  // Footer
  footerRights: string;
  footerTerms: string;
  footerPrivacy: string;
  footerRefunds: string;
  footerTagline: string;
  footerDisclaimerTemplate: string; // uses {state}, {agency}
  // Mobile bar
  mobileWas: string;
  mobileOneTime: string;
  mobileSecure: string;
  mobileCheckout: string;
  // SEO
  seoTitleTemplate: string; // uses {state}
  seoDescriptionTemplate: string; // uses {state}, {agency}
  // Links
  viewFreeGuide: string;
  officialWebsite: string;
  allStates: string;
  // Quick facts
  quickFactsTitle: string;
  filingAgency: string;
  llcFee: string;
  corpFee: string;
  taxClearance: string;
  processingTime: string;
  onlineFiling: string;
  yes: string;
  no: string;
  required: string;
  notRequired: string;
}

export const EN: GuideTranslations = {
  locale: 'en',
  brandName: 'SHUTDOWN GUIDE',
  brandTagline: 'State Dissolution Guide',
  buyNow: 'BUY NOW',
  offerEnds: 'OFFER ENDS',
  heroPreBadge: 'For Founders Dissolving a Business in',
  heroBoughtToday: 'BOUGHT TODAY:',
  heroFounders: 'founders',
  heroTaglineTemplate: 'SHUTTING DOWN IN {state}? HERE\'S EVERYTHING YOU NEED.',
  heroSubheadTemplate: 'The complete shutdown playbook for {state} \u2014 every form from the {agency}, every fee, every deadline, and the exact steps to dissolve your LLC or corporation without triggering penalties or personal liability.',
  heroPresents: 'SHUTDOWN ASSISTANT PRESENTS',
  heroProductTitle: 'DISSOLUTION GUIDE',
  heroGuideFor: '{state}',
  heroPriceWas: '$49',
  heroPriceOneTime: 'ONE-TIME PURCHASE \u2022 INSTANT ACCESS',
  heroInstantAccess: 'GET INSTANT ACCESS',
  heroSecureCheckout: 'SECURE CHECKOUT',
  heroPriceGoesUp: '\u23F0 PRICE GOES UP IN:',
  heroPriceSubtext: 'Don\'t pay $49 tomorrow for what costs $29 today',
  heroHrs: 'HRS',
  heroMin: 'MIN',
  heroSec: 'SEC',
  specialLaunch: '\u2605 SPECIAL LAUNCH PRICE \u2605',
  guideContentsPreTitle: '\u2014 Your Complete {state} Shutdown Blueprint \u2014',
  guideContentsTitle: 'INSIDE THE GUIDE',
  guideContentsSubtitle: '10 chapters. No filler. Every step in order.',
  guideContentsTocLabel: 'TABLE OF CONTENTS \u2014 {state} SHUTDOWN GUIDE',
  guideContentsHot: '\uD83D\uDD25 HOT',
  guideContentsChapters: '10 chapters',
  difficultyPreTitle: '\u2014 How Hard Is It? \u2014',
  difficultyTitle: 'SHUTDOWN DIFFICULTY',
  difficultySubtitle: 'See how {state} compares to other states',
  difficultyIndexLabel: 'STATE DISSOLUTION DIFFICULTY INDEX',
  difficultyFootnote: '\u2605 Full state-by-state breakdown with exact agencies, forms, timelines & fees included in the guide.',
  costPreTitle: '\u2014 Know the Costs \u2014',
  costTitle: 'WHAT IT COSTS',
  costSubtitleTemplate: 'Every fee, tax obligation & hidden cost of shutting down in {state}',
  costFootnote: '+ exact prevention steps and estimated savings in the full guide',
  comparisonPreTitle: '\u2014 {state} at a Glance \u2014',
  comparisonTitle: 'WHAT\'S EASY VS. WHAT\'S HARD',
  comparisonSubtitleTemplate: 'The reality of dissolving a business in {state}',
  easyLabel: 'WHAT\'S EASY',
  hardLabel: 'WHAT\'S HARD',
  comparisonFooter: '\u26A0 THE GUIDE COVERS EVERY STEP IN DETAIL \u2014 INCLUDING WORKAROUNDS FOR THE HARD PARTS \u26A0',
  testimonialsPreTitle: '\u2014 Real Results \u2014',
  testimonialsTitle: 'WHAT FOUNDERS SAY',
  urgencyItems: [
    { label: 'Avg. business accrues $4,200+ in unnoticed liabilities before shutdown' },
    { label: '23 states have increased dissolution fees and audit scrutiny since 2023' },
    { label: 'Price increases to $49 after this week \u2014 lock in now' },
  ],
  ctaPreTitle: '\u2014 Don\'t Close Dirty \u2014',
  ctaTitleLine1: 'GET THE GUIDE.',
  ctaTitleLine2Template: 'CLOSE CLEAN IN {state}.',
  ctaGuaranteeTitle: '30-Day Money-Back Guarantee',
  ctaGuaranteeText: 'Read the entire guide. If you don\'t find it valuable, email us and we\'ll refund every penny. No questions asked. No forms. No waiting.',
  ctaBuyButton: 'BUY NOW \u2014 JUST $29',
  ctaSecure: 'SECURE CHECKOUT',
  ctaInstant: 'INSTANT DELIVERY',
  ctaGuarantee: '30-DAY GUARANTEE',
  ctaDisclaimer: 'One-time purchase. Instant PDF download. No subscriptions.',
  ctaTodayOnly: 'TODAY ONLY',
  relatedTitle: 'ALSO DISSOLVING IN ANOTHER STATE?',
  relatedViewGuide: 'View Guide \u2192',
  footerRights: '\u00A9 2024 Shutdown Assistant Inc. All rights reserved.',
  footerTerms: 'Terms',
  footerPrivacy: 'Privacy',
  footerRefunds: 'Refunds',
  footerTagline: '\u26A0 CLOSE CLEAN. MOVE FORWARD. START AGAIN. \u26A0',
  footerDisclaimerTemplate: 'This guide is for informational purposes only and does not constitute legal advice. Information is sourced from official state websites including the {agency}. Always confirm current requirements directly. Consult an attorney for advice specific to your situation.',
  mobileWas: 'WAS $49',
  mobileOneTime: 'ONE-TIME',
  mobileSecure: 'SECURE',
  mobileCheckout: 'CHECKOUT',
  seoTitleTemplate: 'How to Shut Down a Business in {state} \u2014 Complete Dissolution Guide',
  seoDescriptionTemplate: 'Step-by-step guide to dissolving your LLC or corporation in {state}. Every form, fee, and deadline from the {agency}. Tax clearance, creditor notification, and post-dissolution checklist.',
  viewFreeGuide: 'View Free Guide \u2192',
  officialWebsite: 'Official Website \u2192',
  allStates: 'All 50 States \u2192',
  quickFactsTitle: 'QUICK FACTS',
  filingAgency: 'Filing Agency',
  llcFee: 'LLC Dissolution Fee',
  corpFee: 'Corporation Dissolution Fee',
  taxClearance: 'Tax Clearance',
  processingTime: 'Processing Time',
  onlineFiling: 'Online Filing',
  yes: 'Yes',
  no: 'No',
  required: 'Required',
  notRequired: 'Not Required',
};

export const ES: GuideTranslations = {
  locale: 'es',
  brandName: 'GU\u00CDA DE CIERRE',
  brandTagline: 'Gu\u00EDa de Disoluci\u00F3n Estatal',
  buyNow: 'COMPRAR',
  offerEnds: 'OFERTA TERMINA',
  heroPreBadge: 'Para emprendedores que están cerrando un negocio en',
  heroBoughtToday: 'COMPRADO HOY:',
  heroFounders: 'emprendedores',
  heroTaglineTemplate: '\u00BFCERRANDO TU NEGOCIO EN {state}? AQU\u00CD TIENES TODO LO QUE NECESITAS.',
  heroSubheadTemplate: 'La gu\u00EDa completa de cierre para {state} \u2014 cada formulario de la {agency}, cada tarifa, cada plazo y los pasos exactos para disolver tu LLC o corporaci\u00F3n sin generar multas ni responsabilidad personal.',
  heroPresents: 'SHUTDOWN ASSISTANT PRESENTA',
  heroProductTitle: 'GU\u00CDA DE DISOLUCI\u00D3N',
  heroGuideFor: '{state}',
  heroPriceWas: '$49',
  heroPriceOneTime: 'PAGO \u00DANICO \u2022 ACCESO INMEDIATO',
  heroInstantAccess: 'OBTENER ACCESO INMEDIATO',
  heroSecureCheckout: 'PAGO SEGURO',
  heroPriceGoesUp: '\u23F0 EL PRECIO SUBE EN:',
  heroPriceSubtext: 'No pagues $49 ma\u00F1ana por lo que cuesta $29 hoy',
  heroHrs: 'HRS',
  heroMin: 'MIN',
  heroSec: 'SEG',
  specialLaunch: '\u2605 PRECIO ESPECIAL DE LANZAMIENTO \u2605',
  guideContentsPreTitle: '\u2014 Tu Plan Completo de Cierre en {state} \u2014',
  guideContentsTitle: 'DENTRO DE LA GU\u00CDA',
  guideContentsSubtitle: '10 cap\u00EDtulos. Sin relleno. Todo en orden.',
  guideContentsTocLabel: '\u00CDNDICE \u2014 GU\u00CDA DE CIERRE DE {state}',
  guideContentsHot: '\uD83D\uDD25 CLAVE',
  guideContentsChapters: '10 cap\u00EDtulos',
  difficultyPreTitle: '\u2014 \u00BFQu\u00E9 tan dif\u00EDcil es? \u2014',
  difficultyTitle: 'DIFICULTAD DE CIERRE',
  difficultySubtitle: 'Mira c\u00F3mo se compara {state} con otros estados',
  difficultyIndexLabel: '\u00CDNDICE DE DIFICULTAD DE DISOLUCI\u00D3N POR ESTADO',
  difficultyFootnote: '\u2605 Desglose completo estado por estado con agencias, formularios, plazos y tarifas incluido en la gu\u00EDa.',
  costPreTitle: '\u2014 Conoce los Costos \u2014',
  costTitle: 'CU\u00C1NTO CUESTA',
  costSubtitleTemplate: 'Cada tarifa, obligaci\u00F3n fiscal y costo oculto al cerrar en {state}',
  costFootnote: '+ pasos exactos de prevenci\u00F3n y ahorros estimados en la gu\u00EDa completa',
  comparisonPreTitle: '\u2014 {state} de un Vistazo \u2014',
  comparisonTitle: 'QU\u00C9 ES F\u00C1CIL VS. QU\u00C9 ES DIF\u00CDCIL',
  comparisonSubtitleTemplate: 'La realidad de disolver un negocio en {state}',
  easyLabel: 'LO F\u00C1CIL',
  hardLabel: 'LO DIF\u00CDCIL',
  comparisonFooter: '\u26A0 LA GU\u00CDA CUBRE CADA PASO EN DETALLE \u2014 INCLUYENDO SOLUCIONES PARA LAS PARTES DIF\u00CDCILES \u26A0',
  testimonialsPreTitle: '\u2014 Resultados Reales \u2014',
  testimonialsTitle: 'LO QUE DICEN LOS EMPRENDEDORES',
  urgencyItems: [
    { label: 'El negocio promedio acumula m\u00E1s de $4,200 en pasivos no detectados antes del cierre' },
    { label: '23 estados han aumentado las tarifas de disoluci\u00F3n y el rigor de auditor\u00EDa desde 2023' },
    { label: 'El precio sube a $49 despu\u00E9s de esta semana \u2014 aseg\u00FAralo ahora' },
  ],
  ctaPreTitle: '\u2014 No Cierres Mal \u2014',
  ctaTitleLine1: 'OBTENER LA GU\u00CDA.',
  ctaTitleLine2Template: 'CERRAR LIMPIO EN {state}.',
  ctaGuaranteeTitle: 'Garant\u00EDa de Devoluci\u00F3n de 30 D\u00EDas',
  ctaGuaranteeText: 'Lee la gu\u00EDa completa. Si no te resulta \u00FAtil, env\u00EDanos un correo y te devolvemos cada centavo. Sin preguntas. Sin formularios. Sin esperas.',
  ctaBuyButton: 'COMPRAR \u2014 SOLO $29',
  ctaSecure: 'PAGO SEGURO',
  ctaInstant: 'ENTREGA INMEDIATA',
  ctaGuarantee: 'GARANT\u00CDA 30 D\u00CDAS',
  ctaDisclaimer: 'Pago \u00FAnico. Descarga inmediata en PDF. Sin suscripciones.',
  ctaTodayOnly: 'SOLO HOY',
  relatedTitle: '\u00BFTAMBI\u00C9N DISOLVIENDO EN OTRO ESTADO?',
  relatedViewGuide: 'Ver Gu\u00EDa \u2192',
  footerRights: '\u00A9 2024 Shutdown Assistant Inc. Todos los derechos reservados.',
  footerTerms: 'T\u00E9rminos',
  footerPrivacy: 'Privacidad',
  footerRefunds: 'Reembolsos',
  footerTagline: '\u26A0 CIERRA LIMPIO. AVANZA. COMIENZA DE NUEVO. \u26A0',
  footerDisclaimerTemplate: 'Esta gu\u00EDa es solo para fines informativos y no constituye asesoramiento legal. La informaci\u00F3n proviene de sitios web oficiales del estado, incluyendo la {agency}. Siempre confirma los requisitos vigentes directamente. Consulta a un abogado para asesor\u00EDa espec\u00EDfica a tu situaci\u00F3n.',
  mobileWas: 'ERA $49',
  mobileOneTime: '\u00DANICO',
  mobileSecure: 'SEGURO',
  mobileCheckout: 'PAGO',
  seoTitleTemplate: 'C\u00F3mo Cerrar un Negocio en {state} \u2014 Gu\u00EDa Completa de Disoluci\u00F3n',
  seoDescriptionTemplate: 'Gu\u00EDa paso a paso para disolver tu LLC o corporaci\u00F3n en {state}. Cada formulario, tarifa y plazo de la {agency}. Liquidaci\u00F3n fiscal, notificaci\u00F3n a acreedores y lista de verificaci\u00F3n post-disoluci\u00F3n. En espa\u00F1ol.',
  viewFreeGuide: 'Ver Gu\u00EDa Gratuita \u2192',
  officialWebsite: 'Sitio Oficial \u2192',
  allStates: 'Los 50 Estados \u2192',
  quickFactsTitle: 'DATOS R\u00C1PIDOS',
  filingAgency: 'Agencia de presentaci\u00F3n',
  llcFee: 'Tarifa de disoluci\u00F3n LLC',
  corpFee: 'Tarifa de disoluci\u00F3n corporaci\u00F3n',
  taxClearance: 'Liquidaci\u00F3n fiscal',
  processingTime: 'Tiempo de procesamiento',
  onlineFiling: 'Presentaci\u00F3n en l\u00EDnea',
  yes: 'S\u00ED',
  no: 'No',
  required: 'Requerida',
  notRequired: 'No requerida',
};

export function t(translations: GuideTranslations, key: string, replacements?: Record<string, string>): string {
  let val = (translations as any)[key] || key;
  if (replacements) {
    for (const [k, v] of Object.entries(replacements)) {
      val = val.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
    }
  }
  return val;
}

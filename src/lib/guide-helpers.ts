/**
 * Helper functions that derive sales-page display data from state JSON.
 */

export interface DifficultyEntry {
  state: string;
  slug: string;
  difficulty: string;
  label: string;
  bar: number;
}

export interface StatePro {
  text: string;
  positive: boolean;
}

export interface RelatedState {
  name: string;
  slug: string;
  code: string;
}

// Region mapping for related-state suggestions
const REGIONS: Record<string, string[]> = {
  west: ['CA', 'OR', 'WA', 'NV', 'AZ', 'UT', 'CO', 'NM', 'HI', 'AK'],
  south: ['TX', 'FL', 'GA', 'NC', 'SC', 'VA', 'TN', 'AL', 'MS', 'LA', 'AR', 'KY', 'WV', 'OK', 'MD', 'DE'],
  midwest: ['OH', 'MI', 'IN', 'IL', 'WI', 'MN', 'IA', 'MO', 'ND', 'SD', 'NE', 'KS'],
  northeast: ['NY', 'NJ', 'PA', 'CT', 'MA', 'RI', 'VT', 'NH', 'ME'],
  mountain: ['MT', 'ID', 'WY'],
};

const STATE_NAMES: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia',
  HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
  KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
  MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri',
  MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
  NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio',
  OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
  SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont',
  VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
};

function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Compute a difficulty score (0-100) for a state based on its data.
 */
export function computeDifficulty(s: any): number {
  let score = 20; // baseline
  if (s.tax?.clearanceRequired) score += 25;
  if (s.tax?.finalReturnRequired) score += 5;
  if (s.requirements?.publicationRequired) score += 15;
  if (!s.entities?.llc?.onlineFiling) score += 10;
  const llcFee = s.entities?.llc?.fee || 0;
  const corpFee = s.entities?.corporation?.fee || 0;
  if (llcFee > 100) score += 10;
  else if (llcFee > 50) score += 5;
  if (corpFee > 100) score += 5;
  if (s.requirements?.windingUpPeriod) score += 5;
  // Parse processing days
  const days = s.timeline?.standardProcessingDays || '';
  const match = days.match(/(\d+)/);
  if (match && parseInt(match[1]) > 10) score += 5;
  return Math.min(score, 100);
}

export function difficultyLabel(score: number, locale: 'en' | 'es' = 'en'): string {
  if (locale === 'es') {
    if (score >= 80) return 'Extrema';
    if (score >= 65) return 'Muy Alta';
    if (score >= 50) return 'Alta';
    if (score >= 35) return 'Moderada';
    return 'Baja';
  }
  if (score >= 80) return 'Extreme';
  if (score >= 65) return 'Very High';
  if (score >= 50) return 'High';
  if (score >= 35) return 'Moderate';
  return 'Low';
}

/**
 * Build the difficulty comparison: this state + 4 reference states.
 */
export function buildDifficultyScale(currentState: any, allStates: Record<string, any>, locale: 'en' | 'es' = 'en'): DifficultyEntry[] {
  const taxClearanceLabel = locale === 'es' ? 'Liquidaci\u00F3n Fiscal' : 'Tax Clearance';
  const standardLabel = locale === 'es' ? 'Est\u00E1ndar' : 'Standard';

  const currentScore = computeDifficulty(currentState);
  const currentEntry: DifficultyEntry = {
    state: currentState.name,
    slug: currentState.slug,
    difficulty: difficultyLabel(currentScore, locale),
    label: `${currentState.agencyAbbr || currentState.agency.split(' ').pop()} + ${currentState.tax?.clearanceRequired ? taxClearanceLabel : standardLabel}`,
    bar: currentScore,
  };

  const refs = ['CA', 'NY', 'FL', 'WY'].filter(c => c !== currentState.code);
  const refEntries: DifficultyEntry[] = refs.slice(0, 4).map(code => {
    const st = allStates[code];
    if (!st) return null;
    const sc = computeDifficulty(st);
    return {
      state: st.name,
      slug: st.slug,
      difficulty: difficultyLabel(sc, locale),
      label: `${st.agencyAbbr || ''} + ${st.tax?.clearanceRequired ? taxClearanceLabel : standardLabel}`,
      bar: sc,
    };
  }).filter(Boolean) as DifficultyEntry[];

  const all = [currentEntry, ...refEntries];
  all.sort((a, b) => b.bar - a.bar);
  return all;
}

/**
 * Derive pros and cons for this specific state.
 */
export function deriveStateTraits(s: any, locale: 'en' | 'es' = 'en'): { pros: string[]; cons: string[] } {
  const pros: string[] = [];
  const cons: string[] = [];
  const isEs = locale === 'es';

  // Tax
  if (!s.tax?.clearanceRequired) {
    pros.push(isEs
      ? 'No se requiere certificado de liquidaci\u00F3n fiscal para la disoluci\u00F3n'
      : 'No tax clearance certificate required for dissolution');
  } else {
    cons.push(isEs
      ? `Liquidaci\u00F3n fiscal requerida de la ${s.tax.taxAgency}`
      : `Tax clearance required from ${s.tax.taxAgency}`);
  }

  // Online filing
  if (s.entities?.llc?.onlineFiling) {
    pros.push(isEs
      ? 'Presentaci\u00F3n en l\u00EDnea disponible \u2014 sin necesidad de enviar por correo'
      : 'Online filing available \u2014 no need to mail forms');
  } else {
    cons.push(isEs
      ? 'Sin presentaci\u00F3n en l\u00EDnea \u2014 debe enviar por correo o en persona'
      : 'No online filing \u2014 must submit by mail or in person');
  }

  // Fees
  const llcFee = s.entities?.llc?.fee || 0;
  if (llcFee === 0) {
    pros.push(isEs
      ? 'Sin tarifa de presentaci\u00F3n para disoluci\u00F3n de LLC'
      : 'No filing fee for LLC dissolution');
  } else if (llcFee <= 30) {
    pros.push(isEs
      ? `Tarifa baja de disoluci\u00F3n de LLC ($${llcFee})`
      : `Low LLC dissolution fee ($${llcFee})`);
  } else if (llcFee > 100) {
    cons.push(isEs
      ? `Tarifa alta de disoluci\u00F3n de LLC ($${llcFee})`
      : `High LLC dissolution fee ($${llcFee})`);
  }

  // Processing time
  const days = s.timeline?.standardProcessingDays || '';
  if (days.includes('1') || days.includes('2-3')) {
    pros.push(isEs
      ? `Procesamiento r\u00E1pido: ${days}`
      : `Fast processing: ${days}`);
  } else {
    const match = days.match(/(\d+)/);
    if (match && parseInt(match[1]) >= 10) {
      cons.push(isEs
        ? `Procesamiento lento: ${days}`
        : `Slow processing: ${days}`);
    }
  }

  // Expedited
  if (s.timeline?.expeditedAvailable) {
    pros.push(isEs
      ? `Procesamiento acelerado disponible${s.timeline.expeditedFee ? ` ($${s.timeline.expeditedFee})` : ''}`
      : `Expedited processing available${s.timeline.expeditedFee ? ` ($${s.timeline.expeditedFee})` : ''}`);
  } else {
    cons.push(isEs
      ? 'Sin opci\u00F3n de procesamiento acelerado'
      : 'No expedited processing option');
  }

  // Publication
  if (!s.requirements?.publicationRequired) {
    pros.push(isEs
      ? 'Sin requisito de publicaci\u00F3n'
      : 'No publication requirement');
  } else {
    cons.push(isEs
      ? `Publicaci\u00F3n requerida: ${s.requirements.publicationDetails || 'Debe publicar aviso de disoluci\u00F3n'}`
      : `Publication required: ${s.requirements.publicationDetails || 'Must publish notice of dissolution'}`);
  }

  // Winding up
  if (s.requirements?.windingUpPeriod) {
    cons.push(isEs
      ? `Per\u00EDodo de liquidaci\u00F3n: ${s.requirements.windingUpPeriod}`
      : `Winding up period: ${s.requirements.windingUpPeriod}`);
  }

  // Ensure at least 3 of each
  while (pros.length < 3) pros.push(isEs ? 'Proceso de disoluci\u00F3n sencillo' : 'Straightforward dissolution process');
  while (cons.length < 3) cons.push(isEs ? 'Debe notificar a acreedores y saldar todas las deudas antes de presentar' : 'Must notify creditors and settle all debts before filing');

  return { pros: pros.slice(0, 5), cons: cons.slice(0, 5) };
}

/**
 * Build cost categories specific to a state.
 */
export function buildCostCategories(s: any, locale: 'en' | 'es' = 'en') {
  const isEs = locale === 'es';
  return [
    {
      name: isEs ? 'Tarifas de Presentaci\u00F3n' : 'Filing Fees',
      items: [
        `${isEs ? 'Disoluci\u00F3n LLC' : 'LLC Dissolution'}: $${s.entities?.llc?.fee || 0}`,
        `${isEs ? 'Disoluci\u00F3n Corporaci\u00F3n' : 'Corporation Dissolution'}: $${s.entities?.corporation?.fee || 0}`,
        s.timeline?.expeditedAvailable
          ? `${isEs ? 'Procesamiento Acelerado' : 'Expedited Processing'}: $${s.timeline.expeditedFee || 0}`
          : (isEs ? 'Sin opci\u00F3n acelerada disponible' : 'No expedited option available'),
      ],
      color: '#E91E8C',
    },
    {
      name: isEs ? 'Obligaciones Fiscales' : 'Tax Obligations',
      items: [
        s.tax?.clearanceRequired
          ? (isEs ? `Liquidaci\u00F3n fiscal de la ${s.tax.taxAgency}` : `Tax clearance from ${s.tax.taxAgency}`)
          : (isEs ? 'No se requiere liquidaci\u00F3n fiscal' : 'No tax clearance required'),
        s.tax?.finalReturnRequired
          ? (isEs ? 'Declaraci\u00F3n fiscal final requerida' : 'Final tax return required')
          : (isEs ? 'No se requiere declaraci\u00F3n final' : 'No final return required'),
        (isEs ? (s.es?.tax_notes || s.tax?.notes) : s.tax?.notes)?.split('.')[0] ?? (isEs ? 'Revisar obligaciones fiscales estatales' : 'Review state tax obligations'),
      ],
      color: '#FF6B35',
    },
    {
      name: isEs ? 'Costos de Cumplimiento' : 'Compliance Costs',
      items: [
        (isEs ? (s.es?.registeredAgentNotes || s.requirements?.registeredAgentNotes) : s.requirements?.registeredAgentNotes) || (isEs ? 'Agente registrado hasta la disoluci\u00F3n' : 'Registered agent until dissolution'),
        (isEs ? (s.es?.creditorNotification || s.requirements?.creditorNotification) : s.requirements?.creditorNotification) || (isEs ? 'Debe notificar a acreedores' : 'Must notify creditors'),
        (isEs ? (s.es?.employeeNotification || s.requirements?.employeeNotification) : s.requirements?.employeeNotification) || (isEs ? 'Cumplir con la ley federal WARN' : 'Follow federal WARN Act'),
      ],
      color: '#7B2D8E',
    },
    {
      name: isEs ? 'Costos Ocultos' : 'Hidden Costs',
      items: [
        isEs ? 'Tarifas continuas de informes anuales si se retrasa la disoluci\u00F3n' : 'Ongoing annual report fees if dissolution delayed',
        isEs ? 'Intereses de penalizaci\u00F3n por declaraciones fiscales no presentadas' : 'Penalty interest on unfiled tax returns',
        isEs ? 'Responsabilidad personal hasta que se acepten todas las presentaciones' : 'Personal liability until all filings accepted',
      ],
      color: '#2D8E3B',
    },
  ];
}

/**
 * Build guide contents list from state data.
 */
export function buildGuideContents(s: any, locale: 'en' | 'es' = 'en'): Array<{ text: string; hot: boolean }> {
  const items: Array<{ text: string; hot: boolean }> = [];
  const isEs = locale === 'es';

  items.push({
    text: isEs
      ? `Disoluci\u00F3n de LLC Paso a Paso en ${s.name}: ${s.entities?.llc?.formName || 'Articles of Dissolution'}`
      : `Step-by-Step LLC Dissolution in ${s.name}: ${s.entities?.llc?.formName || 'Articles of Dissolution'}`,
    hot: true,
  });
  items.push({
    text: isEs
      ? `Proceso de Disoluci\u00F3n de Corporaci\u00F3n: Resoluci\u00F3n de Junta Hasta Presentaci\u00F3n Final con ${s.agency}`
      : `Corporation Dissolution Process: Board Resolution Through Final Filing with ${s.agency}`,
    hot: false,
  });
  items.push({
    text: s.tax?.clearanceRequired
      ? (isEs
        ? `Liquidaci\u00F3n Fiscal de la ${s.tax.taxAgency}: Requisitos, Plazos y Errores Comunes`
        : `Tax Clearance from ${s.tax.taxAgency}: Requirements, Timeline & Common Pitfalls`)
      : (isEs
        ? `Obligaciones Fiscales en ${s.name}: Lo Que Debes Presentar Antes y Despu\u00E9s de la Disoluci\u00F3n`
        : `${s.name} Tax Obligations: What You Must File Before and After Dissolution`),
    hot: s.tax?.clearanceRequired || false,
  });
  items.push({
    text: isEs
      ? `Tarifas, Tiempos de Procesamiento y Opciones Aceleradas en ${s.name} \u2014 Desglose Completo`
      : `${s.name} Filing Fees, Processing Times & Expedited Options \u2014 Complete Breakdown`,
    hot: false,
  });
  items.push({
    text: isEs
      ? `Requisitos de Notificaci\u00F3n a Acreedores en ${s.name}: Plantillas y Plazos Legales`
      : `Creditor Notification Requirements in ${s.name}: Templates & Legal Deadlines`,
    hot: true,
  });
  items.push({
    text: isEs
      ? `Notificaci\u00F3n a Empleados: ${(s.es?.employeeNotification || s.requirements?.employeeNotification)?.split('.')[0] || 'Cumplimiento de la Ley WARN'}`
      : `Employee Notification: ${s.requirements?.employeeNotification?.split('.')[0] || 'WARN Act Compliance'}`,
    hot: false,
  });
  items.push({
    text: isEs
      ? `Todos los Formularios Requeridos con Enlaces de Descarga \u2014 ${s.entities?.llc?.formNumber || 'LLC'} y ${s.entities?.corporation?.formNumber || 'Corp'}`
      : `Every Required Form with Direct Download Links \u2014 ${s.entities?.llc?.formNumber || 'LLC'} & ${s.entities?.corporation?.formNumber || 'Corp'}`,
    hot: true,
  });
  items.push({
    text: isEs
      ? `Cumplimiento Post-Disoluci\u00F3n: Agente Registrado, Cuentas Bancarias y Cierre de EIN del IRS`
      : `Post-Dissolution Compliance: Registered Agent, Bank Accounts & IRS EIN Closure`,
    hot: false,
  });
  items.push({
    text: isEs
      ? `Errores Comunes en ${s.name} que Generan Auditor\u00EDas, Multas y Responsabilidad Personal`
      : `${s.name} Common Mistakes That Trigger Audits, Penalties & Personal Liability`,
    hot: false,
  });
  items.push({
    text: isEs
      ? `Cronograma Completo: Desde el Voto para Disolver Hasta el Certificado de Disoluci\u00F3n en ${s.name}`
      : `Complete Timeline: From Vote to Dissolve Through Certificate of Dissolution in ${s.name}`,
    hot: false,
  });

  return items;
}

/**
 * Get related states in the same region.
 */
export function getRelatedStates(code: string, count = 6): RelatedState[] {
  let region = '';
  for (const [r, codes] of Object.entries(REGIONS)) {
    if (codes.includes(code)) {
      region = r;
      break;
    }
  }

  const regionCodes = REGIONS[region] || [];
  const related = regionCodes
    .filter(c => c !== code)
    .slice(0, count)
    .map(c => ({
      name: STATE_NAMES[c] || c,
      slug: slugify(STATE_NAMES[c] || c),
      code: c,
    }));

  // If not enough from same region, add popular states
  if (related.length < count) {
    const popular = ['CA', 'TX', 'NY', 'FL', 'DE', 'IL', 'WA', 'GA'];
    for (const c of popular) {
      if (related.length >= count) break;
      if (c !== code && !related.find(r => r.code === c)) {
        related.push({
          name: STATE_NAMES[c],
          slug: slugify(STATE_NAMES[c]),
          code: c,
        });
      }
    }
  }

  return related.slice(0, count);
}

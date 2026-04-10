import { motion } from 'framer-motion';
import {
  ArrowRight, CheckCircle, ShieldCheck, Lock,
  DollarSign, BookOpen, FileText, Award, AlertTriangle,
  Building2, XCircle, Globe, TrendingDown, ExternalLink, ChevronRight,
} from 'lucide-react';
import type { GuideTranslations } from '../lib/guide-translations';
import {
  buildDifficultyScale, buildCostCategories, buildGuideContents,
  deriveStateTraits, getRelatedStates,
} from '../lib/guide-helpers';

// ─── TYPES ─────────────────────────────────────────────────────────────────────

interface StateGuidePageProps {
  state: any;
  allStates: Record<string, any>;
  translations: GuideTranslations;
  baseUrl: string;
  guidesBasePath: string; // e.g. "/guides" or "/es/guides"
  statesBasePath: string; // e.g. "/states"
  alternateLangUrl?: string; // URL of the page in the other language
}

// ─── GUARANTEE STAMP ───────────────────────────────────────────────────────────

const GuaranteeStamp = ({ title, locale }: { title: string; locale: 'en' | 'es' }) => (
  <motion.div
    initial={{ rotate: -12, scale: 0.8, opacity: 0 }}
    whileInView={{ rotate: -8, scale: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    className="inline-block"
  >
    <div
      className="w-36 h-36 flex flex-col items-center justify-center text-center border-4 border-[#E91E8C] bg-white"
      style={{ borderRadius: '50%', boxShadow: '4px 4px 0px 0px #000, inset 0 0 0 4px #fff, inset 0 0 0 8px #E91E8C' }}
    >
      <ShieldCheck size={28} strokeWidth={3} className="text-[#E91E8C] mb-1" />
      <div className="text-[10px] font-black tracking-[0.15em] leading-tight text-black uppercase">
        {title.split(' ').slice(0, 2).join(' ')}<br />{title.split(' ').slice(2).join(' ')}
      </div>
      <div className="text-[8px] font-black tracking-widest text-[#E91E8C] mt-1">{'\u2605'} {locale === 'es' ? 'VERIFICADO' : 'VERIFIED'} {'\u2605'}</div>
    </div>
  </motion.div>
);

// ─── DOTTED DIVIDER ────────────────────────────────────────────────────────────

const DottedDivider = () => (
  <div className="flex items-center justify-center py-2">
    <div className="w-full h-0 border-b-2 border-black" style={{ borderStyle: 'dotted' }} />
  </div>
);

// ─── SECTION DIVIDER ───────────────────────────────────────────────────────────

const SectionDivider = () => (
  <div className="flex items-center gap-3 justify-center mt-3">
    <div className="h-0.5 w-20 bg-black" />
    <span className="text-xs font-black">{'\u26A0'}</span>
    <div className="h-0.5 w-20 bg-black" />
  </div>
);

// ─── FIXED BOTTOM CHECKOUT BAR ─────────────────────────────────────────────────

const FixedCheckoutBar = ({ onBuy, tx }: { onBuy: () => void; tx: GuideTranslations }) => (
  <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t-4 border-black bg-[#FFED4E] shadow-[0_-4px_0px_0px_rgba(0,0,0,1)]">
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="flex flex-col leading-tight">
        <span className="text-2xl font-black text-black leading-none">$49</span>
        <span className="text-[9px] font-black tracking-wider text-black/60">{tx.mobileOneTime}</span>
      </div>
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onBuy}
        className="flex-1 bg-[#E91E8C] text-white font-black text-base py-3 px-4 border-3 border-black flex items-center justify-center gap-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
        style={{ borderWidth: '3px' }}
      >
        <Building2 size={18} strokeWidth={3} />
        <span>{tx.buyNow} {'\u2014'} $49</span>
      </motion.button>
      <div className="flex flex-col items-center text-[9px] font-black tracking-wider text-black/50 leading-tight">
        <Lock size={14} strokeWidth={3} className="text-black/40 mb-0.5" />
        <span>{tx.mobileSecure}</span>
        <span>{tx.mobileCheckout}</span>
      </div>
    </div>
  </div>
);

// ─── QUICK FACTS TABLE ─────────────────────────────────────────────────────────

const QuickFactsTable = ({ s, tx }: { s: any; tx: GuideTranslations }) => (
  <div className="border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8">
    <div className="bg-black text-[#FFED4E] px-5 py-3 flex items-center gap-2">
      <FileText size={18} strokeWidth={3} />
      <span className="font-black tracking-widest text-sm">{tx.quickFactsTitle} {'\u2014'} {s.name.toUpperCase()}</span>
    </div>
    <table className="w-full text-sm">
      <tbody>
        <tr className="border-b-2 border-black/10">
          <td className="px-5 py-3 font-black text-black/60">{tx.filingAgency}</td>
          <td className="px-5 py-3 font-bold text-black">
            <a href={s.website} target="_blank" rel="noopener noreferrer" className="text-[#E91E8C] hover:underline inline-flex items-center gap-1">
              {s.agency} <ExternalLink size={12} />
            </a>
          </td>
        </tr>
        <tr className="border-b-2 border-black/10">
          <td className="px-5 py-3 font-black text-black/60">{tx.llcFee}</td>
          <td className="px-5 py-3 font-bold text-black">${s.entities?.llc?.fee || 0}</td>
        </tr>
        <tr className="border-b-2 border-black/10">
          <td className="px-5 py-3 font-black text-black/60">{tx.corpFee}</td>
          <td className="px-5 py-3 font-bold text-black">${s.entities?.corporation?.fee || 0}</td>
        </tr>
        <tr className="border-b-2 border-black/10">
          <td className="px-5 py-3 font-black text-black/60">{tx.taxClearance}</td>
          <td className="px-5 py-3">
            <span className={`font-black text-xs tracking-widest px-2 py-1 border-2 border-black ${s.tax?.clearanceRequired ? 'bg-[#E91E8C] text-white' : 'bg-[#2D8E3B] text-white'}`}>
              {s.tax?.clearanceRequired ? tx.required : tx.notRequired}
            </span>
          </td>
        </tr>
        <tr className="border-b-2 border-black/10">
          <td className="px-5 py-3 font-black text-black/60">{tx.processingTime}</td>
          <td className="px-5 py-3 font-bold text-black">{s.timeline?.standardProcessingDays || '\u2014'}</td>
        </tr>
        <tr>
          <td className="px-5 py-3 font-black text-black/60">{tx.onlineFiling}</td>
          <td className="px-5 py-3">
            <span className={`font-black text-xs tracking-widest px-2 py-1 border-2 border-black ${s.entities?.llc?.onlineFiling ? 'bg-[#2D8E3B] text-white' : 'bg-black/20 text-black'}`}>
              {s.entities?.llc?.onlineFiling ? tx.yes : tx.no}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────

export const StateGuidePage = ({
  state: s,
  allStates,
  translations: tx,
  baseUrl,
  guidesBasePath,
  statesBasePath,
  alternateLangUrl,
}: StateGuidePageProps) => {
  const guideContents = buildGuideContents(s, tx.locale);
  const difficultyScale = buildDifficultyScale(s, allStates, tx.locale);
  const costCategories = buildCostCategories(s, tx.locale);
  const { pros, cons } = deriveStateTraits(s, tx.locale);
  const relatedStates = getRelatedStates(s.code, 6);
  const guideCheckoutUrl = 'https://buy.stripe.com/14A00jdmt51r6xFfh2co007';
  const handleBuy = () => {
    window.location.href = guideCheckoutUrl;
  };

  const rep = (template: string) =>
    template.replace(/\{state\}/g, s.name).replace(/\{agency\}/g, s.agency);

  return (
    <div className="min-h-screen w-full pb-24 md:pb-0" style={{ backgroundColor: '#FFED4E', fontFamily: 'Georgia, serif' }}>

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <header className="border-b-4 border-black bg-[#FFED4E] sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a href={guidesBasePath} className="bg-black text-[#FFED4E] px-3 py-1 border-2 border-black no-underline">
              <span className="font-black text-xl md:text-2xl tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                {tx.brandName}
              </span>
            </a>
            <span className="hidden sm:inline text-[10px] font-black tracking-widest text-black/60 uppercase">
              {s.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a href={`${statesBasePath}/${s.slug}`} className="hidden sm:flex items-center gap-1.5 border-2 border-black bg-white px-3 py-1 text-xs font-black text-black no-underline hover:bg-black/5">
              {tx.viewFreeGuide}
            </a>
            <div className="hidden sm:flex items-center gap-1.5 border-2 border-black bg-white px-3 py-1">
              <FileText size={14} strokeWidth={3} />
              <span className="font-black text-sm text-[#E91E8C]">$49</span>
              <span className="text-[10px] font-black text-black/50 tracking-wider">{tx.mobileOneTime}</span>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={handleBuy}
              className="bg-[#E91E8C] text-white font-black text-sm px-4 py-2 border-2 border-black flex items-center gap-1.5 cursor-pointer">
              <span>{tx.buyNow}</span>
              <span className="font-black">$49</span>
            </motion.button>
          </div>
        </div>
        {/* Breadcrumb */}
        <div className="max-w-4xl mx-auto px-4 pb-2 flex items-center gap-1 text-[10px] font-bold text-black/40">
          <a href="/" className="hover:text-black no-underline text-black/40">{tx.locale === 'es' ? 'Inicio' : 'Home'}</a>
          <ChevronRight size={10} />
          <a href={statesBasePath} className="hover:text-black no-underline text-black/40">{tx.allStates.replace(' \u2192', '')}</a>
          <ChevronRight size={10} />
          <a href={`${statesBasePath}/${s.slug}`} className="hover:text-black no-underline text-black/40">{s.name}</a>
          <ChevronRight size={10} />
          <span className="text-black/60">{tx.heroProductTitle}</span>
        </div>
      </header>

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="border-b-4 border-black bg-[#FFED4E] overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-20" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 49.5%, rgba(0,0,0,0.04) 49.5%, rgba(0,0,0,0.04) 50.5%, transparent 50.5%, transparent 100%)',
          backgroundSize: '160px 100%',
        }}>
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left: Main copy */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="inline-block bg-black text-[#FFED4E] px-3 py-1 text-xs font-black tracking-[0.25em] mb-5 uppercase">
                  {tx.heroPreBadge} {s.name}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[0.9] mb-5 text-black" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
                  {tx.locale === 'es' ? (
                    <>{'\u00BF'}CERRANDO TU<br />NEGOCIO EN<br /><span style={{ color: '#E91E8C' }}>{s.name.toUpperCase()}</span>?</>
                  ) : (
                    <>SHUTTING DOWN<br />A BUSINESS IN<br /><span style={{ color: '#E91E8C' }}>{s.name.toUpperCase()}</span>?</>
                  )}
                </h1>
                <div className="flex items-center gap-3 justify-center lg:justify-start mb-5">
                  <div className="h-1 w-12 bg-black" />
                  <span className="text-sm font-black">{'\u26A0'} {'\u26A0'} {'\u26A0'}</span>
                  <div className="h-1 w-12 bg-black" />
                </div>
                <p className="text-lg md:text-xl font-bold text-black/80 max-w-lg mx-auto lg:mx-0 italic leading-relaxed">
                  {rep(tx.heroSubheadTemplate)}
                </p>

                {/* Official links */}
                <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start mt-5">
                  <a href={s.website} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 border-2 border-black bg-white px-3 py-1.5 text-xs font-black text-black no-underline hover:bg-black/5">
                    <Globe size={14} strokeWidth={3} />
                    {s.agencyAbbr || s.agency.split(' ').pop()} {tx.officialWebsite}
                  </a>
                  {s.onlinePortal && (
                    <a href={s.onlinePortal} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 border-2 border-black bg-white px-3 py-1.5 text-xs font-black text-black no-underline hover:bg-black/5">
                      <ExternalLink size={14} strokeWidth={3} />
                      {tx.locale === 'es' ? 'Portal en L\u00EDnea' : 'Online Portal'}
                    </a>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Right: Product card */}
            <motion.div initial={{ opacity: 0, rotate: 4, scale: 0.9 }} animate={{ opacity: 1, rotate: 2, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }} className="flex-shrink-0 w-full max-w-xs">
              <div className="border-4 border-black bg-[#E91E8C] p-1.5 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                <div className="border-2 border-black bg-black text-[#FFED4E] p-6 text-center">
                  <div className="text-xs font-black tracking-[0.3em] text-[#FFED4E]/60 mb-3">{tx.heroPresents}</div>
                  <div className="flex justify-center mb-3">
                    <div className="w-20 h-20 bg-[#FFED4E] border-3 border-[#E91E8C] flex items-center justify-center" style={{ borderWidth: '3px' }}>
                      <span className="text-3xl font-black text-black">{s.code}</span>
                    </div>
                  </div>
                  <h2 className="text-xl font-black leading-tight mb-1" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>{s.name.toUpperCase()}</h2>
                  <h2 className="text-2xl font-black leading-tight mb-3" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>{tx.heroProductTitle}</h2>
                  <DottedDivider />
                  <div className="mt-3 mb-2">
                    <span className="text-4xl font-black text-[#FFED4E]">$49</span>
                  </div>
                  <div className="text-xs font-black tracking-widest text-[#FFED4E]/60 mb-4">{tx.heroPriceOneTime}</div>
                  <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={handleBuy}
                    className="w-full bg-[#FFED4E] text-black font-black text-base py-3 px-4 border-3 border-[#FFED4E] flex items-center justify-center gap-2 shadow-[3px_3px_0px_0px_rgba(255,237,78,0.4)] hover:bg-white transition-colors cursor-pointer"
                    style={{ borderWidth: '3px', borderColor: '#FFED4E' }}>
                    <FileText size={18} strokeWidth={3} />
                    <span>{tx.heroInstantAccess}</span>
                    <ArrowRight size={16} strokeWidth={3} />
                  </motion.button>
                  <div className="flex items-center justify-center gap-1.5 mt-3">
                    <Lock size={12} strokeWidth={3} className="text-[#FFED4E]/50" />
                    <span className="text-[10px] font-black tracking-wider text-[#FFED4E]/50">{tx.heroSecureCheckout}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ── QUICK FACTS ─────────────────────────────────────────────────── */}
      <section className="border-b-4 border-black bg-white" id="facts">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <QuickFactsTable s={s} tx={tx} />

          {/* Official form links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {s.entities?.llc?.formUrl && (
              <a href={s.entities.llc.formUrl} target="_blank" rel="noopener noreferrer"
                className="border-4 border-black bg-[#FFED4E] p-4 flex items-center gap-3 no-underline hover:bg-[#FFED4E]/80 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <FileText size={24} strokeWidth={3} className="text-black flex-shrink-0" />
                <div>
                  <div className="font-black text-sm text-black">{s.entities.llc.formName}</div>
                  <div className="text-xs font-bold text-black/50">{s.entities.llc.formNumber || 'LLC Form'} {'\u2022'} {tx.locale === 'es' ? 'Descargar PDF' : 'Download PDF'}</div>
                </div>
                <ExternalLink size={16} className="text-black/40 ml-auto flex-shrink-0" />
              </a>
            )}
            {s.entities?.corporation?.formUrl && (
              <a href={s.entities.corporation.formUrl} target="_blank" rel="noopener noreferrer"
                className="border-4 border-black bg-[#FFED4E] p-4 flex items-center gap-3 no-underline hover:bg-[#FFED4E]/80 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <FileText size={24} strokeWidth={3} className="text-black flex-shrink-0" />
                <div>
                  <div className="font-black text-sm text-black">{s.entities.corporation.formName}</div>
                  <div className="text-xs font-bold text-black/50">{s.entities.corporation.formNumber || 'Corp Form'} {'\u2022'} {tx.locale === 'es' ? 'Descargar PDF' : 'Download PDF'}</div>
                </div>
                <ExternalLink size={16} className="text-black/40 ml-auto flex-shrink-0" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INSIDE ──────────────────────────────────────────────── */}
      <section className="border-b-4 border-black" style={{ backgroundColor: '#FFF8DC' }} id="contents">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <div className="text-xs font-black tracking-[0.3em] text-black/50 mb-2 uppercase">
              {rep(tx.guideContentsPreTitle)}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-black" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
              {tx.guideContentsTitle}
            </h2>
            <p className="text-sm font-bold text-black/60 mt-2 italic">{tx.guideContentsSubtitle}</p>
            <SectionDivider />
          </div>

          <div className="border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="bg-black text-[#FFED4E] px-5 py-3 flex items-center gap-2">
              <BookOpen size={18} strokeWidth={3} />
              <span className="font-black tracking-widest text-sm">{rep(tx.guideContentsTocLabel)}</span>
            </div>
            <div className="divide-y-2 divide-black/10">
              {guideContents.map((item, i) => (
                <motion.div key={item.text} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 px-5 py-4 hover:bg-[#FFED4E]/20 transition-colors">
                  <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center border-2 border-black font-black text-xs text-white mt-0.5"
                    style={{ backgroundColor: item.hot ? '#E91E8C' : '#000' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-sm text-black">{item.text}</span>
                    {item.hot && (
                      <span className="ml-2 text-[10px] font-black bg-[#E91E8C] text-white px-1.5 py-0.5 tracking-widest">
                        {tx.guideContentsHot}
                      </span>
                    )}
                  </div>
                  <CheckCircle size={16} strokeWidth={2.5} className="text-[#E91E8C] flex-shrink-0 mt-0.5" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DIFFICULTY ──────────────────────────────────────────────────── */}
      <section className="border-b-4 border-black bg-[#FFED4E]" id="difficulty">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <div className="text-xs font-black tracking-[0.3em] text-black/50 mb-2 uppercase">{tx.difficultyPreTitle}</div>
            <h2 className="text-4xl md:text-5xl font-black text-black" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
              {tx.difficultyTitle}
            </h2>
            <p className="text-sm font-bold text-black/60 mt-2 italic">{rep(tx.difficultySubtitle)}</p>
            <SectionDivider />
          </div>

          <div className="border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <div className="bg-[#E91E8C] text-white px-5 py-3 flex items-center gap-2">
              <Globe size={18} strokeWidth={3} />
              <span className="font-black tracking-widest text-sm">{tx.difficultyIndexLabel}</span>
            </div>
            <div className="p-5 space-y-4">
              {difficultyScale.map((row, i) => (
                <motion.div key={row.state} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className="w-28 flex-shrink-0">
                      {row.slug === s.slug ? (
                        <span className="font-black text-sm text-[#E91E8C]">{'\u25B6'} {row.state}</span>
                      ) : (
                        <a href={`${guidesBasePath}/${row.slug}`} className="font-black text-sm text-black hover:text-[#E91E8C] no-underline">
                          {row.state}
                        </a>
                      )}
                    </div>
                    <div className="flex-1 h-8 border-2 border-black bg-gray-100 overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${row.bar}%` }}
                        viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }}
                        className="h-full flex items-center justify-end px-2"
                        style={{
                          backgroundColor: row.state === s.name ? '#E91E8C' : '#FFED4E',
                          borderRight: '2px solid black',
                        }}>
                        <span className="font-black text-xs text-black whitespace-nowrap">{row.difficulty}</span>
                      </motion.div>
                    </div>
                    <div className="w-44 flex-shrink-0 text-right hidden sm:block">
                      <span className="text-xs font-bold text-black/60 italic">{row.label}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="border-t-2 border-black bg-black/5 px-5 py-3 text-xs font-bold text-black/50 italic">
              {tx.difficultyFootnote}
            </div>
          </div>
        </div>
      </section>

      {/* ── COST CATEGORIES ─────────────────────────────────────────────── */}
      <section className="border-b-4 border-black bg-white" id="costs">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <div className="text-xs font-black tracking-[0.3em] text-black/50 mb-2 uppercase">{tx.costPreTitle}</div>
            <h2 className="text-4xl md:text-5xl font-black text-black" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
              {tx.costTitle}
            </h2>
            <p className="text-sm font-bold text-black/60 mt-2 italic">{rep(tx.costSubtitleTemplate)}</p>
            <SectionDivider />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {costCategories.map((cat, i) => (
              <motion.div key={cat.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" style={{ backgroundColor: cat.color }}>
                  <div className="border-b-2 border-black px-4 py-2 flex items-center gap-2">
                    <DollarSign size={16} strokeWidth={3} className="text-white" />
                    <span className="font-black text-sm text-white tracking-wider">{cat.name}</span>
                  </div>
                  <div className="bg-amber-50 m-1 border-2 border-black p-4">
                    {cat.items.map((item: string) => (
                      <div key={item} className="flex items-start gap-2 mb-2 last:mb-0">
                        <span className="font-black text-xs mt-0.5" style={{ color: cat.color }}>{'\u2714'}</span>
                        <span className="font-bold text-sm text-black">{item}</span>
                      </div>
                    ))}
                    <div className="mt-3 pt-2 border-t border-black/10 text-xs font-bold text-black/40 italic">
                      {tx.costFootnote}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EASY VS HARD ────────────────────────────────────────────────── */}
      <section className="border-b-4 border-black bg-[#FFED4E]" id="comparison">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <div className="text-xs font-black tracking-[0.3em] text-black/50 mb-2 uppercase">
              {rep(tx.comparisonPreTitle)}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-black" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
              {tx.comparisonTitle}
            </h2>
            <p className="text-sm font-bold text-black/60 mt-2 italic">{rep(tx.comparisonSubtitleTemplate)}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="border-4 border-black bg-[#2D8E3B] p-1 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] h-full">
                <div className="border-2 border-black bg-amber-50 p-5 h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-[#2D8E3B] text-white font-black text-xs tracking-widest px-3 py-1 border border-black">
                      {tx.easyLabel}
                    </div>
                  </div>
                  {pros.map(item => (
                    <div key={item} className="flex items-start gap-2 mb-2.5">
                      <CheckCircle size={15} strokeWidth={3} className="text-[#2D8E3B] mt-0.5 flex-shrink-0" />
                      <span className="font-bold text-sm text-black">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="border-4 border-black bg-[#E91E8C] p-1 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] h-full">
                <div className="border-2 border-black bg-amber-50 p-5 h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-[#E91E8C] text-white font-black text-xs tracking-widest px-3 py-1 border border-black">
                      {tx.hardLabel}
                    </div>
                  </div>
                  {cons.map(item => (
                    <div key={item} className="flex items-start gap-2 mb-2.5">
                      <XCircle size={15} strokeWidth={3} className="text-[#E91E8C] mt-0.5 flex-shrink-0" />
                      <span className="font-bold text-sm text-black">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-5 border-4 border-black bg-black text-[#FFED4E] p-4 text-center">
            <div className="font-black text-sm tracking-wider">{tx.comparisonFooter}</div>
          </div>
        </div>
      </section>

      {/* ── URGENCY ─────────────────────────────────────────────────────── */}
      <section className="border-b-4 border-black bg-black text-[#FFED4E]">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {tx.urgencyItems.map((item, i) => {
              const Icon = [TrendingDown, Award, AlertTriangle][i] || AlertTriangle;
              return (
                <motion.div key={item.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3">
                  <Icon size={24} strokeWidth={2.5} className="text-[#E91E8C] flex-shrink-0" />
                  <span className="font-bold text-sm text-[#FFED4E]/80 leading-tight">{item.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── RELATED STATES ──────────────────────────────────────────────── */}
      <section className="border-b-4 border-black bg-white" id="related">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-black" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
              {tx.relatedTitle}
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {relatedStates.map(rs => (
              <a key={rs.code} href={`${guidesBasePath}/${rs.slug}`}
                className="border-4 border-black bg-[#FFED4E] p-3 text-center no-underline hover:bg-[#E91E8C] hover:text-white transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group">
                <div className="text-2xl font-black text-black group-hover:text-white">{rs.code}</div>
                <div className="text-xs font-black text-black/60 group-hover:text-white/80 mt-1">{rs.name}</div>
                <div className="text-[10px] font-bold text-[#E91E8C] group-hover:text-white/60 mt-1">{tx.relatedViewGuide}</div>
              </a>
            ))}
          </div>
          <div className="text-center mt-6">
            <a href={statesBasePath} className="inline-flex items-center gap-2 border-2 border-black bg-black text-[#FFED4E] px-6 py-2 font-black text-sm no-underline hover:bg-[#E91E8C] hover:border-[#E91E8C]">
              {tx.allStates}
            </a>
          </div>
        </div>
      </section>

      {/* ── BIG CTA ─────────────────────────────────────────────────────── */}
      <section className="border-b-4 border-black bg-[#FFED4E]" id="buy">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-xs font-black tracking-[0.3em] text-black/50 mb-3 uppercase">{tx.ctaPreTitle}</div>
            <h2 className="text-4xl md:text-6xl font-black text-black leading-[0.9] mb-5" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
              {tx.ctaTitleLine1}<br />
              <span style={{ color: '#E91E8C' }}>{rep(tx.ctaTitleLine2Template)}</span>
            </h2>

            <div className="mb-8">
              <span className="text-7xl font-black text-black leading-none">$49</span>
              <div className="mt-2 text-xs font-black tracking-widest text-black/50">{tx.heroPriceOneTime}</div>
            </div>

            <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6">
              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
                <GuaranteeStamp title={tx.ctaGuaranteeTitle} locale={tx.locale} />
                <div className="text-left max-w-xs">
                  <h3 className="font-black text-lg text-black mb-2">{tx.ctaGuaranteeTitle}</h3>
                  <p className="text-sm font-bold text-black/60 italic leading-relaxed">{tx.ctaGuaranteeText}</p>
                </div>
              </div>
            </div>

            <motion.button whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} onClick={handleBuy}
              className="w-full max-w-md mx-auto bg-[#E91E8C] text-white font-black text-xl md:text-2xl py-5 px-8 border-4 border-black flex items-center justify-center gap-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow cursor-pointer"
              style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
              <Building2 size={26} strokeWidth={3} />
              <span>{tx.ctaBuyButton}</span>
              <ArrowRight size={22} strokeWidth={3} />
            </motion.button>

            <div className="flex items-center justify-center gap-6 mt-5">
              <div className="flex items-center gap-1.5 text-xs font-black text-black/50">
                <Lock size={14} strokeWidth={3} /><span>{tx.ctaSecure}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-black text-black/50">
                <FileText size={14} strokeWidth={3} /><span>{tx.ctaInstant}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-black text-black/50">
                <ShieldCheck size={14} strokeWidth={3} /><span>{tx.ctaGuarantee}</span>
              </div>
            </div>

            <p className="text-[11px] font-bold text-black/40 mt-4 italic">{tx.ctaDisclaimer}</p>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="bg-black text-[#FFED4E] border-t-4 border-[#FFED4E]">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <a href={guidesBasePath} className="bg-[#FFED4E] text-black inline-block px-3 py-1 border border-[#FFED4E] no-underline">
              <span className="font-black text-xl">{tx.brandName}</span>
            </a>
            <div className="text-center">
              <div className="font-black text-sm tracking-widest text-[#FFED4E]/70">{s.name.toUpperCase()} {tx.heroProductTitle}</div>
              <div className="text-xs font-bold text-[#FFED4E]/40">{tx.footerRights}</div>
            </div>
            <div className="flex items-center gap-4">
              {[tx.footerTerms, tx.footerPrivacy, tx.footerRefunds].map((item, i) => (
                <a key={item} href={['terms', 'privacy', 'disclaimer'][i] ? `/${['terms', 'privacy', 'disclaimer'][i]}` : '#'}
                  className="text-xs font-black text-[#FFED4E]/50 hover:text-[#FFED4E] transition-colors no-underline">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* SEO: Related state links in footer */}
          <div className="border-t border-[#FFED4E]/20 pt-4 mb-4">
            <div className="text-[10px] font-black tracking-widest text-[#FFED4E]/30 mb-2">
              {tx.relatedTitle}
            </div>
            <div className="flex flex-wrap gap-2">
              {relatedStates.map(rs => (
                <a key={rs.code} href={`${guidesBasePath}/${rs.slug}`}
                  className="text-[10px] font-bold text-[#FFED4E]/40 hover:text-[#FFED4E] no-underline">
                  {rs.name}
                </a>
              ))}
              <a href={statesBasePath} className="text-[10px] font-bold text-[#E91E8C] hover:text-[#FFED4E] no-underline">
                {tx.allStates}
              </a>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="border-t border-[#FFED4E]/20 pt-4 mb-4">
            <p className="text-[10px] font-bold text-[#FFED4E]/25 leading-relaxed">
              {rep(tx.footerDisclaimerTemplate)}
            </p>
          </div>

          {/* Language toggle */}
          {alternateLangUrl && (
            <div className="border-t border-[#FFED4E]/20 pt-4 mb-4 text-center">
              <a href={alternateLangUrl} className="text-xs font-black text-[#FFED4E]/50 hover:text-[#FFED4E] no-underline border border-[#FFED4E]/20 px-4 py-1.5 inline-block">
                {tx.locale === 'es' ? '\uD83C\uDDFA\uD83C\uDDF8 English Version' : '\uD83C\uDDEA\uD83C\uDDF8 Versi\u00F3n en Espa\u00F1ol'}
              </a>
            </div>
          )}

          <div className="border-t border-[#FFED4E]/20 pt-5 text-center">
            <div className="inline-block border border-[#FFED4E]/20 px-6 py-2">
              <span className="text-[10px] font-black tracking-[0.4em] text-[#FFED4E]/30">{tx.footerTagline}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ── FIXED MOBILE BAR ────────────────────────────────────────────── */}
      <FixedCheckoutBar onBuy={handleBuy} tx={tx} />
    </div>
  );
};

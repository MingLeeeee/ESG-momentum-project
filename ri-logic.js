// ════════════════════════════════════════════════════════════
// ri-logic.js — ESG Risk Intelligence
// IT3852 Business Innovation Project · AY2026 S1
// Author : Moses Ng
// ════════════════════════════════════════════════════════════

// ════════════════════════════════════════════════════════════
// SCORING FORMULA
// ─────────────────────────────────────────────────────────────
// Category weights (must sum to 1.0):
//   Governance  35% — strongest predictor of ESG deterioration
//   Social      25%
//   Environmental 25%
//   AI/Digital  15% — emerging category, lower weight
//
// Signal severity points:
//   High   = 100
//   Medium = 50
//   Low    = 20
//
// Per category: average the severity points of all signals
// in that category, then multiply by the category weight.
// Sum the four weighted scores → final score 0–100.
//
// Thresholds:
//   0–33  → Low risk
//   34–66 → Medium risk
//   67+   → High risk
// ════════════════════════════════════════════════════════════

const WEIGHTS = { G:0.35, S:0.25, E:0.25, D:0.15 };
const SEV_PTS = { high:100, med:50, low:20 };

function calcScore(signals) {
  const cats = { E:[], S:[], G:[], D:[] };
  signals.forEach(s => { if(cats[s.cat]) cats[s.cat].push(SEV_PTS[s.sev]||0); });
  let total = 0;
  for(const [cat, weight] of Object.entries(WEIGHTS)) {
    const pts = cats[cat];
    if(!pts.length) continue;
    const avg = pts.reduce((a,b)=>a+b,0) / pts.length;
    total += avg * weight;
  }
  return Math.min(100, Math.round(total));
}

function calcLevel(score) {
  return score >= 67 ? 'High' : score >= 34 ? 'Medium' : 'Low';
}

function calcCategoryScores(signals) {
  const cats = { E:[], S:[], G:[], D:[] };
  signals.forEach(s => { if(cats[s.cat]) cats[s.cat].push(SEV_PTS[s.sev]||0); });
  const result = [];
  for(const [cat, pts] of Object.entries(cats)) {
    const avg = pts.length ? Math.round(pts.reduce((a,b)=>a+b,0)/pts.length) : 0;
    const level = avg>=67?'High':avg>=34?'Med':'Low';
    result.push({ key:cat, avg, level });
  }
  return result;
}

// ════════════════════════════════════════════════════════════
// DATA
// ════════════════════════════════════════════════════════════
const RISK_DATA = {

  DBS: {
    name:'DBS Group', ticker:'SGX: D05', sector:'Banking', sector:'Banking',
    trendData:[18,22,20,25,24,26,28,28],
    topSignalTitle:'GenAI Operational Risk',
    topSignalCat:'D',
    categories:[
      { key:'E', label:'Environmental', color:'#00c896' },
      { key:'S', label:'Social',        color:'#5ab0e8' },
      { key:'G', label:'Governance',    color:'#c9a84c' },
      { key:'D', label:'AI / Digital',  color:'#8ba4c0' },
    ],
    signals:[
      { title:'GenAI Operational Risk',       cat:'D', sev:'med', age:'1d ago',  desc:'DBS\'s aggressive AI deployment (1,000+ AI models) creates novel model risk exposure not captured by MAS TRM guidelines.',                                                source:'MAS TRM Framework',      sourceUrl:'https://www.mas.gov.sg/regulation/guidelines/technology-risk-management-guidelines' },
      { title:'Board Tenure Concentration',   cat:'G', sev:'med', age:'2w ago',  desc:'3 of 12 board members have tenure >9 years. Proxy advisors flagging independence concerns.',                                                                                 source:'Proxy Research',         sourceUrl:'https://www.issgovernance.com/' },
      { title:'Scope 3 Emissions Gap',        cat:'E', sev:'med', age:'3d ago',  desc:'Financed emissions not fully disclosed for SME loan book. TCFD alignment partial.',                                                                                           source:'TCFD Review',            sourceUrl:'https://www.fsb-tcfd.org/' },
      { title:'Cyber Resilience Stress Test', cat:'D', sev:'low', age:'4d ago',  desc:'MAS TBML testing expanded to include AI-driven fraud vectors. DBS participating in pilot programme.',                                                                         source:'MAS Announcement',       sourceUrl:'https://www.mas.gov.sg/publications/consultations' },
      { title:'AI Credit Scoring Bias',       cat:'S', sev:'low', age:'5d ago',  desc:'Industry-wide concern: AI credit models may disadvantage underbanked segments. No DBS-specific finding yet.',                                                                 source:'MAS Consultation Paper', sourceUrl:'https://www.mas.gov.sg/publications/consultations' },
      { title:'Data Sovereignty Risk',        cat:'D', sev:'low', age:'1w ago',  desc:'Cross-border data flows for DigiBank India face tighter RBI data localisation requirements.',                                                                                 source:'RBI Circular',           sourceUrl:null },
      { title:'Green Bond Verification Gap',  cat:'E', sev:'low', age:'1w ago',  desc:'Third-party verification for $1.5B green bond pending. Greenwash risk: Low.',                                                                                               source:'Sustainability Report',  sourceUrl:null },
    ],
    explanations:[
      { cat:'AI / Digital', catColor:'#8ba4c0', confidence:'High',   updated:'Updated 30 May 2026 · triggered by MAS TRM update',      title:'GenAI risk is invisible to traditional ESG ratings',  body:'DBS operates 1,000+ AI models. Traditional ESG frameworks have no standardised metric for AI model governance or explainability — making this risk invisible to MSCI, Sustainalytics, or CDP scores.',                                      why:'AI model failures (bias, hallucination, fraud amplification) create regulatory liability and reputational damage — risks that grow as AI use expands.' },
      { cat:'Governance',   catColor:'#c9a84c', confidence:'Medium', updated:'Updated 27 May 2026 · proxy research update',             title:'Long board tenures signal independence risk',         body:'Three board members exceeding 9-year tenure is above the CGSI threshold. This is a structural weakness that could slow response to emerging ESG challenges.',                                                                             why:'Boards with entrenched members have weaker management oversight — a leading indicator of governance deterioration before rating agencies reflect it.' },
      { cat:'Environmental',catColor:'#00c896', confidence:'Medium', updated:'Updated 21 May 2026 · MAS disclosure review',             title:'Scope 3 gap is a pre-regulatory risk',                body:'DBS\'s SME loan book financed emissions are not fully disclosed. As MAS moves toward mandatory climate disclosures, this gap could trigger negative rating adjustments.',                                                                why:'Early action reduces future compliance cost and reputational risk from peer comparison.' },
    ],
    actions:[
      { id:'DBS_A1', verb:'Monitor',     verbStyle:'background:rgba(0,200,150,.1);color:#00c896;border:1px solid rgba(0,200,150,.35)',    priority:'Low priority',    due:'Review by 30 Jun 2026', title:'Track GenAI governance disclosures',              desc:'Set alert for DBS annual report AI governance section. Compare against MAS FEAT framework compliance.',                                                           bg:'rgba(255,255,255,.02)',  border:'rgba(255,255,255,.08)' },
      { id:'DBS_A2', verb:'Monitor',     verbStyle:'background:rgba(240,160,32,.1);color:#f0a020;border:1px solid rgba(240,160,32,.4)',   priority:'Medium priority', due:'Review by 15 Jul 2026', title:'Watch board composition at next AGM',             desc:'Review 2025 AGM outcomes. If long-tenured directors are re-elected without independence review, flag governance score downward.',                                  bg:'rgba(240,160,32,.04)',   border:'rgba(240,160,32,.25)' },
      { id:'DBS_A3', verb:'Investigate', verbStyle:'background:rgba(240,160,32,.1);color:#f0a020;border:1px solid rgba(240,160,32,.4)',   priority:'Medium priority', due:'Review by 10 Jul 2026', title:'Verify Scope 3 disclosure timeline',               desc:'Review DBS Sustainability Report 2025 for SME loan book financed emissions. Cross-reference MAS climate disclosure requirements.',                                bg:'rgba(255,255,255,.02)',  border:'rgba(255,255,255,.08)' },
    ],
  },

  GENT: {
    name:'Genting Berhad', ticker:'KLSE: GENT', sector:'Gaming', sector:'Gaming',
    trendData:[42,48,55,60,58,65,75,81],
    topSignalTitle:'SC Malaysia Investigation',
    topSignalCat:'G',
    categories:[
      { key:'E', label:'Environmental', color:'#00c896' },
      { key:'S', label:'Social',        color:'#5ab0e8' },
      { key:'G', label:'Governance',    color:'#c9a84c' },
      { key:'D', label:'AI / Digital',  color:'#8ba4c0' },
    ],
    signals:[
      { title:'SC Malaysia Investigation',       cat:'G', sev:'high', age:'1d ago',  desc:'Active Securities Commission Malaysia governance review following two independent director resignations. Outcome unknown.',                                                source:'SC Malaysia Filing',    sourceUrl:'https://www.sc.com.my/regulation/securities-commission-enforcement' },
      { title:'Dual CEO/Chairman Role',          cat:'G', sev:'high', age:'1w ago',  desc:'KT Lim\'s unchecked authority flagged by ISS and Glass Lewis as non-compliant with best practice governance.',                                                          source:'Proxy Research',        sourceUrl:'https://www.issgovernance.com/' },
      { title:'Related-Party Transaction Risk',  cat:'G', sev:'high', age:'5d ago',  desc:'Ongoing shareholder lawsuit alleges below-market property sale. No independent board review disclosed.',                                                                  source:'Bursa Filing',          sourceUrl:'https://www.bursamalaysia.com/market_information/announcements' },
      { title:'AML Workforce Gaps',              cat:'S', sev:'high', age:'3w ago',  desc:'RM12m AML fine reflects systemic compliance culture gaps. Staff training adequacy not publicly disclosed.',                                                               source:'Bank Negara Filing',    sourceUrl:'https://www.bnm.gov.my/enforcement' },
      { title:'Problem Gambling Exposure',       cat:'S', sev:'med',  age:'1w ago',  desc:'MAS/MOH research links casino proximity to household debt. No Genting-specific CSR programme disclosed.',                                                                 source:'MOH Study 2024',        sourceUrl:null },
      { title:'Unverified Carbon Targets',       cat:'E', sev:'med',  age:'2d ago',  desc:'Genting\'s 20% renewables by 2030 pledge has no third-party verification or interim milestone disclosure.',                                                              source:'Sustainability Report', sourceUrl:null },
      { title:'Casino Energy Intensity',         cat:'E', sev:'med',  age:'2w ago',  desc:'Resort operations in MY and US are high energy consumers. No measurable reduction plan published.',                                                                       source:'Sustainability Report', sourceUrl:null },
      { title:'Facial Recognition Risk',         cat:'D', sev:'med',  age:'2w ago',  desc:'Use of biometric surveillance at MY resorts raises PDPA compliance risk. Policy not publicly disclosed.',                                                                 source:'PDPA Watch',            sourceUrl:'https://www.pdp.gov.my/' },
      { title:'Digital Casino Regulatory Gap',   cat:'D', sev:'low',  age:'3d ago',  desc:'Growth of online gaming via Resorts World platforms creates regulatory arbitrage risk across jurisdictions.',                                                              source:'Gaming Regulatory News',sourceUrl:null },
    ],
    explanations:[
      { cat:'Governance', catColor:'#c9a84c', confidence:'High',   updated:'Updated 30 May 2026 · SC Malaysia filing',   title:'SC investigation is a pre-downgrade signal',          body:'Formal regulatory investigations by the Securities Commission almost always precede ESG governance score downgrades. Traditional ratings update quarterly — this signal appeared today.',                                                              why:'Investors who act now can reduce exposure before the formal downgrade — a 6–8 week window that traditional ESG scores miss entirely.' },
      { cat:'Social',     catColor:'#5ab0e8', confidence:'High',   updated:'Updated 20 May 2026 · Bank Negara filing',   title:'AML fine signals systemic compliance culture gap',     body:'The RM12m AML fine is not just a one-time penalty — it signals inadequate compliance culture and staff training. Traditional ESG frameworks treat fines as single data points, not systemic risk indicators.',                                     why:'Recurring compliance failures are strongly correlated with future governance deterioration and further regulatory sanctions.' },
      { cat:'Governance', catColor:'#c9a84c', confidence:'High',   updated:'Updated 15 May 2026 · structural finding',   title:'Dual CEO/Chairman role concentrates failure risk',    body:'When the same person controls executive decisions and board oversight, there is no structural check on related-party transactions. This persists beyond any single event.',                                                                         why:'Research shows companies with combined CEO/Chairman roles have 34% higher probability of governance incidents within 3 years (CGSI 2023).' },
    ],
    actions:[
      { id:'GENT_A1', verb:'Reduce',           verbStyle:'background:rgba(232,64,64,.1);color:#e84040;border:1px solid rgba(232,64,64,.35)',   priority:'High priority',   due:'Act before 7 Jun 2026',  title:'Reduce exposure pending SC investigation',          desc:'Do not add to Genting position until the Securities Commission review concludes. Re-entry target: governance score above 55 with normalised board composition.',   bg:'rgba(232,64,64,.05)',    border:'rgba(232,64,64,.3)' },
      { id:'GENT_A2', verb:'Investigate',      verbStyle:'background:rgba(232,64,64,.1);color:#e84040;border:1px solid rgba(232,64,64,.35)',   priority:'High priority',   due:'Act before 14 Jun 2026', title:'Request independent board governance report',        desc:'Engage investor relations for timeline on independent governance review. If no response within 30 days, treat as confirmed governance risk signal.',                 bg:'rgba(255,255,255,.02)', border:'rgba(255,255,255,.08)' },
      { id:'GENT_A3', verb:'Compare w/ Peers', verbStyle:'background:rgba(240,160,32,.1);color:#f0a020;border:1px solid rgba(240,160,32,.4)', priority:'Medium priority', due:'Review by 30 Jun 2026',  title:'Benchmark responsible gaming disclosures vs MBS',   desc:'Marina Bay Sands publishes responsible gaming KPIs. Genting\'s absence is a peer disadvantage and a material social ESG gap.',                                        bg:'rgba(255,255,255,.02)', border:'rgba(255,255,255,.08)' },
    ],
  },

  GRAB: {
    name:'Grab Holdings', ticker:'NASDAQ: GRAB', sector:'Technology', sector:'Technology',
    trendData:[24,26,28,30,29,32,33,34],
    topSignalTitle:'CCCS Pricing Algorithm Watch',
    topSignalCat:'D',
    categories:[
      { key:'E', label:'Environmental', color:'#00c896' },
      { key:'S', label:'Social',        color:'#5ab0e8' },
      { key:'G', label:'Governance',    color:'#c9a84c' },
      { key:'D', label:'AI / Digital',  color:'#8ba4c0' },
    ],
    signals:[
      { title:'CCCS Pricing Algorithm Watch',        cat:'D', sev:'med', age:'5d ago',  desc:'Singapore CCCS monitoring Grab\'s surge pricing algorithm for algorithmic collusion. Not yet a formal investigation.',                                                  source:'CCCS Watch',                  sourceUrl:'https://www.cccs.gov.sg/' },
      { title:'Gig Worker Welfare Gap',              cat:'S', sev:'med', age:'3d ago',  desc:'ILO guidelines on platform worker welfare create potential retroactive liability for Grab\'s independent contractor model in SG, MY, TH.',                               source:'ILO Platform Economy Report', sourceUrl:'https://www.ilo.org/topics/platform-economy' },
      { title:'Dual-Class Share Structure',          cat:'G', sev:'med', age:'1m ago',  desc:'Anthony Tan holds supervoting rights limiting minority shareholder influence. Not captured in most governance scores.',                                                    source:'NASDAQ Filing',               sourceUrl:null },
      { title:'GrabMaps AI Accuracy Risk',           cat:'D', sev:'med', age:'1w ago',  desc:'Proprietary mapping AI used for logistics optimisation. No third-party accuracy audit published.',                                                                        source:'Tech Review',                 sourceUrl:null },
      { title:'PDPA Multi-Jurisdiction Risk',        cat:'D', sev:'low', age:'1d ago',  desc:'Operating across 6 ASEAN markets with diverging data laws. Vietnam\'s Decree 13 is most stringent.',                                                                     source:'Vietnam Decree 13',           sourceUrl:'https://lawnet.vn/vbpluploads/vb/attachement/2024/04/NghiDinh13_2023.pdf' },
      { title:'SBTi Submission Pending',             cat:'E', sev:'low', age:'1d ago',  desc:'Grab\'s 2035 carbon neutrality target not found in SBTi database. Credibility gap flagged — MSCI environmental score may be overstated.',                                source:'SBTi Database',               sourceUrl:'https://sciencebasedtargets.org/companies-taking-action' },
      { title:'Financial Inclusion Claim Gap',       cat:'S', sev:'low', age:'2w ago',  desc:'GrabPay\'s financial inclusion narrative for the unbanked is not independently audited. Social impact metrics are self-reported.',                                        source:'Internal ESG Report',         sourceUrl:null },
      { title:'EV Fleet Credibility Gap',            cat:'E', sev:'low', age:'2d ago',  desc:'BYD partnership for 50% EV by 2030 lacks interim 2026/2028 milestones. Carbon neutrality 2035 not yet SBTi-verified.',                                                   source:'Sustainability Report',       sourceUrl:null },
      { title:'CFO Transition Risk',                 cat:'G', sev:'low', age:'1m ago',  desc:'New CFO (2023) less than 2 years in role. Institutional knowledge gap in financial reporting oversight.',                                                                 source:'Annual Report',               sourceUrl:null },
    ],
    explanations:[
      { cat:'AI / Digital', catColor:'#8ba4c0', confidence:'Medium',      updated:'Updated 25 May 2026 · CCCS announcement',  title:'AI pricing algorithm is a novel regulatory risk',       body:'Grab\'s surge pricing is powered by a proprietary AI algorithm. The CCCS monitoring covers a risk category that does not yet exist in any mainstream ESG framework.',                                                                          why:'Regulatory intervention could force algorithm disclosure or redesign, impacting revenue optimisation — invisible to traditional ESG scorers.' },
      { cat:'Social',       catColor:'#5ab0e8', confidence:'Medium',      updated:'Updated 18 May 2026 · ILO publication',    title:'ILO gig guidelines could reshape labour costs',          body:'ILO 2025 Platform Economy guidelines push toward employee classification for platform workers. If SG, MY or TH adopt these, Grab\'s cost structure would change materially.',                                                                  why:'Labour reclassification is a systemic risk for all gig platforms — not in ESG social scores, which rely on self-reported contractor data.' },
      { cat:'Governance',   catColor:'#c9a84c', confidence:'Speculative', updated:'Updated 10 May 2026 · structural finding', title:'Supervoting rights limit shareholder governance',        body:'Anthony Tan\'s dual-class shares give effective veto power. Traditional governance scores penalise this, but don\'t capture forward risk if strategic direction diverges from ESG best practice.',                                            why:'In founder-led companies, ESG policy is ultimately one person\'s decision. Key-person governance risk is underweighted in standard frameworks.' },
    ],
    actions:[
      { id:'GRAB_A1', verb:'Monitor',     verbStyle:'background:rgba(0,200,150,.1);color:#00c896;border:1px solid rgba(0,200,150,.35)',   priority:'Low priority',    due:'Review by 31 Jul 2026', title:'Track CCCS algorithmic pricing review',            desc:'Set alert for CCCS public statements on Grab pricing investigation. If formal proceedings open, escalate to Medium risk event.',                                   bg:'rgba(255,255,255,.02)', border:'rgba(255,255,255,.08)' },
      { id:'GRAB_A2', verb:'Investigate', verbStyle:'background:rgba(240,160,32,.1);color:#f0a020;border:1px solid rgba(240,160,32,.4)', priority:'Medium priority', due:'Review by 20 Jun 2026', title:'Verify SBTi submission for carbon neutrality claim', desc:'Check Science Based Targets initiative database for Grab submission status. If not submitted, flag as greenwash risk and downgrade Environmental score.',           bg:'rgba(240,160,32,.04)', border:'rgba(240,160,32,.25)' },
      { id:'GRAB_A3', verb:'Monitor',     verbStyle:'background:rgba(240,160,32,.1);color:#f0a020;border:1px solid rgba(240,160,32,.4)', priority:'Medium priority', due:'Review by 31 Jul 2026', title:'Watch ILO gig worker adoption across ASEAN',        desc:'Track Singapore MOM and Malaysia MOHR responses to ILO platform economy guidelines. First policy signal expected H2 2025.',                                          bg:'rgba(255,255,255,.02)', border:'rgba(255,255,255,.08)' },
    ],
  },
};

// ════════════════════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════════════════════
const LEVEL_COLOR = l => l==='High'?'#e84040':l==='Medium'||l==='Med'?'#f0a020':'#00c896';
const CAT_NAMES   = { E:'Environmental', S:'Social', G:'Governance', D:'AI / Digital' };
const CAT_COLORS  = { E:'#00c896', S:'#5ab0e8', G:'#c9a84c', D:'#8ba4c0' };
const WEIGHT_LABELS = { E:'25%', S:'25%', G:'35%', D:'15%' };
const SEV_BADGE_STYLE = sev => {
  if(sev==='high') return 'background:rgba(232,64,64,.12);color:#e84040;border:1px solid rgba(232,64,64,.35)';
  if(sev==='med')  return 'background:rgba(240,160,32,.1);color:#f0a020;border:1px solid rgba(240,160,32,.4)';
  return 'background:rgba(0,200,150,.1);color:#00c896;border:1px solid rgba(0,200,150,.35)';
};

// Cache for AI narratives (avoid re-fetching on same company)
const AI_NARRATIVE_CACHE = {};

// ── Peer context data (all companies, lightweight) ────
const PEER_COMPANIES = [
  { id:'DBS',     name:'DBS Group',       sector:'Banking',      score:28, level:'low'  },
  { id:'GENT',    name:'Genting Berhad',  sector:'Gaming',       score:81, level:'high' },
  { id:'GRAB',    name:'Grab Holdings',   sector:'Technology',   score:34, level:'med'  },
  { id:'OCBC',    name:'OCBC Bank',       sector:'Banking',      score:19, level:'low'  },
  { id:'MAYBANK', name:'Maybank',         sector:'Banking',      score:22, level:'low'  },
  { id:'SEA',     name:'Sea Limited',     sector:'Technology',   score:41, level:'med'  },
  { id:'PTT',     name:'PTT PCL',         sector:'Energy',       score:58, level:'med'  },
  { id:'ASTRA',   name:'Astra Intl',      sector:'Conglomerate', score:47, level:'med'  },
  { id:'SINGTEL', name:'Singtel',         sector:'Telecoms',     score:25, level:'low'  },
  { id:'AXIATA',  name:'Axiata Group',    sector:'Telecoms',     score:29, level:'low'  },
  { id:'MAXIS',   name:'Maxis Berhad',    sector:'Telecoms',     score:31, level:'low'  },
  { id:'SMPRIME', name:'SM Prime',        sector:'Real Estate',  score:33, level:'low'  },
];

function buildPeerContext(ticker, score, sector) {
  const all    = PEER_COMPANIES;
  const sorted = all.slice().sort((a,b)=>a.score-b.score);
  const rank   = sorted.findIndex(c=>c.id===ticker) + 1;
  const total  = all.length;
  const avg    = Math.round(all.reduce((s,c)=>s+c.score,0)/all.length);
  const sectorPeers = all.filter(c=>c.sector===sector && c.id!==ticker);
  const sectorAvg   = sectorPeers.length
    ? Math.round(sectorPeers.reduce((s,c)=>s+c.score,0)/sectorPeers.length)
    : null;
  const vsPlatform = score > avg ? `+${score-avg} above` : score < avg ? `${score-avg} below` : 'equal to';
  const vsSector   = sectorAvg !== null
    ? (score > sectorAvg ? `+${score-sectorAvg} above` : score < sectorAvg ? `${score-sectorAvg} below` : 'equal to')
    : null;

  // Build mini ranking strip (5 companies around current)
  const stripStart = Math.max(0, Math.min(rank-3, total-5));
  const strip = sorted.slice(stripStart, stripStart+5);

  const stripHTML = strip.map(c => {
    const isCurrent = c.id === ticker;
    const col = c.level==='high'?'#e84040':c.level==='med'?'#f0a020':'#00c896';
    return `<div style="display:flex;flex-direction:column;align-items:center;gap:.25rem;flex:1;">
      <div style="font-family:var(--font-mono);font-size:.62rem;font-weight:600;color:${col};${isCurrent?'background:'+col+'22;padding:2px 6px;border-radius:4px;border:1px solid '+col+'44;':'opacity:.7;'}">${c.score}</div>
      <div style="font-size:.58rem;color:${isCurrent?'var(--white)':'var(--steel)'};text-align:center;font-weight:${isCurrent?'600':'300'};max-width:52px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${c.name}</div>
    </div>`;
  }).join('');

  return `<div style="margin-top:.9rem;padding-top:.9rem;border-top:1px solid var(--border);">
    <div style="font-family:var(--font-mono);font-size:.6rem;text-transform:uppercase;letter-spacing:.1em;color:var(--steel);margin-bottom:.65rem;">Platform context · ${total} companies</div>
    <div style="display:flex;gap:1.2rem;margin-bottom:.8rem;flex-wrap:wrap;">
      <div>
        <div style="font-family:var(--font-mono);font-size:.58rem;color:var(--steel);margin-bottom:.15rem;">Rank (safest=1)</div>
        <div style="font-family:var(--font-display);font-size:1.3rem;font-weight:700;color:var(--white);line-height:1;">${rank}<span style="font-size:.65rem;color:var(--steel);font-weight:300;"> / ${total}</span></div>
      </div>
      <div>
        <div style="font-family:var(--font-mono);font-size:.58rem;color:var(--steel);margin-bottom:.15rem;">vs platform avg (${avg})</div>
        <div style="font-family:var(--font-mono);font-size:.78rem;font-weight:600;color:${score>avg?'#e84040':'#00c896'}">${vsPlatform}</div>
      </div>
      ${sectorAvg!==null?`<div>
        <div style="font-family:var(--font-mono);font-size:.58rem;color:var(--steel);margin-bottom:.15rem;">vs ${sector} avg (${sectorAvg})</div>
        <div style="font-family:var(--font-mono);font-size:.78rem;font-weight:600;color:${score>sectorAvg?'#e84040':'#00c896'}">${vsSector}</div>
      </div>`:''}
    </div>
    <div style="display:flex;align-items:flex-end;gap:4px;padding:.6rem 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);margin-bottom:.6rem;">
      ${stripHTML}
    </div>
    <a href="comparison.html?compare=${ticker}" style="font-family:var(--font-mono);font-size:.62rem;color:var(--gold);text-decoration:none;letter-spacing:.06em;">Compare with another company →</a>
  </div>`;
}
// ════════════════════════════════════════════════════════════
const SCAN_MSGS = [
  'Connecting to news feeds…',
  'Scanning regulatory filings…',
  'Processing ESG reports…',
  'Classifying signals by category…',
  'Calculating weighted risk scores…',
  'Generating AI explanations…',
  'Scan complete.',
];

function runScanAnimation(cb) {
  const overlay = document.getElementById('ri-scan-overlay');
  const fill    = document.getElementById('ri-progress-fill');
  const status  = document.getElementById('ri-scan-status');
  const main    = document.getElementById('ri-main');
  overlay.style.display = 'block';
  main.classList.remove('visible');
  let step = 0;
  const iv = setInterval(() => {
    status.textContent = SCAN_MSGS[step];
    fill.style.width = Math.round(((step+1)/SCAN_MSGS.length)*100)+'%';
    step++;
    if(step >= SCAN_MSGS.length) {
      clearInterval(iv);
      setTimeout(() => {
        overlay.style.display = 'none';
        main.classList.add('visible');
        cb();
      }, 300);
    }
  }, 200);
}

// ════════════════════════════════════════════════════════════
// CHART INSTANCES
// ════════════════════════════════════════════════════════════
let _radarChart = null;
let _trendChart = null;

// ════════════════════════════════════════════════════════════
// MAIN RENDER
// ════════════════════════════════════════════════════════════
function renderRI() {
  const D     = RISK_DATA[ticker] || RISK_DATA['DBS'];
  const score = calcScore(D.signals);
  const level = calcLevel(score);
  const catScores = calcCategoryScores(D.signals);
  const now   = new Date();

  document.getElementById('ri-scan-time').textContent =
    'Scanned ' + now.toLocaleTimeString('en-SG',{hour:'2-digit',minute:'2-digit'});

  // Update watch button state
  if(typeof updateWatchBtn === 'function') updateWatchBtn();

  renderVerdict(D, score, level, catScores);
  renderBaseline(D, score, level, catScores);
  renderSignals(D);
  renderTrajectory(D, score, level);
  renderExplanations(D);
  renderActions(D);
}

// ════════════════════════════════════════════════════════════
// SECTION 1: VERDICT
// ════════════════════════════════════════════════════════════
function renderVerdict(D, score, level, catScores) {
  const col   = LEVEL_COLOR(level);
  const td    = D.trendData;
  const delta = td[td.length-1] - td[0];
  const dir   = delta > 0 ? 'up' : 'down';
  const trendColor = dir==='up'?'#e84040':'#00c896';
  const arrow      = dir==='up'?'↑':'↓';
  const trendMsg   = dir==='up'?'Risk is increasing — monitor closely':'Risk is improving — positive trend';

  const topSig     = D.signals.slice().sort((a,b)=>SEV_PTS[b.sev]-SEV_PTS[a.sev])[0]||{};
  const topCatColor = CAT_COLORS[topSig.cat]||'#c9a84c';
  const sigBg     = topSig.sev==='high'?'rgba(232,64,64,.06)':topSig.sev==='med'?'rgba(240,160,32,.05)':'rgba(0,200,150,.05)';
  const sigBorder = topSig.sev==='high'?'rgba(232,64,64,.3)':topSig.sev==='med'?'rgba(240,160,32,.3)':'rgba(0,200,150,.3)';
  const levelDesc = level==='High'?'Multiple high-severity signals detected. Immediate attention required.':level==='Medium'?'Moderate emerging risks present. Active monitoring recommended.':'No high-priority emerging risks. Minor watch items present.';

  document.getElementById('ri-verdict').innerHTML = `
    <div class="ri-verdict-score-wrap">
      <div class="ri-verdict-score" style="color:${col}">${score}</div>
      <div class="ri-verdict-level" style="color:${col}">${level} Risk</div>
    </div>
    <div class="ri-verdict-divider"></div>
    <div class="ri-verdict-mid">
      <div class="ri-verdict-trend">
        <span class="ri-verdict-trend-arrow ${dir}" style="color:${trendColor}">${arrow} ${Math.abs(delta)}</span>
        <span class="ri-verdict-trend-text">${trendMsg}</span>
        <span class="ri-verdict-trend-period">over 8 weeks</span>
      </div>
      <div class="ri-verdict-desc">${levelDesc}</div>
      <button class="ri-calc-btn" onclick="toggleCalcPanel()" id="ri-calc-toggle-btn">
        <span>How is this score calculated?</span>
        <span class="ri-calc-btn-chev" id="ri-calc-chev">▼</span>
      </button>
      <div class="ri-calc-panel" id="ri-calc-panel">
        <!-- AI narrative -->
        <div class="ri-calc-narrative-ai-label">AI-generated summary · powered by Claude</div>
        <div class="ri-calc-narrative" id="ri-calc-narrative">
          <div class="ri-calc-narrative-loading">
            <span style="font-size:.7rem">⟳</span> Generating company overview…
          </div>
        </div>
        <!-- Formula breakdown -->
        <div class="ri-calc-formula-title">Score breakdown by category</div>
        ${buildFormulaBreakdown(D, catScores, score, col)}
        <div class="ri-calc-method">
          <strong>How the formula works:</strong> Each signal is assigned severity points (High = 100, Medium = 50, Low = 20). Points within each category are averaged, then multiplied by that category's weight — Governance 35%, Social 25%, Environmental 25%, AI/Digital 15%. The weighted totals are summed to produce a final score from 0 to 100.
        </div>
      </div>
      ${buildPeerContext(ticker, score, D.sector||'—')}
    </div>
    <div>
      <div style="font-family:var(--font-mono);font-size:.58rem;text-transform:uppercase;letter-spacing:.1em;color:var(--steel);margin-bottom:.5rem;">Top signal right now</div>
      <div class="ri-verdict-top-signal" style="background:${sigBg};border-color:${sigBorder}">
        <div class="ri-verdict-signal-label" style="color:${col}">Most urgent</div>
        <div class="ri-verdict-signal-title">${topSig.title||'—'}</div>
        <div class="ri-verdict-signal-cat" style="color:${topCatColor}">${CAT_NAMES[topSig.cat]||''}</div>
      </div>
    </div>`;
}

function buildFormulaBreakdown(D, catScores, totalScore, totalColor) {
  const cats = { E:[], S:[], G:[], D:[] };
  D.signals.forEach(s=>{ if(cats[s.cat]) cats[s.cat].push(SEV_PTS[s.sev]||0); });
  const order = ['G','S','E','D'];
  const rows = order.map(key => {
    const pts = cats[key];
    const avg = pts.length ? Math.round(pts.reduce((a,b)=>a+b,0)/pts.length) : 0;
    const contrib = Math.round(avg * WEIGHTS[key]);
    const color = CAT_COLORS[key];
    const count = pts.length;
    return `<div class="ri-calc-cat-row">
      <div class="ri-calc-cat-name">${CAT_NAMES[key]}</div>
      <div class="ri-calc-cat-bar-track"><div class="ri-calc-cat-bar-fill" style="width:${avg}%;background:${color}"></div></div>
      <div class="ri-calc-cat-weight" title="Category weight">${WEIGHT_LABELS[key]}</div>
      <div class="ri-calc-cat-contrib" style="color:${color}">${count>0?'+ '+contrib:'0'}</div>
    </div>`;
  }).join('');
  return rows + `<div class="ri-calc-total-row">
    <div class="ri-calc-total-label">Final score</div>
    <div class="ri-calc-total-val" style="color:${totalColor}">${totalScore} / 100</div>
  </div>`;
}

window.toggleCalcPanel = function() {
  const panel = document.getElementById('ri-calc-panel');
  const chev  = document.getElementById('ri-calc-chev');
  const open  = panel.classList.toggle('open');
  chev.classList.toggle('open', open);
  if(open) fetchAINarrative();
};

async function fetchAINarrative() {
  const el = document.getElementById('ri-calc-narrative');
  if(!el) return;

  // Use cache if available
  if(AI_NARRATIVE_CACHE[ticker]) {
    el.innerHTML = AI_NARRATIVE_CACHE[ticker];
    return;
  }

  // Show loading state
  el.innerHTML = `<div class="ri-calc-narrative-loading"><span style="font-size:.7rem">⟳</span> Generating company overview…</div>`;

  const D     = RISK_DATA[ticker] || RISK_DATA['DBS'];
  const score = calcScore(D.signals);
  const level = calcLevel(score);

  // Build signal summary for the prompt
  const highSigs = D.signals.filter(s=>s.sev==='high').map(s=>s.title);
  const medSigs  = D.signals.filter(s=>s.sev==='med').map(s=>s.title);
  const catBreakdown = ['E','S','G','D'].map(k=>{
    const pts = D.signals.filter(s=>s.cat===k).map(s=>SEV_PTS[s.sev]||0);
    const avg = pts.length ? Math.round(pts.reduce((a,b)=>a+b,0)/pts.length) : 0;
    return `${CAT_NAMES[k]}: ${avg}/100 (${pts.length} signal${pts.length!==1?'s':''})`;
  }).join(', ');

  const prompt = `You are an ESG risk analyst. Write a 3-sentence plain-English summary explaining why ${D.name} (${D.ticker}, ${D.sector}) has received a risk score of ${score}/100 (${level} risk).

The score is calculated from these signals:
- High severity: ${highSigs.length ? highSigs.join(', ') : 'none'}
- Medium severity: ${medSigs.length ? medSigs.join(', ') : 'none'}
- Category scores: ${catBreakdown}

Your summary should:
1. Briefly describe what ${D.name} is and what it does (1 sentence)
2. Explain what the main signals driving the risk score are in plain language (1 sentence)
3. Say what this means for an investor considering this company right now (1 sentence)

Write in plain English. No bullet points. No headers. No markdown. Just 3 clear sentences.`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({
        model:'claude-sonnet-4-20250514',
        max_tokens:300,
        messages:[{ role:'user', content:prompt }]
      })
    });
    const data = await res.json();
    const text = data.content?.filter(b=>b.type==='text').map(b=>b.text).join('').trim();
    if(text) {
      AI_NARRATIVE_CACHE[ticker] = text;
      el.textContent = text;
    } else {
      throw new Error('no content');
    }
  } catch(err) {
    // Fallback narrative if API fails
    const fallbacks = {
      DBS:  'DBS Group is Singapore\'s largest bank, providing financial services across ASEAN. Its risk score reflects emerging concerns around AI model governance and board independence, both areas not yet captured in traditional ESG ratings. Investors should monitor regulatory developments around AI deployment and the upcoming AGM for board composition changes.',
      GENT: 'Genting Berhad is a Malaysian conglomerate operating casinos, resorts, and plantations across Southeast Asia and the US. Its elevated risk score is primarily driven by an active Securities Commission investigation, a dual CEO/Chairman structure, and an RM12m AML fine — all governance events detected in real time that traditional ESG ratings have not yet reflected. Investors should consider reducing exposure until the regulatory situation resolves.',
      GRAB: 'Grab Holdings is Southeast Asia\'s leading super-app, offering ride-hailing, food delivery, and digital financial services across six ASEAN markets. Its moderate risk score reflects emerging regulatory scrutiny of its AI-powered pricing algorithm and potential labour reclassification obligations for gig workers. Investors should watch for regulatory outcomes from the CCCS pricing investigation and ILO guideline adoption across ASEAN.',
    };
    const fallback = fallbacks[ticker] || `${D.name} has a risk score of ${score}/100 based on ${D.signals.length} detected signals across ESG and AI/Digital categories.`;
    AI_NARRATIVE_CACHE[ticker] = fallback;
    el.textContent = fallback;
  }
}

// ════════════════════════════════════════════════════════════
// SECTION 2: BASELINE
// ════════════════════════════════════════════════════════════
function renderBaseline(D, score, level, catScores) {
  // Signal count bars
  const cats = { E:0, S:0, G:0, D:0 };
  D.signals.forEach(s=>{ if(cats[s.cat]!==undefined) cats[s.cat]++; });
  const maxCount = Math.max(...Object.values(cats),1);
  document.getElementById('ri-cat-bars').innerHTML = D.categories.map(c=>`
    <div class="ri-cat-bar-row">
      <div class="ri-cat-bar-label">${c.label}</div>
      <div class="ri-cat-bar-track"><div class="ri-cat-bar-fill" style="width:${Math.round((cats[c.key]/maxCount)*100)}%;background:${c.color}"></div></div>
      <div class="ri-cat-bar-val" style="color:${c.color}">${cats[c.key]}</div>
    </div>`).join('');

  // Category severity breakdown (from formula)
  const catSevMap = {};
  catScores.forEach(c=>{ catSevMap[c.key]=c; });
  document.getElementById('ri-sev-breakdown').innerHTML = D.categories.map(c=>{
    const cs = catSevMap[c.key]||{avg:0,level:'Low'};
    const lvlStyle = cs.level==='High'?'background:rgba(232,64,64,.12);color:#e84040;border:1px solid rgba(232,64,64,.35)':cs.level==='Med'?'background:rgba(240,160,32,.1);color:#f0a020;border:1px solid rgba(240,160,32,.4)':'background:rgba(0,200,150,.1);color:#00c896;border:1px solid rgba(0,200,150,.35)';
    return `<div class="ri-sev-row">
      <div class="ri-sev-cat">${c.label}</div>
      <div class="fb-track"><div class="fb-fill" style="width:${cs.avg}%;background:${c.color}"></div></div>
      <span class="ri-sev-badge" style="${lvlStyle}">${cs.level}</span>
    </div>`;
  }).join('');

  // Radar chart
  const radarEl = document.getElementById('ri-radar');
  if(radarEl) {
    if(_radarChart) { _radarChart.destroy(); _radarChart=null; }
    const scores = D.categories.map(c=>catSevMap[c.key]?.avg||0);
    const labels = D.categories.map(c=>c.label);
    const sc = LEVEL_COLOR(level);
    _radarChart = new Chart(radarEl, {
      type:'radar',
      data:{ labels, datasets:[{ label:D.name, data:scores, backgroundColor:sc+'22', borderColor:sc, borderWidth:1.5, pointBackgroundColor:sc, pointRadius:3 }] },
      options:{
        responsive:true, maintainAspectRatio:false,
        plugins:{ legend:{display:false} },
        scales:{ r:{ min:0, max:100, ticks:{ stepSize:25, color:'#5a6080', font:{size:9,family:'JetBrains Mono'}, backdropColor:'transparent' }, grid:{ color:'rgba(139,164,192,.15)' }, angleLines:{ color:'rgba(139,164,192,.15)' }, pointLabels:{ color:'#8ba4c0', font:{size:10,family:'JetBrains Mono'} } }}
      }
    });
  }
  document.getElementById('ri-radar-legend').innerHTML = D.categories.map(c=>`
    <div class="ri-radar-legend-item">
      <div class="ri-radar-legend-dot" style="background:${c.color}"></div>
      ${c.label}: ${catSevMap[c.key]?.avg||0}
    </div>`).join('');
}

// ════════════════════════════════════════════════════════════
// SECTION 3: SIGNALS (no alert buttons — watch is company-level)
// ════════════════════════════════════════════════════════════
let _signalFilter = 'All';

function renderSignals(D) {
  _signalFilter = 'All';
  const total = D.signals.length;
  document.getElementById('ri-signals-count-label').textContent =
    `${total} signal${total!==1?'s':''} detected`;

  const filters = ['All','High','Medium','Low','Environmental','Social','Governance','AI / Digital'];
  document.getElementById('ri-signals-toolbar').innerHTML = filters.map(f=>`
    <button class="ri-filter-pill${f==='All'?' active':''}"
      style="${f==='All'?'background:var(--gold);border-color:var(--gold);color:var(--ink);':''}"
      onclick="applySignalFilter('${f}',this)">${f}</button>`).join('');

  buildSignalList(D);
}

function buildSignalList(D) {
  const sevOrder = { high:0, med:1, low:2 };
  let signals = D.signals.slice().sort((a,b)=>(sevOrder[a.sev]||2)-(sevOrder[b.sev]||2));

  if(_signalFilter !== 'All') {
    const f = _signalFilter.toLowerCase().replace(' / ',' ');
    if(['high','medium','low'].includes(f)) {
      const sevMap = { high:'high', medium:'med', low:'low' };
      signals = signals.filter(s=>s.sev===sevMap[f]);
    } else {
      const catKey = Object.keys(CAT_NAMES).find(k=>CAT_NAMES[k].toLowerCase()===f)||null;
      if(catKey) signals = signals.filter(s=>s.cat===catKey);
    }
  }

  document.getElementById('ri-signals-list').innerHTML = signals.length
    ? signals.map(s => {
        const catColor = CAT_COLORS[s.cat]||'#8ba4c0';
        const srcHTML = s.sourceUrl
          ? `<a href="${s.sourceUrl}" target="_blank" class="ri-signal-src">${s.source} ↗</a>`
          : `<span class="ri-signal-src-plain">${s.source}</span>`;
        return `<div class="ri-signal-item">
          <div class="ri-signal-dot ${s.sev}"></div>
          <div class="ri-signal-body">
            <div class="ri-signal-title">${s.title}</div>
            <div class="ri-signal-desc">${s.desc}</div>
            <div class="ri-signal-footer">
              <span class="ri-signal-cat-badge" style="background:${catColor}22;color:${catColor};border:1px solid ${catColor}44">${CAT_NAMES[s.cat]||s.cat}</span>
              <span class="ri-signal-age">${s.age}</span>
              ${srcHTML}
            </div>
          </div>
          <div class="ri-signal-right">
            <span class="ri-sev-pill ${s.sev}">${s.sev==='med'?'Medium':s.sev.charAt(0).toUpperCase()+s.sev.slice(1)}</span>
          </div>
        </div>`;
      }).join('')
    : `<div style="padding:1.5rem 0;text-align:center;font-size:.78rem;color:var(--steel);">No signals match this filter.</div>`;
}

window.applySignalFilter = function(f, btn) {
  _signalFilter = f;
  document.querySelectorAll('.ri-filter-pill').forEach(b=>{ b.classList.remove('active'); b.style.background=b.style.borderColor=b.style.color=''; });
  btn.classList.add('active');
  btn.style.background='var(--gold)'; btn.style.borderColor='var(--gold)'; btn.style.color='var(--ink)';
  buildSignalList(RISK_DATA[ticker]||RISK_DATA['DBS']);
};

// ════════════════════════════════════════════════════════════
// SECTION 4: TRAJECTORY
// ════════════════════════════════════════════════════════════
function renderTrajectory(D, score, level) {
  const col   = LEVEL_COLOR(level);
  const delta = D.trendData[D.trendData.length-1] - D.trendData[0];
  const dir   = delta>0?'↑':'↓';
  const dirColor = delta>0?'#e84040':'#00c896';

  document.getElementById('ri-traj-label').innerHTML =
    `8-week risk score history &nbsp;·&nbsp; <span style="color:${dirColor};font-weight:600">${dir} ${Math.abs(delta)} points</span> from start to now`;

  const trendEl = document.getElementById('ri-trend');
  if(trendEl) {
    if(_trendChart) { _trendChart.destroy(); _trendChart=null; }
    const weeks = ['8w ago','7w ago','6w ago','5w ago','4w ago','3w ago','2w ago','Now'];
    _trendChart = new Chart(trendEl, {
      type:'line',
      data:{ labels:weeks, datasets:[{ label:'Risk score', data:D.trendData, borderColor:col, backgroundColor:col+'18', borderWidth:2, pointBackgroundColor:col, pointRadius:4, pointHoverRadius:6, fill:true, tension:0.35 }] },
      options:{
        responsive:true, maintainAspectRatio:false,
        plugins:{
          legend:{ display:false },
          tooltip:{
            callbacks:{
              label: ctx=>`  Score: ${ctx.parsed.y}`,
              afterLabel: ctx=>{ const i=ctx.dataIndex; if(!i) return ''; const diff=D.trendData[i]-D.trendData[i-1]; return diff===0?'':(diff>0?`  ↑ +${diff} from prior week`:`  ↓ ${diff} from prior week`); }
            },
            backgroundColor:'#111827', titleColor:'#f4f6f9', bodyColor:'#8ba4c0',
            borderColor:'rgba(201,168,76,.3)', borderWidth:1,
          }
        },
        scales:{
          x:{ ticks:{ color:'#5a6080', font:{size:9,family:'JetBrains Mono'} }, grid:{ color:'rgba(139,164,192,.08)' } },
          y:{ min:0, max:100, ticks:{ stepSize:25, color:'#5a6080', font:{size:9,family:'JetBrains Mono'} }, grid:{ color:'rgba(139,164,192,.08)' } }
        }
      }
    });
  }
}

// ════════════════════════════════════════════════════════════
// SECTION 5: EXPLANATIONS
// ════════════════════════════════════════════════════════════
function renderExplanations(D) {
  document.getElementById('ri-explanations').innerHTML = D.explanations.map((e,i)=>{
    const confClass = e.confidence==='High'?'hi':e.confidence==='Medium'?'md':'sp';
    return `<div class="ri-explain-item">
      <div class="ri-explain-header" onclick="toggleExplain(${i})">
        <span class="ri-explain-cat" style="background:${e.catColor}22;color:${e.catColor};border:1px solid ${e.catColor}44">${e.cat}</span>
        <span class="ri-explain-title">${e.title}</span>
        <span class="ri-explain-conf ${confClass}">${e.confidence} confidence</span>
        <span class="ri-explain-chev" id="chev-${i}">▼</span>
      </div>
      <div class="ri-explain-updated">${e.updated}</div>
      <div class="ri-explain-body" id="explain-${i}">
        <div class="ri-explain-text">${e.body}</div>
        <div class="ri-explain-why">💡 Why this matters to investors: ${e.why}</div>
      </div>
    </div>`;
  }).join('');
}

window.toggleExplain = function(i) {
  const body = document.getElementById(`explain-${i}`);
  const chev = document.getElementById(`chev-${i}`);
  const open = body.classList.toggle('open');
  chev.classList.toggle('open', open);
};

// ════════════════════════════════════════════════════════════
// SECTION 6: ACTIONS
// ════════════════════════════════════════════════════════════
function renderActions(D) {
  const prioOrder = {'High priority':0,'Medium priority':1,'Low priority':2};
  const sorted = [...D.actions].sort((a,b)=>(prioOrder[a.priority]||0)-(prioOrder[b.priority]||0));
  document.getElementById('ri-actions').innerHTML = sorted.map(a => {
    const state = RI_ACTION_STATE[a.id]||{status:'Pending',note:''};
    const statusClass = state.status.toLowerCase().replace(' ','');
    return `<div class="ri-action-item" style="background:${a.bg};border-color:${a.border}">
      <div class="ri-action-top">
        <span class="ri-action-verb" style="${a.verbStyle}">${a.verb}</span>
        <span class="ri-action-priority">${a.priority}</span>
        <span class="ri-action-due">📅 ${a.due}</span>
      </div>
      <div class="ri-action-title">${a.title}</div>
      <div class="ri-action-desc">${a.desc}</div>
      <div class="ri-action-footer">
        <button class="ri-status-btn ${statusClass}" id="status-${a.id}" onclick="cycleStatus('${a.id}',this)">${state.status}</button>
        <textarea class="ri-action-note" id="note-${a.id}" placeholder="Add a note…" oninput="saveNote('${a.id}',this)">${state.note}</textarea>
      </div>
    </div>`;
  }).join('');
}

window.cycleStatus = function(id, btn) {
  const statuses = ['Pending','In Review','Acted','Dismissed'];
  const state = RI_ACTION_STATE[id]||{status:'Pending',note:''};
  const next = statuses[(statuses.indexOf(state.status)+1)%statuses.length];
  RI_ACTION_STATE[id] = {...state, status:next};
  btn.textContent = next;
  btn.className = 'ri-status-btn '+next.toLowerCase().replace(' ','');
};

window.saveNote = function(id, ta) {
  RI_ACTION_STATE[id] = {...(RI_ACTION_STATE[id]||{status:'Pending'}), note:ta.value};
  ta.style.height = 'auto';
  ta.style.height = Math.max(28, ta.scrollHeight)+'px';
};

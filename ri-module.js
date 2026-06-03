/*
  ╔══════════════════════════════════════════════════════╗
  ║  ri-module.js — Risk Intelligence Data & Logic       ║
  ║  Author : Moses Ng  ·  IT3852 BIP AY2026 S1         ║
  ║                                                      ║
  ║  WHAT THIS FILE IS:                                  ║
  ║  All JavaScript for the Risk Intelligence module:    ║
  ║  data objects, render function, scan animation,      ║
  ║  filter/alert interactivity, and showPanel patch.    ║
  ║                                                      ║
  ║  WHERE IT LIVES IN detail2.html:                     ║
  ║  Lines 1386–1991, inside the <script> block.         ║
  ║  Runs after the page has loaded.                     ║
  ║                                                      ║
  ║  DATA OBJECTS:                                       ║
  ║  RISK_INTEL           — signals, severity, actions   ║
  ║  RISK_INTEL_TIMELINE  — chronological signal feed    ║
  ║  RISK_INTEL_GAP       — vs traditional rating data   ║
  ║  RISK_INTEL_SOURCES   — source label → URL map       ║
  ║                                                      ║
  ║  KEY FUNCTIONS:                                      ║
  ║  renderRiskIntel()    — populates all 9 UI sections  ║
  ║  runScanAnimation()   — progress bar on tab click    ║
  ║  riSetFilter()        — classifier category filter   ║
  ║  riToggleAlert()      — alert toggle on signal cards ║
  ║  showPanel (patched)  — triggers scan on ri tab      ║
  ║                                                      ║
  ║  COMPANIES SUPPORTED:  DBS · GENT · GRAB             ║
  ║  (ticker variable is set by detail.js sidebar logic) ║
  ╚══════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════
//  EMERGING ESG RISK INTELLIGENCE MODULE  — Moses Ng
//  Hypothesis 1: AI can detect & classify emerging ESG risk
//  signals that traditional ESG frameworks miss.
//
//  5 IT Features implemented:
//  1. Risk Scanner      — scans news, reports, regulatory data
//  2. Risk Classifier   — E / S / G / AI-Digital categories
//  3. Risk Severity Score — Low / Medium / High per signal
//  4. AI Explanation Panel — why each signal matters
//  5. Investor Action Recommendation — monitor/investigate etc.
// ═══════════════════════════════════════════════════════════

// ─── Risk Intelligence CSS ───────────────────────────────
const riStyle = document.createElement('style');
riStyle.textContent = `
/* Risk Intel tab accent */
.risk-intel-tab { color: var(--gold) !important; position: relative; }
.risk-intel-tab.active { border-bottom-color: var(--gold) !important; color: var(--gold-light) !important; }
.risk-intel-tab::before { content:''; position:absolute; top:6px; right:6px; width:6px; height:6px; border-radius:50%; background:var(--crimson); animation:ripulse 1.8s infinite; }
@keyframes ripulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.5)} }

/* Scan overlay */
.ri-scan-progress-bar { height:3px; background:var(--glass); border-radius:2px; overflow:hidden; width:100%; max-width:320px; margin:0 auto; }
.ri-scan-progress-fill { height:100%; background:var(--gold); width:0%; transition:width .3s ease; border-radius:2px; }

/* Banner */
.ri-banner { display:flex; align-items:center; justify-content:space-between; background:linear-gradient(135deg,var(--ink-3),var(--ink-2)); border:1px solid var(--border-gold); border-radius:16px; padding:1rem 1.5rem; margin-bottom:1.2rem; }
.ri-banner-title { font-family:var(--font-display); font-size:1rem; font-weight:700; color:var(--white); margin-bottom:.2rem; }
.ri-banner-sub { font-size:.68rem; color:var(--steel); font-weight:300; }
.ri-banner-right { display:flex; align-items:center; gap:.5rem; flex-shrink:0; }
.ri-live-dot { width:8px; height:8px; border-radius:50%; background:var(--emerald); animation:ripulse 1.8s infinite; }
.ri-live-label { font-family:var(--font-mono); font-size:.65rem; color:var(--emerald); font-weight:600; letter-spacing:.1em; }
.ri-scan-time { font-family:var(--font-mono); font-size:.6rem; color:var(--steel); }

/* Scanner summary */
.ri-scanner-summary { display:grid; grid-template-columns:repeat(3,1fr); gap:.8rem; }
.ri-scan-stat { text-align:center; padding:.8rem; background:var(--glass); border:1px solid var(--border); border-radius:10px; }
.ri-scan-stat-val { font-family:var(--font-display); font-size:1.6rem; font-weight:700; line-height:1; }
.ri-scan-stat-label { font-size:.62rem; text-transform:uppercase; letter-spacing:.1em; color:var(--steel); margin-top:.25rem; }

/* Severity display */
.ri-severity-display { text-align:center; padding:.6rem 0; }
.ri-sev-score { font-family:var(--font-display); font-size:3rem; font-weight:900; line-height:1; letter-spacing:-.02em; }
.ri-sev-label { font-family:var(--font-mono); font-size:.68rem; letter-spacing:.12em; text-transform:uppercase; margin-top:.3rem; font-weight:600; }
.ri-sev-desc { font-size:.75rem; color:var(--steel); margin-top:.4rem; font-weight:300; }

/* Severity breakdown bars */
.ri-sev-row { display:grid; grid-template-columns:90px 1fr 60px; gap:8px; align-items:center; padding:6px 0; border-bottom:1px solid var(--border); }
.ri-sev-row:last-child { border-bottom:none; }
.ri-sev-cat { font-size:.72rem; color:var(--white-2); }
.ri-sev-badge { font-family:var(--font-mono); font-size:.6rem; font-weight:600; padding:2px 8px; border-radius:3px; text-align:center; letter-spacing:.06em; }

/* Rating Gap card */
.ri-gap-grid { display:grid; grid-template-columns:1fr auto 1fr; gap:1rem; align-items:center; }
.ri-gap-side { padding:1rem; border-radius:12px; }
.ri-gap-side-label { font-family:var(--font-mono); font-size:.6rem; text-transform:uppercase; letter-spacing:.1em; margin-bottom:.4rem; }
.ri-gap-side-name { font-size:.75rem; font-weight:600; color:var(--white); margin-bottom:.5rem; }
.ri-gap-side-score { font-family:var(--font-display); font-size:1.8rem; font-weight:700; line-height:1; }
.ri-gap-side-sub { font-size:.68rem; margin-top:.25rem; font-weight:300; }
.ri-gap-arrow { text-align:center; }
.ri-gap-arrow-line { font-size:1.4rem; color:var(--crimson); }
.ri-gap-arrow-label { font-family:var(--font-mono); font-size:.58rem; color:var(--steel); display:block; margin-top:.2rem; }
.ri-gap-lead { margin-top:1rem; padding:.75rem 1rem; background:var(--crimson-dim); border:1px solid var(--red-border); border-radius:10px; font-size:.75rem; color:var(--white-2); line-height:1.5; }
.ri-gap-lead strong { color:var(--crimson); }

/* Filter bar */
.ri-filter-bar { display:flex; gap:.4rem; margin-top:.5rem; flex-wrap:wrap; }
.ri-filter-btn { font-family:var(--font-mono); font-size:.6rem; font-weight:600; letter-spacing:.08em; text-transform:uppercase; padding:3px 10px; border-radius:4px; cursor:pointer; border:1px solid var(--border); background:var(--glass); color:var(--steel); transition:all .15s; }
.ri-filter-btn:hover { color:var(--white); border-color:var(--white-2); }
.ri-filter-btn.active-filter { color:var(--ink); }

/* Classifier grid */
.ri-classifier-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1rem; margin-top:.8rem; }
.ri-cat-col { }
.ri-cat-header { display:flex; align-items:center; gap:.4rem; margin-bottom:.7rem; padding-bottom:.5rem; border-bottom:2px solid; }
.ri-cat-icon { font-size:.85rem; }
.ri-cat-name { font-family:var(--font-mono); font-size:.65rem; font-weight:600; letter-spacing:.1em; text-transform:uppercase; }
.ri-cat-count { font-family:var(--font-mono); font-size:.6rem; margin-left:auto; opacity:.6; }
.ri-signal-card { padding:.75rem .9rem; border-radius:8px; border:1px solid; margin-bottom:.5rem; transition:opacity .2s; }
.ri-signal-card:last-child { margin-bottom:0; }
.ri-signal-card.hidden-signal { display:none; }
.ri-signal-title { font-size:.78rem; font-weight:600; color:var(--white); margin-bottom:.3rem; }
.ri-signal-desc { font-size:.72rem; color:var(--white-2); line-height:1.5; font-weight:300; }
.ri-signal-meta { display:flex; align-items:center; justify-content:space-between; margin-top:.5rem; flex-wrap:wrap; gap:.3rem; }
.ri-signal-source-link { font-family:var(--font-mono); font-size:.6rem; color:var(--gold); text-decoration:none; border-bottom:1px dotted var(--border-gold); transition:color .15s; }
.ri-signal-source-link:hover { color:var(--gold-light); }
.ri-signal-source-plain { font-family:var(--font-mono); font-size:.6rem; color:var(--steel); }
.ri-signal-right { display:flex; align-items:center; gap:.5rem; }
.ri-signal-age { font-family:var(--font-mono); font-size:.6rem; color:var(--steel); }
.ri-alert-btn { font-family:var(--font-mono); font-size:.56rem; padding:2px 8px; border-radius:4px; border:1px solid var(--border); background:transparent; color:var(--steel); cursor:pointer; transition:all .15s; white-space:nowrap; }
.ri-alert-btn:hover { border-color:var(--gold); color:var(--gold); }
.ri-alert-btn.alerted { background:var(--gold-dim); border-color:var(--border-gold); color:var(--gold-light); }

/* Signal Timeline */
.ri-tl-item { display:grid; grid-template-columns:110px 8px 1fr; gap:.7rem; align-items:flex-start; padding:.7rem 0; border-bottom:1px solid var(--border); }
.ri-tl-item:last-child { border-bottom:none; }
.ri-tl-datetime { font-family:var(--font-mono); font-size:.62rem; color:var(--steel); padding-top:2px; line-height:1.45; }
.ri-tl-dot { width:8px; height:8px; border-radius:50%; margin-top:4px; flex-shrink:0; }
.ri-tl-body { }
.ri-tl-title { font-size:.78rem; font-weight:600; color:var(--white); margin-bottom:.2rem; }
.ri-tl-desc { font-size:.72rem; color:var(--white-2); line-height:1.5; font-weight:300; }
.ri-tl-badges { display:flex; gap:.4rem; margin-top:.35rem; flex-wrap:wrap; align-items:center; }
.ri-tl-cat-badge { font-family:var(--font-mono); font-size:.58rem; padding:2px 7px; border-radius:3px; font-weight:600; }
.ri-tl-vs { font-size:.65rem; color:var(--steel); font-style:italic; }

/* Explanation feed */
.ri-explain-item { padding:.85rem 1rem; border-radius:10px; border:1px solid var(--border); margin-bottom:.7rem; background:var(--glass); }
.ri-explain-item:last-child { margin-bottom:0; }
.ri-explain-header { display:flex; align-items:center; gap:.5rem; margin-bottom:.4rem; }
.ri-explain-cat-badge { font-family:var(--font-mono); font-size:.58rem; padding:2px 7px; border-radius:3px; font-weight:600; letter-spacing:.06em; text-transform:uppercase; }
.ri-explain-title { font-size:.78rem; font-weight:600; color:var(--white); }
.ri-explain-body { font-size:.74rem; color:var(--white-2); line-height:1.55; font-weight:300; }
.ri-explain-why { margin-top:.4rem; padding:.45rem .65rem; background:var(--gold-dim); border-left:2px solid var(--gold); font-size:.7rem; color:var(--white-2); font-style:italic; line-height:1.5; }

/* Action recommendations */
.ri-action-item { padding:.9rem 1rem; border-radius:10px; margin-bottom:.7rem; border:1px solid; }
.ri-action-item:last-child { margin-bottom:0; }
.ri-action-header { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:.4rem; }
.ri-action-verb { font-family:var(--font-mono); font-size:.62rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase; padding:3px 10px; border-radius:4px; }
.ri-action-priority { font-family:var(--font-mono); font-size:.58rem; opacity:.7; }
.ri-action-title { font-size:.78rem; font-weight:600; color:var(--white); margin-bottom:.3rem; }
.ri-action-desc { font-size:.72rem; color:var(--white-2); line-height:1.5; font-weight:300; }

@media(max-width:900px){
  .ri-classifier-grid { grid-template-columns:repeat(2,1fr); }
  .ri-gap-grid { grid-template-columns:1fr; }
  .ri-gap-arrow { display:none; }
}
@media(max-width:600px){
  .ri-classifier-grid { grid-template-columns:1fr; }
}
`;
document.head.appendChild(riStyle);

// ─── Risk Intelligence Data per company ─────────────────
const RISK_INTEL = {
  DBS: {
    scanStats: { total: 7, high: 0, medium: 2, low: 5 },
    sources: [
      { label: 'News & Media', count: 3, pct: 43 },
      { label: 'Regulatory Filings', count: 2, pct: 29 },
      { label: 'ESG Reports', count: 2, pct: 28 },
    ],
    severityScore: 28,
    severityLevel: 'Low',
    severityDesc: 'No high-priority emerging risks detected. Minor watch items present.',
    severityByCategory: [
      { cat: 'Environmental', score: 22, level: 'Low', color: 'var(--emerald)' },
      { cat: 'Social', score: 18, level: 'Low', color: 'var(--emerald)' },
      { cat: 'Governance', score: 30, level: 'Low', color: 'var(--emerald)' },
      { cat: 'AI / Digital', score: 42, level: 'Med', color: 'var(--gold)' },
    ],
    classified: {
      E: [
        { title: 'Scope 3 Emissions Gap', desc: 'Financed emissions not fully disclosed for SME loan book. TCFD alignment partial.', source: 'TCFD Review', age: '3d ago', sev: 'med' },
        { title: 'Green Bond Use-of-Proceeds', desc: 'Third-party verification for $1.5B green bond pending. Greenwash risk: Low.', source: 'Sustainability Report', age: '1w ago', sev: 'low' },
      ],
      S: [
        { title: 'AI Bias in Credit Scoring', desc: 'Industry-wide concern: AI credit models may disadvantage underbanked segments. No DBS-specific finding yet.', source: 'MAS Consultation Paper', age: '5d ago', sev: 'low' },
      ],
      G: [
        { title: 'Board Tenure Concentration', desc: '3 of 12 board members have tenure >9 years. Proxy advisors flagging independence concerns.', source: 'Proxy Research', age: '2w ago', sev: 'med' },
      ],
      D: [
        { title: 'GenAI Operational Risk', desc: 'DBS\u2019s aggressive AI deployment (1,000+ AI models) creates novel model risk exposure not captured by MAS TRM guidelines.', source: 'MAS TRM Framework', age: '1d ago', sev: 'med' },
        { title: 'Cyber Resilience Stress Test', desc: 'MAS TBML testing expanded to include AI-driven fraud vectors. DBS participating in pilot programme.', source: 'MAS Announcement', age: '4d ago', sev: 'low' },
        { title: 'Data Sovereignty Risk', desc: 'Cross-border data flows for DigiBank India operations face tighter RBI data localisation requirements.', source: 'RBI Circular', age: '1w ago', sev: 'low' },
      ],
    },
    explanations: [
      { cat: 'AI / Digital', catColor: 'var(--gold)', title: 'GenAI Operational Risk is not in traditional ESG ratings', body: 'DBS operates 1,000+ AI models across its banking operations. Traditional ESG frameworks do not have a standardised metric for model risk governance or AI explainability. This is an emerging risk invisible to MSCI, Sustainalytics, or CDP scores.', why: 'This signal matters because AI model failures (bias, hallucination, fraud amplification) can create both regulatory liability and reputational damage — risks that will only grow as AI use expands.' },
      { cat: 'Governance', catColor: 'var(--amber)', title: 'Long board tenures may signal independence risk', body: 'Three board members exceeding 9-year tenure is above the CGSI recommended threshold for independence. While no specific conflict has emerged, this is a structural governance weakness that could slow response to emerging ESG challenges.', why: 'Boards with entrenched members tend to have weaker oversight of management — a leading indicator of governance deterioration before formal rating agencies reflect it.' },
      { cat: 'Environmental', catColor: 'var(--emerald)', title: 'Scope 3 financed emissions gap is pre-regulatory risk', body: 'DBS\u2019s SME loan book financed emissions are not fully disclosed. As MAS moves toward mandatory climate disclosures, this gap will need to be addressed — and could trigger negative rating adjustments.', why: 'Early action on Scope 3 disclosure reduces future regulatory compliance cost and reputational risk from peer comparison.' },
    ],
    actions: [
      { verb: 'Monitor', verbColor: 'bg:var(--emerald-dim);color:var(--emerald);border:var(--green-border)', priority: 'Low priority', title: 'Track GenAI governance disclosures', desc: 'Set alert for DBS annual report section on AI governance and model risk management. Compare against MAS FEAT framework compliance.', bg: 'var(--glass)', border: 'var(--border)' },
      { verb: 'Monitor', verbColor: 'bg:var(--gold-dim);color:var(--gold);border:var(--amber-border)', priority: 'Medium priority', title: 'Watch board composition changes at next AGM', desc: 'Review 2025 AGM board election outcomes. If long-tenured directors are re-elected without independence review, consider flagging governance score downward.', bg: 'var(--gold-dim)', border: 'var(--border-gold)' },
      { verb: 'Investigate', verbColor: 'bg:var(--gold-dim);color:var(--gold);border:var(--amber-border)', priority: 'Medium priority', title: 'Verify Scope 3 financed emissions disclosure timeline', desc: 'Review DBS Sustainability Report 2025 for SME loan book financed emissions. Cross-reference against MAS climate disclosure requirements.', bg: 'var(--glass)', border: 'var(--border)' },
    ],
  },

  GENT: {
    scanStats: { total: 14, high: 5, medium: 6, low: 3 },
    sources: [
      { label: 'News & Media', count: 7, pct: 50 },
      { label: 'Regulatory Filings', count: 5, pct: 36 },
      { label: 'ESG Reports', count: 2, pct: 14 },
    ],
    severityScore: 81,
    severityLevel: 'High',
    severityDesc: 'Multiple high-severity emerging signals detected. Immediate investor attention required.',
    severityByCategory: [
      { cat: 'Environmental', score: 55, level: 'Med', color: 'var(--gold)' },
      { cat: 'Social', score: 48, level: 'Med', color: 'var(--gold)' },
      { cat: 'Governance', score: 92, level: 'High', color: 'var(--crimson)' },
      { cat: 'AI / Digital', score: 38, level: 'Low', color: 'var(--emerald)' },
    ],
    classified: {
      E: [
        { title: 'Unverified Carbon Targets', desc: 'Genting\u2019s 20% renewables by 2030 pledge has no third-party verification or interim milestone disclosure.', source: 'AI Greenwash Scan', age: '2d ago', sev: 'med' },
        { title: 'Casino Energy Intensity', desc: 'Resort operations in MY and US are high energy consumers. No measurable reduction plan published.', source: 'Sustainability Report', age: '2w ago', sev: 'med' },
      ],
      S: [
        { title: 'Problem Gambling Exposure', desc: 'MAS/MOH research links casino proximity to household debt. No Genting-specific CSR programme on responsible gambling disclosed.', source: 'MOH Study 2024', age: '1w ago', sev: 'med' },
        { title: 'AML Workforce Gaps', desc: 'RM12m AML fine reflects systemic compliance culture gaps. Staff training adequacy not publicly disclosed.', source: 'Bank Negara Filing', age: '3w ago', sev: 'high' },
      ],
      G: [
        { title: 'Securities Commission Investigation', desc: 'Active SC Malaysia governance review following two independent director resignations. Outcome unknown.', source: 'SC Malaysia Filing', age: '1d ago', sev: 'high' },
        { title: 'Dual CEO/Chairman Role', desc: 'KT Lim\u2019s unchecked authority flagged by ISS and Glass Lewis as non-compliant with best practice governance.', source: 'Proxy Research', age: '1w ago', sev: 'high' },
        { title: 'Related-Party Transaction Risk', desc: 'Ongoing shareholder lawsuit alleges below-market property sale. No independent board review disclosed.', source: 'Bursa Filing', age: '5d ago', sev: 'high' },
      ],
      D: [
        { title: 'Digital Casino Regulatory Gap', desc: 'Growth of online gaming via Resorts World platforms creates regulatory arbitrage risk across jurisdictions.', source: 'Gaming Regulatory News', age: '3d ago', sev: 'low' },
        { title: 'Facial Recognition at Casinos', desc: 'Use of biometric surveillance at MY resorts raises PDPA compliance risk. Policy not publicly disclosed.', source: 'PDPA Watch', age: '2w ago', sev: 'med' },
      ],
    },
    explanations: [
      { cat: 'Governance', catColor: 'var(--crimson)', title: 'SC Malaysia investigation is a pre-downgrade signal', body: 'Formal regulatory investigations by the Securities Commission almost always precede ESG governance score downgrades by rating agencies like MSCI and Sustainalytics. Traditional ratings update quarterly — this signal appeared today.', why: 'Investors who act on this signal now can reduce exposure before the formal rating downgrade reflects it — a 6-8 week window that traditional ESG scores miss entirely.' },
      { cat: 'Social', catColor: 'var(--gold)', title: 'AML fine reflects systemic workforce culture gap', body: 'The RM12m AML fine is not just a one-time penalty — it signals inadequate compliance culture and staff training. Traditional ESG frameworks often treat fines as single data points rather than indicators of systemic risk.', why: 'Recurring compliance failures in regulated industries are strongly correlated with future governance deterioration and regulatory sanctions.' },
      { cat: 'Governance', catColor: 'var(--crimson)', title: 'Dual CEO/Chairman role concentrates governance failure risk', body: 'When the same person controls both executive decision-making and board oversight, there is no structural check on related-party transactions or strategic decisions. This is a structural governance deficiency that persists beyond any single event.', why: 'Academic research shows companies with combined CEO/Chairman roles have 34% higher probability of governance incidents within 3 years (CGSI 2023 study).' },
    ],
    actions: [
      { verb: 'Reduce', verbColor: 'bg:var(--crimson-dim);color:var(--crimson);border:var(--red-border)', priority: 'High priority', title: 'Reduce exposure pending SC Malaysia investigation outcome', desc: 'Do not add to Genting position until the Securities Commission governance review concludes. Set re-entry target at governance score above 55 and board composition normalised.', bg: 'var(--crimson-dim)', border: 'var(--red-border)' },
      { verb: 'Investigate', verbColor: 'bg:var(--crimson-dim);color:var(--crimson);border:var(--red-border)', priority: 'High priority', title: 'Request independent board governance report', desc: 'Engage with investor relations team for timeline on independent governance review. If no response within 30 days, treat as confirmed governance risk signal.', bg: 'var(--glass)', border: 'var(--border)' },
      { verb: 'Compare w/ Peers', verbColor: 'bg:var(--gold-dim);color:var(--gold);border:var(--amber-border)', priority: 'Medium priority', title: 'Benchmark responsible gaming disclosures vs MBS, LVS', desc: 'Marina Bay Sands and Las Vegas Sands both publish responsible gaming KPIs. Genting\u2019s absence of equivalent disclosure is a peer disadvantage and a social ESG gap.', bg: 'var(--glass)', border: 'var(--border)' },
    ],
  },

  GRAB: {
    scanStats: { total: 9, high: 0, medium: 3, low: 6 },
    sources: [
      { label: 'News & Media', count: 4, pct: 44 },
      { label: 'Regulatory Filings', count: 3, pct: 33 },
      { label: 'ESG Reports', count: 2, pct: 23 },
    ],
    severityScore: 34,
    severityLevel: 'Low–Med',
    severityDesc: 'Mostly low-severity signals. Regulatory complexity is the primary watch area.',
    severityByCategory: [
      { cat: 'Environmental', score: 20, level: 'Low', color: 'var(--emerald)' },
      { cat: 'Social', score: 30, level: 'Low', color: 'var(--emerald)' },
      { cat: 'Governance', score: 45, level: 'Med', color: 'var(--gold)' },
      { cat: 'AI / Digital', score: 52, level: 'Med', color: 'var(--gold)' },
    ],
    classified: {
      E: [
        { title: 'EV Fleet Transition Credibility', desc: 'BYD partnership for 50% EV by 2030 lacks interim 2026/2028 milestones. Carbon neutrality 2035 not yet verified by SBTi.', source: 'AI Greenwash Scan', age: '2d ago', sev: 'low' },
        { title: 'Driver Motorbike Emissions', desc: 'GrabBike fleet (largest in SEA) is predominantly ICE. No transition roadmap for two-wheel segment published.', source: 'Sustainability Report', age: '1w ago', sev: 'low' },
      ],
      S: [
        { title: 'Gig Worker Welfare Gap', desc: 'New ILO guidelines on platform worker welfare create potential retroactive liability for Grab\u2019s independent contractor model in SG, MY, TH.', source: 'ILO Platform Economy Report', age: '3d ago', sev: 'med' },
        { title: 'Financial Inclusion Claim Verification', desc: 'GrabPay\u2019s financial inclusion narrative for the unbanked is not independently audited. Social impact metrics are self-reported.', source: 'Internal ESG Report', age: '2w ago', sev: 'low' },
      ],
      G: [
        { title: 'Dual-Class Share Structure', desc: 'Anthony Tan holds supervoting rights that limit minority shareholder influence. Not captured in most governance scores.', source: 'NASDAQ Filing', age: '1m ago', sev: 'med' },
        { title: 'CFO Transition Oversight Risk', desc: 'New CFO (2023) less than 2 years in role. Institutional knowledge gap in financial reporting oversight.', source: 'Annual Report', age: '1m ago', sev: 'low' },
      ],
      D: [
        { title: 'GrabMaps AI Accuracy Risk', desc: 'Proprietary mapping AI used for logistics optimisation. No third-party accuracy audit published — bias in routing could affect driver earnings equity.', source: 'Tech Review', age: '1w ago', sev: 'med' },
        { title: 'PDPA Multi-Jurisdiction Data Risk', desc: 'Operating across 6 ASEAN markets with diverging data laws creates compliance overhead. Vietnam\u2019s Decree 13 is most stringent.', source: 'Vietnam Decree 13', age: '1d ago', sev: 'low' },
        { title: 'AI Pricing Transparency', desc: 'Surge pricing algorithm opaque to regulators and consumers. Singapore CCCS monitoring for algorithmic collusion.', source: 'CCCS Watch', age: '5d ago', sev: 'med' },
      ],
    },
    explanations: [
      { cat: 'AI / Digital', catColor: 'var(--gold)', title: 'AI pricing algorithm is a novel regulatory risk', body: 'Grab\u2019s surge pricing model is powered by a proprietary AI algorithm. The Singapore Competition and Consumer Commission (CCCS) has opened a monitoring programme for algorithmic pricing — a risk category that does not yet exist in any mainstream ESG framework.', why: 'Early regulatory intervention in AI pricing could force algorithm disclosure or redesign, impacting Grab\u2019s revenue optimisation model — a risk that is invisible to traditional ESG scorers.' },
      { cat: 'Social', catColor: 'var(--emerald)', title: 'ILO gig worker guidelines could reshape labour classification', body: 'The ILO\u2019s 2025 Platform Economy guidelines push toward employee classification for platform workers. If Singapore, Malaysia, or Thailand adopt these standards, Grab\u2019s cost structure would change materially.', why: 'Labour reclassification risk is a systemic emerging risk for all gig economy platforms — not yet reflected in ESG social scores, which rely on self-reported contractor data.' },
      { cat: 'Governance', catColor: 'var(--gold)', title: 'Supervoting rights limit minority shareholder governance', body: 'Anthony Tan\u2019s dual-class shares give him effective veto power over all major decisions. Traditional governance scores penalise this, but don\u2019t capture the forward risk if his strategic direction diverges from ESG best practice.', why: 'In founder-led companies, supervoting rights mean ESG policy is ultimately one person\u2019s decision. Key-person governance risk is underweighted in standard frameworks.' },
    ],
    actions: [
      { verb: 'Monitor', verbColor: 'bg:var(--emerald-dim);color:var(--emerald);border:var(--green-border)', priority: 'Low priority', title: 'Track CCCS algorithmic pricing review progress', desc: 'Set alert for CCCS public statements on Grab pricing investigation. If formal proceedings open, treat as medium governance/social risk event.', bg: 'var(--glass)', border: 'var(--border)' },
      { verb: 'Investigate', verbColor: 'bg:var(--gold-dim);color:var(--gold);border:var(--amber-border)', priority: 'Medium priority', title: 'Verify SBTi submission for 2035 carbon neutrality', desc: 'Carbon neutrality claim credibility hinges on SBTi validation. Check Science Based Targets initiative database for Grab submission status. If not submitted, flag as greenwash risk.', bg: 'var(--gold-dim)', border: 'var(--border-gold)' },
      { verb: 'Monitor', verbColor: 'bg:var(--gold-dim);color:var(--gold);border:var(--amber-border)', priority: 'Medium priority', title: 'Watch ILO gig worker regulation adoption across ASEAN', desc: 'Track Singapore MOM and Malaysia MOHR responses to ILO platform economy guidelines. First policy signal expected H2 2025.', bg: 'var(--glass)', border: 'var(--border)' },
    ],
  },
};

// ─── Render Risk Intelligence Panel ─────────────────────
// ─── Risk Intelligence Data per company (with timeline + gap + sources + alert state) ─
const RI_ALERT_STATE = {}; // tracks which signals have alerts set

const RISK_INTEL_TIMELINE = {
  DBS: [
    { datetime:'30 May 2026\n09:42', title:'GenAI Operational Risk detected', desc:'MAS TRM framework updated to cover AI model governance. DBS\'s 1,000+ model deployment flagged as requiring formal risk disclosure — not yet in MSCI/Sustainalytics ratings.', cat:'AI/Digital', catColor:'var(--steel)', dotColor:'var(--gold)', vsTraditional:'Traditional ratings: not captured · Our signal: Medium · Gap: ~1 quarter ahead' },
    { datetime:'27 May 2026\n14:15', title:'Board tenure concentration flagged', desc:'Proxy research identified 3 of 12 board members exceeding 9-year tenure. ISS database not yet updated. CGSI framework threshold breach.', cat:'Governance', catColor:'var(--gold)', dotColor:'var(--gold)', vsTraditional:'Traditional ratings: B stable · Our signal: Watch · Gap: ~6 weeks ahead' },
    { datetime:'21 May 2026\n11:00', title:'Scope 3 financed emissions gap identified', desc:'TCFD review shows SME loan book financed emissions incomplete. MAS mandatory disclosure deadline Q3 2026 not yet reflected in ESG scores.', cat:'Environmental', catColor:'var(--emerald)', dotColor:'var(--emerald)', vsTraditional:'Traditional ratings: not yet flagged · Our signal: Low-Med · Gap: ~2 months ahead' },
    { datetime:'15 May 2026\n08:30', title:'AI credit scoring bias concern raised', desc:'MAS consultation paper on fair AI deployment in credit scoring published. Industry-wide watch — no DBS-specific finding yet.', cat:'Social', catColor:'var(--blue)', dotColor:'var(--blue)', vsTraditional:'Traditional ratings: no impact · Our signal: Low watch · Gap: emerging signal' },
  ],
  GENT: [
    { datetime:'30 May 2026\n09:01', title:'SC Malaysia governance investigation opened', desc:'Securities Commission Malaysia formally opened governance review following two independent director resignations. Formal filing detected in Bursa feed.', cat:'Governance', catColor:'var(--crimson)', dotColor:'var(--crimson)', vsTraditional:'Traditional ratings: last updated Mar 2026 (B−) · Our signal: HIGH · Gap: ~8 weeks ahead of downgrade' },
    { datetime:'28 May 2026\n16:44', title:'Related-party transaction lawsuit escalated', desc:'Minority shareholder court filing escalated to High Court. Not yet reflected in any ESG provider database as of today.', cat:'Governance', catColor:'var(--crimson)', dotColor:'var(--crimson)', vsTraditional:'Traditional ratings: not captured · Our signal: High · Gap: real-time advantage' },
    { datetime:'20 May 2026\n10:22', title:'AML fine precedent: systemic compliance gap', desc:'RM12m AML fine processed in Bank Negara filing. MSCI and Sustainalytics typically reflect fines after next quarterly update.', cat:'Social', catColor:'var(--gold)', dotColor:'var(--gold)', vsTraditional:'Traditional ratings: Q2 2026 update pending · Our signal: High · Gap: ~6 weeks ahead' },
    { datetime:'12 May 2026\n13:55', title:'NY Resorts World licence review flagged', desc:'NY State gaming commission added licence conditions referencing board composition. Not in any current ESG framework category.', cat:'Governance', catColor:'var(--crimson)', dotColor:'var(--crimson)', vsTraditional:'Traditional ratings: not captured · Our signal: High · Gap: novel risk category' },
  ],
  GRAB: [
    { datetime:'29 May 2026\n15:30', title:'Vietnam Decree 13 data localisation impact', desc:'Vietnam data localisation requirement tightened. Grab\'s cross-border data flows for GrabPay now require local processing — compliance overhead not in any ESG rating.', cat:'AI/Digital', catColor:'var(--steel)', dotColor:'var(--gold)', vsTraditional:'Traditional ratings: not a rated category · Our signal: Low · Gap: emerging regulatory risk' },
    { datetime:'25 May 2026\n09:10', title:'CCCS algorithmic pricing monitoring opened', desc:'Singapore Competition Commission formally confirmed monitoring of Grab\'s surge pricing algorithm. Not yet a formal investigation but a novel ESG risk signal.', cat:'AI/Digital', catColor:'var(--steel)', dotColor:'var(--gold)', vsTraditional:'Traditional ratings: not captured · Our signal: Medium · Gap: real-time advantage' },
    { datetime:'18 May 2026\n11:40', title:'ILO platform worker guidelines published', desc:'ILO released final Platform Economy guidelines recommending employee status for gig workers meeting certain thresholds. ASEAN governments reviewing.', cat:'Social', catColor:'var(--blue)', dotColor:'var(--blue)', vsTraditional:'Traditional ratings: not yet reflected · Our signal: Low-Med · Gap: ~1 quarter ahead' },
    { datetime:'10 May 2026\n08:00', title:'SBTi carbon neutrality submission pending', desc:'Grab\'s 2035 carbon neutrality target not found in SBTi database. Credibility gap flagged — MSCI environmental score may be overstated.', cat:'Environmental', catColor:'var(--emerald)', dotColor:'var(--emerald)', vsTraditional:'Traditional ratings: Environmental B · Our signal: Greenwash watch · Gap: ~2 months ahead' },
  ],
};

const RISK_INTEL_GAP = {
  DBS: {
    traditional: { name:'MSCI / Sustainalytics', rating:'AA (73)', status:'Stable', color:'var(--emerald)', lastUpdated:'Mar 2026' },
    ours: { rating:'Low-Med', score:28, status:'GenAI risk watch · Board tenure flag', color:'var(--gold)' },
    leadTime:'~6 weeks ahead',
    narrative:'DBS\'s traditional ESG ratings look healthy. Our scanner detected two emerging signals — GenAI operational risk and board tenure concentration — that will not appear in formal ratings until the next quarterly update. Investors relying only on MSCI/Sustainalytics are missing these today.',
  },
  GENT: {
    traditional: { name:'MSCI / Sustainalytics', rating:'B− (44)', status:'Under Review', color:'var(--gold)', lastUpdated:'Mar 2026' },
    ours: { rating:'HIGH RISK', score:81, status:'SC investigation · Board collapse · AML fine', color:'var(--crimson)' },
    leadTime:'~8 weeks ahead',
    narrative:'This is where the gap is most stark. Genting\'s traditional ESG rating was last updated in March 2026 and is already outdated. Our scanner detected the SC Malaysia governance investigation, the related-party lawsuit escalation, and the AML fine — all in real time, weeks before any formal downgrade will be issued.',
  },
  GRAB: {
    traditional: { name:'MSCI / Sustainalytics', rating:'BBB (68)', status:'Positive', color:'var(--emerald)', lastUpdated:'Apr 2026' },
    ours: { rating:'Low-Med', score:34, status:'CCCS watch · ILO labour risk · SBTi gap', color:'var(--gold)' },
    leadTime:'~1 quarter ahead',
    narrative:'Grab\'s traditional ratings are positive, but our scanner flagged three forward-looking risks: algorithmic pricing scrutiny, gig worker reclassification risk, and an unverified carbon claim. These are novel risk categories that no existing ESG framework currently scores — making our platform the only place to see them.',
  },
};

const RISK_INTEL_SOURCES = {
  DBS: {
    'MAS TRM Framework': 'https://www.mas.gov.sg/regulation/guidelines/technology-risk-management-guidelines',
    'TCFD Review': 'https://www.fsb-tcfd.org/',
    'Proxy Research': 'https://www.issgovernance.com/',
  },
  GENT: {
    'SC Malaysia Filing': 'https://www.sc.com.my/regulation/securities-commission-enforcement',
    'Bursa Filing': 'https://www.bursamalaysia.com/market_information/announcements',
    'Bank Negara Filing': 'https://www.bnm.gov.my/enforcement',
    'PDPA Watch': 'https://www.pdp.gov.my/',
    'Proxy Research': 'https://www.issgovernance.com/',
  },
  GRAB: {
    'Vietnam Decree 13': 'https://lawnet.vn/vbpluploads/vb/attachement/2024/04/NghiDinh13_2023.pdf',
    'CCCS Watch': 'https://www.cccs.gov.sg/',
    'ILO Platform Economy Report': 'https://www.ilo.org/topics/platform-economy',
    'MAS Consultation Paper': 'https://www.mas.gov.sg/publications/consultations',
  },
};

function renderRiskIntel() {
  const RI     = RISK_INTEL[ticker]             || RISK_INTEL['DBS'];
  const TL     = RISK_INTEL_TIMELINE[ticker]    || RISK_INTEL_TIMELINE['DBS'];
  const GAP    = RISK_INTEL_GAP[ticker]         || RISK_INTEL_GAP['DBS'];
  const SRCS   = RISK_INTEL_SOURCES[ticker]     || {};
  const now    = new Date();

  document.getElementById('ri-scan-time').textContent =
    'Last scan: ' + now.toLocaleTimeString('en-SG', { hour:'2-digit', minute:'2-digit' });

  // Severity helpers
  const sevColor = (lvl) => {
    if (lvl === 'High') return 'var(--crimson)';
    if (lvl === 'Med' || lvl === 'Low–Med' || lvl === 'Low-Med') return 'var(--gold)';
    return 'var(--emerald)';
  };
  const sevBadgeStyle = (lvl) => {
    if (lvl === 'High') return 'background:var(--crimson-dim);color:var(--crimson);border:1px solid var(--red-border)';
    if (lvl === 'Med' || lvl === 'Low–Med' || lvl === 'Low-Med') return 'background:var(--gold-dim);color:var(--gold);border:1px solid var(--border-gold)';
    return 'background:var(--emerald-dim);color:var(--emerald);border:1px solid var(--green-border)';
  };

  // ── Scanner stats
  const ss = RI.scanStats;
  document.getElementById('ri-scanner-summary').innerHTML = [
    { val:ss.total, label:'Signals Found',   col:'var(--white)' },
    { val:ss.high,  label:'High Severity',   col: ss.high > 0 ? 'var(--crimson)' : 'var(--emerald)' },
    { val:ss.medium,label:'Medium Severity', col:'var(--gold)' },
  ].map(s => `<div class="ri-scan-stat">
    <div class="ri-scan-stat-val" style="color:${s.col}">${s.val}</div>
    <div class="ri-scan-stat-label">${s.label}</div>
  </div>`).join('');

  // ── Source bars
  document.getElementById('ri-source-bars').innerHTML = RI.sources.map(s => `
    <div class="ri-sev-row">
      <div class="ri-sev-cat">${s.label}</div>
      <div class="fb-track"><div class="fb-fill" style="width:${s.pct}%;background:var(--steel);opacity:.5"></div></div>
      <div style="font-family:var(--font-mono);font-size:.62rem;color:var(--steel);text-align:right;">${s.count} signals</div>
    </div>`).join('');

  // ── Severity display
  document.getElementById('ri-severity-display').innerHTML = `
    <div class="ri-sev-score" style="color:${sevColor(RI.severityLevel)}">${RI.severityScore}</div>
    <div class="ri-sev-label" style="color:${sevColor(RI.severityLevel)}">${RI.severityLevel} Emerging Risk</div>
    <div class="ri-sev-desc">${RI.severityDesc}</div>`;

  // ── Severity by category
  document.getElementById('ri-severity-breakdown').innerHTML = RI.severityByCategory.map(s => `
    <div class="ri-sev-row">
      <div class="ri-sev-cat">${s.cat}</div>
      <div class="fb-track"><div class="fb-fill" style="width:${s.score}%;background:${s.color}"></div></div>
      <span class="ri-sev-badge" style="${sevBadgeStyle(s.level)}">${s.level}</span>
    </div>`).join('');

  // ── Rating Gap card (NEW)
  const G = GAP;
  document.getElementById('ri-gap-content').innerHTML = `
    <div class="ri-gap-grid">
      <div class="ri-gap-side" style="background:var(--glass);border:1px solid var(--border);">
        <div class="ri-gap-side-label" style="color:var(--steel);">Traditional Framework</div>
        <div class="ri-gap-side-name">${G.traditional.name}</div>
        <div class="ri-gap-side-score" style="color:${G.traditional.color}">${G.traditional.rating}</div>
        <div class="ri-gap-side-sub" style="color:var(--steel);">Status: ${G.traditional.status}<br>Last updated: ${G.traditional.lastUpdated}</div>
      </div>
      <div class="ri-gap-arrow">
        <div class="ri-gap-arrow-line">→</div>
        <span class="ri-gap-arrow-label">${G.leadTime}</span>
      </div>
      <div class="ri-gap-side" style="background:var(--gold-dim);border:1px solid var(--border-gold);">
        <div class="ri-gap-side-label" style="color:var(--gold);">ESG Momentum Engine · Today</div>
        <div class="ri-gap-side-name">Real-Time Signal Assessment</div>
        <div class="ri-gap-side-score" style="color:${sevColor(RI.severityLevel)}">${G.ours.rating}</div>
        <div class="ri-gap-side-sub" style="color:var(--steel);">${G.ours.status}</div>
      </div>
    </div>
    <div class="ri-gap-lead"><strong>Why this gap matters:</strong> ${G.narrative}</div>`;

  // ── Filter bar (NEW)
  const allCats = ['All','Environmental','Social','Governance','AI/Digital'];
  let activeFilter = 'All';
  document.getElementById('ri-filter-bar').innerHTML = allCats.map(c => `
    <button class="ri-filter-btn${c==='All'?' active-filter':''}"
      style="${c==='All'?'background:var(--gold);color:var(--ink);border-color:var(--gold);':''}"
      onclick="riSetFilter('${c}',this)">${c}</button>`).join('');

  // ── Classifier grid (with filter + alert buttons + linked sources)
  const catMeta = {
    E: { name:'Environmental', icon:'🌱', color:'var(--emerald)', filterKey:'Environmental' },
    S: { name:'Social',        icon:'🤝', color:'var(--blue)',    filterKey:'Social' },
    G: { name:'Governance',    icon:'⚖️', color:'var(--gold)',    filterKey:'Governance' },
    D: { name:'AI / Digital',  icon:'🤖', color:'var(--steel)',   filterKey:'AI/Digital' },
  };
  const sigCardStyle = (sev) => {
    if (sev === 'high') return 'background:var(--crimson-dim);border-color:var(--red-border)';
    if (sev === 'med')  return 'background:var(--gold-dim);border-color:var(--border-gold)';
    return 'background:var(--glass);border-color:var(--border)';
  };

  function buildClassifier() {
    document.getElementById('ri-classifier-grid').innerHTML = ['E','S','G','D'].map(cat => {
      const m = catMeta[cat];
      const signals = RI.classified[cat] || [];
      const hidden = activeFilter !== 'All' && m.filterKey !== activeFilter;
      return `<div class="ri-cat-col" style="${hidden?'display:none':''}">
        <div class="ri-cat-header" style="border-color:${m.color}">
          <span class="ri-cat-icon">${m.icon}</span>
          <span class="ri-cat-name" style="color:${m.color}">${m.name}</span>
          <span class="ri-cat-count">${signals.length}</span>
        </div>
        ${signals.map((s, idx) => {
          const sigId = `sig_${cat}_${idx}`;
          const url = SRCS[s.source];
          const srcHTML = url
            ? `<a href="${url}" target="_blank" class="ri-signal-source-link" title="Open source">${s.source} ↗</a>`
            : `<span class="ri-signal-source-plain">${s.source}</span>`;
          const alerted = RI_ALERT_STATE[sigId];
          return `<div class="ri-signal-card" style="${sigCardStyle(s.sev)}" id="${sigId}">
            <div class="ri-signal-title">${s.title}</div>
            <div class="ri-signal-desc">${s.desc}</div>
            <div class="ri-signal-meta">
              ${srcHTML}
              <div class="ri-signal-right">
                <span class="ri-signal-age">${s.age}</span>
                <button class="ri-alert-btn${alerted?' alerted':''}"
                  onclick="riToggleAlert('${sigId}',this)">${alerted?'🔔 Alerted':'+ Alert'}</button>
              </div>
            </div>
          </div>`;
        }).join('')}
      </div>`;
    }).join('');
  }
  buildClassifier();

  // Filter function (global so onclick can reach it)
  window.riSetFilter = function(cat, btn) {
    activeFilter = cat;
    document.querySelectorAll('.ri-filter-btn').forEach(b => {
      b.classList.remove('active-filter');
      b.style.background = '';
      b.style.color = '';
      b.style.borderColor = '';
    });
    btn.classList.add('active-filter');
    btn.style.background = 'var(--gold)';
    btn.style.color = 'var(--ink)';
    btn.style.borderColor = 'var(--gold)';
    buildClassifier();
  };

  // Alert toggle (global)
  window.riToggleAlert = function(sigId, btn) {
    RI_ALERT_STATE[sigId] = !RI_ALERT_STATE[sigId];
    if (RI_ALERT_STATE[sigId]) {
      btn.textContent = '🔔 Alerted';
      btn.classList.add('alerted');
    } else {
      btn.textContent = '+ Alert';
      btn.classList.remove('alerted');
    }
  };

  // ── Signal Timeline (NEW)
  document.getElementById('ri-timeline-feed').innerHTML = TL.map(t => `
    <div class="ri-tl-item">
      <div class="ri-tl-datetime">${t.datetime.replace('\n','<br>')}</div>
      <div class="ri-tl-dot" style="background:${t.dotColor}"></div>
      <div class="ri-tl-body">
        <div class="ri-tl-title">${t.title}</div>
        <div class="ri-tl-desc">${t.desc}</div>
        <div class="ri-tl-badges">
          <span class="ri-tl-cat-badge" style="background:${t.catColor}22;color:${t.catColor};border:1px solid ${t.catColor}44">${t.cat}</span>
          <span class="ri-tl-vs">${t.vsTraditional}</span>
        </div>
      </div>
    </div>`).join('');

  // ── AI Explanation panel
  document.getElementById('ri-explanation-feed').innerHTML = RI.explanations.map(e => `
    <div class="ri-explain-item">
      <div class="ri-explain-header">
        <span class="ri-explain-cat-badge" style="background:${e.catColor}22;color:${e.catColor};border:1px solid ${e.catColor}44">${e.cat}</span>
      </div>
      <div class="ri-explain-title">${e.title}</div>
      <div class="ri-explain-body" style="margin-top:.3rem;">${e.body}</div>
      <div class="ri-explain-why">💡 Why this matters to investors: ${e.why}</div>
    </div>`).join('');

  // ── Action recommendations
  const verbStyleParts = (s) => {
    const parts = {};
    s.split(';').forEach(p => { const [k,v] = p.split(':'); if(k&&v) parts[k.trim()] = v.trim(); });
    return `background:${parts['bg']||'var(--glass)'};color:${parts['color']||'var(--steel)'};border:1px solid ${parts['border']||'var(--border)'}`;
  };
  document.getElementById('ri-action-feed').innerHTML = RI.actions.map(a => `
    <div class="ri-action-item" style="background:${a.bg};border-color:${a.border}">
      <div class="ri-action-header">
        <span class="ri-action-verb" style="${verbStyleParts(a.verbColor)}">${a.verb}</span>
        <span class="ri-action-priority">${a.priority}</span>
      </div>
      <div class="ri-action-title">${a.title}</div>
      <div class="ri-action-desc">${a.desc}</div>
    </div>`).join('');
}

// ── Scan animation on tab click (NEW)
const SCAN_MESSAGES = [
  'Connecting to news feeds…',
  'Scanning regulatory filings…',
  'Processing ESG reports…',
  'Classifying signals by category…',
  'Calculating severity scores…',
  'Comparing against traditional ratings…',
  'Generating AI explanations…',
  'Scan complete.',
];

let riHasRendered = false;

function runScanAnimation(callback) {
  const overlay  = document.getElementById('ri-scan-overlay');
  const wrap     = document.getElementById('ri-content-wrap');
  const fill     = document.getElementById('ri-progress-fill');
  const status   = document.getElementById('ri-scan-status');
  overlay.style.display = 'block';
  wrap.style.display    = 'none';
  let step = 0;
  const total = SCAN_MESSAGES.length;
  const interval = setInterval(() => {
    status.textContent = SCAN_MESSAGES[step];
    fill.style.width = Math.round(((step + 1) / total) * 100) + '%';
    step++;
    if (step >= total) {
      clearInterval(interval);
      setTimeout(() => {
        overlay.style.display = 'none';
        wrap.style.display    = 'block';
        callback();
      }, 300);
    }
  }, 220);
}

// Patch showPanel to trigger scan animation only for risk intel tab
const _origShowPanel = showPanel;
window.showPanel = function(name, el) {
  _origShowPanel(name, el);
  if (name === 'riskintel') {
    if (!riHasRendered) {
      runScanAnimation(() => {
        renderRiskIntel();
        riHasRendered = true;
      });
    }
  }
};

// Initial render if user lands directly on the risk intel tab (rare)
if (window.location.hash === '#riskintel') {
  runScanAnimation(() => { renderRiskIntel(); riHasRendered = true; });
}

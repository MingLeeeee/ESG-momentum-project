// ════════════════════════════════════════════════════════════
// ri-logic.js  —  Risk Intelligence Data & Logic
// IT3852 Business Innovation Project · AY2026 S1
// Author : Moses Ng
// ════════════════════════════════════════════════════════════
//
// WHERE IT LIVES IN risk-intelligence.html:
//   Loaded via <script src="js/ri-logic.js"> at line 613,
//   after ri-styles.js, before the DOMContentLoaded block.
//
// DATA OBJECTS:
//   RISK_INTEL           — signals, severity, actions (Section 1)
//   RISK_INTEL_TIMELINE  — chronological signal feed  (Section 2)
//   RISK_INTEL_GAP       — vs traditional rating data (Section 3)
//   RISK_INTEL_SOURCES   — source label → URL map     (Section 4)
//   HEATMAP_DATA         — cross-company matrix       (Section 5)
//
// KEY FUNCTIONS:
//   renderRiskIntel()    — populates all 6 tabs        (Section 7)
//   riBuildFeed()        — builds scanner feed         (Section 8)
//   riFilterFeed()       — keyword search on feed      (Section 8)
//   runScanAnimation()   — progress bar on load/switch (Section 9)
//
// INTERACTIVE GLOBALS (set inside renderRiskIntel):
//   riSetFilter(cat,btn)    — classifier category filter
//   riToggleAlert(id,btn)   — alert toggle on signal cards
//   riCycleStatus(id,btn)   — action status tracker
//   riSaveNote(id,ta)       — action notes field
//   riToggleExplain(i,el)   — expand/collapse explanations
//
// COMPANIES SUPPORTED:  DBS · GENT · GRAB
// (ticker var is set by switchCompany() in ri-panel.html)
// ════════════════════════════════════════════════════════════

// ════════════════════════════════════════════════════════════
// ri-logic.js  —  RISK INTELLIGENCE JAVASCRIPT
// IT3852 Business Innovation Project · AY2026 S1
// Author : Moses Ng
// ════════════════════════════════════════════════════════════

// ── Alert & action state (session-only) ──────────────────
const RI_ALERT_STATE  = {};
const RI_ACTION_STATE = {}; // { [actionId]: { status, note } }

// ════════════════════════════════════════════════════════════
// SECTION 1 — RISK_INTEL
// ════════════════════════════════════════════════════════════
const RISK_INTEL = {
  DBS: {
    scanStats: { total:7, high:0, medium:2, low:5 },
    sources: [
      { label:'News & Media',       count:3, pct:43 },
      { label:'Regulatory Filings', count:2, pct:29 },
      { label:'ESG Reports',        count:2, pct:28 },
    ],
    severityScore: 28,
    severityLevel: 'Low',
    severityDesc: 'No high-priority emerging risks detected. Minor watch items present.',
    severityByCategory: [
      { cat:'Environmental', score:22, level:'Low', color:'var(--emerald)' },
      { cat:'Social',        score:18, level:'Low', color:'var(--emerald)' },
      { cat:'Governance',    score:30, level:'Low', color:'var(--emerald)' },
      { cat:'AI / Digital',  score:42, level:'Med', color:'var(--gold)'    },
    ],
    trendData: [18,22,20,25,24,26,28,28],
    scoreChangeLog: [
      { delta:'+8',  dir:'up',   title:'GenAI Operational Risk detected',       date:'30 May 2026' },
      { delta:'+5',  dir:'up',   title:'Board tenure concentration flagged',     date:'27 May 2026' },
      { delta:'-3',  dir:'down', title:'Cyber audit passed — risk reduced',      date:'10 May 2026' },
    ],
    classified: {
      E: [
        { title:'Scope 3 Emissions Gap',       desc:'Financed emissions not fully disclosed for SME loan book. TCFD alignment partial.',                                                          source:'TCFD Review',           age:'3d ago', sev:'med', corroboration:2 },
        { title:'Green Bond Use-of-Proceeds',  desc:'Third-party verification for $1.5B green bond pending. Greenwash risk: Low.',                                                               source:'Sustainability Report', age:'1w ago', sev:'low', corroboration:1 },
      ],
      S: [
        { title:'AI Bias in Credit Scoring',   desc:'Industry-wide concern: AI credit models may disadvantage underbanked segments. No DBS-specific finding yet.',                               source:'MAS Consultation Paper',age:'5d ago', sev:'low', corroboration:1 },
      ],
      G: [
        { title:'Board Tenure Concentration',  desc:'3 of 12 board members have tenure >9 years. Proxy advisors flagging independence concerns.',                                                source:'Proxy Research',        age:'2w ago', sev:'med', corroboration:2 },
      ],
      D: [
        { title:'GenAI Operational Risk',       desc:'DBS\u2019s aggressive AI deployment (1,000+ AI models) creates novel model risk exposure not captured by MAS TRM guidelines.',              source:'MAS TRM Framework',     age:'1d ago', sev:'med', corroboration:3 },
        { title:'Cyber Resilience Stress Test', desc:'MAS TBML testing expanded to include AI-driven fraud vectors. DBS participating in pilot programme.',                                      source:'MAS Announcement',      age:'4d ago', sev:'low', corroboration:1 },
        { title:'Data Sovereignty Risk',        desc:'Cross-border data flows for DigiBank India operations face tighter RBI data localisation requirements.',                                    source:'RBI Circular',          age:'1w ago', sev:'low', corroboration:2 },
      ],
    },
    explanations: [
      { cat:'AI / Digital',  catColor:'var(--gold)',    confidence:'High',     lastUpdated:'Updated 30 May 2026 · triggered by MAS TRM update',      title:'GenAI Operational Risk is not in traditional ESG ratings',    body:'DBS operates 1,000+ AI models across its banking operations. Traditional ESG frameworks do not have a standardised metric for model risk governance or AI explainability. This is an emerging risk invisible to MSCI, Sustainalytics, or CDP scores.',                                  why:'This signal matters because AI model failures can create both regulatory liability and reputational damage \u2014 risks that will only grow as AI use expands.' },
      { cat:'Governance',    catColor:'var(--amber)',   confidence:'Medium',   lastUpdated:'Updated 27 May 2026 · triggered by proxy research update', title:'Long board tenures may signal independence risk',             body:'Three board members exceeding 9-year tenure is above the CGSI recommended threshold for independence. This is a structural governance weakness that could slow response to emerging ESG challenges.',                                         why:'Boards with entrenched members tend to have weaker oversight of management \u2014 a leading indicator of governance deterioration before formal rating agencies reflect it.' },
      { cat:'Environmental', catColor:'var(--emerald)', confidence:'Medium',   lastUpdated:'Updated 21 May 2026 · triggered by MAS disclosure review', title:'Scope 3 financed emissions gap is pre-regulatory risk',      body:'DBS\u2019s SME loan book financed emissions are not fully disclosed. As MAS moves toward mandatory climate disclosures, this gap will need to be addressed \u2014 and could trigger negative rating adjustments.',                                  why:'Early action on Scope 3 disclosure reduces future regulatory compliance cost and reputational risk from peer comparison.' },
    ],
    actions: [
      { id:'DBS_A1', verb:'Monitor',     verbColor:'bg:var(--emerald-dim);color:var(--emerald);border:var(--green-border)',  priority:'Low priority',    due:'Review by 30 Jun 2026', title:'Track GenAI governance disclosures',                    desc:'Set alert for DBS annual report section on AI governance and model risk management. Compare against MAS FEAT framework compliance.',                                            bg:'var(--glass)',    border:'var(--border)' },
      { id:'DBS_A2', verb:'Monitor',     verbColor:'bg:var(--gold-dim);color:var(--gold);border:var(--amber-border)',        priority:'Medium priority', due:'Review by 15 Jul 2026', title:'Watch board composition at next AGM',                    desc:'Review 2025 AGM board election outcomes. If long-tenured directors are re-elected without independence review, consider flagging governance score downward.',                   bg:'var(--gold-dim)', border:'var(--border-gold)' },
      { id:'DBS_A3', verb:'Investigate', verbColor:'bg:var(--gold-dim);color:var(--gold);border:var(--amber-border)',        priority:'Medium priority', due:'Review by 10 Jul 2026', title:'Verify Scope 3 financed emissions disclosure timeline', desc:'Review DBS Sustainability Report 2025 for SME loan book financed emissions. Cross-reference against MAS climate disclosure requirements.',                                          bg:'var(--glass)',    border:'var(--border)' },
    ],
  },

  GENT: {
    scanStats: { total:14, high:5, medium:6, low:3 },
    sources: [
      { label:'News & Media',       count:7, pct:50 },
      { label:'Regulatory Filings', count:5, pct:36 },
      { label:'ESG Reports',        count:2, pct:14 },
    ],
    severityScore: 81,
    severityLevel: 'High',
    severityDesc: 'Multiple high-severity emerging signals detected. Immediate investor attention required.',
    severityByCategory: [
      { cat:'Environmental', score:55, level:'Med',  color:'var(--gold)'    },
      { cat:'Social',        score:48, level:'Med',  color:'var(--gold)'    },
      { cat:'Governance',    score:92, level:'High', color:'var(--crimson)' },
      { cat:'AI / Digital',  score:38, level:'Low',  color:'var(--emerald)' },
    ],
    trendData: [42,48,55,60,58,65,75,81],
    scoreChangeLog: [
      { delta:'+16', dir:'up',   title:'SC Malaysia investigation opened',          date:'30 May 2026' },
      { delta:'+10', dir:'up',   title:'Related-party lawsuit escalated to High Court', date:'28 May 2026' },
      { delta:'+8',  dir:'up',   title:'AML fine processed in Bank Negara filing',  date:'20 May 2026' },
      { delta:'-6',  dir:'down', title:'Casino energy audit partially completed',   date:'8 May 2026'  },
    ],
    classified: {
      E: [
        { title:'Unverified Carbon Targets',          desc:'Genting\u2019s 20% renewables by 2030 pledge has no third-party verification or interim milestone.',                                  source:'AI Greenwash Scan',     age:'2d ago', sev:'med',  corroboration:2 },
        { title:'Casino Energy Intensity',            desc:'Resort operations in MY and US are high energy consumers. No measurable reduction plan published.',                                   source:'Sustainability Report', age:'2w ago', sev:'med',  corroboration:1 },
      ],
      S: [
        { title:'Problem Gambling Exposure',          desc:'MAS/MOH research links casino proximity to household debt. No Genting CSR programme on responsible gambling disclosed.',              source:'MOH Study 2024',        age:'1w ago', sev:'med',  corroboration:2 },
        { title:'AML Workforce Gaps',                 desc:'RM12m AML fine reflects systemic compliance culture gaps. Staff training adequacy not publicly disclosed.',                          source:'Bank Negara Filing',    age:'3w ago', sev:'high', corroboration:3 },
      ],
      G: [
        { title:'Securities Commission Investigation',desc:'Active SC Malaysia governance review following two independent director resignations. Outcome unknown.',                               source:'SC Malaysia Filing',    age:'1d ago', sev:'high', corroboration:4 },
        { title:'Dual CEO/Chairman Role',             desc:'KT Lim\u2019s unchecked authority flagged by ISS and Glass Lewis as non-compliant with best practice governance.',                   source:'Proxy Research',        age:'1w ago', sev:'high', corroboration:3 },
        { title:'Related-Party Transaction Risk',     desc:'Ongoing shareholder lawsuit alleges below-market property sale. No independent board review disclosed.',                              source:'Bursa Filing',          age:'5d ago', sev:'high', corroboration:2 },
      ],
      D: [
        { title:'Digital Casino Regulatory Gap',      desc:'Growth of online gaming via Resorts World platforms creates regulatory arbitrage risk across jurisdictions.',                         source:'Gaming Regulatory News',age:'3d ago', sev:'low',  corroboration:1 },
        { title:'Facial Recognition at Casinos',      desc:'Use of biometric surveillance at MY resorts raises PDPA compliance risk. Policy not publicly disclosed.',                            source:'PDPA Watch',            age:'2w ago', sev:'med',  corroboration:2 },
      ],
    },
    explanations: [
      { cat:'Governance', catColor:'var(--crimson)', confidence:'High',   lastUpdated:'Updated 30 May 2026 · triggered by SC Malaysia filing',    title:'SC Malaysia investigation is a pre-downgrade signal',         body:'Formal regulatory investigations by the Securities Commission almost always precede ESG governance score downgrades by rating agencies like MSCI and Sustainalytics. Traditional ratings update quarterly \u2014 this signal appeared today.',                        why:'Investors who act now can reduce exposure before the formal rating downgrade \u2014 a 6\u20138 week window that traditional ESG scores miss entirely.' },
      { cat:'Social',     catColor:'var(--gold)',    confidence:'High',   lastUpdated:'Updated 20 May 2026 · triggered by Bank Negara filing',    title:'AML fine reflects systemic workforce culture gap',            body:'The RM12m AML fine is not just a one-time penalty \u2014 it signals inadequate compliance culture and staff training. Traditional ESG frameworks often treat fines as single data points rather than systemic risk indicators.',                             why:'Recurring compliance failures in regulated industries are strongly correlated with future governance deterioration and regulatory sanctions.' },
      { cat:'Governance', catColor:'var(--crimson)', confidence:'High',   lastUpdated:'Updated 15 May 2026 · structural finding',               title:'Dual CEO/Chairman role concentrates governance failure risk', body:'When the same person controls both executive decision-making and board oversight, there is no structural check on related-party transactions. This is a structural governance deficiency that persists beyond any single event.',  why:'Academic research shows companies with combined CEO/Chairman roles have 34% higher probability of governance incidents within 3 years (CGSI 2023 study).' },
    ],
    actions: [
      { id:'GENT_A1', verb:'Reduce',           verbColor:'bg:var(--crimson-dim);color:var(--crimson);border:var(--red-border)',  priority:'High priority',   due:'Act before 7 Jun 2026', title:'Reduce exposure pending SC Malaysia investigation',        desc:'Do not add to Genting position until the Securities Commission review concludes. Set re-entry target at governance score above 55 with normalised board.',          bg:'var(--crimson-dim)', border:'var(--red-border)' },
      { id:'GENT_A2', verb:'Investigate',      verbColor:'bg:var(--crimson-dim);color:var(--crimson);border:var(--red-border)',  priority:'High priority',   due:'Act before 14 Jun 2026', title:'Request independent board governance report',             desc:'Engage with investor relations team for timeline on independent governance review. If no response within 30 days, treat as confirmed governance risk signal.',        bg:'var(--glass)',       border:'var(--border)' },
      { id:'GENT_A3', verb:'Compare w/ Peers', verbColor:'bg:var(--gold-dim);color:var(--gold);border:var(--amber-border)',      priority:'Medium priority', due:'Review by 30 Jun 2026', title:'Benchmark responsible gaming disclosures vs MBS, LVS',     desc:'Marina Bay Sands and Las Vegas Sands both publish responsible gaming KPIs. Genting\u2019s absence is a peer disadvantage and a social ESG gap.',                      bg:'var(--glass)',       border:'var(--border)' },
    ],
  },

  GRAB: {
    scanStats: { total:9, high:0, medium:3, low:6 },
    sources: [
      { label:'News & Media',       count:4, pct:44 },
      { label:'Regulatory Filings', count:3, pct:33 },
      { label:'ESG Reports',        count:2, pct:23 },
    ],
    severityScore: 34,
    severityLevel: 'Low\u2013Med',
    severityDesc: 'Mostly low-severity signals. Regulatory complexity is the primary watch area.',
    severityByCategory: [
      { cat:'Environmental', score:20, level:'Low', color:'var(--emerald)' },
      { cat:'Social',        score:30, level:'Low', color:'var(--emerald)' },
      { cat:'Governance',    score:45, level:'Med', color:'var(--gold)'    },
      { cat:'AI / Digital',  score:52, level:'Med', color:'var(--gold)'    },
    ],
    trendData: [24,26,28,30,29,32,33,34],
    scoreChangeLog: [
      { delta:'+5',  dir:'up',   title:'CCCS algorithmic pricing monitoring opened', date:'25 May 2026' },
      { delta:'+4',  dir:'up',   title:'ILO platform worker guidelines published',   date:'18 May 2026' },
      { delta:'-3',  dir:'down', title:'Vietnam PDPA compliance roadmap submitted',  date:'5 May 2026'  },
    ],
    classified: {
      E: [
        { title:'EV Fleet Transition Credibility',        desc:'BYD partnership for 50% EV by 2030 lacks interim 2026/2028 milestones. Carbon neutrality 2035 not yet SBTi-verified.',                              source:'AI Greenwash Scan',          age:'2d ago', sev:'low', corroboration:2 },
        { title:'Driver Motorbike Emissions',             desc:'GrabBike fleet (largest in SEA) is predominantly ICE. No transition roadmap for two-wheel segment published.',                                       source:'Sustainability Report',      age:'1w ago', sev:'low', corroboration:1 },
      ],
      S: [
        { title:'Gig Worker Welfare Gap',                 desc:'ILO guidelines on platform worker welfare create potential retroactive liability for Grab\u2019s contractor model in SG, MY, TH.',                  source:'ILO Platform Economy Report',age:'3d ago', sev:'med', corroboration:3 },
        { title:'Financial Inclusion Claim Verification', desc:'GrabPay\u2019s financial inclusion narrative for the unbanked is not independently audited. Social impact metrics are self-reported.',               source:'Internal ESG Report',        age:'2w ago', sev:'low', corroboration:1 },
      ],
      G: [
        { title:'Dual-Class Share Structure',             desc:'Anthony Tan holds supervoting rights that limit minority shareholder influence. Not captured in most governance scores.',                              source:'NASDAQ Filing',              age:'1m ago', sev:'med', corroboration:2 },
        { title:'CFO Transition Oversight Risk',          desc:'New CFO (2023) less than 2 years in role. Institutional knowledge gap in financial reporting oversight.',                                             source:'Annual Report',              age:'1m ago', sev:'low', corroboration:1 },
      ],
      D: [
        { title:'GrabMaps AI Accuracy Risk',              desc:'Proprietary mapping AI used for logistics optimisation. No third-party accuracy audit published.',                                                   source:'Tech Review',                age:'1w ago', sev:'med', corroboration:2 },
        { title:'PDPA Multi-Jurisdiction Data Risk',      desc:'Operating across 6 ASEAN markets with diverging data laws. Vietnam\u2019s Decree 13 is most stringent.',                                            source:'Vietnam Decree 13',          age:'1d ago', sev:'low', corroboration:2 },
        { title:'AI Pricing Transparency',                desc:'Surge pricing algorithm opaque to regulators. Singapore CCCS monitoring for algorithmic collusion.',                                                source:'CCCS Watch',                 age:'5d ago', sev:'med', corroboration:3 },
      ],
    },
    explanations: [
      { cat:'AI / Digital', catColor:'var(--gold)',    confidence:'Medium',      lastUpdated:'Updated 25 May 2026 · triggered by CCCS announcement',  title:'AI pricing algorithm is a novel regulatory risk',                body:'Grab\u2019s surge pricing model is powered by a proprietary AI algorithm. The CCCS has opened a monitoring programme \u2014 a risk category that does not yet exist in any mainstream ESG framework.',  why:'Early regulatory intervention could force algorithm disclosure or redesign, impacting Grab\u2019s revenue optimisation \u2014 invisible to traditional ESG scorers.' },
      { cat:'Social',       catColor:'var(--emerald)', confidence:'Medium',      lastUpdated:'Updated 18 May 2026 · triggered by ILO publication',     title:'ILO gig worker guidelines could reshape labour classification',  body:'The ILO\u2019s 2025 Platform Economy guidelines push toward employee classification for platform workers. If SG, MY, or TH adopt these, Grab\u2019s cost structure would change materially.',         why:'Labour reclassification risk is systemic for all gig economy platforms \u2014 not yet in ESG social scores, which rely on self-reported contractor data.' },
      { cat:'Governance',   catColor:'var(--gold)',    confidence:'Speculative', lastUpdated:'Updated 10 May 2026 · structural finding',               title:'Supervoting rights limit minority shareholder governance',       body:'Anthony Tan\u2019s dual-class shares give him effective veto power. Traditional governance scores penalise this, but don\u2019t capture the forward risk if his direction diverges from ESG best practice.',  why:'In founder-led companies, supervoting rights mean ESG policy is ultimately one person\u2019s decision. Key-person risk is underweighted in standard frameworks.' },
    ],
    actions: [
      { id:'GRAB_A1', verb:'Monitor',     verbColor:'bg:var(--emerald-dim);color:var(--emerald);border:var(--green-border)', priority:'Low priority',    due:'Review by 31 Jul 2026', title:'Track CCCS algorithmic pricing review progress',       desc:'Set alert for CCCS public statements on Grab pricing investigation. If formal proceedings open, treat as medium governance/social risk event.',                              bg:'var(--glass)',    border:'var(--border)' },
      { id:'GRAB_A2', verb:'Investigate', verbColor:'bg:var(--gold-dim);color:var(--gold);border:var(--amber-border)',       priority:'Medium priority', due:'Review by 20 Jun 2026', title:'Verify SBTi submission for 2035 carbon neutrality',    desc:'Check Science Based Targets initiative database for Grab submission status. If not submitted, flag as greenwash risk and downgrade Environmental score.',                bg:'var(--gold-dim)', border:'var(--border-gold)' },
      { id:'GRAB_A3', verb:'Monitor',     verbColor:'bg:var(--gold-dim);color:var(--gold);border:var(--amber-border)',       priority:'Medium priority', due:'Review by 31 Jul 2026', title:'Watch ILO gig worker adoption across ASEAN',          desc:'Track Singapore MOM and Malaysia MOHR responses to ILO platform economy guidelines. First policy signal expected H2 2025.',                                                bg:'var(--glass)',    border:'var(--border)' },
    ],
  },
};

// ════════════════════════════════════════════════════════════
// SECTION 2 — RISK_INTEL_TIMELINE  (also used as scanner feed)
// ════════════════════════════════════════════════════════════
const RISK_INTEL_TIMELINE = {
  DBS: [
    { datetime:'30 May 2026\n09:42', title:'GenAI Operational Risk detected',          desc:'MAS TRM framework updated to cover AI model governance. DBS\u2019s 1,000+ model deployment flagged as requiring formal risk disclosure — not yet in MSCI/Sustainalytics ratings.', cat:'AI/Digital',  catColor:'var(--gold)',    dotColor:'var(--gold)',    vsTraditional:'Traditional ratings: not captured · Our signal: Medium · Gap: ~1 quarter ahead', corroboration:3 },
    { datetime:'27 May 2026\n14:15', title:'Board tenure concentration flagged',        desc:'Proxy research identified 3 of 12 board members exceeding 9-year tenure. ISS database not yet updated. CGSI framework threshold breach.',                                          cat:'Governance',  catColor:'var(--gold)',    dotColor:'var(--gold)',    vsTraditional:'Traditional ratings: B stable · Our signal: Watch · Gap: ~6 weeks ahead', corroboration:2 },
    { datetime:'21 May 2026\n11:00', title:'Scope 3 financed emissions gap identified', desc:'TCFD review shows SME loan book financed emissions incomplete. MAS mandatory disclosure deadline Q3 2026 not yet reflected in ESG scores.',                                        cat:'Environmental',catColor:'var(--emerald)', dotColor:'var(--emerald)', vsTraditional:'Traditional ratings: not yet flagged · Our signal: Low-Med · Gap: ~2 months ahead', corroboration:2 },
    { datetime:'15 May 2026\n08:30', title:'AI credit scoring bias concern raised',     desc:'MAS consultation paper on fair AI deployment in credit scoring published. Industry-wide watch — no DBS-specific finding yet.',                                                    cat:'Social',      catColor:'var(--blue)',    dotColor:'var(--blue)',    vsTraditional:'Traditional ratings: no impact · Our signal: Low watch · Gap: emerging signal', corroboration:1 },
  ],
  GENT: [
    { datetime:'30 May 2026\n09:01', title:'SC Malaysia governance investigation opened',      desc:'Securities Commission Malaysia formally opened governance review following two independent director resignations. Formal filing detected in Bursa feed.',       cat:'Governance',  catColor:'var(--crimson)', dotColor:'var(--crimson)', vsTraditional:'Traditional ratings: last updated Mar 2026 (B−) · Our signal: HIGH · Gap: ~8 weeks ahead', corroboration:4 },
    { datetime:'28 May 2026\n16:44', title:'Related-party transaction lawsuit escalated',      desc:'Minority shareholder court filing escalated to High Court. Not yet reflected in any ESG provider database.',                                                    cat:'Governance',  catColor:'var(--crimson)', dotColor:'var(--crimson)', vsTraditional:'Traditional ratings: not captured · Our signal: High · Gap: real-time advantage', corroboration:2 },
    { datetime:'20 May 2026\n10:22', title:'AML fine precedent: systemic compliance gap',     desc:'RM12m AML fine processed in Bank Negara filing. MSCI and Sustainalytics typically reflect fines after next quarterly update.',                                  cat:'Social',      catColor:'var(--gold)',    dotColor:'var(--gold)',    vsTraditional:'Traditional ratings: Q2 2026 update pending · Our signal: High · Gap: ~6 weeks ahead', corroboration:3 },
    { datetime:'12 May 2026\n13:55', title:'NY Resorts World licence review flagged',          desc:'NY State gaming commission added licence conditions referencing board composition. Not in any current ESG framework category.',                                  cat:'Governance',  catColor:'var(--crimson)', dotColor:'var(--crimson)', vsTraditional:'Traditional ratings: not captured · Our signal: High · Gap: novel risk category', corroboration:2 },
    { datetime:'5 May 2026\n09:00',  title:'Unverified carbon targets flagged',                desc:'Genting\u2019s 20% renewables pledge lacks third-party verification. AI greenwash scan raised flag.',                                                            cat:'Environmental',catColor:'var(--emerald)', dotColor:'var(--emerald)', vsTraditional:'Traditional ratings: Environmental C · Our signal: Med · Gap: ~1 quarter ahead', corroboration:1 },
  ],
  GRAB: [
    { datetime:'29 May 2026\n15:30', title:'Vietnam Decree 13 data localisation impact',      desc:'Vietnam data localisation requirement tightened. Grab\u2019s cross-border data flows for GrabPay now require local processing.',                                 cat:'AI/Digital',  catColor:'var(--steel)',   dotColor:'var(--gold)',    vsTraditional:'Traditional ratings: not a rated category · Our signal: Low · Gap: emerging regulatory risk', corroboration:2 },
    { datetime:'25 May 2026\n09:10', title:'CCCS algorithmic pricing monitoring opened',      desc:'Singapore Competition Commission confirmed monitoring of Grab\u2019s surge pricing algorithm. Not yet a formal investigation.',                                  cat:'AI/Digital',  catColor:'var(--steel)',   dotColor:'var(--gold)',    vsTraditional:'Traditional ratings: not captured · Our signal: Medium · Gap: real-time advantage', corroboration:3 },
    { datetime:'18 May 2026\n11:40', title:'ILO platform worker guidelines published',        desc:'ILO released final Platform Economy guidelines recommending employee status for gig workers meeting certain thresholds.',                                         cat:'Social',      catColor:'var(--blue)',    dotColor:'var(--blue)',    vsTraditional:'Traditional ratings: not yet reflected · Our signal: Low-Med · Gap: ~1 quarter ahead', corroboration:3 },
    { datetime:'10 May 2026\n08:00', title:'SBTi carbon neutrality submission pending',       desc:'Grab\u2019s 2035 carbon neutrality target not found in SBTi database. Credibility gap flagged.',                                                                cat:'Environmental',catColor:'var(--emerald)', dotColor:'var(--emerald)', vsTraditional:'Traditional ratings: Environmental B · Our signal: Greenwash watch · Gap: ~2 months ahead', corroboration:2 },
  ],
};

// ════════════════════════════════════════════════════════════
// SECTION 3 — RISK_INTEL_GAP
// ════════════════════════════════════════════════════════════
const RISK_INTEL_GAP = {
  DBS:  { traditional:{ name:'MSCI / Sustainalytics', rating:'AA (73)',      status:'Stable',       color:'var(--emerald)', lastUpdated:'Mar 2026' }, ours:{ rating:'Low-Med', status:'GenAI risk watch · Board tenure flag' },        leadTime:'~6 weeks ahead', narrative:'DBS\u2019s traditional ESG ratings look healthy. Our scanner detected two emerging signals \u2014 GenAI operational risk and board tenure concentration \u2014 not visible in any current formal rating.' },
  GENT: { traditional:{ name:'MSCI / Sustainalytics', rating:'B\u2212 (44)', status:'Under Review', color:'var(--gold)',    lastUpdated:'Mar 2026' }, ours:{ rating:'HIGH RISK',status:'SC investigation · Board collapse · AML fine' }, leadTime:'~8 weeks ahead', narrative:'Genting\u2019s traditional rating was last updated in March 2026 and is already outdated. Our scanner detected the SC Malaysia investigation, the related-party lawsuit, and the AML fine \u2014 all in real time.' },
  GRAB: { traditional:{ name:'MSCI / Sustainalytics', rating:'BBB (68)',     status:'Positive',     color:'var(--emerald)', lastUpdated:'Apr 2026' }, ours:{ rating:'Low-Med',  status:'CCCS watch · ILO labour risk · SBTi gap' },      leadTime:'~1 quarter ahead', narrative:'Grab\u2019s traditional ratings are positive, but our scanner flagged algorithmic pricing scrutiny, gig worker reclassification risk, and an unverified carbon claim \u2014 novel categories no existing ESG framework scores.' },
};

// ════════════════════════════════════════════════════════════
// SECTION 4 — RISK_INTEL_SOURCES
// ════════════════════════════════════════════════════════════
const RISK_INTEL_SOURCES = {
  DBS:  { 'MAS TRM Framework':'https://www.mas.gov.sg/regulation/guidelines/technology-risk-management-guidelines','TCFD Review':'https://www.fsb-tcfd.org/','Proxy Research':'https://www.issgovernance.com/','MAS Consultation Paper':'https://www.mas.gov.sg/publications/consultations' },
  GENT: { 'SC Malaysia Filing':'https://www.sc.com.my/regulation/securities-commission-enforcement','Bursa Filing':'https://www.bursamalaysia.com/market_information/announcements','Bank Negara Filing':'https://www.bnm.gov.my/enforcement','PDPA Watch':'https://www.pdp.gov.my/','Proxy Research':'https://www.issgovernance.com/' },
  GRAB: { 'Vietnam Decree 13':'https://lawnet.vn/vbpluploads/vb/attachement/2024/04/NghiDinh13_2023.pdf','CCCS Watch':'https://www.cccs.gov.sg/','ILO Platform Economy Report':'https://www.ilo.org/topics/platform-economy','MAS Consultation Paper':'https://www.mas.gov.sg/publications/consultations' },
};

// ════════════════════════════════════════════════════════════
// SECTION 5 — HEATMAP DATA
// ════════════════════════════════════════════════════════════
const HEATMAP_DATA = {
  DBS:  { E:'Med', S:'Low', G:'Med', D:'Med' },
  GENT: { E:'Med', S:'Med', G:'High',D:'Low' },
  GRAB: { E:'Low', S:'Low', G:'Med', D:'Med' },
};

// ════════════════════════════════════════════════════════════
// SECTION 6 — COLOUR / BADGE HELPERS
// ════════════════════════════════════════════════════════════
const sevColor = lvl => {
  if(lvl==='High')                                       return 'var(--crimson)';
  if(lvl==='Med'||lvl==='Low\u2013Med'||lvl==='Low-Med') return 'var(--gold)';
  return 'var(--emerald)';
};
const sevBadgeStyle = lvl => {
  if(lvl==='High')                                       return 'background:var(--crimson-dim);color:var(--crimson);border:1px solid var(--red-border)';
  if(lvl==='Med'||lvl==='Low\u2013Med'||lvl==='Low-Med') return 'background:rgba(240,160,32,.1);color:var(--amber);border:1px solid var(--amber-border)';
  return 'background:var(--emerald-dim);color:var(--emerald);border:1px solid var(--green-border)';
};
const verbStyleParts = s => {
  const p={};s.split(';').forEach(x=>{const[k,v]=x.split(':');if(k&&v)p[k.trim()]=v.trim();});
  return `background:${p['bg']||'var(--glass)'};color:${p['color']||'var(--steel)'};border:1px solid ${p['border']||'var(--border)'}`;
};

// ════════════════════════════════════════════════════════════
// SECTION 7 — renderRiskIntel()
// ════════════════════════════════════════════════════════════
function renderRiskIntel() {
  const RI   = RISK_INTEL[ticker]          || RISK_INTEL['DBS'];
  const TL   = RISK_INTEL_TIMELINE[ticker] || RISK_INTEL_TIMELINE['DBS'];
  const GAP  = RISK_INTEL_GAP[ticker]      || RISK_INTEL_GAP['DBS'];
  const SRCS = RISK_INTEL_SOURCES[ticker]  || {};
  const now  = new Date();

  document.getElementById('ri-scan-time').textContent =
    'Last scan: '+now.toLocaleTimeString('en-SG',{hour:'2-digit',minute:'2-digit'});

  // ── Navigate back to overview ─────────────────────────
  riShowTab('overview', document.querySelector('.ri-tab'));

  // ── TAB 1: OVERVIEW ──────────────────────────────────

  // ESG Rating Gap (compact)
  document.getElementById('ri-gap-content').innerHTML = `
    <div class="ri-gap-compact">
      <div class="ri-gap-box" style="background:var(--glass);border:1px solid var(--border);">
        <div class="ri-gap-box-label" style="color:var(--steel);">Traditional Framework</div>
        <div style="font-size:.72rem;font-weight:600;color:var(--white);margin-bottom:.3rem;">${GAP.traditional.name}</div>
        <div class="ri-gap-box-score" style="color:${GAP.traditional.color}">${GAP.traditional.rating}</div>
        <div class="ri-gap-box-sub" style="color:var(--steel);">Status: ${GAP.traditional.status} · Last updated: ${GAP.traditional.lastUpdated}</div>
      </div>
      <div class="ri-gap-arrow-mid">→<br><span style="font-family:var(--font-mono);font-size:.58rem;color:var(--steel);display:block;margin-top:.2rem;">${GAP.leadTime}</span></div>
      <div class="ri-gap-box" style="background:var(--gold-dim);border:1px solid var(--border-gold);">
        <div class="ri-gap-box-label" style="color:var(--gold);">ESG Momentum Engine · Today</div>
        <div style="font-size:.72rem;font-weight:600;color:var(--white);margin-bottom:.3rem;">Real-Time Signal Assessment</div>
        <div class="ri-gap-box-score" style="color:${sevColor(RI.severityLevel)}">${GAP.ours.rating}</div>
        <div class="ri-gap-box-sub" style="color:var(--steel);">${GAP.ours.status}</div>
      </div>
    </div>
    <div class="ri-gap-lead-sm"><strong>Why this gap matters:</strong> ${GAP.narrative}</div>`;

  // Feature summary cards
  const allSignals = ['E','S','G','D'].flatMap(c=>(RI.classified[c]||[]).map(s=>({...s,cat:c})));
  const highCount  = allSignals.filter(s=>s.sev==='high').length;
  const medCount   = allSignals.filter(s=>s.sev==='med').length;
  const cats = {E:'Environmental',S:'Social',G:'Governance',D:'AI / Digital'};
  const catCounts = ['E','S','G','D'].map(k=>`${cats[k][0]}:${(RI.classified[k]||[]).length}`).join(' · ');
  document.getElementById('ri-feat-grid').innerHTML = [
    { icon:'🔍', name:'Risk Scanner',    stat:`${RI.scanStats.total} signals`, sub:`${RI.scanStats.high} high · ${RI.scanStats.medium} med · ${RI.scanStats.low} low`, tab:'scanner' },
    { icon:'🗂️', name:'Risk Classifier', stat:catCounts, sub:'E · S · G · AI/Digital categories', tab:'classifier' },
    { icon:'🎯', name:'Severity Score',  stat:`Score: ${RI.severityScore}`, sub:`${RI.severityLevel} emerging risk level`, tab:'severity' },
    { icon:'🤖', name:'AI Explanations', stat:`${RI.explanations.length} explanations`, sub:'Signal context & investor impact', tab:'explain' },
    { icon:'📋', name:'Action Recommendations', stat:`${RI.actions.length} actions`, sub:'Priority queue · track workflow', tab:'actions' },
  ].map(f=>`
    <div class="ri-feat-card" onclick="riShowTab('${f.tab}',document.querySelectorAll('.ri-tab')[${['scanner','classifier','severity','explain','actions'].indexOf(f.tab)+1}])">
      <div class="ri-feat-card-icon">${f.icon}</div>
      <div class="ri-feat-card-name">${f.name}</div>
      <div class="ri-feat-card-stat">${f.stat}</div>
      <div class="ri-feat-card-sub">${f.sub}</div>
      <div class="ri-feat-card-link">Open full view →</div>
    </div>`).join('');

  // High-severity signals (all high; fallback to all med if none)
  const highSignals = allSignals.filter(s=>s.sev==='high');
  const displaySignals = highSignals.length > 0 ? highSignals : allSignals.filter(s=>s.sev==='med');
  const fallbackNote = highSignals.length === 0 ? ' (no high signals — showing medium)' : '';
  document.getElementById('ri-high-count-label').textContent =
    `${displaySignals.length} signal${displaySignals.length!==1?'s':''}${fallbackNote}`;
  document.getElementById('ri-high-signals').innerHTML = displaySignals.length > 0
    ? displaySignals.map(s=>`
        <div class="ri-high-item">
          <div class="ri-high-dot ${s.sev}"></div>
          <div>
            <div class="ri-high-title">${s.title}</div>
            <div class="ri-high-meta">
              <span class="ri-sev-pill ${s.sev}">${s.sev.toUpperCase()}</span>
              <span>${cats[s.cat]||s.cat}</span>
              <span>${s.age}</span>
            </div>
          </div>
        </div>`).join('')
    : '<div style="font-size:.72rem;color:var(--steel);padding:.5rem 0;">No signals detected for this company.</div>';

  // Overview timeline (3 most recent)
  const tlSlice = TL.slice(0,3);
  document.getElementById('ri-overview-timeline').innerHTML = tlSlice.map(t=>`
    <div class="ri-feed-item" style="grid-template-columns:90px 8px 1fr;animation:none;opacity:1;">
      <div class="ri-feed-dt">${t.datetime.replace('\n','<br>')}</div>
      <div class="ri-feed-dot" style="background:${t.dotColor}"></div>
      <div class="ri-feed-body">
        <div class="ri-feed-title">${t.title}</div>
        <div class="ri-feed-badges">
          <span class="ri-feed-cat" style="background:${t.catColor}22;color:${t.catColor};border:1px solid ${t.catColor}44">${t.cat}</span>
        </div>
      </div>
    </div>`).join('');

  // ── TAB 2: SCANNER ───────────────────────────────────

  // Stats + source bars
  document.getElementById('ri-scanner-summary').innerHTML = [
    {val:RI.scanStats.total, label:'Signals Found',   col:'var(--white)'},
    {val:RI.scanStats.high,  label:'High Severity',   col:RI.scanStats.high>0?'var(--crimson)':'var(--emerald)'},
    {val:RI.scanStats.medium,label:'Medium Severity', col:'var(--gold)'},
  ].map(s=>`<div class="ri-scan-stat"><div class="ri-scan-stat-val" style="color:${s.col}">${s.val}</div><div class="ri-scan-stat-label">${s.label}</div></div>`).join('');

  document.getElementById('ri-source-bars').innerHTML = RI.sources.map(s=>`
    <div class="ri-sev-row">
      <div class="ri-sev-cat">${s.label}</div>
      <div class="fb-track"><div class="fb-fill" style="width:${s.pct}%;background:var(--steel);opacity:.5"></div></div>
      <div style="font-family:var(--font-mono);font-size:.62rem;color:var(--steel);text-align:right;">${s.count} signals</div>
    </div>`).join('');

  // Scanner severity (compact mirror)
  document.getElementById('ri-severity-display-scanner').innerHTML = `
    <div class="ri-sev-score" style="color:${sevColor(RI.severityLevel)}">${RI.severityScore}</div>
    <div class="ri-sev-label" style="color:${sevColor(RI.severityLevel)}">${RI.severityLevel} Emerging Risk</div>
    <div class="ri-sev-desc">${RI.severityDesc}</div>`;
  document.getElementById('ri-severity-breakdown-scanner').innerHTML = RI.severityByCategory.map(s=>`
    <div class="ri-sev-row">
      <div class="ri-sev-cat">${s.cat}</div>
      <div class="fb-track"><div class="fb-fill" style="width:${s.score}%;background:${s.color}"></div></div>
      <span class="ri-sev-badge" style="${sevBadgeStyle(s.level)}">${s.level}</span>
    </div>`).join('');

  // Build full feed (all timeline entries, capped at 12 with scroll)
  window._riFeedAll = TL;
  riBuildFeed(TL, '');

  // ── TAB 3: CLASSIFIER ────────────────────────────────

  // Heatmap
  const hmCats = [{key:'E',label:'Environmental'},{key:'S',label:'Social'},{key:'G',label:'Governance'},{key:'D',label:'AI / Digital'}];
  const hmCos  = ['DBS','GENT','GRAB'];
  const hmLabels= {'DBS':'DBS Group','GENT':'Genting','GRAB':'Grab'};
  const hmClass = l => l==='High'?'hm-high':l==='Med'?'hm-med':'hm-low';
  document.getElementById('ri-heatmap-wrap').innerHTML = `
    <table class="ri-heatmap">
      <thead><tr><th>Category</th>${hmCos.map(c=>`<th>${hmLabels[c]}</th>`).join('')}</tr></thead>
      <tbody>${hmCats.map(cat=>`<tr>
        <td style="text-align:left;font-family:var(--font-mono);font-size:.65rem;color:var(--white-2);background:none;border:none;">${cat.label}</td>
        ${hmCos.map(co=>{const lv=HEATMAP_DATA[co][cat.key];return`<td class="${hmClass(lv)}" onclick="switchCompany('${co}',document.querySelectorAll('.ri-company-btn')[${hmCos.indexOf(co)}]);riShowTab('classifier',document.querySelectorAll('.ri-tab')[3])">${lv}</td>`}).join('')}
      </tr>`).join('')}</tbody>
    </table>
    <div style="font-size:.62rem;color:var(--steel);font-family:var(--font-mono);">Click any cell to switch company and view that category's signals below.</div>`;

  // Filter bar + classifier grid
  const allCats = ['All','Environmental','Social','Governance','AI/Digital'];
  let activeFilter = 'All';
  document.getElementById('ri-filter-bar').innerHTML = allCats.map(c=>`
    <button class="ri-filter-btn${c==='All'?' active-filter':''}"
      style="${c==='All'?'background:var(--gold);color:var(--ink);border-color:var(--gold);':''}"
      onclick="riSetFilter('${c}',this)">${c}</button>`).join('');

  const catMeta = {
    E:{name:'Environmental',icon:'🌱',color:'var(--emerald)',filterKey:'Environmental'},
    S:{name:'Social',       icon:'🤝',color:'var(--blue)',   filterKey:'Social'},
    G:{name:'Governance',   icon:'⚖️',color:'var(--gold)',   filterKey:'Governance'},
    D:{name:'AI / Digital', icon:'🤖',color:'var(--steel)',  filterKey:'AI/Digital'},
  };
  const sigStyle = sev => sev==='high'?'background:var(--crimson-dim);border-color:var(--red-border)':sev==='med'?'background:rgba(240,160,32,.07);border-color:var(--amber-border)':'background:var(--glass);border-color:var(--border)';

  function buildClassifier() {
    document.getElementById('ri-classifier-grid').innerHTML = ['E','S','G','D'].map(cat=>{
      const m=catMeta[cat], signals=RI.classified[cat]||[];
      const hidden=activeFilter!=='All'&&m.filterKey!==activeFilter;
      const highestSev=signals.find(s=>s.sev==='high')?'high':signals.find(s=>s.sev==='med')?'med':'low';
      return `<div class="ri-cat-col" style="${hidden?'display:none':''}">
        <div class="ri-cat-header" style="border-color:${m.color}">
          <span class="ri-cat-icon">${m.icon}</span>
          <span class="ri-cat-name" style="color:${m.color}">${m.name}</span>
          <span class="ri-cat-count">${signals.length}</span>
          <span class="ri-sev-badge" style="${sevBadgeStyle(highestSev)};margin-left:.3rem;">${highestSev.toUpperCase()}</span>
        </div>
        ${signals.map((s,idx)=>{
          const sigId=`sig_${cat}_${idx}`;
          const url=SRCS[s.source];
          const srcHTML=url?`<a href="${url}" target="_blank" class="ri-signal-source-link">${s.source} ↗</a>`:`<span class="ri-signal-source-plain">${s.source}</span>`;
          const alerted=RI_ALERT_STATE[sigId];
          return `<div class="ri-signal-card" style="${sigStyle(s.sev)}" id="${sigId}">
            <div class="ri-signal-title">${s.title}</div>
            <div class="ri-signal-desc">${s.desc}</div>
            <div class="ri-signal-meta">
              ${srcHTML}
              <div class="ri-signal-right">
                <span class="ri-signal-age">${s.age}</span>
                <span style="font-family:var(--font-mono);font-size:.58rem;color:var(--steel);">${s.corroboration} src${s.corroboration>1?'s':''}</span>
                <button class="ri-alert-btn${alerted?' alerted':''}" onclick="riToggleAlert('${sigId}',this)">${alerted?'🔔 Alerted':'+ Alert'}</button>
              </div>
            </div>
          </div>`;
        }).join('')}
      </div>`;
    }).join('');
  }
  buildClassifier();

  window.riSetFilter = function(cat,btn){
    activeFilter=cat;
    document.querySelectorAll('.ri-filter-btn').forEach(b=>{b.classList.remove('active-filter');b.style.background=b.style.color=b.style.borderColor='';});
    btn.classList.add('active-filter');
    btn.style.background='var(--gold)';btn.style.color='var(--ink)';btn.style.borderColor='var(--gold)';
    buildClassifier();
  };
  window.riToggleAlert = function(sigId,btn){
    RI_ALERT_STATE[sigId]=!RI_ALERT_STATE[sigId];
    btn.textContent=RI_ALERT_STATE[sigId]?'🔔 Alerted':'+ Alert';
    btn.classList.toggle('alerted',RI_ALERT_STATE[sigId]);
  };

  // ── TAB 4: SEVERITY ──────────────────────────────────

  document.getElementById('ri-severity-display').innerHTML = `
    <div class="ri-sev-score" style="color:${sevColor(RI.severityLevel)}">${RI.severityScore}</div>
    <div class="ri-sev-label" style="color:${sevColor(RI.severityLevel)}">${RI.severityLevel} Emerging Risk</div>
    <div class="ri-sev-desc">${RI.severityDesc}</div>`;
  document.getElementById('ri-severity-breakdown').innerHTML = RI.severityByCategory.map(s=>`
    <div class="ri-sev-row">
      <div class="ri-sev-cat">${s.cat}</div>
      <div class="fb-track"><div class="fb-fill" style="width:${s.score}%;background:${s.color}"></div></div>
      <span class="ri-sev-badge" style="${sevBadgeStyle(s.level)}">${s.level}</span>
    </div>`).join('');

  // Trend sparkline
  const td = RI.trendData, W=500, H=110, pad=20;
  const maxV=Math.max(...td), minV=Math.min(...td);
  const xStep=(W-pad*2)/(td.length-1);
  const yScale=v=>H-pad-((v-minV)/(maxV-minV||1))*(H-pad*2);
  const pts=td.map((v,i)=>[(pad+i*xStep).toFixed(1),yScale(v).toFixed(1)]);
  const pathD='M'+pts.map(p=>p.join(',')).join(' L');
  const areaD=pathD+` L${pts[pts.length-1][0]},${H-pad} L${pts[0][0]},${H-pad} Z`;
  const weekLabels=['8w ago','7w ago','6w ago','5w ago','4w ago','3w ago','2w ago','Now'];
  document.getElementById('ri-trend-svg').innerHTML = `
    <defs><linearGradient id="tg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${sevColor(RI.severityLevel)}" stop-opacity=".25"/><stop offset="100%" stop-color="${sevColor(RI.severityLevel)}" stop-opacity="0"/></linearGradient></defs>
    <path d="${areaD}" fill="url(#tg)"/>
    <path d="${pathD}" fill="none" stroke="${sevColor(RI.severityLevel)}" stroke-width="1.5" stroke-linejoin="round"/>
    ${pts.map((p,i)=>`<text x="${p[0]}" y="${H-4}" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="9" fill="rgba(139,164,192,.6)">${weekLabels[i]}</text><text x="${p[0]}" y="${parseFloat(p[1])-6}" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="9" fill="${sevColor(RI.severityLevel)}">${td[i]}</text>`).join('')}`;

  // Score change log
  document.getElementById('ri-score-change-log').innerHTML = RI.scoreChangeLog.map(c=>`
    <div class="ri-score-change-item">
      <div class="ri-score-change-delta ${c.dir}">${c.dir==='up'?'↑':'↓'} ${c.delta}</div>
      <div><div class="ri-score-change-title">${c.title}</div><div class="ri-score-change-date">${c.date}</div></div>
    </div>`).join('');

  // ── TAB 5: AI EXPLANATIONS ───────────────────────────
  document.getElementById('ri-explanation-feed').innerHTML = RI.explanations.map((e,i)=>{
    const confClass = e.confidence==='High'?'high-conf':e.confidence==='Medium'?'med-conf':'spec-conf';
    return `<div class="ri-explain-item">
      <div class="ri-explain-header" onclick="riToggleExplain(${i},this)">
        <span class="ri-explain-cat-badge" style="background:${e.catColor}22;color:${e.catColor};border:1px solid ${e.catColor}44">${e.cat}</span>
        <span class="ri-explain-title">${e.title}</span>
        <span class="ri-explain-confidence ${confClass}">${e.confidence} confidence</span>
        <span class="ri-explain-chevron" id="chev-${i}">▼</span>
      </div>
      <div class="ri-explain-updated">${e.lastUpdated}</div>
      <div class="ri-explain-body-wrap" id="explain-body-${i}">
        <div class="ri-explain-body">${e.body}</div>
        <div class="ri-explain-why">💡 Why this matters to investors: ${e.why}</div>
      </div>
    </div>`;
  }).join('');

  window.riToggleExplain = function(i, headerEl){
    const body=document.getElementById(`explain-body-${i}`);
    const chev=document.getElementById(`chev-${i}`);
    const open=body.classList.toggle('open');
    chev.classList.toggle('open',open);
  };

  // ── TAB 6: ACTION RECOMMENDATIONS ────────────────────
  // Sort: High → Medium → Low
  const priorityOrder = {'High priority':0,'Medium priority':1,'Low priority':2};
  const sortedActions = [...RI.actions].sort((a,b)=>(priorityOrder[a.priority]||0)-(priorityOrder[b.priority]||0));
  document.getElementById('ri-action-feed').innerHTML = sortedActions.map(a=>{
    const state = RI_ACTION_STATE[a.id] || {status:'Pending', note:''};
    const statuses = ['Pending','In Review','Acted','Dismissed'];
    const statusClass = state.status.toLowerCase().replace(' ','');
    return `<div class="ri-action-item" style="background:${a.bg};border-color:${a.border}" id="action-wrap-${a.id}">
      <div class="ri-action-top">
        <span class="ri-action-verb" style="${verbStyleParts(a.verbColor)}">${a.verb}</span>
        <span class="ri-action-priority">${a.priority}</span>
        <span class="ri-action-due">📅 ${a.due}</span>
      </div>
      <div class="ri-action-title">${a.title}</div>
      <div class="ri-action-desc">${a.desc}</div>
      <div class="ri-action-footer">
        <button class="ri-status-btn ${statusClass}" id="status-${a.id}" onclick="riCycleStatus('${a.id}',this)">${state.status}</button>
        <textarea class="ri-action-note" id="note-${a.id}" placeholder="Add a note…" oninput="riSaveNote('${a.id}',this)">${state.note}</textarea>
      </div>
    </div>`;
  }).join('');

  window.riCycleStatus = function(id, btn){
    const statuses=['Pending','In Review','Acted','Dismissed'];
    const state = RI_ACTION_STATE[id] || {status:'Pending',note:''};
    const next = statuses[(statuses.indexOf(state.status)+1)%statuses.length];
    RI_ACTION_STATE[id] = {...state, status:next};
    btn.textContent = next;
    btn.className = 'ri-status-btn '+next.toLowerCase().replace(' ','');
  };
  window.riSaveNote = function(id, ta){
    RI_ACTION_STATE[id] = {...(RI_ACTION_STATE[id]||{status:'Pending'}), note:ta.value};
    ta.style.height = 'auto';
    ta.style.height = Math.max(28, ta.scrollHeight)+'px';
  };
}

// ════════════════════════════════════════════════════════════
// SECTION 8 — LIVE FEED + SEARCH (Scanner tab)
// ════════════════════════════════════════════════════════════
function riBuildFeed(entries, query) {
  const MAX = 12;
  const filtered = query
    ? entries.filter(t=>t.title.toLowerCase().includes(query.toLowerCase())||t.desc.toLowerCase().includes(query.toLowerCase())||t.cat.toLowerCase().includes(query.toLowerCase()))
    : entries;
  const shown = filtered.slice(0, MAX);
  document.getElementById('ri-feed-count').textContent =
    `Showing ${shown.length} of ${filtered.length} signal${filtered.length!==1?'s':''}${entries.length>MAX&&!query?' (scroll for more)':''}`;
  document.getElementById('ri-feed-list').innerHTML = shown.map((t,i)=>`
    <div class="ri-feed-item" style="animation-delay:${i*40}ms;grid-template-columns:100px 8px 1fr;">
      <div class="ri-feed-dt">${t.datetime.replace('\n','<br>')}</div>
      <div class="ri-feed-dot" style="background:${t.dotColor}"></div>
      <div class="ri-feed-body">
        <div class="ri-feed-title">${t.title}</div>
        <div class="ri-feed-desc">${t.desc}</div>
        <div class="ri-feed-badges">
          <span class="ri-feed-cat" style="background:${t.catColor}22;color:${t.catColor};border:1px solid ${t.catColor}44">${t.cat}</span>
          <span class="ri-feed-corroboration">${t.corroboration} source${t.corroboration>1?'s':''}</span>
          <span class="ri-feed-vs">${t.vsTraditional}</span>
        </div>
      </div>
    </div>`).join('');
}

window.riFilterFeed = function(q) {
  const TL = RISK_INTEL_TIMELINE[ticker] || RISK_INTEL_TIMELINE['DBS'];
  riBuildFeed(TL, q);
};

// ════════════════════════════════════════════════════════════
// SECTION 9 — SCAN ANIMATION
// ════════════════════════════════════════════════════════════
const SCAN_MESSAGES = [
  'Connecting to news feeds\u2026',
  'Scanning regulatory filings\u2026',
  'Processing ESG reports\u2026',
  'Classifying signals by category\u2026',
  'Calculating severity scores\u2026',
  'Comparing against traditional ratings\u2026',
  'Generating AI explanations\u2026',
  'Scan complete.',
];

function runScanAnimation(callback) {
  const overlay = document.getElementById('ri-scan-overlay');
  const fill    = document.getElementById('ri-progress-fill');
  const status  = document.getElementById('ri-scan-status');

  // hide all tab panels during scan
  document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
  overlay.style.display = 'block';

  let step=0;
  const total=SCAN_MESSAGES.length;
  const iv=setInterval(()=>{
    status.textContent=SCAN_MESSAGES[step];
    fill.style.width=Math.round(((step+1)/total)*100)+'%';
    step++;
    if(step>=total){
      clearInterval(iv);
      setTimeout(()=>{ overlay.style.display='none'; callback(); },300);
    }
  },220);
}

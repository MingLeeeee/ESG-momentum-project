/*
  ╔══════════════════════════════════════════════════════╗
  ║  ri-styles.js — Risk Intelligence CSS                ║
  ║  Author : Moses Ng  ·  IT3852 BIP AY2026 S1         ║
  ║                                                      ║
  ║  WHAT THIS FILE IS:                                  ║
  ║  All CSS for the Risk Intelligence module,           ║
  ║  injected into <head> at runtime via JS so it        ║
  ║  stays isolated from the groupmates' styles.         ║
  ║                                                      ║
  ║  WHERE IT LIVES IN detail2.html:                     ║
  ║  Lines 1399–1519, inside the <script> block,         ║
  ║  runs immediately on page load.                      ║
  ║                                                      ║
  ║  CSS CLASSES DEFINED (all prefixed .ri-):            ║
  ║  .risk-intel-tab      — tab button gold accent       ║
  ║  .ri-scan-*           — scan overlay & progress bar  ║
  ║  .ri-banner-*         — module header banner         ║
  ║  .ri-scanner-*        — Risk Scanner card            ║
  ║  .ri-sev-*            — Risk Severity Score card     ║
  ║  .ri-gap-*            — ESG Rating Gap card          ║
  ║  .ri-filter-*         — classifier filter buttons    ║
  ║  .ri-classifier-grid  — 4-column signal grid         ║
  ║  .ri-signal-*         — individual signal cards      ║
  ║  .ri-alert-btn        — alert toggle button          ║
  ║  .ri-tl-*             — Signal Timeline feed         ║
  ║  .ri-explain-*        — AI Explanation Panel         ║
  ║  .ri-action-*         — Investor Action cards        ║
  ╚══════════════════════════════════════════════════════╝
*/

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

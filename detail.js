/* SHARED MASTER SCRIPT */
(function(){
  'use strict';
  const revealEls=document.querySelectorAll('.reveal');
  if(revealEls.length){const ro=new IntersectionObserver((entries)=>{entries.forEach((e,i)=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add('visible'),i*55);ro.unobserve(e.target);}});},{threshold:.08,rootMargin:'0px 0px -36px 0px'});revealEls.forEach(el=>ro.observe(el));}
  const toggle=document.getElementById('navToggle');
  const drawer=document.getElementById('navDrawer');
  if(toggle&&drawer){
    toggle.addEventListener('click',()=>{const open=drawer.classList.toggle('open');toggle.setAttribute('aria-expanded',open);const bars=toggle.querySelectorAll('span');if(open){bars[0].style.cssText='transform:translateY(7px) rotate(45deg)';bars[1].style.cssText='opacity:0';bars[2].style.cssText='transform:translateY(-7px) rotate(-45deg)';}else{bars.forEach(b=>b.style.cssText='');}});
    drawer.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{drawer.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.querySelectorAll('span').forEach(b=>b.style.cssText='');}));
    document.addEventListener('click',(e)=>{if(!toggle.contains(e.target)&&!drawer.contains(e.target)){drawer.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.querySelectorAll('span').forEach(b=>b.style.cssText='');}});
  }
})();

/* DETAIL PAGE SCRIPT */

const ALL_COMPANIES = {
  DBS:{ticker:'DBS',name:'DBS Group Holdings',country:'SG',flag:'🇸🇬',sector:'Banking',exchange:'SGX',esg:74.2,env:70,soc:78,gov:75,momentum:1.8,signal:'buy',
    debt:82,moat:79,mgmt:76,rep:74,future:70,geo:58,
    sparkData:[68,69,70,71,69,72,73,71,73,74,74,74],
    updated:'Today 09:42',
    ceo:{name:'Piyush Gupta',title:'Group Chief Executive Officer',tenure:'Since 2009',rep:['Strong Track Record','Recognised Regionally','ESG Champion'],
      desc:'Piyush Gupta has led DBS to become the largest bank in Southeast Asia. Recognised globally for digital transformation leadership and sustainable finance advocacy.'},
    cfo:{name:'Chng Sok Hui',title:'Group Chief Financial Officer',tenure:'Since 2008',rep:['Highly Experienced','Consistent Reporting','Strong Governance'],
      desc:'Chng Sok Hui oversees group finance, investor relations, and capital management. Known for transparency in financial disclosure and conservative risk management.'},
    finHealth:[
      {k:'Debt-to-Equity',v:'0.82x',note:'Below sector avg 1.1x'},
      {k:'Interest Coverage',v:'4.8x',note:'Comfortable'},
      {k:'Revenue Growth (YoY)',v:'+12.4%',note:'Strong'},
      {k:'Net Interest Margin',v:'2.14%',note:'Improving'},
      {k:'NPL Ratio',v:'1.1%',note:'Low'},
      {k:'CET1 Ratio',v:'14.2%',note:'Well capitalised'},
    ],
    moatFactors:[
      {label:'Brand Equity',score:85,desc:'#1 bank brand in SEA'},
      {label:'Switching Costs',score:82,desc:'Deep corporate relationships'},
      {label:'Network Effects',score:78,desc:'DigiBank ecosystem'},
      {label:'Cost Advantage',score:71,desc:'Digital cost efficiency'},
    ],
    futurePlans:[
      {k:'Sustainability Target',v:'Net zero by 2050'},
      {k:'Green Finance Commitment',v:'$50bn by 2030'},
      {k:'Digital Investment',v:'$1.5bn (2025)'},
      {k:'Greenwash Risk',v:'Low (AI assessed)'},
    ],
    alerts:[
      {sev:'l',co:'DBS Group',txt:'Published TCFD-aligned climate disclosure. Scored highest among ASEAN banks for governance transparency.',time:'Mar 2025',factor:'F-01'},
    ],
    timeline:[
      {date:'Mar 2025',color:'var(--green)',desc:'TCFD climate disclosure published. Best-in-class governance transparency score.',tag:'Governance',tagc:'green'},
      {date:'Feb 2025',color:'var(--green)',desc:'Named top ESG bank in Southeast Asia by Global Finance magazine.',tag:'Recognition',tagc:'green'},
      {date:'Jan 2025',color:'var(--green)',desc:'Green financing reached $35bn milestone, ahead of 2030 target schedule.',tag:'Environmental',tagc:'green'},
      {date:'Nov 2024',color:'var(--amber)',desc:'Minor data breach reported. Resolved within 48hrs. Regulatory notification filed.',tag:'Social',tagc:'amber'},
    ],
    allegations:[{sev:'l',txt:'No material allegations on record. NLP monitoring clear.',time:'Ongoing'}],
    predictions:[
      {label:'Governance Deterioration',pct:12,ci:'[7–17%]',color:'var(--green)',verdict:'Low'},
      {label:'Fraud / Allegation Risk',pct:8,ci:'[4–12%]',color:'var(--green)',verdict:'Low'},
      {label:'ESG Score Reversal',pct:15,ci:'[10–20%]',color:'var(--green)',verdict:'Low'},
      {label:'CEO Departure Risk',pct:18,ci:'[12–24%]',color:'var(--green)',verdict:'Low'},
    ],
    geoRisk:[
      {icon:'🇨🇳',title:'China Trade Dependency',desc:'20% revenue linked to Greater China operations. Trade tension escalation would affect cross-border lending.',badge:'MED',badgec:'amber'},
      {icon:'🌊',title:'South China Sea',desc:'Minimal direct operational exposure. Indirect impact via regional client base.',badge:'LOW',badgec:'green'},
      {icon:'⚖️',title:'MAS Regulatory Environment',desc:'MAS actively strengthening ESG disclosure requirements, benefitting DBS as early mover.',badge:'POSITIVE',badgec:'green'},
    ],
    peers:[
      {name:'OCBC Bank',ticker:'OCBC',esg:82.1,debt:88,gov:84,rep:86,signal:'buy'},
      {name:'UOB',ticker:'UOB',esg:71.0,debt:80,gov:74,rep:72,signal:'buy'},
      {name:'CIMB Group',ticker:'CIMB',esg:69.4,debt:72,gov:64,rep:66,signal:'hold'},
      {name:'Maybank',ticker:'MAYB',esg:67.2,debt:70,gov:68,rep:64,signal:'hold'},
    ],
    aiInsight:'DBS shows strong ESG momentum driven by its industry-leading climate disclosure and consistent governance scores. The +1.8pt improvement this week reflects positive news flow around its sustainable finance targets. No governance red flags detected. Social scores remain stable on good employee welfare ratings. Key watch area: geopolitical exposure via China operations warrants monitoring amid trade tensions.',
    predAi:'Based on current trajectory, DBS is projected to maintain or improve its ESG score over the next 90 days. The governance and management factors are the strongest contributors. Recommend maintaining position. No material risk triggers detected.',
    geoAi:'Singapore\'s stable regulatory environment and MAS\'s proactive ESG framework are structural positives for DBS. The primary risk vector is China trade dependency (~20% of revenue). South China Sea tensions create indirect risk to the regional client base but direct operational exposure is minimal.',
    debtAi:'DBS maintains a conservative balance sheet with Debt-to-Equity of 0.82x, well below the regional banking average of 1.1x. Interest coverage of 4.8x provides strong buffer against rate volatility. CET1 capital ratio of 14.2% is well above the 10.5% MAS requirement.',
    futureAi:'DBS\'s 2030 green finance target of $50bn is credible based on current run-rate of $35bn (Jan 2025). The digital investment pipeline is well-funded. Greenwash risk assessed as Low — targets are quantified, time-bound, and subject to third-party verification.',
    mgmtAi:'Piyush Gupta\'s long tenure (2009–present) provides exceptional institutional stability. His public profile scores highly on governance advocacy and ESG leadership. No leadership change risk detected in the next 12 months. CFO Chng Sok Hui has maintained consistent financial reporting quality over 17 years.',
    repAi:'No material allegations detected in the 24-month monitoring window. Minor Nov 2024 data breach was managed transparently and disclosed proactively to MAS. Sentiment analysis of media coverage is net positive over the past 30 days.',
    conflictDesc:'Singapore has minimal direct conflict exposure. As a global financial hub, it acts as a conduit for ASEAN trade but is not directly party to territorial disputes. The primary geopolitical risk is any escalation affecting the Strait of Malacca shipping lanes.',
    conflicts:[
      {icon:'🌊',title:'Strait of Malacca',desc:'Critical shipping lane for Singapore. 80% of ASEAN trade transits this route. Any disruption would impact trade finance volumes.'},
      {icon:'🇨🇳',title:'US–China Tech War',desc:'Sanctions and export controls create compliance complexity for DBS\'s Greater China trade finance book.'},
    ]
  },
  GENT:{ticker:'GENT',name:'Genting Berhad',country:'MY',flag:'🇲🇾',sector:'Consumer',exchange:'Bursa Malaysia',esg:55.1,env:52,soc:58,gov:44,momentum:-3.1,signal:'watch',
    debt:58,moat:60,mgmt:44,rep:50,future:55,geo:52,
    sparkData:[60,62,61,63,60,58,57,59,56,56,55,55],
    updated:'Today 09:42',
    ceo:{name:'KT Lim',title:'Executive Chairman & CEO',tenure:'Since 1979',rep:['Long Tenure','Family-Controlled','Recent Scrutiny'],
      desc:'KT Lim, son of founder Lim Goh Tong, has led Genting for over four decades. Recent board changes have raised questions about governance independence. His dual Chairman/CEO role has been flagged by proxy advisors.'},
    cfo:{name:'Chin Kim Fatt',title:'Group Chief Financial Officer',tenure:'Since 2015',rep:['Experienced','Under Review'],
      desc:'Chin Kim Fatt has managed group financials through several expansion cycles. Currently under scrutiny following the audit committee changes related to the board resignations.'},
    finHealth:[
      {k:'Debt-to-Equity',v:'1.8x',note:'Above sector avg — elevated'},
      {k:'Interest Coverage',v:'2.1x',note:'Thinning — monitor'},
      {k:'Revenue Growth (YoY)',v:'+3.2%',note:'Slowing'},
      {k:'Net Profit Margin',v:'8.4%',note:'Declining'},
      {k:'Cash Conversion',v:'71%',note:'Moderate'},
      {k:'Debt Maturity Profile',v:'S$2.4bn (2026)',note:'Refinancing risk'},
    ],
    moatFactors:[
      {label:'Brand Equity',score:68,desc:'Strong regional gaming brand'},
      {label:'Regulatory Moat',score:75,desc:'Limited gaming licences in MY/SG'},
      {label:'Switching Costs',score:55,desc:'Moderate for integrated resorts'},
      {label:'Capital Barriers',score:62,desc:'High capex for new entrants'},
    ],
    futurePlans:[
      {k:'NY Resorts World',v:'$4bn expansion ongoing'},
      {k:'Sustainability Target',v:'Weak — not quantified'},
      {k:'Renewables Commitment',v:'20% by 2030 (unverified)'},
      {k:'Greenwash Risk',v:'Medium (AI assessed)'},
    ],
    alerts:[
      {sev:'h',co:'Genting Berhad',txt:'Governance score dropped 5.2pts. Two independent directors resigned. Board composition now below CGSI threshold for independent oversight.',time:'2m ago',factor:'F-03'},
    ],
    timeline:[
      {date:'May 2025',color:'var(--red)',desc:'2 independent directors resigned from the board. Securities Commission Malaysia reviewing governance compliance.',tag:'Governance',tagc:'red'},
      {date:'Mar 2025',color:'var(--amber)',desc:'S&P placed Genting on CreditWatch Negative citing elevated leverage and governance concerns.',tag:'Financial',tagc:'amber'},
      {date:'Dec 2024',color:'var(--red)',desc:'Minority shareholder action over related-party transactions. Case ongoing.',tag:'Governance',tagc:'red'},
      {date:'Oct 2024',color:'var(--amber)',desc:'Casino operations in Malaysia fined RM12m for AML compliance gaps.',tag:'Compliance',tagc:'amber'},
    ],
    allegations:[
      {sev:'h',txt:'Board governance investigation underway by Securities Commission Malaysia following independent director resignations.',time:'May 2025'},
      {sev:'m',txt:'Minority shareholder lawsuit over related-party property transaction at below-market value.',time:'Mar 2025'},
    ],
    predictions:[
      {label:'Governance Deterioration',pct:65,ci:'[58–72%]',color:'var(--red)',verdict:'High'},
      {label:'Fraud / Allegation Risk',pct:42,ci:'[34–50%]',color:'var(--red)',verdict:'Med-High'},
      {label:'ESG Score Reversal',pct:58,ci:'[50–66%]',color:'var(--red)',verdict:'High'},
      {label:'CEO Departure Risk',pct:28,ci:'[20–36%]',color:'var(--amber)',verdict:'Med'},
    ],
    geoRisk:[
      {icon:'🇲🇾',title:'Malaysian Political Risk',desc:'Coalition government instability creates regulatory uncertainty for gaming licences.',badge:'MED',badgec:'amber'},
      {icon:'🎰',title:'US Gaming Regulatory Risk',desc:'New York Resorts World faces licence renewal scrutiny from NY regulators.',badge:'HIGH',badgec:'red'},
      {icon:'🌊',title:'Regional Conflict Exposure',desc:'Limited direct exposure but regional tourism downturn from conflict would impact resorts.',badge:'LOW',badgec:'green'},
    ],
    peers:[
      {name:'Las Vegas Sands',ticker:'LVS',esg:62.0,debt:65,gov:66,rep:60,signal:'hold'},
      {name:'Marina Bay Sands',ticker:'MBS',esg:68.5,debt:70,gov:72,rep:68,signal:'hold'},
      {name:'Resorts World (SG)',ticker:'RWS',esg:64.0,debt:66,gov:68,rep:62,signal:'hold'},
    ],
    aiInsight:'Genting\'s ESG score is under significant downward pressure. The board governance crisis — two independent director resignations in one week — has triggered a −5.2pt governance sub-score decline. NLP monitoring shows negative sentiment across Malaysian and international financial media. Debt levels are elevated at 1.8x D/E with a S$2.4bn refinancing wall in 2026. The combination of governance risk, financial stress, and upcoming regulatory review in New York creates a triple-risk scenario uncommon among regional peers.',
    predAi:'Genting presents one of the highest ESG risk profiles in the ASEAN coverage universe. The 65% governance deterioration probability is driven by continued board instability signals. Recommend reducing exposure until board composition stabilises and the Securities Commission review concludes. Target re-entry if governance score recovers above 55.',
    geoAi:'Genting\'s geographic diversification (MY, SG, UK, US, Bahamas) creates complex regulatory exposure. The most acute risk is in New York, where the Resorts World licence is subject to annual review and the board governance issues could influence regulator confidence.',
    debtAi:'Genting\'s 1.8x Debt-to-Equity is the highest in the regional consumer/hospitality peer group. The S$2.4bn debt maturity in 2026 will require refinancing in a higher-rate environment. Interest coverage of 2.1x is thin and declining — any EBITDA shortfall could trigger covenant issues.',
    futureAi:'Genting\'s sustainability targets lack quantification and third-party verification. The NY expansion capex ($4bn) risks further leveraging the balance sheet. AI greenwash detection model flags moderate risk of unsubstantiated environmental claims in recent investor presentations.',
    mgmtAi:'The dual Chairman/CEO role of KT Lim creates a single point of governance failure. The recent independent director resignations — understood to relate to disagreements over related-party transactions — represent a material governance red flag. Proxy advisors ISS and Glass Lewis have flagged the board composition as non-compliant with best practice.',
    repAi:'Genting has two active allegations in monitoring: a Securities Commission governance investigation and a minority shareholder lawsuit. NLP analysis of the past 30-day media coverage shows 68% negative sentiment, the highest in the ASEAN consumer sector. Reputation score is trending downward.',
    conflictDesc:'Malaysia\'s political landscape is the primary geopolitical risk for Genting\'s domestic operations. The gaming licence framework is politically sensitive and any change in government could trigger policy review.',
    conflicts:[
      {icon:'🎲',title:'Gaming Licence Regulation',desc:'Malaysian gaming licences are politically sensitive. Government change could trigger licence fee increases or operational restrictions.'},
      {icon:'🇺🇸',title:'US Regulatory Environment',desc:'NY State gaming commission requires operators to maintain fit-and-proper standards. Governance issues may trigger licence review.'},
    ]
  },
  GRAB:{ticker:'GRAB',name:'Grab Holdings',country:'SG',flag:'🇸🇬',sector:'Technology',exchange:'NASDAQ',esg:68.5,env:72,soc:74,gov:62,momentum:2.4,signal:'buy',
    debt:60,moat:74,mgmt:71,rep:72,future:80,geo:65,
    sparkData:[62,63,64,63,65,65,66,67,66,68,68,68],
    updated:'Today 09:01',
    ceo:{name:'Anthony Tan',title:'Group Chief Executive Officer & Co-Founder',tenure:'Since 2012',rep:['Founder-led','Vision-driven','ESG Advocate'],
      desc:'Anthony Tan co-founded Grab in 2012 and has built it into Southeast Asia\'s leading super-app. Known for sustainability advocacy and social impact programmes. Maintains a high-profile regional presence.'},
    cfo:{name:'Peter Oey',title:'Chief Financial Officer',tenure:'Since 2023',rep:['New Appointment','Cost Discipline','Path to Profitability'],
      desc:'Peter Oey joined Grab in 2023 with a mandate to achieve profitability. Former CFO at Angi Homeservices. Bringing rigorous cost control to the platform.'},
    finHealth:[
      {k:'Revenue Growth (YoY)',v:'+24.1%',note:'Strong momentum'},
      {k:'EBITDA (Adj)',v:'$234m',note:'First full-year positive'},
      {k:'Cash on Hand',v:'$5.2bn',note:'Strong liquidity'},
      {k:'Debt-to-Equity',v:'0.42x',note:'Conservative'},
      {k:'Take Rate',v:'12.4%',note:'Improving'},
      {k:'Monthly Active Users',v:'35m+',note:'Growing'},
    ],
    moatFactors:[
      {label:'Network Effects',score:86,desc:'Driver-rider density advantage'},
      {label:'Super-app Ecosystem',score:82,desc:'Payments, food, transport lock-in'},
      {label:'Brand Equity',score:78,desc:'Top-of-mind in SEA markets'},
      {label:'Data Advantage',score:80,desc:'Proprietary SEA consumer data'},
    ],
    futurePlans:[
      {k:'Carbon Neutrality Target',v:'2035 (announced May 2025)'},
      {k:'EV Fleet Transition',v:'50% by 2030 w/ BYD'},
      {k:'GrabPay Expansion',v:'6 new markets by 2026'},
      {k:'Greenwash Risk',v:'Low (AI assessed)'},
    ],
    alerts:[
      {sev:'l',co:'Grab Holdings',txt:'Carbon neutrality target 2035 announced. AI credibility: Medium. Greenwash risk: Low. Momentum ↑ +1.4.',time:'41m ago',factor:'F-05'},
    ],
    timeline:[
      {date:'May 2025',color:'var(--green)',desc:'Carbon neutrality target announced for 2035. EV fleet partnership with BYD signed.',tag:'Environmental',tagc:'green'},
      {date:'Apr 2025',color:'var(--green)',desc:'First adjusted EBITDA-positive full year confirmed. Path to profitability validated.',tag:'Financial',tagc:'green'},
      {date:'Feb 2025',color:'var(--green)',desc:'GrabPay crossed $20bn in annualised payment volume across SEA markets.',tag:'Social',tagc:'green'},
      {date:'Dec 2024',color:'var(--amber)',desc:'Indonesia antitrust review of food delivery market share. Outcome pending.',tag:'Governance',tagc:'amber'},
    ],
    allegations:[{sev:'l',txt:'Indonesia antitrust review of food delivery market. Not a material ESG concern at current stage.',time:'Dec 2024'}],
    predictions:[
      {label:'Governance Deterioration',pct:18,ci:'[12–24%]',color:'var(--green)',verdict:'Low'},
      {label:'Fraud / Allegation Risk',pct:12,ci:'[7–17%]',color:'var(--green)',verdict:'Low'},
      {label:'ESG Score Reversal',pct:22,ci:'[15–29%]',color:'var(--green)',verdict:'Low'},
      {label:'Regulatory Risk',pct:34,ci:'[26–42%]',color:'var(--amber)',verdict:'Med'},
    ],
    geoRisk:[
      {icon:'🇮🇩',title:'Indonesia Antitrust Risk',desc:'Market dominance in food delivery subject to KPPU review. Could result in conduct remedies.',badge:'MED',badgec:'amber'},
      {icon:'🇻🇳',title:'Vietnam Regulatory',desc:'New platform economy regulations in Vietnam create compliance overhead.',badge:'LOW',badgec:'green'},
      {icon:'🌏',title:'ASEAN Data Localisation',desc:'Diverging data localisation laws across markets increasing compliance cost.',badge:'LOW',badgec:'green'},
    ],
    peers:[
      {name:'Sea Limited',ticker:'SEA',esg:70.0,debt:55,gov:72,rep:70,signal:'buy'},
      {name:'Gojek / GoTo',ticker:'GOTO',esg:58.4,debt:48,gov:58,rep:56,signal:'hold'},
      {name:'Shopee (SEA)',ticker:'SEA',esg:70.0,debt:55,gov:72,rep:70,signal:'buy'},
    ],
    aiInsight:'Grab\'s +2.4pt momentum this week is the strongest in the ASEAN Technology sector. The carbon neutrality announcement adds to an already positive ESG trajectory underpinned by its first profitable year and strong social scores from its driver welfare programmes. Governance is the weakest sub-score (62) — the Indonesia antitrust review and CFO transition in 2023 are the primary watch items. Overall profile is positive.',
    predAi:'Grab presents a compelling ESG investment case. Low fraud and governance deterioration risk. The 34% regulatory risk score reflects multi-market regulatory complexity rather than any specific misconduct signal. Recommend: Attractive entry for ESG-focused portfolios.',
    geoAi:'Grab\'s exposure across 6 ASEAN markets creates regulatory complexity but no concentrated geopolitical risk. The Indonesia antitrust review is the highest-probability risk event and should be monitored for outcome in H2 2025.',
    debtAi:'Grab\'s debt profile is conservative with D/E of 0.42x and $5.2bn cash. The path to profitability validates the balance sheet strategy. No refinancing risk in the near term.',
    futureAi:'The 2035 carbon neutrality target is credible and well-structured — quantified, partnered (BYD), and time-bound. The EV fleet transition roadmap is the most detailed in the ASEAN tech sector. Greenwash risk assessed as Low.',
    mgmtAi:'Anthony Tan\'s founder-led model provides strategic clarity but creates key-person risk. Governance score is penalised by the dual class share structure limiting minority shareholder rights. Peter Oey\'s appointment as CFO in 2023 has delivered measurable results in cost discipline.',
    repAi:'Grab\'s reputation profile is strong. Positive media coverage dominates (72% positive sentiment in past 30 days). The Indonesia antitrust review is being monitored but is not yet a material reputation risk.',
    conflictDesc:'Grab operates across all six ASEAN markets covered by this platform. Its super-app model means any regional geopolitical escalation could affect multiple business lines simultaneously, but no single conflict scenario represents existential risk.',
    conflicts:[
      {icon:'🌊',title:'South China Sea Tensions',desc:'Indirect impact via regional consumer confidence and cross-border trade in Vietnam and Philippines markets.'},
      {icon:'📱',title:'US–China Tech Restrictions',desc:'Hardware supply chain (smartphones, IoT devices) may be affected by export controls impacting platform device penetration.'},
    ]
  }
};

// Default fallback for unknown tickers
function makeDefault(ticker){
  return {
    ticker,name:ticker+' Corporation',country:'SG',flag:'🇸🇬',sector:'Finance',exchange:'SGX',
    esg:65.0,env:63,soc:67,gov:65,momentum:0.5,signal:'hold',
    debt:68,moat:65,mgmt:65,rep:65,future:62,geo:60,
    sparkData:[62,62,63,64,64,65,65,65,65,65,65,65],
    updated:'Today 09:00',
    ceo:{name:'Chief Executive',title:'Group CEO',tenure:'Current',rep:['Experienced'],desc:'Information being updated.'},
    cfo:{name:'Chief Financial Officer',title:'Group CFO',tenure:'Current',rep:['Experienced'],desc:'Information being updated.'},
    finHealth:[{k:'ESG Data',v:'Available on Pro plan',note:''}],
    moatFactors:[{label:'Moat Score',score:65,desc:'Data loading'}],
    futurePlans:[{k:'Future Plans',v:'Data loading'}],
    alerts:[{sev:'l',co:ticker,txt:'No active alerts.',time:'—',factor:'—'}],
    timeline:[{date:'Recent',color:'var(--text3)',desc:'No recent events.',tag:'General',tagc:'green'}],
    allegations:[{sev:'l',txt:'No material allegations on record.',time:'—'}],
    predictions:[
      {label:'Governance Risk',pct:25,ci:'[18–32%]',color:'var(--amber)',verdict:'Med'},
      {label:'Fraud Risk',pct:20,ci:'[13–27%]',color:'var(--green)',verdict:'Low'},
      {label:'ESG Reversal',pct:30,ci:'[22–38%]',color:'var(--amber)',verdict:'Med'},
      {label:'CEO Risk',pct:15,ci:'[9–21%]',color:'var(--green)',verdict:'Low'},
    ],
    geoRisk:[{icon:'🌏',title:'Regional Risk',desc:'Standard ASEAN regional exposure.',badge:'MED',badgec:'amber'}],
    peers:[],
    aiInsight:'Full analysis available for this company. Score reflects ASEAN average baseline. Enable real-time data feeds for live intelligence.',
    predAi:'Prediction models loading. Insufficient data signals for high-confidence forecast.',
    geoAi:'Geographic risk assessment available for full ASEAN coverage universe.',
    debtAi:'Financial data being aggregated from annual report and alternative data sources.',
    futureAi:'Strategic plan analysis pending document processing.',
    mgmtAi:'Leadership profile being compiled from public records and regulatory filings.',
    repAi:'Reputation monitoring active. No material allegations detected in initial scan.',
    conflictDesc:'Standard ASEAN geopolitical risk monitoring applies.',
    conflicts:[{icon:'🌏',title:'ASEAN Regional Risk',desc:'Standard monitoring active.'}]
  };
}

function getURLParam(k){return new URLSearchParams(window.location.search).get(k);}

const ticker = (getURLParam('ticker')||'DBS').toUpperCase();
const D = ALL_COMPANIES[ticker] || makeDefault(ticker);

// Populate header
document.getElementById('bc-name').textContent = D.name;
document.getElementById('co-avatar').textContent = D.ticker[0];
document.getElementById('co-fullname').textContent = D.name;
document.getElementById('co-ticker').textContent = D.ticker;
document.getElementById('co-country').textContent = `${D.flag} ${D.country}`;
document.getElementById('co-sector').textContent = D.sector;
document.getElementById('co-exchange').textContent = D.exchange;
document.getElementById('co-updated').textContent = D.updated;

const scoreColor = D.esg>=70?'#4ade80':D.esg>=60?'#fbbf24':'#f87171';
const momColor = D.momentum>0?'color:#4ade80':D.momentum<0?'color:#f87171':'color:#fbbf24';
const momArrow = D.momentum>0?'↑':D.momentum<0?'↓':'●';
document.getElementById('co-score').textContent = D.esg;
document.getElementById('co-score').style.color = scoreColor;
document.getElementById('co-momentum').innerHTML = `<span style="${momColor};font-size:.8rem;">${momArrow} ${D.momentum>0?'+':''}${D.momentum} (30D)</span>`;

const sigMap = {buy:['sig-buy-b','🟢 Attractive'],hold:['sig-hold-b','🟡 Neutral'],watch:['sig-watch-b','🔴 Watch']};
const sb = document.getElementById('co-signal-badge');
sb.className = 'co-signal-badge '+sigMap[D.signal][0];
sb.textContent = sigMap[D.signal][1];

// Score ring
setTimeout(()=>{
  const ring=document.getElementById('score-ring');
  const circumference=251;
  const offset=circumference-(D.esg/100)*circumference;
  ring.style.strokeDashoffset=offset;
  ring.style.stroke=D.esg>=70?'var(--green)':D.esg>=60?'var(--gold)':'var(--red)';
},100);

// Overview score
document.getElementById('ov-score').textContent=D.esg;
document.getElementById('ov-score').style.color=D.esg>=70?'var(--green)':D.esg>=60?'var(--amber)':'var(--red)';
document.getElementById('ov-momentum').innerHTML=`<span style="${momColor};font-size:.75rem;">${momArrow} ${D.momentum>0?'+':''}${D.momentum} pts this week</span>`;
const ovSig=document.getElementById('ov-signal-small');
ovSig.innerHTML=`<span style="font-size:.65rem;font-weight:600;padding:3px 10px;text-transform:uppercase;letter-spacing:.08em;${D.signal==='buy'?'background:var(--green-bg);color:var(--green);border:1px solid var(--green-border);':D.signal==='hold'?'background:var(--amber-bg);color:var(--amber);border:1px solid var(--amber-border);':'background:var(--red-bg);color:var(--red);border:1px solid var(--red-border);'}">${sigMap[D.signal][1]}</span>`;

// Sparkline
const sData=D.sparkData;
const sMax=Math.max(...sData);const sMin=Math.min(...sData);
const weeks=['W1','W2','W3','W4','W5','W6','W7','W8','W9','W10','W11','W12'];
document.getElementById('sparkline').innerHTML=sData.map((v,i)=>{
  const pct=((v-sMin)/(sMax-sMin||1)*80+10);
  const col=v>=70?'var(--green)':v>=60?'var(--gold)':'var(--red)';
  return `<div class="spark-bar" style="height:${pct}%;background:${col};opacity:.7;"></div>`;
}).join('');
document.getElementById('spark-labels').innerHTML=`<span>${weeks[0]}</span><span>${weeks[5]}</span><span>${weeks[11]}</span>`;

// Factor bars
const factors=[
  {k:'Sustainability Capacity',v:D.debt,delta:'+0.5'},
  {k:'Business Resilience',v:D.moat,delta:'+0.2'},
  {k:'Governance Quality',v:D.mgmt,delta:D.signal==='watch'?'−1.2':'+0.3'},
  {k:'Reputation & Sentiment',v:D.rep,delta:D.signal==='watch'?'−2.1':'+0.1'},
  {k:'Strategic Readiness',v:D.future,delta:'+0.8'},
  {k:'Geopolitical Exposure',v:D.geo,delta:'−0.3'},
];
document.getElementById('factor-bars').innerHTML=factors.map(f=>{
  const fc=f.v>=70?'var(--green)':f.v>=60?'var(--gold)':'var(--red)';
  const dc=f.delta.startsWith('+')?'color:var(--green)':f.delta.startsWith('−')?'color:var(--red)':'color:var(--amber)';
  return `<div class="fb-row">
    <div class="fb-label">${f.k}</div>
    <div class="fb-track"><div class="fb-fill" style="width:${f.v}%;background:${fc}"></div></div>
    <div class="fb-val" style="color:${fc}">${f.v}</div>
    <div class="fb-delta" style="${dc}">${f.delta}</div>
  </div>`;
}).join('');


// Screenshot-style overview helpers
const trendLabel=document.getElementById('score-trend-label');
if(trendLabel) trendLabel.textContent=D.momentum>1?'Accelerating ↑':D.momentum<0?'Declining ↓':'Stable →';

const strengthItems=[
  {label:'Financial',score:D.debt},
  {label:'Moat',score:D.moat},
  {label:'Management',score:D.mgmt},
  {label:'Reputation',score:D.rep},
  {label:'Future Plans',score:D.future},
  {label:'Governance',score:D.gov}
].sort((a,b)=>b.score-a.score);
const strengthLabel=document.getElementById('strength-label');
const strengthScore=document.getElementById('strength-score');
if(strengthLabel) strengthLabel.textContent=strengthItems[0].label;
if(strengthScore) strengthScore.textContent=`Score ${strengthItems[0].score}`;

const watchItems=[
  {label:'Geopolitical',score:D.geo},
  {label:'Reputation',score:D.rep},
  {label:'Management',score:D.mgmt},
  {label:'Governance',score:D.gov},
  {label:'Financial',score:D.debt}
].sort((a,b)=>a.score-b.score);
const watchLabel=document.getElementById('watch-label');
const watchScore=document.getElementById('watch-score');
if(watchLabel) watchLabel.textContent=watchItems[0].label;
if(watchScore) watchScore.textContent=`Score ${watchItems[0].score}`;

// AI Insight
document.getElementById('ai-insight').innerHTML=`<div class="ai-icon">🤖 AI Explanation</div><div class="ai-text">${D.aiInsight}</div>`;

// Alerts feed
document.getElementById('alerts-count').textContent=D.alerts.length+' alerts';
document.getElementById('alerts-feed').innerHTML=D.alerts.map(a=>`
  <div class="alert-box ${a.sev==='h'?'ab-red':a.sev==='m'?'ab-amber':'ab-green'}">
    <div style="flex:1">
      <div class="ab-label" style="color:${a.sev==='h'?'var(--red)':a.sev==='m'?'var(--amber)':'var(--green)'}">${a.sev==='h'?'HIGH PRIORITY':a.sev==='m'?'WATCH':'POSITIVE'}</div>
      <div class="ab-text">${a.txt}</div>
    </div>
    <div class="ab-time">${a.time}</div>
  </div>`).join('');

// ESG Components
document.getElementById('esg-components').innerHTML=[
  {label:'Environmental',val:D.env,col:'var(--green)'},
  {label:'Social',val:D.soc,col:'var(--blue)'},
  {label:'Governance',val:D.gov,col:'var(--amber)'},
].map(c=>`<div style="text-align:center;padding:.8rem;background:var(--cream);border:1px solid var(--border);">
  <div style="font-size:.58rem;text-transform:uppercase;letter-spacing:.1em;color:var(--text3);margin-bottom:.3rem;">${c.label}</div>
  <div style="font-family:'Playfair Display',serif;font-size:1.6rem;font-weight:700;color:${c.col};line-height:1;">${c.val}</div>
  <div style="height:3px;background:var(--cream3);margin-top:.5rem;"><div style="height:100%;width:${c.val}%;background:${c.col};transition:width 1.2s;"></div></div>
</div>`).join('');

// Overview benchmark + radar chart + prediction preview + peer quick view
const sectorAvg = D.sector==='Banking'?72:D.sector==='Technology'?68:D.sector==='Consumer'?61:63;
const aseanAvg = 64;
document.getElementById('score-benchmark').textContent = `Benchmark: ${sectorAvg} sector avg · ${aseanAvg} ASEAN avg`;
document.getElementById('bench-company').textContent = D.esg;
document.getElementById('bench-sector').textContent = sectorAvg;
document.getElementById('bench-asean').textContent = aseanAvg;
document.getElementById('benchmark-insight').textContent =
  `${D.name} is ${D.esg>=sectorAvg?'above':'below'} the ${D.sector} sector benchmark. This helps investors compare the company against peers instead of judging the ESG score in isolation.`;

function renderRadarChart(){
  const svg = document.getElementById('esg-radar');
  if(!svg) return;
  const metrics = [
    {label:'ENVIRONMENT', val:D.env, bench:sectorAvg-2},
    {label:'SOCIAL', val:D.soc, bench:sectorAvg},
    {label:'GOVERNANCE', val:D.gov, bench:sectorAvg+1},
    {label:'RESILIENCE', val:D.moat, bench:sectorAvg},
    {label:'STRATEGY', val:D.future, bench:sectorAvg-1},
    {label:'GEO RISK', val:D.geo, bench:60},
  ];
  const cx=150, cy=150, maxR=92;
  const point=(value,i)=>{
    const angle=(-90 + i*360/metrics.length) * Math.PI/180;
    const r=(value/100)*maxR;
    return [cx + r*Math.cos(angle), cy + r*Math.sin(angle)];
  };
  const polygon=(key)=>metrics.map((m,i)=>point(m[key],i).join(',')).join(' ');
  const grid=[20,40,60,80,100].map(v=>`<polygon class="radar-grid" points="${metrics.map((m,i)=>point(v,i).join(',')).join(' ')}"/>`).join('');
  const axes=metrics.map((m,i)=>{
    const p=point(100,i);
    const lp=point(118,i);
    return `<line class="radar-axis" x1="${cx}" y1="${cy}" x2="${p[0]}" y2="${p[1]}"/>
      <text class="radar-label" x="${lp[0]}" y="${lp[1]}" text-anchor="middle" dominant-baseline="middle">${m.label}</text>`;
  }).join('');
  const dots=metrics.map((m,i)=>{
    const p=point(m.val,i);
    return `<circle class="radar-dot" cx="${p[0]}" cy="${p[1]}" r="4"/>`;
  }).join('');
  svg.innerHTML = `${grid}${axes}
    <polygon class="radar-benchmark" points="${polygon('bench')}"/>
    <polygon class="radar-area" points="${polygon('val')}"/>
    ${dots}`;
}
renderRadarChart();

const predictedScore = Math.min(100, Math.round((D.esg + Math.max(D.momentum,0)*2.2 + (D.signal==='buy'?1.2:D.signal==='watch'?-2.5:0))*10)/10);
const topRisk = D.predictions && D.predictions.length ? D.predictions[0] : {label:'Governance Risk', pct:25, verdict:'Med', color:'var(--amber)'};
const deterioration = D.predictions && D.predictions[2] ? D.predictions[2] : {label:'ESG Reversal', pct:30, verdict:'Med', color:'var(--amber)'};
const confidence = D.signal==='buy'?87:D.signal==='hold'?76:68;
document.getElementById('prediction-preview').innerHTML = [
  {label:'Predicted ESG',val:predictedScore,sub:'90 days',col:predictedScore>=70?'var(--green)':predictedScore>=60?'var(--gold)':'var(--red)'},
  {label:'Governance Risk',val:topRisk.pct+'%',sub:topRisk.verdict,col:topRisk.color},
  {label:'ESG Reversal',val:deterioration.pct+'%',sub:deterioration.verdict,col:deterioration.color},
  {label:'AI Confidence',val:confidence+'%',sub:'prototype model',col:'var(--gold)'},
].map(x=>`<div class="pred-preview-card">
  <div class="pred-preview-label">${x.label}</div>
  <div class="pred-preview-val" style="color:${x.col}">${x.val}</div>
  <div class="pred-preview-sub">${x.sub}</div>
</div>`).join('');
document.getElementById('forecast-summary').textContent =
  `Based on current ESG momentum, alerts, governance signals and peer position, the platform projects ${D.name}'s ESG direction as ${predictedScore>=D.esg?'improving':'weakening'} over the next 90 days.`;

const overviewPeers = (D.peers && D.peers.length)
  ? [{name:D.name+' (selected)', esg:D.esg, isSelf:true}, ...D.peers.slice(0,4)]
  : [{name:D.name+' (selected)', esg:D.esg, isSelf:true}, {name:'Sector Average', esg:sectorAvg}, {name:'ASEAN Average', esg:aseanAvg}];
document.getElementById('peer-overview').innerHTML = overviewPeers.map(p=>{
  const pc=p.esg>=70?'var(--green)':p.esg>=60?'var(--gold)':'var(--red)';
  return `<div class="peer-mini-row">
    <div class="peer-mini-name" style="${p.isSelf?'color:var(--gold);font-weight:700;':''}">${p.name}</div>
    <div class="peer-mini-track"><div class="peer-mini-fill" style="width:${p.esg}%;background:${p.isSelf?'var(--gold)':pc};"></div></div>
    <div class="peer-mini-score" style="color:${p.isSelf?'var(--gold)':pc};">${p.esg}</div>
  </div>`;
}).join('');

// Signal banner
const sbMap={
  buy:{bg:'var(--green-bg)',border:'var(--green-border)',color:'var(--green)',label:'Investment Signal — ESG Attractive',title:'🟢 Attractive Entry',desc:'Strong ESG momentum with low risk profile. ESG tailwinds support a constructive investment view.',emoji:'📈'},
  hold:{bg:'var(--amber-bg)',border:'var(--amber-border)',color:'var(--amber)',label:'Investment Signal — Monitor',title:'🟡 Neutral / Hold',desc:'Mixed ESG signals. Maintain current position and monitor key risk factors before adding exposure.',emoji:'⚖️'},
  watch:{bg:'var(--red-bg)',border:'var(--red-border)',color:'var(--red)',label:'Investment Signal — ESG Risk Alert',title:'🔴 Watch / Reduce',desc:'Elevated ESG risk and deteriorating momentum. Consider reducing exposure until governance stabilises.',emoji:'⚠️'},
};
const sm=sbMap[D.signal];
const sbanner=document.getElementById('signal-banner');
sbanner.style.background=sm.bg;sbanner.style.borderColor=sm.border;
document.getElementById('sb-label').style.color=sm.color;
document.getElementById('sb-label').textContent=sm.label;
document.getElementById('sb-title').style.color=sm.color;
document.getElementById('sb-title').textContent=sm.title;
document.getElementById('sb-desc').textContent=sm.desc;
document.getElementById('sb-emoji').textContent=sm.emoji;

// ESG SCORE EXPLANATION PANEL
function esgColor(score){
  if(score>=70) return 'var(--green)';
  if(score>=60) return 'var(--gold)';
  return 'var(--red)';
}

function esgGrade(score){
  if(score>=80) return 'Excellent ESG quality';
  if(score>=70) return 'Strong ESG quality';
  if(score>=60) return 'Moderate ESG quality';
  return 'Weak ESG quality';
}

function componentExplanation(label, score){
  if(label==='Environmental'){
    if(score>=75) return 'Environmental performance is a strength. Climate disclosure, green financing, and transition planning support the score.';
    if(score>=65) return 'Environmental score is acceptable but still has room to improve, especially around emissions disclosure and transition targets.';
    return 'Environmental score is a watch area. The company needs stronger emissions transparency and clearer climate execution.';
  }
  if(label==='Social'){
    if(score>=75) return 'Social score is strong, supported by employee welfare, customer trust, and stakeholder relationship signals.';
    if(score>=65) return 'Social performance is stable, but sentiment and employee-related indicators should continue to be monitored.';
    return 'Social score is weak. AI flags possible pressure from sentiment, customer impact, or workforce-related issues.';
  }
  if(score>=75) return 'Governance score is strong, showing credible disclosure, stable leadership, and effective board oversight.';
  if(score>=65) return 'Governance score is moderate. The company appears stable, but board structure and leadership signals should be monitored.';
  return 'Governance score is a key risk area. AI flags concerns around leadership, board independence, controversy, or compliance.';
}

function scoreEventImpact(event){
  const tag=(event.tag||'').toLowerCase();
  const desc=(event.desc||'').toLowerCase();
  const isNegative = /red|breach|fine|lawsuit|investigation|resigned|negative|concern|gap/.test(`${event.color||''} ${tag} ${desc}`);
  const isPositive = /green|recognition|published|milestone|best|target|improved|disclosure/.test(`${event.color||''} ${tag} ${desc}`);
  if(isNegative) return {value:'-1.0', cls:'negative', text:'Score pressure'};
  if(isPositive) return {value:'+1.2', cls:'positive', text:'Score support'};
  return {value:'+0.2', cls:'neutral', text:'Monitoring signal'};
}

function renderDriverList(targetId, items, emptyText){
  const list = items.length ? items : [{score:'-', title:'No major driver detected', text:emptyText}];
  document.getElementById(targetId).innerHTML = `<div class="esg-driver-list">${list.map(item=>`
    <div class="esg-driver-item">
      <div class="esg-driver-score" style="color:${item.color || (typeof item.score==='number'?esgColor(item.score):'var(--steel)')}">${item.score}</div>
      <div>
        <div class="esg-driver-title">${item.title}</div>
        <div class="esg-driver-text">${item.text}</div>
      </div>
    </div>
  `).join('')}</div>`;
}

function renderEsgScorePanel(){
  const ring = document.getElementById('esg-score-ring-large');
  if(!ring) return;

  const circumference = 339;
  const color = esgColor(D.esg);
  ring.style.strokeDashoffset = circumference - (D.esg / 100) * circumference;
  ring.style.stroke = color;

  document.getElementById('esg-score-val').textContent = D.esg;
  document.getElementById('esg-score-val').style.color = color;
  document.getElementById('esg-score-grade').textContent = esgGrade(D.esg);
  document.getElementById('esg-score-momentum').textContent =
    `${D.momentum>0?'+':''}${D.momentum} points over 30 days - ${D.momentum>0?'improving':D.momentum<0?'declining':'stable'}`;
  document.getElementById('esg-score-momentum').style.color = D.momentum>=0?'var(--green)':'var(--red)';
  document.getElementById('esg-score-confidence').textContent =
    `AI confidence ${D.signal==='buy'?87:D.signal==='hold'?76:68}%`;

  document.getElementById('esg-trend-mini').innerHTML = D.sparkData.map(v=>{
    const max = Math.max(...D.sparkData);
    const min = Math.min(...D.sparkData);
    const pct = ((v-min)/(max-min||1)*70)+18;
    const barColor = esgColor(v);
    return `<div class="esg-trend-bar" style="height:${pct}%;background:${barColor};color:${barColor};"></div>`;
  }).join('');

  const components = [
    {label:'Environmental', score:D.env, weight:35},
    {label:'Social', score:D.soc, weight:30},
    {label:'Governance', score:D.gov, weight:35}
  ];
  const strongest = [...components].sort((a,b)=>b.score-a.score)[0];
  const weakest = [...components].sort((a,b)=>a.score-b.score)[0];
  const weightedScore = Math.round(components.reduce((sum,c)=>sum+(c.score*c.weight/100),0)*10)/10;
  const projectedScore = Math.max(0, Math.min(100, Math.round((D.esg + (D.momentum * .9))*10)/10));

  document.getElementById('esg-ai-explanation').textContent =
    `${D.aiInsight} AI reads the ESG score as ${esgGrade(D.esg).toLowerCase()}. The weighted ESG model gives an estimated ${weightedScore}/100, with ${strongest.label.toLowerCase()} as the strongest contributor and ${weakest.label.toLowerCase()} as the main area to monitor.`;

  document.getElementById('esg-score-summary').innerHTML = [
    {label:'AI Verdict', value:D.signal==='buy'?'Attractive':D.signal==='watch'?'Watch':'Neutral', color:D.signal==='buy'?'var(--green)':D.signal==='watch'?'var(--red)':'var(--gold)'},
    {label:'Strongest', value:strongest.label, color:esgColor(strongest.score)},
    {label:'Watch Area', value:weakest.label, color:esgColor(weakest.score)},
    {label:'90-Day Direction', value:projectedScore>=D.esg?'Improving':'Weakening', color:projectedScore>=D.esg?'var(--green)':'var(--red)'}
  ].map(item=>`
    <div class="esg-summary-tile">
      <span>${item.label}</span>
      <b style="color:${item.color}">${item.value}</b>
    </div>
  `).join('');

  document.getElementById('esg-component-detail').innerHTML = components.map(c=>`
    <div class="esg-component-card">
      <div class="esg-component-head">
        <div class="esg-component-name">${c.label}</div>
        <div class="esg-component-score" style="color:${esgColor(c.score)}">${c.score}</div>
      </div>
      <div class="esg-component-track">
        <div class="esg-component-fill" style="width:${c.score}%;background:${esgColor(c.score)};color:${esgColor(c.score)}"></div>
      </div>
      <div class="esg-component-meta">
        <span>Weight ${c.weight}%</span>
        <span>Contribution ${(c.score*c.weight/100).toFixed(1)}</span>
      </div>
      <div class="esg-component-text">${componentExplanation(c.label, c.score)}</div>
    </div>
  `).join('');

  document.getElementById('esg-ai-reason-list').innerHTML = [
    {
      k:'Score Formula',
      v:`AI combines Environmental (${D.env}), Social (${D.soc}), and Governance (${D.gov}) using weighted contribution, then adjusts interpretation using momentum and risk signals.`
    },
    {
      k:'Main Strength',
      v:`${strongest.label} is currently the strongest pillar at ${strongest.score}/100, so it helps defend the overall score.`
    },
    {
      k:'Main Watch Area',
      v:`${weakest.label} is the weakest pillar at ${weakest.score}/100. If this drops further, the overall ESG score is likely to weaken.`
    },
    {
      k:'AI Reading',
      v:`The current trajectory points to ${projectedScore}/100 over the short term, based on ${D.momentum>0?'positive':'negative'} 30-day momentum.`
    }
  ].map(item=>`
    <div class="esg-reason-item">
      <span>${item.k}</span>
      <p>${item.v}</p>
    </div>
  `).join('');

  document.getElementById('esg-score-events').innerHTML = D.timeline.slice(0,4).map(event=>{
    const impact = scoreEventImpact(event);
    return `
      <div class="esg-score-event">
        <div class="esg-event-date">${event.date}</div>
        <div class="esg-event-dot" style="background:${event.color}"></div>
        <div class="esg-event-body">
          <div class="esg-event-desc">${event.desc}</div>
          <div class="esg-event-meta">
            <span>${event.tag}</span>
            <b class="${impact.cls}">${impact.value} ${impact.text}</b>
          </div>
        </div>
      </div>
    `;
  }).join('');

  const positives = [
    D.momentum>0 ? {score:`+${D.momentum}`, color:'var(--green)', title:'Positive ESG momentum', text:'The latest movement shows the score is improving instead of staying static.'} : null,
    D.gov>=70 ? {score:D.gov, title:'Governance credibility', text:'Governance score supports investor confidence through stronger oversight and disclosure quality.'} : null,
    D.soc>=70 ? {score:D.soc, title:'Stable social performance', text:'Social score shows healthy people, customer, and stakeholder treatment signals.'} : null,
    D.debt>=70 ? {score:D.debt, title:'Financial resilience supports ESG', text:'A stronger balance sheet makes long-term ESG commitments more credible.'} : null,
    D.future>=70 ? {score:D.future, title:'Credible future plans', text:'Future strategy and sustainability plans support longer-term ESG improvement.'} : null
  ].filter(Boolean).slice(0,4);

  const negatives = [
    D.geo<70 ? {score:D.geo, title:'Geopolitical exposure', text:'Regional trade, regulatory, or country exposure can pressure future ESG stability.'} : null,
    D.env<72 ? {score:D.env, title:'Environmental disclosure gap', text:'Environmental score can improve further with stronger emissions and transition disclosure.'} : null,
    D.rep<70 ? {score:D.rep, title:'Reputation watch', text:'Media sentiment, allegations, or past incidents may weaken ESG confidence.'} : null,
    D.gov<70 ? {score:D.gov, title:'Governance watch', text:'Governance quality needs monitoring because it can quickly affect investor trust.'} : null,
    D.signal==='watch' ? {score:'!', title:'Overall ESG warning', text:'AI flags this company as needing review before increasing investment exposure.'} : null
  ].filter(Boolean).slice(0,4);

  renderDriverList('esg-driver-positive', positives, 'The company has no clear positive ESG driver in this prototype data.');
  renderDriverList('esg-driver-negative', negatives, 'No major weak ESG driver is detected, but monitoring should continue.');
}

renderEsgScorePanel();

// FINANCIAL PANEL
const dv=document.getElementById('debt-val');
dv.textContent=D.debt;
dv.style.color=D.debt>=70?'var(--green)':D.debt>=55?'var(--amber)':'var(--red)';
document.getElementById('debt-pointer').style.left=D.debt+'%';
document.getElementById('debt-ai-text').textContent=D.debtAi;
document.getElementById('fin-rows').innerHTML=D.finHealth.map(r=>`
  <div class="data-row">
    <span class="dr-key">${r.k}</span>
    <div style="text-align:right;"><span class="dr-val mono">${r.v}</span>${r.note?`<div style="font-size:.6rem;color:var(--text4);margin-top:1px;">${r.note}</div>`:''}
  </div></div>`).join('');
const mv=document.getElementById('moat-val');
mv.textContent=D.moat;
mv.style.color=D.moat>=70?'var(--green)':D.moat>=60?'var(--amber)':'var(--red)';
document.getElementById('moat-label').textContent=D.moat>=75?'Wide Moat':D.moat>=65?'Narrow Moat':'No Moat';
document.getElementById('moat-label').style.color=D.moat>=75?'var(--green)':D.moat>=65?'var(--amber)':'var(--red)';
document.getElementById('moat-grid').innerHTML=D.moatFactors.map(m=>`
  <div class="moat-cell">
    <div class="moat-label">${m.label}</div>
    <div class="moat-score">${m.score}</div>
    <div class="moat-desc">${m.desc}</div>
  </div>`).join('');
document.getElementById('future-rows').innerHTML=D.futurePlans.map(r=>`
  <div class="data-row"><span class="dr-key">${r.k}</span><span class="dr-val" style="font-size:.78rem;">${r.v}</span></div>`).join('');
document.getElementById('future-ai-text').textContent=D.futureAi;

// MANAGEMENT
function ceoHTML(p){return `<div class="ceo-avatar">${p.name[0]}</div>
  <div>
    <div class="ceo-name">${p.name}</div>
    <div class="ceo-title">${p.title} · ${p.tenure}</div>
    <div class="ceo-rep">${p.rep.map(t=>`<span class="ceo-tag">${t}</span>`).join('')}</div>
    <div class="ceo-desc">${p.desc}</div>
  </div>`;}
document.getElementById('ceo-card').innerHTML=ceoHTML(D.ceo);
document.getElementById('cfo-card').innerHTML=ceoHTML(D.cfo);
document.getElementById('mgmt-bars').innerHTML=[
  {k:'Leadership Quality',v:D.mgmt},
  {k:'CEO Reputation',v:Math.min(D.mgmt+8,100)},
  {k:'CFO Track Record',v:Math.min(D.mgmt+4,100)},
  {k:'Board Independence',v:D.gov},
  {k:'Succession Planning',v:D.mgmt-5},
].map(f=>{
  const fc=f.v>=70?'var(--green)':f.v>=60?'var(--gold)':'var(--red)';
  return `<div class="fb-row"><div class="fb-label">${f.k}</div>
    <div class="fb-track"><div class="fb-fill" style="width:${f.v}%;background:${fc}"></div></div>
    <div class="fb-val" style="color:${fc}">${f.v}</div>
    <div class="fb-delta"></div></div>`;
}).join('');
document.getElementById('mgmt-ai-text').textContent=D.mgmtAi;
document.getElementById('change-timeline').innerHTML=D.timeline.slice(0,4).map(t=>`
  <div class="tl-item">
    <div class="tl-date">${t.date}</div>
    <div class="tl-dot" style="background:${t.color}"></div>
    <div><div class="tl-desc">${t.desc}</div>
    <span class="tl-tag" style="background:${t.tagc==='red'?'var(--red-bg)':t.tagc==='amber'?'var(--amber-bg)':'var(--green-bg)'};color:${t.tagc==='red'?'var(--red)':t.tagc==='amber'?'var(--amber)':'var(--green)'};border:1px solid ${t.tagc==='red'?'var(--red-border)':t.tagc==='amber'?'var(--amber-border)':'var(--green-border)'};">${t.tag}</span>
    </div></div>`).join('');

// REPUTATION
const rv=document.getElementById('rep-val');
rv.textContent=D.rep;
rv.style.color=D.rep>=70?'var(--green)':D.rep>=60?'var(--amber)':'var(--red)';
document.getElementById('rep-ai-text').textContent=D.repAi;
document.getElementById('allegation-feed').innerHTML=D.allegations.map(a=>`
  <div class="alert-box ${a.sev==='h'?'ab-red':a.sev==='m'?'ab-amber':'ab-green'}" style="margin-bottom:.6rem;">
    <div style="flex:1"><div class="ab-text">${a.txt}</div></div>
    <div class="ab-time">${a.time}</div>
  </div>`).join('');
document.getElementById('rep-timeline').innerHTML=D.timeline.map(t=>`
  <div class="tl-item">
    <div class="tl-date">${t.date}</div>
    <div class="tl-dot" style="background:${t.color}"></div>
    <div><div class="tl-desc">${t.desc}</div>
    <span class="tl-tag" style="background:${t.tagc==='red'?'var(--red-bg)':t.tagc==='amber'?'var(--amber-bg)':'var(--green-bg)'};color:${t.tagc==='red'?'var(--red)':t.tagc==='amber'?'var(--amber)':'var(--green)'};border:1px solid ${t.tagc==='red'?'var(--red-border)':t.tagc==='amber'?'var(--amber-border)':'var(--green-border)'};">${t.tag}</span>
    </div></div>`).join('');



// RESTORED PREMIUM FINANCIAL MANAGEMENT REPUTATION HELPERS
function scoreBand(score){
  if(score>=72) return {word:'Strong', color:'var(--green)'};
  if(score>=60) return {word:'Watch', color:'var(--gold)'};
  return {word:'High Risk', color:'var(--red)'};
}

const mgmtBand = scoreBand(D.mgmt);
const govBand = scoreBand(D.gov);
document.getElementById('board-quality-val').textContent = govBand.word;
document.getElementById('board-quality-val').style.color = govBand.color;
document.getElementById('succession-risk-val').textContent = D.mgmt>=70 ? 'Low' : D.mgmt>=60 ? 'Medium' : 'High';
document.getElementById('succession-risk-val').style.color = D.mgmt>=70 ? 'var(--green)' : D.mgmt>=60 ? 'var(--gold)' : 'var(--red)';
document.getElementById('investor-trust-val').textContent = mgmtBand.word === 'Strong' ? 'Positive' : mgmtBand.word === 'Watch' ? 'Mixed' : 'Weak';
document.getElementById('investor-trust-val').style.color = mgmtBand.color;

function reputationSentiment(){
  if(D.rep>=70) return {
    pos:72, neutral:22, neg:6,
    posNote:'+8% vs sector', neutralNote:'Stable', negNote:'Low',
    text:'Media sentiment remains largely positive. Positive coverage is driven by sustainability disclosure, green finance progress, and strong governance transparency. Negative sentiment remains low with no major active controversy detected.'
  };
  if(D.rep>=60) return {
    pos:55, neutral:30, neg:15,
    posNote:'+2% vs sector', neutralNote:'Stable', negNote:'Watch',
    text:'Reputation is stable but needs monitoring. Positive coverage still leads, while neutral and negative mentions show that investors should continue watching regulatory and customer sentiment signals.'
  };
  return {
    pos:28, neutral:24, neg:48,
    posNote:'Weak', neutralNote:'Volatile', negNote:'High',
    text:'Negative sentiment is elevated. AI flags governance controversy, unresolved allegations, and media pressure as the key reasons reputation score is below peer average.'
  };
}

const sent = reputationSentiment();
document.getElementById('sentiment-breakdown').innerHTML = [
  {label:'Positive Media Sentiment', value:sent.pos, note:sent.posNote, color:'var(--green)'},
  {label:'Neutral Coverage', value:sent.neutral, note:sent.neutralNote, color:'var(--blue)'},
  {label:'Negative Sentiment', value:sent.neg, note:sent.negNote, color:'var(--red)'}
].map(s=>`
  <div class="sentiment-row">
    <div class="sentiment-label">${s.label}</div>
    <div class="sentiment-track"><div class="sentiment-fill" style="width:${s.value}%;background:${s.color}"></div></div>
    <div class="sentiment-pct" style="color:${s.color}">${s.value}%</div>
    <div class="sentiment-note">${s.note}</div>
  </div>
`).join('');
document.getElementById('sentiment-ai-text').textContent = sent.text;

const majorControversies = D.allegations.filter(a=>a.sev==='h').length;
const openInvestigations = D.allegations.filter(a=>a.sev==='h'||a.sev==='m').length;
const resolvedIncidents = D.timeline.filter(t=>/resolved|closed|completed/i.test(t.desc)).length || (majorControversies===0 ? 1 : 0);
document.getElementById('controversy-major').textContent = majorControversies;
document.getElementById('controversy-open').textContent = openInvestigations;
document.getElementById('controversy-resolved').textContent = resolvedIncidents;
document.getElementById('controversy-major-text').textContent = majorControversies ? 'Material controversy detected' : 'No material ESG controversy';
document.getElementById('controversy-open-text').textContent = openInvestigations ? 'Active case requires monitoring' : 'No active regulatory case';
document.getElementById('controversy-resolved-text').textContent = resolvedIncidents ? 'Minor incident resolved' : 'No resolved incident logged';
document.getElementById('controversy-major').style.color = majorControversies ? 'var(--red)' : 'var(--green)';
document.getElementById('controversy-open').style.color = openInvestigations ? 'var(--gold)' : 'var(--green)';
document.getElementById('controversy-ai-text').textContent = majorControversies || openInvestigations
  ? `${D.name} has active reputation items in monitoring. AI recommends reviewing latest disclosures, regulatory updates, and media sentiment before increasing exposure.`
  : `${D.name} currently has a clean controversy profile. One minor historical incident was resolved quickly and disclosed transparently. No unresolved allegations or major regulatory actions are detected.`;

// ===============================
// AI PREDICTIONS PANEL
// ===============================

let currentHorizon = '90D';

const horizonData = {
  '90D': {
    label: '(90-Day)',
    scoreMultiplier: 1,
    riskMultiplier: 1,
    opportunityMultiplier: 1,
    guidance: 'Short-term outlook remains positive. No immediate portfolio rebalancing required.'
  },
  '1Y': {
    label: '(1-Year)',
    scoreMultiplier: 1.35,
    riskMultiplier: 1.18,
    opportunityMultiplier: 1.1,
    guidance: 'Medium-term outlook is stable, but investors should monitor governance and geopolitical risk.'
  },
  '3Y': {
    label: '(3-Year)',
    scoreMultiplier: 1.8,
    riskMultiplier: 1.35,
    opportunityMultiplier: 1.22,
    guidance: 'Long-term momentum remains attractive if ESG execution and financial resilience are sustained.'
  }
};

function clampScore(value) {
  return Math.max(0, Math.min(100, Math.round(value * 10) / 10));
}

function getRiskColor(pct) {
  if (pct <= 20) return 'var(--green)';
  if (pct <= 40) return 'var(--amber)';
  return 'var(--red)';
}

function getRiskVerdict(pct) {
  if (pct <= 20) return 'Low';
  if (pct <= 40) return 'Moderate';
  return 'High';
}

function getOpportunityColor(pct) {
  if (pct >= 65) return 'var(--green)';
  if (pct >= 50) return 'var(--gold)';
  return 'var(--red)';
}

function getOpportunityVerdict(pct) {
  if (pct >= 65) return 'Strong';
  if (pct >= 50) return 'Positive';
  return 'Watch';
}

function getGuidance(label, pct) {
  if (pct <= 20) {
    return `AI Guidance: ${label} remains within stable thresholds. No immediate action required.`;
  }
  if (pct <= 40) {
    return `AI Guidance: ${label} is showing moderate risk. Monitor this factor before increasing exposure.`;
  }
  return `AI Guidance: ${label} is elevated. Flag for review before the next capital allocation decision.`;
}

function getFactorPredictions(h) {
  const managementQuality = Math.round((D.mgmt + D.gov) / 2);
  const base = D.signal === 'buy' ? 1 : D.signal === 'hold' ? 0.45 : -1;
  const geoDirection = D.geo < 60 ? -1 : D.geo < 70 ? -0.4 : 0.5;

  return [
    { factor: 'ESG Score', current: D.esg, predicted: clampScore(D.esg + (D.momentum + base) * h.scoreMultiplier) },
    { factor: 'Financial Health', current: D.debt, predicted: clampScore(D.debt + (D.signal === 'watch' ? -1.5 : 2) * h.scoreMultiplier) },
    { factor: 'Management Quality', current: managementQuality, predicted: clampScore(managementQuality + (D.signal === 'watch' ? -2 : 1) * h.scoreMultiplier) },
    { factor: 'Reputation Sentiment', current: D.rep, predicted: clampScore(D.rep + (D.signal === 'watch' ? -2 : 2) * h.scoreMultiplier) },
    { factor: 'Geopolitical Exposure', current: D.geo, predicted: clampScore(D.geo + geoDirection * h.scoreMultiplier) }
  ];
}

function renderFactorPredictions(h) {
  const rows = getFactorPredictions(h).map(item => {
    const change = Math.round((item.predicted - item.current) * 10) / 10;
    const changeClass = change >= 0 ? 'positive' : 'negative';
    const sign = change > 0 ? '+' : '';

    return `
      <tr>
        <td>${item.factor}</td>
        <td class="score-now">${item.current}</td>
        <td class="score-next">${item.predicted}</td>
        <td class="score-change ${changeClass}">${sign}${change}</td>
      </tr>
    `;
  }).join('');

  document.getElementById('factor-prediction-table').innerHTML = `
    <table class="prediction-table">
      <thead>
        <tr>
          <th>Factor</th>
          <th style="text-align:right;">Current</th>
          <th style="text-align:right;">Predicted</th>
          <th style="text-align:right;">Change</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="ai-guidance-line" style="margin-top:.9rem;">
      This answers: what is likely to change in the selected forecast period.
    </div>
  `;
}

function renderRiskForecast(h) {
  document.getElementById('pred-meters').innerHTML = D.predictions.map(p => {
    const adjustedPct = Math.min(100, Math.round(p.pct * h.riskMultiplier));
    const color = getRiskColor(adjustedPct);
    const verdict = getRiskVerdict(adjustedPct);

    return `
      <div class="forecast-item">
        <div class="forecast-head">
          <div class="forecast-label">${p.label}</div>
          <div class="forecast-value" style="color:${color}">${adjustedPct}% - ${verdict}</div>
        </div>
        <div class="forecast-track">
          <div class="forecast-fill" style="width:${adjustedPct}%;background:${color}"></div>
        </div>
        <div class="forecast-note">${p.ci} 95% confidence interval. ${getGuidance(p.label, adjustedPct)}</div>
      </div>
    `;
  }).join('');
}

function renderOpportunityForecast(h) {
  const opportunityBase = D.signal === 'buy' ? 68 : D.signal === 'hold' ? 55 : 38;
  const opportunities = [
    { label: 'ESG momentum upside', pct: opportunityBase + Math.round(Math.max(D.momentum, -1) * 3), note: 'Potential for ESG score to continue improving.' },
    { label: 'Reputation improvement', pct: Math.round((D.rep * 0.55 + D.future * 0.45) * h.opportunityMultiplier), note: 'Positive media, customer trust, and stakeholder sentiment upside.' },
    { label: 'Financial resilience upside', pct: Math.round((D.debt * 0.7 + D.moat * 0.3) * h.opportunityMultiplier), note: 'Balance sheet strength and competitive moat support outperformance.' },
    { label: 'AI / digital transformation opportunity', pct: Math.round((D.future * 0.65 + D.moat * 0.35) * h.opportunityMultiplier), note: 'Future plans, innovation, and digital execution potential.' }
  ];

  document.getElementById('opportunity-forecast').innerHTML = opportunities.map(o => {
    const pct = Math.max(0, Math.min(100, o.pct));
    const color = getOpportunityColor(pct);
    const verdict = getOpportunityVerdict(pct);

    return `
      <div class="forecast-item">
        <div class="forecast-head">
          <div class="forecast-label">${o.label}</div>
          <div class="forecast-value" style="color:${color}">${pct}% - ${verdict}</div>
        </div>
        <div class="forecast-track">
          <div class="forecast-fill" style="width:${pct}%;background:${color}"></div>
        </div>
        <div class="forecast-note">${o.note}</div>
      </div>
    `;
  }).join('');
}

function renderEarlyWarnings() {
  const warnings = [];

  if (D.geo < 62) {
    warnings.push({
      title: 'Geopolitical Exposure Watch',
      signal: 'Regional regulatory uncertainty increased',
      impact: 'May reduce future ESG score by 1-2 points',
      action: 'Monitor before increasing position'
    });
  }

  if (D.rep < 68 || D.signal === 'watch') {
    warnings.push({
      title: 'Reputation Sentiment Watch',
      signal: 'Negative media mentions or allegations are rising',
      impact: 'Could weaken reputation score next quarter',
      action: 'Review latest news sentiment'
    });
  }

  if (D.mgmt < 60 || D.gov < 60) {
    warnings.push({
      title: 'Governance Stability Watch',
      signal: 'Board or management quality score is below stable threshold',
      impact: 'May increase governance deterioration probability',
      action: 'Wait for governance clarity before adding exposure'
    });
  }

  if (warnings.length === 0) {
    warnings.push({
      title: 'No Critical Early Warning',
      signal: 'Weak signals remain below alert threshold',
      impact: 'Future ESG score is likely to remain stable or improve',
      action: 'Maintain exposure and continue monitoring'
    });
  }

  document.getElementById('early-warning-alerts').innerHTML = warnings.map(w => `
    <div class="warning-card">
      <div class="warning-title">${w.title}</div>
      <div class="warning-row"><b>Signal:</b> ${w.signal}</div>
      <div class="warning-row"><b>Impact:</b> ${w.impact}</div>
      <div class="warning-row"><b>Action:</b> ${w.action}</div>
    </div>
  `).join('');
}

function renderRecommendation(h) {
  const rec = document.getElementById('pred-ai');
  rec.classList.remove('watch', 'hold');
  if (D.signal === 'watch') rec.classList.add('watch');
  if (D.signal === 'hold') rec.classList.add('hold');

  document.getElementById('pred-ai-text').textContent = `${D.predAi} ${h.guidance}`;
}

function renderPredictions() {
  const h = horizonData[currentHorizon];
  document.getElementById('risk-horizon-label').textContent = h.label;
  renderFactorPredictions(h);
  renderOpportunityForecast(h);
  renderRiskForecast(h);
  renderEarlyWarnings();
  renderRecommendation(h);
}

document.querySelectorAll('.horizon-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.horizon-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentHorizon = btn.dataset.horizon;
    renderPredictions();
  });
});

renderPredictions();

// GEO
function getGeoRiskLevel(score){
  if(score>=70) return {label:'Low',cls:'low',color:'var(--green)'};
  if(score>=55) return {label:'Medium',cls:'med',color:'var(--amber)'};
  return {label:'High',cls:'high',color:'var(--red)'};
}

function getGeoMainDriver(){
  const riskItem=(D.geoRisk||[]).find(g=>g.badgec==='red'||g.badgec==='amber');
  if(riskItem) return riskItem.title;
  if(D.conflicts && D.conflicts.length) return D.conflicts[0].title;
  return 'ASEAN regional exposure';
}

function getGeoExposures(){
  const exposureSets={
    DBS:[
      {code:'SG',name:'Singapore',x:305,y:282,exposure:'High',risk:'low',reason:'HQ and stable MAS regulatory base'},
      {code:'MY',name:'Malaysia',x:282,y:264,exposure:'Medium',risk:'med',reason:'Regional banking and policy exposure'},
      {code:'TH',name:'Thailand',x:255,y:154,exposure:'Low',risk:'med',reason:'Regional trade and client activity'},
      {code:'ID',name:'Indonesia',x:425,y:335,exposure:'Medium',risk:'med',reason:'Trade finance and regulatory sensitivity'},
      {code:'PH',name:'Philippines',x:552,y:195,exposure:'Low',risk:'med',reason:'South China Sea sensitivity'},
      {code:'VN',name:'Vietnam',x:350,y:170,exposure:'Low',risk:'med',reason:'Trade dependency and supply-chain links'}
    ],
    GENT:[
      {code:'SG',name:'Singapore',x:305,y:282,exposure:'Medium',risk:'low',reason:'Stable regional tourism market'},
      {code:'MY',name:'Malaysia',x:282,y:264,exposure:'High',risk:'med',reason:'Core gaming licence and policy exposure'},
      {code:'TH',name:'Thailand',x:255,y:154,exposure:'Low',risk:'med',reason:'Regional tourism and political volatility'},
      {code:'ID',name:'Indonesia',x:425,y:335,exposure:'Low',risk:'med',reason:'Tourism and consumer demand sensitivity'},
      {code:'PH',name:'Philippines',x:552,y:195,exposure:'Low',risk:'med',reason:'Tourism flow and maritime confidence'},
      {code:'VN',name:'Vietnam',x:350,y:170,exposure:'Low',risk:'low',reason:'Limited direct operating exposure'}
    ],
    GRAB:[
      {code:'SG',name:'Singapore',x:305,y:282,exposure:'High',risk:'low',reason:'HQ and capital market base'},
      {code:'MY',name:'Malaysia',x:282,y:264,exposure:'High',risk:'med',reason:'Platform regulation and operating market'},
      {code:'TH',name:'Thailand',x:255,y:154,exposure:'Medium',risk:'med',reason:'Consumer platform and policy exposure'},
      {code:'ID',name:'Indonesia',x:425,y:335,exposure:'High',risk:'med',reason:'Major market with antitrust monitoring'},
      {code:'PH',name:'Philippines',x:552,y:195,exposure:'Medium',risk:'med',reason:'Consumer confidence and maritime tension'},
      {code:'VN',name:'Vietnam',x:350,y:170,exposure:'Medium',risk:'med',reason:'Platform regulation and localisation rules'}
    ]
  };

  return exposureSets[ticker] || [
    {code:'SG',name:'Singapore',x:305,y:282,exposure:'Medium',risk:'low',reason:'Standard ASEAN monitoring active'},
    {code:'MY',name:'Malaysia',x:282,y:264,exposure:'Medium',risk:'med',reason:'Regional operating exposure'},
    {code:'TH',name:'Thailand',x:255,y:154,exposure:'Low',risk:'med',reason:'Regional monitoring active'},
    {code:'ID',name:'Indonesia',x:425,y:335,exposure:'Medium',risk:'med',reason:'Regional operating exposure'},
    {code:'PH',name:'Philippines',x:552,y:195,exposure:'Low',risk:'med',reason:'Maritime tension watch'},
    {code:'VN',name:'Vietnam',x:350,y:170,exposure:'Low',risk:'med',reason:'Trade dependency watch'}
  ];
}

function getGeoEventImpact(item){
  const title=(item.title||'').toLowerCase();
  if(title.includes('regulatory')||title.includes('licence')||title.includes('mas')){
    return 'ESG link: Governance and compliance. Investor meaning: monitor regulatory impact.';
  }
  if(title.includes('china')||title.includes('trade')||title.includes('tech')){
    return 'ESG link: Governance and financial stability. Investor meaning: monitor regional revenue exposure.';
  }
  if(title.includes('malacca')||title.includes('shipping')||title.includes('sea')){
    return 'ESG link: Supply chain and social disruption. Investor meaning: watch trade finance and client activity.';
  }
  return 'ESG link: External operating risk. Investor meaning: monitor before increasing exposure.';
}

function getGeoDotCloud(exposures){
  return exposures.map(e=>{
    const size=e.exposure==='High'?7.2:e.exposure==='Medium'?6.2:5.4;
    return {
      ...e,
      size,
      primary:e.exposure==='High'
    };
  });
}

function attachMapTooltip(){
  const wrap=document.querySelector('.real-map-wrap');
  const tip=document.getElementById('map-hover-tooltip');
  if(!wrap||!tip) return;

  document.querySelectorAll('.geo-site-dot').forEach(dot=>{
    dot.addEventListener('mouseenter',()=>{
      tip.innerHTML=dot.dataset.tip;
      tip.classList.add('visible');
    });
    dot.addEventListener('mousemove',event=>{
      const rect=wrap.getBoundingClientRect();
      tip.style.left=(event.clientX-rect.left+14)+'px';
      tip.style.top=(event.clientY-rect.top+14)+'px';
    });
    dot.addEventListener('mouseleave',()=>tip.classList.remove('visible'));
  });
}

function renderGeo(){
  const risk=getGeoRiskLevel(D.geo);
  const gv=document.getElementById('geo-val');
  gv.textContent=D.geo;
  gv.style.color=risk.color;
  document.getElementById('geo-country-label').textContent=`${D.flag} ${D.country} · Geopolitical Risk Score`;
  document.getElementById('geo-risk-level').textContent=risk.label;
  document.getElementById('geo-risk-level').style.color=risk.color;
  document.getElementById('geo-main-driver').textContent=getGeoMainDriver();
  document.getElementById('geo-ai-text').textContent=D.geoAi;

  const exposures=getGeoExposures();
  const mainDriver=getGeoMainDriver();
  const lowCount=exposures.filter(e=>e.risk==='low').length;
  const watchCount=exposures.filter(e=>e.risk==='med').length;
  const highRiskCount=exposures.filter(e=>e.risk==='high').length;
  const highExposureCount=exposures.filter(e=>e.exposure==='High').length;
  document.getElementById('geo-map-risk-score').textContent=D.geo;
  document.getElementById('geo-map-high-count').textContent=highExposureCount;
  document.getElementById('geo-map-watch-count').textContent=watchCount + highRiskCount;
  document.getElementById('geo-map-main-driver').textContent=mainDriver;
  document.getElementById('geo-map-country-count').textContent=exposures.length;
  document.getElementById('geo-map-company').textContent=D.name;
  document.getElementById('geo-map-route').textContent=(D.conflicts&&D.conflicts[0])?D.conflicts[0].title:'ASEAN corridor';
  document.getElementById('geo-map-risk-bars').innerHTML=[
    {label:'LOW',value:lowCount,color:'var(--green)'},
    {label:'WATCH',value:watchCount,color:'var(--gold)'},
    {label:'HIGH',value:highRiskCount,color:'var(--red)'}
  ].map(row=>{
    const pct=Math.max(8,Math.round((row.value/exposures.length)*100));
    return `<div class="geo-map-mini-row">
      <span>${row.label}</span>
      <div class="geo-map-mini-track"><div class="geo-map-mini-fill" style="width:${pct}%;background:${row.color};color:${row.color}"></div></div>
      <b>${row.value}</b>
    </div>`;
  }).join('');

  document.getElementById('asean-link-lines').innerHTML='';
  document.getElementById('asean-map-markers').innerHTML=getGeoDotCloud(exposures).map((e,idx)=>{
    const riskLabel=e.risk==='low'?'Low':e.risk==='med'?'Watch':'High';
    const tip=`<b>${e.name}</b><span>${e.exposure} exposure | ${riskLabel} risk</span><small>${e.reason}</small>`;
    return `<g class="geo-site-dot ${e.risk} ${e.primary?'primary':''}" transform="translate(${e.x} ${e.y})" data-tip="${tip.replace(/"/g,'&quot;')}">
      <title>${e.name}: ${e.exposure} exposure - ${e.reason}</title>
      <circle class="dot-glow" r="${e.size*3.5}"></circle>
      <circle class="dot-ring" r="${e.size*2.1}"></circle>
      <circle class="dot-core" r="${e.size}"></circle>
      <circle class="dot-spark" r="${Math.max(1.5,e.size*.42)}"></circle>
    </g>`;
  }).join('');
  attachMapTooltip();

  const focus=exposures.find(e=>e.exposure==='High') || exposures[0];
  document.getElementById('map-focus-code').textContent=focus.code;
  document.getElementById('map-focus-name').textContent=focus.name;
  document.getElementById('map-focus-exposure').textContent=focus.exposure;
  document.getElementById('map-focus-risk').textContent=focus.risk==='low'?'Low':focus.risk==='med'?'Watch':'High';
  document.getElementById('map-focus-risk').style.color=focus.risk==='low'?'var(--green)':focus.risk==='med'?'var(--gold)':'var(--red)';
  document.getElementById('map-focus-reason').textContent=focus.reason;

  document.getElementById('asean-exposure-list').innerHTML=exposures.map(e=>`
    <div class="exposure-pill">
      <div class="exposure-pill-head">
        <span class="exposure-country">${e.name}</span>
        <span class="exposure-level ${e.risk}">${e.exposure}</span>
      </div>
      <div class="exposure-reason">${e.reason}</div>
    </div>
  `).join('');

  const events=[
    ...(D.conflicts||[]).map(c=>({...c,type:'Regional / Trade Route',badge:'WATCH',badgec:'amber'})),
    ...(D.geoRisk||[]).map(g=>({...g,type:'Country / Market Event'}))
  ];

  document.getElementById('geo-event-summary').textContent=D.conflictDesc;
  document.getElementById('geo-event-items').innerHTML=events.map(e=>`
    <div class="geo-event">
      <div class="geo-event-top">
        <div>
          <div class="geo-event-type">${e.type}</div>
          <div class="geo-event-title">${e.icon||'🌏'} ${e.title}</div>
        </div>
        <span class="geo-badge rk-badge rk-${e.badgec||'amber'}">${e.badge||'WATCH'}</span>
      </div>
      <div class="geo-event-desc">${e.desc}</div>
      <div class="geo-event-impact"><b>Investor impact:</b> ${getGeoEventImpact(e)}</div>
    </div>
  `).join('');
}

renderGeo();

// PEERS
function renderPeerCompare(){
  const sectorAvg = D.sector==='Banking'?72:D.sector==='Technology'?68:D.sector==='Consumer'?61:63;
  const colorScore = v => v>=70?'var(--green)':v>=60?'var(--amber)':'var(--red)';
  const formatGap = v => `${v>=0?'+':''}${v.toFixed(1)}`;
  const positionTag = (score, avg) => {
    if(score >= avg + 5) return {label:'Above Avg', cls:'strong'};
    if(score <= avg - 5) return {label:'Watch Gap', cls:'watch'};
    return {label:'In Line', cls:''};
  };
  const basePeers = (D.peers && D.peers.length) ? D.peers : [
    {name:`${D.sector} Sector Avg`,ticker:'SECTOR',esg:sectorAvg,debt:sectorAvg,gov:sectorAvg,rep:sectorAvg}
  ];
  const allPeers=[{name:D.name+' (You)',ticker:D.ticker,esg:D.esg,debt:D.debt,gov:D.gov,rep:D.rep,isSelf:true},...basePeers];
  const sorted=[...allPeers].sort((a,b)=>b.esg-a.esg);
  const selfRank=sorted.findIndex(p=>p.isSelf)+1;
  const peerAvg=basePeers.reduce((sum,p)=>sum+p.esg,0)/basePeers.length;
  const gap=D.esg-peerAvg;
  const best=sorted[0];
  const relativeFactors=[
    {name:'Financial', self:D.debt, avg:basePeers.reduce((s,p)=>s+(p.debt||sectorAvg),0)/basePeers.length},
    {name:'Governance', self:D.gov, avg:basePeers.reduce((s,p)=>s+(p.gov||sectorAvg),0)/basePeers.length},
    {name:'Reputation', self:D.rep, avg:basePeers.reduce((s,p)=>s+(p.rep||sectorAvg),0)/basePeers.length},
    {name:'Overall ESG', self:D.esg, avg:peerAvg}
  ];
  const weakest=[...relativeFactors].sort((a,b)=>(a.self-a.avg)-(b.self-b.avg))[0];

  document.getElementById('peer-sector').textContent=D.sector;
  document.getElementById('peer-rank').textContent=`#${selfRank}`;
  document.getElementById('peer-count').textContent=`Out of ${sorted.length} compared companies`;
  document.getElementById('peer-best').textContent=best.isSelf?'Selected Company':best.name;
  document.getElementById('peer-gap').textContent=formatGap(gap);
  document.getElementById('peer-gap').style.color=gap>=0?'var(--green)':'var(--red)';
  document.getElementById('peer-gap-sub').textContent=`Peer average: ${peerAvg.toFixed(1)}`;
  document.getElementById('peer-watch-area').textContent=weakest.name;
  document.getElementById('peer-watch-area').style.color=(weakest.self-weakest.avg)>=0?'var(--green)':'var(--gold)';

  document.getElementById('peer-bars').innerHTML=sorted.map((p,i)=>{
    const c=colorScore(p.esg);
    const pos=positionTag(p.esg, peerAvg);
    return `<div class="peer-leader-row ${p.isSelf?'is-self':''}">
      <div class="peer-rank">#${i+1}</div>
      <div class="peer-company"><b>${p.name}</b><span>${p.ticker || '-'}</span></div>
      <div class="peer-track"><div class="peer-fill" style="width:${p.esg}%;background:${p.isSelf?'var(--gold)':c};color:${p.isSelf?'var(--gold)':c}"></div></div>
      <div class="peer-score" style="color:${p.isSelf?'var(--gold)':c};font-weight:${p.isSelf?800:500}">${p.esg}</div>
      <div class="peer-position-tag ${pos.cls}">${pos.label}</div>
    </div>`;
  }).join('');

  document.getElementById('peer-multi-rows').innerHTML=`
    <div class="peer-matrix-row header">
      <div>Company</div><div>Overall</div><div>Financial</div><div>Governance</div><div>Reputation</div><div>Gap</div>
    </div>
    ${sorted.map(p=>{
      const rowGap=p.esg-peerAvg;
      return `<div class="peer-matrix-row ${p.isSelf?'is-self':''}">
        <div class="peer-matrix-company"><b>${p.name}</b><span>${p.ticker || '-'}</span></div>
        <div class="peer-metric-val" style="color:${colorScore(p.esg)}">${p.esg}</div>
        <div class="peer-metric-val" style="color:${colorScore(p.debt || sectorAvg)}">${p.debt || '-'}</div>
        <div class="peer-metric-val" style="color:${colorScore(p.gov || sectorAvg)}">${p.gov || '-'}</div>
        <div class="peer-metric-val" style="color:${colorScore(p.rep || sectorAvg)}">${p.rep || '-'}</div>
        <div class="peer-metric-val" style="color:${rowGap>=0?'var(--green)':'var(--red)'}">${formatGap(rowGap)}</div>
      </div>`;
    }).join('')}`;

  const peerPosition = gap>=0 ? `${formatGap(gap)} points above` : `${Math.abs(gap).toFixed(1)} points below`;
  const bestGap = best.isSelf ? 'leads the current peer set' : `is ${(best.esg-D.esg).toFixed(1)} points behind ${best.name}`;
  document.getElementById('peer-ai-text').textContent =
    `${D.name} ranks #${selfRank} out of ${sorted.length} in the selected ${D.sector} peer set and is ${peerPosition} the peer average. It ${bestGap}. The key comparison gap is ${weakest.name}, so investors can use that factor together with the ESG score and risk forecast before making their own investment decision.`;
}

renderPeerCompare();

function showPanel(name, el){
  document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.co-tab').forEach(t=>t.classList.remove('active'));
  document.getElementById('panel-'+name).classList.add('active');
  el.classList.add('active');
}

// css helpers inline
const style=document.createElement('style');
style.textContent=`.rk-badge{font-family:'IBM Plex Mono',monospace;font-size:.6rem;padding:2px 8px;font-weight:500;}.rk-low{background:var(--green-bg);color:var(--green);border:1px solid var(--green-border);}.rk-med,.rk-amber{background:var(--amber-bg);color:var(--amber);border:1px solid var(--amber-border);}.rk-high,.rk-red{background:var(--red-bg);color:var(--red);border:1px solid var(--red-border);}.rk-green{background:var(--green-bg);color:var(--green);border:1px solid var(--green-border);}`;
document.head.appendChild(style);

function showPrototypeToast(message){
  const toast=document.getElementById('prototypeToast');
  if(!toast) return;
  toast.textContent=message;
  toast.classList.add('show');
  clearTimeout(showPrototypeToast.timer);
  showPrototypeToast.timer=setTimeout(()=>toast.classList.remove('show'),2600);
}

function buildGeneratedInsight(){
  const direction = D.momentum > 0 ? 'improving' : D.momentum < 0 ? 'weakening' : 'stable';
  const riskLevel = D.signal === 'watch' ? 'elevated' : D.signal === 'buy' ? 'controlled' : 'moderate';
  const weakest = [
    {label:'Geopolitical exposure',score:D.geo},
    {label:'Governance',score:D.gov},
    {label:'Reputation',score:D.rep},
    {label:'Management quality',score:D.mgmt},
    {label:'Financial health',score:D.debt}
  ].sort((a,b)=>a.score-b.score)[0];
  const confidence = D.signal === 'buy' ? 84 : D.signal === 'watch' ? 72 : 78;
  return `${D.name} is currently assessed at ${D.esg}/100 with ${direction} ESG momentum. The simulated AI model reads overall risk as ${riskLevel}, using ESG score trend, financial health, management quality, reputation sentiment, and geopolitical exposure as inputs. Main watch factor: ${weakest.label} (${weakest.score}/100). Prototype confidence: ${confidence}%. Recommended next step: review the AI Prediction and Peer Compare tabs before making an investment decision.`;
}

function initPrototypeControls(){
  const watchBtn=document.getElementById('watchlistBtn');
  if(watchBtn){
    watchBtn.addEventListener('click',()=>{
      const added=watchBtn.classList.toggle('is-added');
      watchBtn.textContent=added?'Added to Watchlist':'+ Watchlist';
      showPrototypeToast(added?`${D.name} added to prototype watchlist.`:`${D.name} removed from prototype watchlist.`);
    });
  }

  const generateBtn=document.getElementById('generateAiBtn');
  const generatedBox=document.getElementById('generatedAiInsight');
  const generatedText=document.getElementById('generatedAiText');
  const generatedStatus=document.getElementById('generateAiStatus');
  if(generateBtn&&generatedBox&&generatedText){
    generateBtn.addEventListener('click',()=>{
      generateBtn.disabled=true;
      generateBtn.classList.add('is-loading');
      generateBtn.textContent='Analysing Signals';
      if(generatedStatus) generatedStatus.textContent='Simulating AI analysis from company ESG factors...';
      generatedBox.hidden=false;
      generatedText.textContent='Reading ESG trend, risk scores, sentiment signals, and peer benchmark...';
      setTimeout(()=>{
        generatedText.textContent=buildGeneratedInsight();
        generateBtn.disabled=false;
        generateBtn.classList.remove('is-loading');
        generateBtn.textContent='Regenerate AI Insight';
        if(generatedStatus) generatedStatus.textContent='Generated from prototype data. No live AI API connected yet.';
        showPrototypeToast('AI insight generated for prototype demo.');
      },1000);
    });
  }

  const modal=document.getElementById('alertModal');
  const openAlert=document.getElementById('setAlertBtn');
  const closeAlert=document.getElementById('closeAlertModal');
  const cancelAlert=document.getElementById('cancelAlertBtn');
  const saveAlert=document.getElementById('saveAlertBtn');
  const openModal=()=>{ if(modal) modal.hidden=false; };
  const closeModal=()=>{ if(modal) modal.hidden=true; };
  if(openAlert) openAlert.addEventListener('click',openModal);
  if(closeAlert) closeAlert.addEventListener('click',closeModal);
  if(cancelAlert) cancelAlert.addEventListener('click',closeModal);
  if(modal){
    modal.addEventListener('click',(e)=>{ if(e.target===modal) closeModal(); });
  }
  if(saveAlert){
    saveAlert.addEventListener('click',()=>{
      closeModal();
      if(openAlert){
        openAlert.textContent='Alert Set';
        openAlert.classList.add('is-added');
        openAlert.focus();
      }
      showPrototypeToast(`Prototype alert saved for ${D.name}.`);
    });
  }
}

initPrototypeControls();

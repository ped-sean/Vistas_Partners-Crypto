import{useState}from'react';
import PriceChart from'../components/PriceChart';
import{Target,BarChart2,Zap,Shield,Coins,TrendingUp,TrendingDown,Activity}from'lucide-react';

const COINS=[{id:'bitcoin',symbol:'BTC',name:'Bitcoin',category:'L1 PoW',price:98620,chg:2.4,mcap:1940000000000,vol:42000000000,rank:1},{id:'ethereum',symbol:'ETH',name:'Ethereum',category:'L1 Smart Contract',price:3582,chg:3.1,mcap:430000000000,vol:18000000000,rank:2},{id:'solana',symbol:'SOL',name:'Solana',category:'L1 Smart Contract',price:201.4,chg:4.7,mcap:95000000000,vol:4200000000,rank:5},{id:'bnb',symbol:'BNB',name:'BNB',category:'L1 CEX',price:608,chg:1.3,mcap:88000000000,vol:1800000000,rank:4},{id:'avalanche',symbol:'AVAX',name:'Avalanche',category:'L1 Smart Contract',price:38.9,chg:-1.2,mcap:15700000000,vol:620000000,rank:11},{id:'chainlink',symbol:'LINK',name:'Chainlink',category:'Oracle',price:18.4,chg:5.2,mcap:11200000000,vol:880000000,rank:16},{id:'polkadot',symbol:'DOT',name:'Polkadot',category:'L0 Relay',price:8.21,chg:-0.8,mcap:12400000000,vol:430000000,rank:18},{id:'uniswap',symbol:'UNI',name:'Uniswap',category:'DEX',price:11.2,chg:2.1,mcap:6700000000,vol:290000000,rank:22},{id:'aave',symbol:'AAVE',name:'Aave',category:'Lending',price:182,chg:3.8,mcap:2800000000,vol:210000000,rank:35},{id:'arbitrum',symbol:'ARB',name:'Arbitrum',category:'L2 Rollup',price:1.24,chg:-0.5,mcap:5100000000,vol:380000000,rank:28}];

const FACTORS=['Network Value','Adoption','Tokenomics','Momentum','Liquidity','Risk','On-chain Health','Developer Activity','Ecosystem','Narrative','Regulatory','Macro Sensitivity'];

const SCORES={bitcoin:[88,92,95,74,82,35,89,78,94,91,70,65],ethereum:[84,89,82,71,88,42,91,96,92,85,68,72],solana:[76,81,74,82,77,55,78,85,79,88,62,71],bnb:[72,76,68,65,81,58,71,62,74,65,48,60],avalanche:[71,74,72,78,68,52,74,79,71,77,65,70],chainlink:[74,78,88,69,72,45,82,84,76,83,72,68],polkadot:[68,71,75,62,65,48,72,88,74,71,68,65],uniswap:[72,74,71,75,85,52,79,82,81,80,65,68],aave:[70,72,74,71,82,50,78,80,79,76,66,67],arbitrum:[69,74,71,78,76,54,75,82,78,82,66,70]};

const ALTSCORE={bitcoin:{score:91,conviction:'HIGH BUY',target:142000,signal:'Strong Buy',conf:87,note:'MVRV Z < 2.5, exchange outflows elevated, hash rate ATH'},ethereum:{score:86,conviction:'BUY',target:5800,signal:'Buy',conf:72,note:'SOPR > 1, accumulation addresses rising, staking inflows up'},solana:{score:79,conviction:'BUY',target:280,signal:'Buy',conf:68,note:'DeFi TVL growing, validator count ATH, Firedancer launch'},bnb:{score:68,conviction:'HOLD',target:680,signal:'Neutral',conf:55,note:'Exchange token dynamics, regulatory overhang'},avalanche:{score:65,conviction:'HOLD',target:42,signal:'Neutral',conf:55,note:'Mixed on-chain signals, ecosystem competition'},chainlink:{score:74,conviction:'BUY',target:28,signal:'Buy',conf:66,note:'CCIP adoption accelerating, staking v0.2 live'},polkadot:{score:62,conviction:'HOLD',target:9.5,signal:'Neutral',conf:51,note:'Parachain auctions stabilizing, JAM upgrade pending'},uniswap:{score:71,conviction:'HOLD',target:14,signal:'Neutral',conf:58,note:'Fee switch vote pending, V4 hooks adoption'},aave:{score:69,conviction:'HOLD',target:210,signal:'Neutral',conf:56,note:'GHO stablecoin growing, cross-chain expansion'},arbitrum:[67,69,70,75,73,52,72,80,77,79,64,69]};

const TOKENOMICS={bitcoin:{supply:'21M max',circulating:'19.7M (93.8%)',inflation:'0.85% / yr',halving:'Apr 2028',distribution:'Miners',vesting:'N/A'},ethereum:{supply:'Unlimited (deflationary)',circulating:'120M',inflation:'-0.3% / yr (post-merge)',halving:'N/A',distribution:'Validators + protocol',vesting:'N/A'},solana:{supply:'600M max',circulating:'470M (78%)',inflation:'5.4% → 1.5%',halving:'N/A',distribution:'Foundation, team, investors',vesting:'Ongoing unlocks'}};

const ONCHAIN_METRICS={bitcoin:{nupl:0.58,sopr:1.023,mvrv_z:2.41,hash_rate:'620 EH/s',active_addr:'1.1M/day',exch_outflow:'4.2K BTC/day',ltv:0.52,rsi_onchain:62},ethereum:{nupl:0.44,sopr:1.012,mvrv_z:1.89,hash_rate:'N/A (PoS)',active_addr:'620K/day',exch_outflow:'28K ETH/day',ltv:0.41,rsi_onchain:58}};

function gen(p){const a=[];let x=p*.85,n=Date.now();for(let i=90;i>=0;i--){x*=1+(Math.random()-.47)*.035;a.push({t:n-i*86400000,p:parseFloat(x.toFixed(2))})}return a;}
const fmt=v=>v>=1e12?`$${(v/1e12).toFixed(2)}T`:v>=1e9?`$${(v/1e9).toFixed(1)}B`:`$${(v/1e6).toFixed(0)}M`;
const colorScore=s=>s>=80?'text-emerald-400':s>=65?'text-yellow-400':'text-red-400';
const bgScore=s=>s>=80?'bg-emerald-400':s>=65?'bg-yellow-400':'bg-red-400';

export default function Workbench(){
const[sel,setSel]=useState(COINS[0]);
const[tab,setTab]=useState('factors');
const alt=ALTSCORE[sel.id]||ALTSCORE.bitcoin;
const scores=SCORES[sel.id]||SCORES.bitcoin;
const tok=TOKENOMICS[sel.id];
const onc=ONCHAIN_METRICS[sel.id];
const totalScore=Math.round(scores.reduce((a,b)=>a+b,0)/scores.length);

return(<div className="flex flex-col h-full overflow-auto">

{/* Header */}
<div className="p-5 border-b border-gray-800 bg-[#060d1a]">
<div className="flex items-center justify-between mb-4">
<div><h1 className="text-lg font-bold text-white flex items-center gap-2"><i className="ti ti-microscope text-emerald-400"/>Analyst Workbench</h1>
<p className="text-xs text-gray-500 mt-0.5">Institutional-grade factor analysis · 12 dimensions · 60+ metrics</p></div>
<select value={sel.id} onChange={e=>setSel(COINS.find(c=>c.id===e.target.value))} className="bg-[#0d1424] border border-gray-700 rounded-lg px-4 py-2 text-sm text-white outline-none">
{COINS.map(c=><option key={c.id} value={c.id}>{c.symbol} — {c.name}</option>)}</select></div>

{/* Coin header */}
<div className="flex items-center gap-6 p-4 bg-[#0d1424] rounded-xl border border-gray-800">
<div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm">{sel.symbol.slice(0,2)}</div>
<div><div className="flex items-center gap-2"><span className="text-white font-bold text-lg">{sel.symbol}</span><span className="text-gray-400 text-sm">{sel.name}</span><span className="text-xs bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full px-2 py-0.5">{sel.category}</span></div>
<div className="flex items-center gap-2 mt-0.5"><span className="text-white font-bold text-xl">${sel.price>=1?sel.price.toLocaleString():sel.price.toFixed(4)}</span><span className={`text-sm font-medium flex items-center gap-1 ${sel.chg>=0?'text-emerald-400':'text-red-400'}`}>{sel.chg>=0?<TrendingUp size={12}/>:<TrendingDown size={12}/>}{sel.chg>=0?'+':''}{sel.chg}% 24h</span></div>
<div className="flex items-center gap-4 mt-0.5 text-xs text-gray-500"><span>M.Cap: {fmt(sel.mcap)}</span><span>Vol: {fmt(sel.vol)}</span><span>Rank #{sel.rank}</span></div></div>
<div className="ml-auto flex items-center gap-8">
<div className="text-center"><p className="text-xs text-gray-500 mb-1">AltScore™</p><p className="text-4xl font-bold text-emerald-400 leading-none">{totalScore}</p></div>
<div className="text-center"><p className="text-xs text-gray-500 mb-1">Conviction</p><span className={`text-sm font-bold px-3 py-1 rounded-lg border ${
totalScore>=80?'bg-emerald-400/10 text-emerald-400 border-emerald-500/30':totalScore>=65?'bg-yellow-400/10 text-yellow-400 border-yellow-500/30':'bg-red-400/10 text-red-400 border-red-500/30'}`}>{totalScore>=80?'HIGH BUY':totalScore>=65?'BUY':'HOLD'}</span></div>
<div className="text-center"><p className="text-xs text-gray-500 mb-1">12m Target</p><p className="text-lg font-bold text-white">${alt.target?alt.target.toLocaleString():'N/A'}</p></div>
<div className="text-center"><p className="text-xs text-gray-500 mb-1">Signal Conf.</p><p className="text-lg font-bold text-emerald-400">{alt.conf||65}%</p></div>
</div></div>

{/* Sub-tabs */}
<div className="flex gap-1 mt-4">
{[['factors','ti-radar','Factor Analysis'],['tokenomics','ti-coins','Tokenomics'],['onchain','ti-activity','On-chain Metrics'],['valuation','ti-calculator','Valuation Models'],['risk','ti-shield','Risk Framework'],['signals','ti-target','AI Signals']].map(([id,icon,label])=>(
<button key={id} onClick={()=>setTab(id)} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
tab===id?'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30':'text-gray-500 hover:text-gray-300 border border-transparent'}`}>
<i className={`ti ${icon}`} aria-hidden="true"/>{label}</button>))}
</div></div>

{/* Tab content */}
<div className="flex-1 p-5">

{tab==='factors'&&(
<div className="grid grid-cols-3 gap-5">
<div className="col-span-2 space-y-4">
<div className="grid grid-cols-3 gap-3">
{FACTORS.map((f,i)=>(
<div key={f} className="bg-[#0d1424] rounded-xl border border-gray-800 p-4">
<p className="text-xs text-gray-500 mb-2">{f}</p>
<div className="h-1.5 bg-gray-800 rounded-full mb-2"><div className={`h-full rounded-full ${bgScore(scores[i])}`} style={{width:`${scores[i]}%`}}/></div>
<div className="flex items-center justify-between"><span className={`text-sm font-bold ${colorScore(scores[i])}`}>{scores[i]}/100</span><span className="text-xs text-gray-600">{scores[i]>=80?'Strong':scores[i]>=65?'Good':'Weak'}</span></div></div>))}
</div></div>
<div className="space-y-4">
<div className="bg-[#0d1424] rounded-xl border border-gray-800 p-4">
<PriceChart data={gen(sel.price)} color="#10b981"/></div>
<div className="bg-[#0d1424] rounded-xl border border-gray-800 p-4">
<p className="text-xs text-gray-500 mb-3 uppercase tracking-wider font-medium">AI Research Note</p>
<p className="text-sm text-gray-300 leading-relaxed">{alt.note||'Accumulation phase detected. On-chain fundamentals remain strong.'}</p>
<div className="mt-3 flex items-center gap-2">
<span className={`text-xs font-bold ${colorScore(alt.conf||65)}`}>{alt.conf||65}% confidence</span>
<span className="text-xs text-gray-600">· Updated 5 min ago</span></div></div></div></div>)}

{tab==='tokenomics'&&(<div className="bg-[#0d1424] rounded-xl border border-gray-800 overflow-hidden">
{tok?(<div className="divide-y divide-gray-800">
{Object.entries(tok).map(([k,v])=>(<div key={k} className="flex items-center justify-between px-5 py-4 hover:bg-gray-800/20">
<span className="text-sm text-gray-400 capitalize">{k.replace(/_/g,' ')}</span>
<span className="text-sm font-medium text-white">{v}</span></div>))}
</div>):(<div className="p-8 text-center"><p className="text-gray-500 text-sm">Tokenomics data for {sel.name} — backend integration required</p><p className="text-xs text-gray-600 mt-1">GET /api/analyst/{sel.id}/tokenomics</p></div>)}
</div>)}

{tab==='onchain'&&(<div className="grid grid-cols-2 gap-4">
{onc?Object.entries(onc).map(([k,v])=>(
<div key={k} className="bg-[#0d1424] rounded-xl border border-gray-800 p-4">
<p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">{k.replace(/_/g,' ')}</p>
<p className="text-xl font-bold text-white">{typeof v==='number'?v.toFixed(3):v}</p></div>)):(<div className="col-span-2 bg-[#0d1424] rounded-xl border border-gray-800 p-8 text-center">
<p className="text-gray-500 text-sm">On-chain data for {sel.name} — backend integration required</p><p className="text-xs text-gray-600 mt-1">GET /api/onchain/{metric}?asset={sel.symbol}</p></div>)}
</div>)}

{tab==='valuation'&&(<div className="grid grid-cols-2 gap-4">
{[['NVT Ratio','68','Network Value to Transactions','Fairly valued'],['P/S Ratio','14.2x','Protocol revenue multiple','Undervalued vs peers'],['Stock-to-Flow','56','Scarcity model (BTC only)','Bullish trajectory'],['MVRV Ratio','1.84','Market vs Realized Value','Healthy accumulation'],['Realized Price','$42,100','Average holder cost basis','60% unrealized profit'],['Fair Value Est.','$115,000–$142,000','Multi-model average','Upside potential']].map(([n,v,d,j])=>(
<div key={n} className="bg-[#0d1424] rounded-xl border border-gray-800 p-4">
<p className="text-xs text-gray-500 mb-1">{n}</p><p className="text-xl font-bold text-white">{v}</p>
<p className="text-xs text-gray-600 mt-1">{d}</p>
<span className="text-xs text-emerald-400 font-medium">{j}</span></div>))}
</div>)}

{tab==='risk'&&(<div className="space-y-4">
<div className="grid grid-cols-3 gap-4">
{[['Market Risk','Medium','Correlated to macro, BTC beta = 1.0','text-yellow-400'],['Smart Contract Risk','Low','No smart contracts (L1 base layer)','text-emerald-400'],['Regulatory Risk','Medium','US regulation improving, ETF approved','text-yellow-400'],['Liquidity Risk','Very Low','Deepest crypto market, 24/7 trading','text-emerald-400'],['Counterparty Risk','Low','Self-custodial, no central party','text-emerald-400'],['Concentration Risk','Medium','Top 10 wallets hold 5% supply','text-yellow-400']].map(([n,r,d,c])=>(
<div key={n} className="bg-[#0d1424] rounded-xl border border-gray-800 p-4">
<p className="text-xs text-gray-500 mb-1">{n}</p>
<span className={`text-sm font-bold ${c}`}>{r}</span>
<p className="text-xs text-gray-600 mt-2 leading-relaxed">{d}</p></div>))}
</div></div>)}

{tab==='signals'&&(<div className="space-y-3">
{COINS.map(c=>{
const s=SCORES[c.id]||SCORES.bitcoin;
const avg=Math.round(s.reduce((a,b)=>a+b,0)/s.length);
const sig=avg>=80?'Strong Buy':avg>=70?'Buy':avg>=60?'Neutral':'Sell';
const sc=avg>=80?'text-emerald-400 bg-emerald-400/10 border-emerald-500/20':avg>=70?'text-emerald-400 bg-emerald-400/10 border-emerald-500/20':avg>=60?'text-yellow-400 bg-yellow-400/10 border-yellow-500/20':'text-red-400 bg-red-400/10 border-red-500/20';
return(<div key={c.id} className="flex items-center justify-between p-4 bg-[#0d1424] rounded-xl border border-gray-800 hover:border-gray-600 transition-colors">
<div className="flex items-center gap-4">
<div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-bold">{c.symbol.slice(0,2)}</div>
<div><p className="text-white font-semibold">{c.name}</p><p className="text-gray-500 text-xs">${c.price>=1?c.price.toLocaleString():c.price.toFixed(4)} · {c.category}</p></div></div>
<div className="flex items-center gap-6">
<div className="text-right"><p className="text-xs text-gray-500">AltScore</p><p className="text-xl font-bold text-emerald-400">{avg}</p></div>
<span className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${sc}`}>{sig}</span></div></div>);})}
</div>)}

</div></div>);}

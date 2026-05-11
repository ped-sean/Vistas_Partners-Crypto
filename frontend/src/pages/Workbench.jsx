import PriceChart from "../components/PriceChart";
import { useState } from "react";
import { BarChart2, Target, Zap } from "lucide-react";
const SIG=[{coin:"BTC",signal:"Strong Buy",conf:87,note:"MVRV Z < 2, exchange outflows up",c:"text-emerald-400",bg:"bg-emerald-400/10"},{coin:"ETH",signal:"Buy",conf:72,note:"SOPR > 1, accumulation rising",c:"text-emerald-400",bg:"bg-emerald-400/10"},{coin:"SOL",signal:"Neutral",conf:55,note:"Mixed signals, watching validators",c:"text-yellow-400",bg:"bg-yellow-400/10"},{coin:"AVAX",signal:"Sell",conf:63,note:"Exchange inflows spiking",c:"text-red-400",bg:"bg-red-400/10"}];
function gen(p){const a=[];let x=p*.85,n=Date.now();for(let i=90;i>=0;i--){x*=1+(Math.random()-.47)*.035;a.push({t:n-i*86400000,p:parseFloat(x.toFixed(2))})}return a;}
export default function Workbench(){
  const [sel,setSel]=useState("BTC");
  const prices={BTC:98620,ETH:3582,SOL:201,AVAX:38};
  return(<div className="p-6 space-y-6"><h1 className="text-xl font-bold text-white">Analyst Workbench</h1>
  <div className="grid grid-cols-3 gap-6">
  <div className="col-span-2 space-y-4">
  <div className="bg-[#0d1424] rounded-xl border border-gray-800 p-4">
  <div className="flex gap-2 mb-4">{["BTC","ETH","SOL","AVAX"].map(c=><button key={c} onClick={()=>setSel(c)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${sel===c?"bg-emerald-500/20 text-emerald-400 border border-emerald-500/30":"text-gray-400 hover:text-white"}`}>{c}</button>)}</div>
  <PriceChart data={gen(prices[sel])} color="#10b981"/></div>
  <div className="bg-[#0d1424] rounded-xl border border-gray-800 p-4"><h3 className="text-white font-semibold mb-3 flex items-center gap-2"><Target size={16} className="text-emerald-400"/>AI Signals</h3>
  <div className="space-y-2">{SIG.map(s=><div key={s.coin} className={`flex items-center justify-between p-3 rounded-lg border ${s.bg} border-gray-700`}><div className="flex items-center gap-3"><span className="text-white font-bold w-12">{s.coin}</span><span className={`text-sm font-bold ${s.c}`}>{s.signal}</span><span className="text-gray-500 text-xs">{s.note}</span></div><div className="text-right shrink-0"><span className={`text-sm font-bold ${s.c}`}>{s.conf}%</span><p className="text-gray-500 text-xs">confidence</p></div></div>)}</div></div></div>
  <div className="space-y-4">
  <div className="bg-[#0d1424] rounded-xl border border-gray-800 p-4"><h3 className="text-white font-semibold mb-3 flex items-center gap-2"><Zap size={16} className="text-yellow-400"/>Key Metrics</h3>
  {[{l:"Fear & Greed",v:"74 — Greed",c:"text-yellow-400"},{l:"BTC Dominance",v:"54.2%",c:"text-white"},{l:"Market Cap",v:"$3.85T",c:"text-emerald-400"},{l:"DeFi TVL",v:"$108B",c:"text-white"},{l:"24h Volume",v:"$142B",c:"text-white"}].map(m=><div key={m.l} className="flex justify-between py-2 border-b border-gray-800/50 last:border-0"><span className="text-gray-400 text-sm">{m.l}</span><span className={`text-sm font-bold ${m.c}`}>{m.v}</span></div>)}</div>
  <div className="bg-[#0d1424] rounded-xl border border-gray-800 p-4"><h3 className="text-white font-semibold mb-3 flex items-center gap-2"><BarChart2 size={16} className="text-blue-400"/>On-Chain</h3>
  {[{l:"NUPL",v:"0.58",h:"Belief"},{l:"SOPR",v:"1.023",h:"Profitable"},{l:"MVRV Z",v:"2.41",h:"Moderate"},{l:"Hash Rate",v:"620 EH/s",h:"ATH"},{l:"Exch Out",v:"4.2K BTC",h:"Bullish"}].map(m=><div key={m.l} className="flex justify-between py-2 border-b border-gray-800/50 last:border-0"><span className="text-gray-400 text-sm">{m.l}</span><div className="text-right"><span className="text-white text-sm font-bold">{m.v}</span><span className="text-gray-500 text-xs ml-1">{m.h}</span></div></div>)}</div></div></div></div>);
}
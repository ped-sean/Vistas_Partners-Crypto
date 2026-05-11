import { Mic, FileText, Play } from "lucide-react";
const TRANS=[{title:"MicroStrategy Q1 2025 Earnings Call",company:"MSTR",date:"May 8",duration:"1h 12m",tags:["Bitcoin","Treasury","Leverage"]},{title:"Coinbase Q1 2025 Earnings",company:"COIN",date:"May 7",duration:"58m",tags:["Volumes","Regulation","Base L2"]},{title:"ARK Invest Crypto Outlook",company:"ARK",date:"May 5",duration:"45m",tags:["BTC","ETH","AI"]},{title:"Federal Reserve May Meeting",company:"FED",date:"May 1",duration:"32m",tags:["Rates","Inflation","Macro"]}];
export default function Transcripts(){
return(<div className="p-6 space-y-6"><h1 className="text-xl font-bold text-white flex items-center gap-2"><Mic size={20} className="text-emerald-400"/>Transcripts</h1>
<div className="space-y-3">
{TRANS.map((t,i)=><div key={i} className="bg-[#0d1424] rounded-xl border border-gray-800 p-4 hover:border-gray-600 transition-colors cursor-pointer">
<div className="flex items-start justify-between">
<div className="flex items-start gap-4"><div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs font-bold shrink-0">{t.company.slice(0,2)}</div>
<div><p className="text-white font-semibold">{t.title}</p><p className="text-gray-500 text-sm mt-0.5 flex items-center gap-2"><span>{t.company}</span><span>·</span><span>{t.date}</span><span>·</span><span className="flex items-center gap-1"><Play size={10}/>{t.duration}</span></p>
<div className="flex gap-1.5 mt-2">{t.tags.map(tag=><span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-400">{tag}</span>)}</div></div></div>
<button className="text-gray-400 hover:text-emerald-400 transition-colors"><FileText size={18}/></button></div></div>)}
</div></div>);
}
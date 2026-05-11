import { Calendar, Clock } from "lucide-react";
const EVENTS=[{date:"May 12",title:"Bitcoin Core Dev Call",type:"Protocol",impact:"Medium"},{date:"May 13",title:"Fed CPI Data Release",type:"Macro",impact:"High"},{date:"May 14",title:"ETH Pectra Upgrade Vote",type:"Protocol",impact:"High"},{date:"May 15",title:"Binance Quarterly Burn",type:"Token",impact:"Medium"},{date:"May 17",title:"SEC Crypto Task Force Mtg",type:"Regulatory",impact:"High"},{date:"May 20",title:"Coinbase Q1 Earnings",type:"Company",impact:"Medium"}];
const IMPACT={High:"text-red-400 bg-red-400/10",Medium:"text-yellow-400 bg-yellow-400/10",Low:"text-gray-400 bg-gray-700"};
const TYPE={Protocol:"text-blue-400",Macro:"text-purple-400",Token:"text-emerald-400",Regulatory:"text-orange-400",Company:"text-pink-400"};
export default function Events(){
return(<div className="p-6 space-y-6"><h1 className="text-xl font-bold text-white flex items-center gap-2"><Calendar size={20} className="text-emerald-400"/>Events & Calendar</h1>
<div className="bg-[#0d1424] rounded-xl border border-gray-800 divide-y divide-gray-800">
{EVENTS.map((e,i)=><div key={i} className="flex items-center justify-between px-5 py-4 hover:bg-gray-800/20 transition-colors">
<div className="flex items-center gap-4"><div className="w-14 text-center"><p className="text-emerald-400 text-xs font-bold">{e.date.split(" ")[0]}</p><p className="text-white text-sm font-bold">{e.date.split(" ")[1]}</p></div>
<div><p className="text-white font-semibold">{e.title}</p><p className={`text-xs font-medium ${TYPE[e.type]||"text-gray-400"}`}>{e.type}</p></div></div>
<span className={`text-xs font-bold px-2.5 py-1 rounded-full ${IMPACT[e.impact]}`}>{e.impact}</span></div>)}
</div></div>);
}
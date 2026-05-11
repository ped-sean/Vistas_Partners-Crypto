import{useState}from'react';import{Search,Bell}from'lucide-react';
const TABS=['Dashboard','Markets','Analyst Workbench','Events & Calendar','Transcripts'];
const MAP={'Dashboard':'dashboard','Markets':'markets','Analyst Workbench':'workbench','Events & Calendar':'events','Transcripts':'transcripts'};
export default function Navbar({activePage,onNavigate}){
const[q,setQ]=useState('');
return(<header className="bg-[#0a0f1a] border-b border-gray-800 px-6 flex flex-col shrink-0">
<div className="flex items-center justify-between h-14">
<div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-black font-bold text-sm">V</div>
<div><div className="text-white font-bold text-sm leading-tight">Vistas Research</div><div className="text-emerald-400 font-bold text-sm leading-tight">Catalyst</div><div className="text-gray-500 text-[9px] tracking-widest">ALTERNATIVE INVESTMENT INTELLIGENCE</div></div></div>
<div className="flex-1 max-w-xl mx-8"><div className="flex items-center gap-2 bg-[#111827] border border-gray-700 rounded-lg px-4 py-2"><Search size={14} className="text-gray-500"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search assets, protocols, transcripts, filings..." className="bg-transparent text-sm text-white placeholder-gray-500 outline-none flex-1"/><span className="text-gray-600 text-xs border border-gray-700 rounded px-1.5 py-0.5">⌘K</span></div></div>
<div className="flex items-center gap-3"><button className="relative p-2 text-gray-400 hover:text-white"><Bell size={18}/><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"/></button>
<div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">VP</div></div></div>
<nav className="flex gap-1">{TABS.map(t=><button key={t} onClick={()=>onNavigate(MAP[t])} className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activePage===MAP[t]?'border-emerald-400 text-emerald-400':'border-transparent text-gray-400 hover:text-white'}`}>{t}</button>)}</nav>
</header>);}
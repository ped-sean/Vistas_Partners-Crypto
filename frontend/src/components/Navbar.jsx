import{useState,useRef,useEffect}from'react';
import{Search,Bell,X,TrendingUp,Activity,Zap,ChevronDown}from'lucide-react';
const TABS=[{id:'dashboard',label:'Dashboard',icon:'ti-layout-dashboard'},{id:'markets',label:'Markets',icon:'ti-trending-up'},{id:'workbench',label:'Analyst Workbench',icon:'ti-microscope'},{id:'events',label:'Events & Calendar',icon:'ti-calendar-event'},{id:'transcripts',label:'Transcripts',icon:'ti-microphone'},{id:'research',label:'Research',icon:'ti-file-text'}];
const COINS=[{s:'BTC',p:'$98,620',c:'+2.4%',up:true},{s:'ETH',p:'$3,582',c:'+3.1%',up:true},{s:'SOL',p:'$201.4',c:'+4.7%',up:true},{s:'BNB',p:'$608',c:'+1.3%',up:true},{s:'AVAX',p:'$38.9',c:'-1.2%',up:false}];
const NOTIFS=[{type:'price',color:'#10b981',msg:'BTC crossed $100K — price alert triggered',time:'2 min ago'},{type:'whale',color:'#f59e0b',msg:'Whale alert: 12,400 BTC moved to exchange ($1.2B)',time:'14 min ago'},{type:'event',color:'#3b82f6',msg:'ETH Pectra upgrade vote — 2 days remaining',time:'1h ago'},{type:'transcript',color:'#8b5cf6',msg:'New transcript: Coinbase Q1 2025 Earnings available',time:'3h ago'}];
export default function Navbar({activePage,onNavigate}){
const[q,setQ]=useState('');
const[showSearch,setShowSearch]=useState(false);
const[showNotif,setShowNotif]=useState(false);
const[showProfile,setShowProfile]=useState(false);
const[unread,setUnread]=useState(3);
const ref=useRef();
useEffect(()=>{const h=e=>{if(ref.current&&!ref.current.contains(e.target)){setShowNotif(false);setShowProfile(false);}};document.addEventListener('mousedown',h);return()=>document.removeEventListener('mousedown',h);},[]);
return(<header className="bg-[#0a0f1a] border-b border-gray-800 flex flex-col shrink-0" ref={ref}>
<div className="flex items-center gap-3 px-5 h-14">
<div className="flex items-center gap-2.5 shrink-0">
<div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-black font-bold text-sm">V</div>
<div><p className="text-white font-bold text-sm leading-tight">Vistas Research</p><p className="text-emerald-400 font-bold text-xs leading-tight">Catalyst</p></div></div>
{showSearch?(
<div className="flex-1 flex items-center gap-2 bg-[#111827] border border-emerald-500/50 rounded-lg px-4 py-2 mx-4">
<Search size={14} className="text-emerald-400 shrink-0"/>
<input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Search coins, protocols, transcripts..." className="bg-transparent text-sm text-white placeholder-gray-500 outline-none flex-1"/>
<button onClick={()=>{setShowSearch(false);setQ('');}}><X size={14} className="text-gray-500 hover:text-white"/></button></div>
):(
<button onClick={()=>setShowSearch(true)} className="flex-1 flex items-center gap-2 bg-[#111827] border border-gray-700 rounded-lg px-4 py-2 mx-4 text-left hover:border-gray-600 transition-colors">
<Search size={14} className="text-gray-500"/><span className="text-sm text-gray-500">Search assets, protocols, transcripts, filings...</span>
<span className="ml-auto text-gray-600 text-xs border border-gray-700 rounded px-1.5 py-0.5">⌘K</span></button>)}
<div className="flex items-center gap-2 ml-auto shrink-0">
<div className="flex items-center gap-1.5 bg-[#0d2a1f] border border-emerald-500/30 rounded-lg px-3 py-1.5">
<div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
<span className="text-emerald-400 text-xs font-medium">Markets Open</span></div>
<div className="relative">
<button onClick={()=>{setShowNotif(v=>!v);setShowProfile(false);}} className="relative w-9 h-9 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-600 transition-colors">
<Bell size={16}/>{unread>0&&<span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] flex items-center justify-center font-bold">{unread}</span>}</button>
{showNotif&&<div className="absolute right-0 top-11 w-80 bg-[#0d1525] border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden">
<div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
<span className="text-white text-sm font-semibold">Notifications</span>
<button onClick={()=>setUnread(0)} className="text-emerald-400 text-xs hover:text-emerald-300">Mark all read</button></div>
{NOTIFS.map((n,i)=>(<div key={i} className="flex gap-3 px-4 py-3 border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors">
<div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{background:n.color}}/>
<div><p className="text-gray-200 text-xs leading-relaxed">{n.msg}</p><p className="text-gray-500 text-[10px] mt-1">{n.time}</p></div></div>))}
<div className="px-4 py-2 text-center"><button className="text-emerald-400 text-xs hover:text-emerald-300">View all notifications</button></div></div>}</div>
<div className="relative">
<button onClick={()=>{setShowProfile(v=>!v);setShowNotif(false);}} className="flex items-center gap-2 hover:opacity-90 transition-opacity">
<div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">VP</div></button>
{showProfile&&<div className="absolute right-0 top-11 w-64 bg-[#0d1525] border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden">
<div className="px-4 py-4 border-b border-gray-800">
<div className="flex items-center gap-3 mb-1">
<div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">VP</div>
<div><p className="text-white text-sm font-semibold">Sean Ped</p><p className="text-gray-500 text-xs">ped.sean1@gmail.com</p></div></div>
<span className="text-emerald-400 text-xs bg-emerald-400/10 border border-emerald-500/20 rounded-full px-2 py-0.5">Pro Plan</span></div>
{[['Watchlist','12 coins'],['Active Alerts','4'],['Theme','Dark'],['API Access','Enabled']].map(([l,v])=>(
<div key={l} className="flex justify-between items-center px-4 py-2.5 border-b border-gray-800/50 hover:bg-gray-800/20">
<span className="text-gray-400 text-xs">{l}</span><span className="text-gray-200 text-xs font-medium">{v}</span></div>))}
<button className="w-full px-4 py-3 text-red-400 text-xs text-left hover:bg-gray-800/20 transition-colors">Sign out</button></div>}</div></div></div>
<nav className="flex gap-0 px-4 border-t border-gray-800/50">
{TABS.map(t=>(
<button key={t.id} onClick={()=>onNavigate(t.id)} className={`flex items-center gap-1.5 px-4 py-3 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
activePage===t.id?'border-emerald-400 text-emerald-400':'border-transparent text-gray-500 hover:text-gray-300'}`}>
<i className={`ti ${t.icon}`} aria-hidden="true"/>{t.label}</button>))}
<div className="ml-auto flex items-center gap-3 py-2">
{COINS.map(c=>(<span key={c.s} className="text-[10px] flex items-center gap-1">
<span className="text-gray-400 font-medium">{c.s}</span>
<span className="text-white font-bold">{c.p}</span>
<span className={c.up?'text-emerald-400':'text-red-400'}>{c.c}</span></span>))}
</div></nav></header>);}

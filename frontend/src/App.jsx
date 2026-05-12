import{useState}from'react';
import Navbar from'./components/Navbar';
import Dashboard from'./components/Dashboard';
import Markets from'./pages/Markets';
import Workbench from'./pages/Workbench';
import Events from'./pages/Events';
import Transcripts from'./pages/Transcripts';
const Research=()=>(<div className="p-8 text-center"><div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4"><i className="ti ti-file-text text-emerald-400" style={{fontSize:28}} aria-hidden="true"/></div><h2 className="text-white font-bold text-xl mb-2">Research Hub</h2><p className="text-gray-500 text-sm">Deep-dive research reports, market outlooks, and thematic analysis</p><p className="text-xs text-gray-600 mt-2">GET /api/transcripts · Coming soon</p></div>);
export default function App(){
const[page,setPage]=useState('dashboard');
const pages={dashboard:<Dashboard/>,markets:<Markets/>,workbench:<Workbench/>,events:<Events/>,transcripts:<Transcripts/>,research:<Research/>};
return(<div className="flex flex-col h-screen bg-[#060d1a] text-gray-100 overflow-hidden">
<Navbar activePage={page} onNavigate={setPage}/>
<main className="flex-1 overflow-auto">{pages[page]||<Dashboard/>}</main>
</div>);}

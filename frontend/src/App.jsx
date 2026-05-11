import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CompareView from './components/CompareView';
import DeFiPanel from './components/DeFiPanel';
import WhaleTable from './components/WhaleTable';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const pages = {
    dashboard: <Dashboard />,
    defi: <DeFiPanel />,
    whale: <WhaleTable />,
    compare: <CompareView />,
  };

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100 overflow-hidden">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="flex-1 overflow-auto">
        {pages[activePage] || <Dashboard />}
      </main>
    </div>
  );
}

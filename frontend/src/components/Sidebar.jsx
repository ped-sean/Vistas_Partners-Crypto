import { LayoutDashboard, TrendingUp, Waves, GitCompare, Settings, LogOut } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Overview',      icon: LayoutDashboard },
  { id: 'defi',      label: 'DeFi Protocols', icon: TrendingUp },
  { id: 'whale',     label: 'Whale Signals',  icon: Waves },
  { id: 'compare',   label: 'Compare',        icon: GitCompare },
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="w-56 bg-gray-900 border-r border-gray-800 flex flex-col py-6 px-3 shrink-0">
      <div className="mb-8 px-3">
        <h1 className="text-lg font-bold text-white tracking-tight">Vistas</h1>
        <p className="text-xs text-gray-500">Crypto Intelligence</p>
      </div>

      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activePage === id
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </nav>

      <div className="space-y-1 border-t border-gray-800 pt-4">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white">
          <Settings size={16} /> Settings
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-red-400">
          <LogOut size={16} /> Sign out
        </button>
      </div>
    </aside>
  );
}

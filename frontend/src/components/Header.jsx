import { Search, Bell } from 'lucide-react';
import { useState } from 'react';

export default function Header({ title }) {
  const [query, setQuery] = useState('');
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-bold text-white">{title}</h1>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-lg px-3 py-2">
          <Search size={14} className="text-gray-500" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search coins..."
            className="bg-transparent text-sm text-white placeholder-gray-500 outline-none w-40"
          />
        </div>
        <button className="relative p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-white">
          <Bell size={16} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-blue-500 rounded-full" />
        </button>
      </div>
    </div>
  );
}

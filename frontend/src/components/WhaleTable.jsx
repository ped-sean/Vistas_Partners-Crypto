import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import Header from './Header';

const MOCK_WHALES = [
  { tx_hash:'0xabc1', asset:'BTC', value_usd:12400000, from_address:'bc1qxy...', to_address:'3FZbgi...', timestamp:'2025-05-11T04:21:00Z', direction:'out' },
  { tx_hash:'0xabc2', asset:'ETH', value_usd:8700000,  from_address:'0x1234...', to_address:'0xDead...', timestamp:'2025-05-11T03:55:00Z', direction:'in'  },
  { tx_hash:'0xabc3', asset:'BTC', value_usd:31000000, from_address:'1A1zP1...', to_address:'bc1qxy...', timestamp:'2025-05-11T02:11:00Z', direction:'in'  },
  { tx_hash:'0xabc4', asset:'SOL', value_usd:4200000,  from_address:'5hG3mK...', to_address:'9xNe6s...', timestamp:'2025-05-11T01:44:00Z', direction:'out' },
  { tx_hash:'0xabc5', asset:'ETH', value_usd:19800000, from_address:'0xAbcd...', to_address:'0x5678...', timestamp:'2025-05-10T23:59:00Z', direction:'out' },
];

export default function WhaleTable() {
  const fmt = v => `$${(v/1e6).toFixed(1)}M`;
  const time = ts => new Date(ts).toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' });
  return (
    <div className="p-6 space-y-6">
      <Header title="Whale Signals" />
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              {['Direction','Asset','Amount','From','To','Time'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs text-gray-500 font-medium uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_WHALES.map(w => (
              <tr key={w.tx_hash} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                <td className="px-4 py-3">
                  <span className={`flex items-center gap-1 text-xs font-medium ${
                    w.direction === 'in' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {w.direction === 'in' ? <ArrowDownLeft size={12}/> : <ArrowUpRight size={12}/>}
                    {w.direction.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3"><span className="text-white font-semibold">{w.asset}</span></td>
                <td className="px-4 py-3"><span className="text-white font-bold">{fmt(w.value_usd)}</span></td>
                <td className="px-4 py-3"><span className="text-gray-400 font-mono text-xs">{w.from_address}</span></td>
                <td className="px-4 py-3"><span className="text-gray-400 font-mono text-xs">{w.to_address}</span></td>
                <td className="px-4 py-3"><span className="text-gray-500 text-xs">{time(w.timestamp)}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

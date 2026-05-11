import { useState } from 'react';
import PriceChart from './PriceChart';
import Header from './Header';

const COINS = [
  { coin_id:'bitcoin',  symbol:'BTC', name:'Bitcoin',  current_price:67420, price_change_24h_pct:2.41,  market_cap:1320000000000, total_volume:28000000000, ath:73750 },
  { coin_id:'ethereum', symbol:'ETH', name:'Ethereum', current_price:3521,  price_change_24h_pct:-0.87, market_cap:423000000000,  total_volume:14000000000, ath:4878  },
  { coin_id:'solana',   symbol:'SOL', name:'Solana',   current_price:178,   price_change_24h_pct:5.12,  market_cap:82000000000,   total_volume:3200000000,  ath:260   },
  { coin_id:'bnb',      symbol:'BNB', name:'BNB',      current_price:608,   price_change_24h_pct:1.33,  market_cap:88000000000,   total_volume:1800000000,  ath:686   },
];

function genHistory(price) {
  const pts = []; let p = price * 0.85; const now = Date.now();
  for (let i = 30; i >= 0; i--) {
    p = p * (1 + (Math.random() - 0.47) * 0.04);
    pts.push({ t: now - i * 86400000, p: parseFloat(p.toFixed(2)) });
  }
  return pts;
}

const METRICS = [
  { key:'current_price', label:'Price',       fmt: v => `$${v.toLocaleString()}` },
  { key:'price_change_24h_pct', label:'24h %', fmt: v => `${v >= 0 ? '+' : ''}${v.toFixed(2)}%` },
  { key:'market_cap',    label:'Market Cap',  fmt: v => `$${(v/1e9).toFixed(1)}B` },
  { key:'total_volume',  label:'24h Volume',  fmt: v => `$${(v/1e9).toFixed(1)}B` },
  { key:'ath',           label:'ATH',         fmt: v => `$${v.toLocaleString()}` },
];

export default function CompareView() {
  const [a, setA] = useState(COINS[0]);
  const [b, setB] = useState(COINS[1]);

  return (
    <div className="p-6 space-y-6">
      <Header title="Compare Coins" />

      <div className="grid grid-cols-2 gap-4">
        {[{coin: a, set: setA, color:'#3b82f6'}, {coin: b, set: setB, color:'#a855f7'}].map(({coin, set, color}, i) => (
          <div key={i} className="bg-gray-900 rounded-xl border border-gray-800 p-4 space-y-4">
            <select
              value={coin.coin_id}
              onChange={e => set(COINS.find(c => c.coin_id === e.target.value))}
              className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 text-sm border border-gray-700 outline-none"
            >
              {COINS.map(c => <option key={c.coin_id} value={c.coin_id}>{c.name} ({c.symbol})</option>)}
            </select>
            <div>
              <p className="text-2xl font-bold text-white">${coin.current_price.toLocaleString()}</p>
              <p className={`text-sm ${coin.price_change_24h_pct >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {coin.price_change_24h_pct >= 0 ? '+' : ''}{coin.price_change_24h_pct.toFixed(2)}% 24h
              </p>
            </div>
            <PriceChart data={genHistory(coin.current_price)} color={color} />
          </div>
        ))}
      </div>

      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left px-4 py-3 text-xs text-gray-500 font-medium uppercase">Metric</th>
              <th className="text-right px-4 py-3 text-xs text-blue-400 font-medium uppercase">{a.symbol}</th>
              <th className="text-right px-4 py-3 text-xs text-purple-400 font-medium uppercase">{b.symbol}</th>
            </tr>
          </thead>
          <tbody>
            {METRICS.map(m => (
              <tr key={m.key} className="border-b border-gray-800/50">
                <td className="px-4 py-3 text-gray-400">{m.label}</td>
                <td className="px-4 py-3 text-right text-blue-300 font-semibold">{m.fmt(a[m.key])}</td>
                <td className="px-4 py-3 text-right text-purple-300 font-semibold">{m.fmt(b[m.key])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

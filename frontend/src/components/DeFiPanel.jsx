import Header from './Header';

const MOCK_DEFI = [
  { protocol_id:'uniswap',   name:'Uniswap V3',  tvl:4200000000, tvl_change_1d:1.2,  chain:'Ethereum', category:'DEX',     apy:8.4  },
  { protocol_id:'aave',      name:'Aave',         tvl:9800000000, tvl_change_1d:-0.5, chain:'Ethereum', category:'Lending', apy:4.1  },
  { protocol_id:'lido',      name:'Lido',         tvl:22000000000,tvl_change_1d:0.8,  chain:'Ethereum', category:'Liquid Staking', apy:3.8 },
  { protocol_id:'jito',      name:'Jito',         tvl:1900000000, tvl_change_1d:4.2,  chain:'Solana',   category:'Liquid Staking', apy:7.2 },
  { protocol_id:'pancake',   name:'PancakeSwap',  tvl:1400000000, tvl_change_1d:-1.1, chain:'BSC',      category:'DEX',     apy:12.3 },
  { protocol_id:'curve',     name:'Curve',        tvl:3100000000, tvl_change_1d:0.3,  chain:'Ethereum', category:'DEX',     apy:5.6  },
];

const CHAIN_COLORS = {
  Ethereum: 'bg-purple-500/20 text-purple-400',
  Solana:   'bg-green-500/20 text-green-400',
  BSC:      'bg-yellow-500/20 text-yellow-400',
};

export default function DeFiPanel() {
  const fmt = v => v >= 1e9 ? `$${(v/1e9).toFixed(1)}B` : `$${(v/1e6).toFixed(0)}M`;
  return (
    <div className="p-6 space-y-6">
      <Header title="DeFi Protocols" />

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <p className="text-xs text-gray-500 mb-1">Total TVL</p>
          <p className="text-2xl font-bold text-white">$42.4B</p>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <p className="text-xs text-gray-500 mb-1">Protocols Tracked</p>
          <p className="text-2xl font-bold text-white">6</p>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <p className="text-xs text-gray-500 mb-1">Avg APY</p>
          <p className="text-2xl font-bold text-green-400">6.9%</p>
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              {['Protocol','TVL','24h Change','Chain','Category','APY'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs text-gray-500 font-medium uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_DEFI.map(d => (
              <tr key={d.protocol_id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                <td className="px-4 py-3 text-white font-semibold">{d.name}</td>
                <td className="px-4 py-3 text-white font-bold">{fmt(d.tvl)}</td>
                <td className={`px-4 py-3 font-medium text-sm ${
                  d.tvl_change_1d >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>{d.tvl_change_1d >= 0 ? '+' : ''}{d.tvl_change_1d}%</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${CHAIN_COLORS[d.chain] || 'bg-gray-700 text-gray-300'}`}>{d.chain}</span>
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs">{d.category}</td>
                <td className="px-4 py-3 text-green-400 font-bold">{d.apy}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

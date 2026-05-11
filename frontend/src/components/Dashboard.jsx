import { useState, useEffect } from 'react';
import CoinCard from './CoinCard';
import PriceChart from './PriceChart';
import MetricPanel from './MetricPanel';
import Header from './Header';
import { fetchCoins, fetchCoinDetail } from '../api/coins';
import { TIME_RANGES } from '../constants/variables';

// Mock data until backend is connected
const MOCK_COINS = [
  { coin_id:'bitcoin',  symbol:'BTC', name:'Bitcoin',  current_price:67420, price_change_24h_pct:2.41,  market_cap:1320000000000, total_volume:28000000000, market_cap_rank:1,  image_url:'https://assets.coingecko.com/coins/images/1/small/bitcoin.png' },
  { coin_id:'ethereum', symbol:'ETH', name:'Ethereum', current_price:3521,  price_change_24h_pct:-0.87, market_cap:423000000000,  total_volume:14000000000, market_cap_rank:2,  image_url:'https://assets.coingecko.com/coins/images/279/small/ethereum.png' },
  { coin_id:'solana',   symbol:'SOL', name:'Solana',   current_price:178,   price_change_24h_pct:5.12,  market_cap:82000000000,   total_volume:3200000000,  market_cap_rank:5,  image_url:'https://assets.coingecko.com/coins/images/4128/small/solana.png' },
  { coin_id:'bnb',      symbol:'BNB', name:'BNB',      current_price:608,   price_change_24h_pct:1.33,  market_cap:88000000000,   total_volume:1800000000,  market_cap_rank:4,  image_url:'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png' },
  { coin_id:'xrp',      symbol:'XRP', name:'XRP',      current_price:0.617, price_change_24h_pct:-1.22, market_cap:34000000000,   total_volume:1100000000,  market_cap_rank:6,  image_url:'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png' },
  { coin_id:'avalanche',symbol:'AVAX',name:'Avalanche',current_price:38.2,  price_change_24h_pct:3.77,  market_cap:15700000000,   total_volume:620000000,   market_cap_rank:11, image_url:'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png' },
];

function generateMockHistory(basePrice, days = 30) {
  const points = [];
  let price = basePrice * 0.85;
  const now = Date.now();
  for (let i = days; i >= 0; i--) {
    price = price * (1 + (Math.random() - 0.47) * 0.04);
    points.push({ t: now - i * 86400000, p: parseFloat(price.toFixed(2)) });
  }
  return points;
}

export default function Dashboard() {
  const [coins, setCoins] = useState(MOCK_COINS);
  const [selectedCoin, setSelectedCoin] = useState(MOCK_COINS[0]);
  const [priceHistory, setPriceHistory] = useState([]);
  const [timeRange, setTimeRange] = useState('30');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPriceHistory(generateMockHistory(selectedCoin.current_price, parseInt(timeRange)));
  }, [selectedCoin, timeRange]);

  const fmt = (n) => n >= 1e9 ? `$${(n/1e9).toFixed(1)}B` : n >= 1e6 ? `$${(n/1e6).toFixed(0)}M` : `$${n.toLocaleString()}`;

  return (
    <div className="p-6 space-y-6">
      <Header title="Market Overview" />

      {/* Coin list */}
      <div className="grid grid-cols-3 gap-3">
        {coins.map(coin => (
          <CoinCard
            key={coin.coin_id}
            coin={coin}
            selected={selectedCoin.coin_id === coin.coin_id}
            onClick={() => setSelectedCoin(coin)}
          />
        ))}
      </div>

      {/* Chart + metrics row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-gray-900 rounded-xl p-4 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-white font-semibold">{selectedCoin.name} Price</h2>
              <p className="text-2xl font-bold text-white mt-1">
                ${selectedCoin.current_price.toLocaleString()}
                <span className={`text-sm ml-2 font-normal ${selectedCoin.price_change_24h_pct >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {selectedCoin.price_change_24h_pct >= 0 ? '+' : ''}{selectedCoin.price_change_24h_pct.toFixed(2)}%
                </span>
              </p>
            </div>
            <div className="flex gap-1">
              {TIME_RANGES.map(r => (
                <button
                  key={r.value}
                  onClick={() => setTimeRange(r.value)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    timeRange === r.value ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >{r.label}</button>
              ))}
            </div>
          </div>
          <PriceChart data={priceHistory} color={selectedCoin.price_change_24h_pct >= 0 ? '#22c55e' : '#ef4444'} />
        </div>

        <div className="space-y-3">
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <p className="text-xs text-gray-500 mb-1">Market Cap</p>
            <p className="text-lg font-bold text-white">{fmt(selectedCoin.market_cap)}</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <p className="text-xs text-gray-500 mb-1">24h Volume</p>
            <p className="text-lg font-bold text-white">{fmt(selectedCoin.total_volume)}</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <p className="text-xs text-gray-500 mb-1">CMC Rank</p>
            <p className="text-lg font-bold text-white">#{selectedCoin.market_cap_rank}</p>
          </div>
          <MetricPanel />
        </div>
      </div>
    </div>
  );
}

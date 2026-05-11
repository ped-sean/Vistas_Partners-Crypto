export default function CoinCard({ coin, selected, onClick }) {
  const isUp = coin.price_change_24h_pct >= 0;
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border transition-all ${
        selected
          ? 'bg-blue-600/20 border-blue-500'
          : 'bg-gray-900 border-gray-800 hover:border-gray-600'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <img src={coin.image_url} alt={coin.symbol} className="w-7 h-7 rounded-full" onError={e => e.target.style.display='none'} />
          <div>
            <p className="text-white text-sm font-semibold">{coin.symbol}</p>
            <p className="text-gray-500 text-xs">{coin.name}</p>
          </div>
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
          isUp ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {isUp ? '+' : ''}{coin.price_change_24h_pct.toFixed(2)}%
        </span>
      </div>
      <p className="text-white font-bold text-lg">
        ${coin.current_price >= 1 ? coin.current_price.toLocaleString() : coin.current_price.toFixed(4)}
      </p>
      <p className="text-gray-500 text-xs mt-1">
        Vol: ${(coin.total_volume / 1e9).toFixed(1)}B
      </p>
    </button>
  );
}

// On-chain metrics panel
// BACKEND: feed from GET /onchain/{metric} — see ONCHAIN_FIELDS in variables.js
const MOCK_METRICS = [
  { label: 'NUPL',     value: '0.58',  hint: 'Belief',    color: 'text-green-400' },
  { label: 'SOPR',     value: '1.023', hint: 'Profit',    color: 'text-green-400' },
  { label: 'MVRV Z',  value: '2.41',  hint: 'Moderate',  color: 'text-yellow-400' },
  { label: 'Exch In', value: '4.2K',  hint: 'BTC/day',   color: 'text-red-400' },
];

export default function MetricPanel() {
  return (
    <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
      <p className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wider">On-Chain</p>
      <div className="space-y-2.5">
        {MOCK_METRICS.map(m => (
          <div key={m.label} className="flex items-center justify-between">
            <span className="text-gray-400 text-xs">{m.label}</span>
            <div className="text-right">
              <span className={`text-sm font-bold ${m.color}`}>{m.value}</span>
              <span className="text-gray-600 text-xs ml-1">{m.hint}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

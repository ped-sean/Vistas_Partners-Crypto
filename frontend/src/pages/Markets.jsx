import { useState, useMemo } from "react"

const fmt = (n) => {
  if (n === null || n === undefined) return "-"
  if (Math.abs(n) >= 1e12) return "$" + (n / 1e12).toFixed(2) + "T"
  if (Math.abs(n) >= 1e9)  return "$" + (n / 1e9).toFixed(1) + "B"
  if (Math.abs(n) >= 1e6)  return "$" + (n / 1e6).toFixed(1) + "M"
  if (Math.abs(n) >= 1e3)  return "$" + (n / 1e3).toFixed(1) + "K"
  return "$" + n.toLocaleString()
}

const Pct = ({ v }) => {
  if (v === null || v === undefined) return <span className="text-gray-500">-</span>
  const pos = v >= 0
  return <span className={pos ? "text-green-400" : "text-red-400"}>{(pos?"+":"")+v.toFixed(1)+"%"}</span>
}

const VolPct = ({ v }) => {
  if (v === null || v === undefined) return <span className="text-gray-500">-</span>
  const pos = v >= 0
  const bg = pos ? "bg-green-900/60" : "bg-red-900/60"
  const text = pos ? "text-green-300" : "text-red-300"
  return <span className={`${bg} ${text} px-2 py-0.5 rounded text-xs font-medium`}>{(pos?"+":"")+v.toFixed(1)+"%"}</span>
}

const Sparkline = ({ pos }) => (
  <svg width="56" height="18" viewBox="0 0 56 18">
    <polyline
      points={pos ? "0,14 9,11 18,13 27,7 36,9 45,4 56,2" : "0,4 9,7 18,5 27,11 36,9 45,13 56,15"}
      fill="none" stroke={pos ? "#4ade80" : "#f87171"} strokeWidth="1.5" strokeLinejoin="round"
    />
  </svg>
)

const OVERVIEW_TABS = ["Overview", "Fundamentals", "Profit & Loss", "Supply Dynamics", "Futures"]

const CATEGORY_TABS = [
  "All", "Stablecoins", "Layer 1", "Layer 2", "Web3", "Meme",
  "Tokenized", "AI", "Staking", "DeFi", "DePIN", "Exchange",
  "Gaming", "NFT", "RWA", "Governance"
]

const MOCK = [
  { rank:1,  name:"Bitcoin",      symbol:"BTC",  cat:"Layer 1",    price:81553.31, p24:1.0,  p7:3.8,  mcap:1630.5e9, vol:4.7e9,   vpct:63.9,  oi:48e9,     oi24:0.1,  fr:0.0019,  liq:27.9e6 },
  { rank:2,  name:"Ethereum",     symbol:"ETH",  cat:"Layer 1",    price:2361.05, p24:1.2,  p7:1.5,  mcap:299.3e9,  vol:3.4e9,   vpct:70.9,  oi:26.1e9,   oi24:-3.4, fr:0.0078,  liq:13.6e6 },
  { rank:3,  name:"Tether",       symbol:"USDT", cat:"Stablecoins",price:0.9997,  p24:0.0,  p7:-0.0, mcap:189.6e9,  vol:118.3e6, vpct:16.3,  oi:106.6e3,  oi24:0.0,  fr:-0.0052, liq:438 },
  { rank:4,  name:"XRP",          symbol:"XRP",  cat:"Layer 1",    price:1.46,    p24:2.9,  p7:5.1,  mcap:90e9,     vol:893.9e6, vpct:168.7, oi:2.3e9,    oi24:6.2,  fr:0.0076,  liq:2.6e6 },
  { rank:5,  name:"BNB",          symbol:"BNB",  cat:"Exchange",   price:659.22,  p24:1.7,  p7:6.5,  mcap:88.5e9,   vol:189.1e6, vpct:23.3,  oi:799.6e6,  oi24:4.7,  fr:0.0095,  liq:220.3e3 },
  { rank:6,  name:"USDC",         symbol:"USDC", cat:"Stablecoins",price:0.9997,  p24:0.0,  p7:-0.0, mcap:77.9e9,   vol:1.2e9,   vpct:38.4,  oi:14.3e6,   oi24:0.2,  fr:-0.0022, liq:null },
  { rank:7,  name:"Solana",       symbol:"SOL",  cat:"Layer 1",    price:95.99,   p24:2.9,  p7:14.3, mcap:55.2e9,   vol:905e6,   vpct:55.2,  oi:5.1e9,    oi24:3.6,  fr:0.0073,  liq:5.9e6 },
  { rank:8,  name:"TRON",         symbol:"TRX",  cat:"Layer 1",    price:0.3496,  p24:-0.3, p7:3.4,  mcap:33.1e9,   vol:61.7e6,  vpct:-20.6, oi:246.8e6,  oi24:0.0,  fr:0.0014,  liq:54.6e3 },
  { rank:9,  name:"Dogecoin",     symbol:"DOGE", cat:"Meme",       price:0.1111,  p24:1.9,  p7:0.7,  mcap:17e9,     vol:318.8e6, vpct:111.4, oi:1.2e9,    oi24:5.3,  fr:0.0089,  liq:1.8e6 },
  { rank:10, name:"Cardano",      symbol:"ADA",  cat:"Layer 1",    price:0.2807,  p24:3.5,  p7:12.5, mcap:10.3e9,   vol:158.4e6, vpct:87.0,  oi:400.5e6,  oi24:3.5,  fr:0.0058,  liq:445.4e3 },
  { rank:11, name:"Chainlink",    symbol:"LINK", cat:"DeFi",       price:13.08,   p24:4.2,  p7:9.1,  mcap:8.4e9,    vol:312e6,   vpct:42.1,  oi:340e6,    oi24:2.1,  fr:0.0061,  liq:890e3 },
  { rank:12, name:"Avalanche",    symbol:"AVAX", cat:"Layer 1",    price:19.82,   p24:-1.2, p7:2.8,  mcap:8.2e9,    vol:220e6,   vpct:31.5,  oi:285e6,    oi24:-1.8, fr:0.0044,  liq:620e3 },
]

const SORT_COLS = ["rank","name","price","p24","p7","mcap","vol","vpct","oi","oi24","fr","liq"]

export default function Markets() {
  const [overviewTab, setOverviewTab] = useState("Overview")
  const [categoryTab, setCategoryTab] = useState("All")
  const [filter, setFilter] = useState("")
  const [sort, setSort] = useState({ col: "rank", dir: 1 })

  const coins = useMemo(() => {
    let list = [...MOCK]
    if (categoryTab !== "All") list = list.filter(c => c.cat === categoryTab)
    if (filter) list = list.filter(c =>
      c.name.toLowerCase().includes(filter.toLowerCase()) ||
      c.symbol.toLowerCase().includes(filter.toLowerCase())
    )
    list.sort((a, b) => {
      const av = a[sort.col], bv = b[sort.col]
      if (av === null) return 1
      if (bv === null) return -1
      return (av < bv ? -1 : av > bv ? 1 : 0) * sort.dir
    })
    return list
  }, [categoryTab, filter, sort])

  const toggleSort = (col) => setSort(s => ({
    col,
    dir: s.col === col ? -s.dir : 1
  }))

  const SortTh = ({ col, label, cls="" }) => (
    <th
      className={`px-3 py-3 text-left text-xs font-semibold text-gray-400 cursor-pointer hover:text-white select-none whitespace-nowrap ${cls}`}
      onClick={() => toggleSort(col)}
    >
      {label}{sort.col === col ? (sort.dir === 1 ? " ↑" : " ↓") : " ↕"}
    </th>
  )

  return (
    <div className="p-6 bg-gray-950 min-h-screen text-white">
      {/* Overview tabs */}
      <div className="flex gap-1 mb-4">
        {OVERVIEW_TABS.map(t => (
          <button
            key={t}
            onClick={() => setOverviewTab(t)}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              overviewTab === t
                ? "bg-gray-800 text-white border border-gray-600"
                : "text-gray-400 hover:text-white hover:bg-gray-800/50"
            }`}
          >{t}</button>
        ))}
      </div>

      {/* Category filter row */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mb-5 border-b border-gray-800 pb-3">
        {CATEGORY_TABS.map(t => (
          <button
            key={t}
            onClick={() => setCategoryTab(t)}
            className={`text-sm pb-1 transition-colors ${
              categoryTab === t
                ? "text-white border-b-2 border-green-400 font-medium"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >{t}</button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter coins..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-500 w-64"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-800">
        <table className="w-full text-sm">
          <thead className="bg-gray-900 border-b border-gray-800">
            <tr>
              <SortTh col="rank" label="#" cls="w-10" />
              <SortTh col="name" label="Asset" />
              <SortTh col="price" label="Price" />
              <SortTh col="p24" label="24h %" />
              <SortTh col="p7" label="7d %" />
              <th className="px-3 py-3 text-left text-xs font-semibold text-gray-400 whitespace-nowrap"></th>
              <SortTh col="mcap" label="Market Cap" />
              <SortTh col="vol" label="Vol 24h" />
              <SortTh col="vpct" label="Vol 24h %" />
              <SortTh col="oi" label="OI" />
              <SortTh col="oi24" label="OI 24h %" />
              <SortTh col="fr" label="Funding Rate" />
              <SortTh col="liq" label="Liquidations 24h" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {coins.map((c, i) => (
              <tr key={c.symbol} className={`hover:bg-gray-800/40 transition-colors ${i % 2 === 0 ? "" : "bg-gray-900/20"}`}>
                <td className="px-3 py-3 text-gray-500 text-xs">{c.rank}</td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-300">
                      {c.symbol.slice(0,2)}
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{c.name}</p>
                      <p className="text-gray-500 text-xs">{c.symbol}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3 font-semibold text-white">
                  {c.price >= 1 ? "$"+c.price.toLocaleString() : "$"+c.price.toFixed(4)}
                </td>
                <td className="px-3 py-3"><Pct v={c.p24} /></td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <Pct v={c.p7} />
                    <Sparkline pos={c.p7 >= 0} />
                  </div>
                </td>
                <td className="px-3 py-3"></td>
                <td className="px-3 py-3 text-gray-300">{fmt(c.mcap)}</td>
                <td className="px-3 py-3 text-gray-300">{fmt(c.vol)}</td>
                <td className="px-3 py-3"><VolPct v={c.vpct} /></td>
                <td className="px-3 py-3 text-gray-300">{fmt(c.oi)}</td>
                <td className="px-3 py-3"><Pct v={c.oi24} /></td>
                <td className="px-3 py-3">
                  {c.fr !== null
                    ? <span className={c.fr >= 0 ? "text-green-400" : "text-red-400"}>{(c.fr*100).toFixed(4)+"%"}</span>
                    : <span className="text-gray-500">-</span>}
                </td>
                <td className="px-3 py-3 text-gray-300">{fmt(c.liq)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
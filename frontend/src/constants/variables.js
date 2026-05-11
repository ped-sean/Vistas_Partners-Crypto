// ============================================================
// VISTAS PARTNERS CRYPTO — SHARED VARIABLE CONTRACT
// Frontend variable names that map 1:1 to backend Pydantic fields
// BACKEND TEAM: your JSON response keys must match these exactly
// ============================================================

export const COIN_FIELDS = {
  id:           'coin_id',           // string  — CoinGecko ID e.g. 'bitcoin'
  symbol:       'symbol',            // string  — e.g. 'BTC'
  name:         'name',              // string  — e.g. 'Bitcoin'
  price_usd:    'current_price',     // float   — current USD price
  change_24h:   'price_change_24h_pct', // float — % change last 24h
  market_cap:   'market_cap',        // float   — USD market cap
  volume_24h:   'total_volume',      // float   — 24h trading volume USD
  price_history:'price_history',     // list    — [{t: timestamp, p: price}]
  rank:         'market_cap_rank',   // int     — CMC rank
  logo_url:     'image_url',         // string  — coin logo
  ath:          'ath',               // float   — all time high USD
  description:  'description',       // string  — from Messari
};

export const DEFI_FIELDS = {
  protocol_id:   'protocol_id',      // string  — DeFiLlama slug
  name:          'name',             // string
  tvl_usd:       'tvl',              // float   — total value locked USD
  tvl_change_1d: 'tvl_change_1d',    // float   — % change
  chain:         'chain',            // string  — e.g. 'Ethereum'
  category:      'category',         // string  — e.g. 'DEX', 'Lending'
  apy:           'apy',              // float   — annual yield %
  logo_url:      'logo',             // string
};

export const WHALE_FIELDS = {
  tx_hash:    'tx_hash',             // string  — transaction hash
  coin_symbol:'asset',              // string  — e.g. 'BTC'
  amount_usd: 'value_usd',          // float   — USD value of tx
  from_addr:  'from_address',        // string  — sender wallet
  to_addr:    'to_address',          // string  — receiver wallet
  timestamp:  'timestamp',           // datetime ISO string
  direction:  'direction',           // enum    — 'in' | 'out'
};

export const ONCHAIN_FIELDS = {
  active_addresses: 'active_addresses', // int   — daily active addresses
  nupl:             'nupl',             // float — net unrealized profit/loss
  sopr:             'sopr',             // float — spent output profit ratio
  mvrv_z:           'mvrv_z_score',     // float — MVRV Z-score
  hash_rate:        'hash_rate',         // float — TH/s
  exchange_inflow:  'exchange_inflow',   // float — BTC flowing into exchanges
  exchange_outflow: 'exchange_outflow',  // float — BTC flowing out of exchanges
  timestamp:        'timestamp',         // datetime ISO string
};

// API base URL — switch between local dev and production
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Supported assets for on-chain metrics
export const SUPPORTED_ASSETS = ['BTC', 'ETH', 'SOL', 'AVAX', 'MATIC'];

// Default time ranges for charts
export const TIME_RANGES = [
  { label: '1D', value: '1' },
  { label: '7D', value: '7' },
  { label: '1M', value: '30' },
  { label: '3M', value: '90' },
  { label: '1Y', value: '365' },
];

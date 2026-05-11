from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class PricePoint(BaseModel):
    t: int        # unix timestamp
    p: float      # price USD

class CoinModel(BaseModel):
    """Maps to Supabase table: coins_market
    FRONTEND: see frontend/src/constants/variables.js COIN_FIELDS"""
    coin_id: str                          # -> coin.id
    symbol: str                           # -> coin.symbol
    name: str                             # -> coin.name
    current_price: float                  # -> coin.price_usd
    price_change_24h_pct: float           # -> coin.change_24h
    market_cap: float                     # -> coin.market_cap
    total_volume: float                   # -> coin.volume_24h
    price_history: Optional[List[PricePoint]] = []  # -> coin.price_history
    market_cap_rank: Optional[int] = None # -> coin.rank
    image_url: Optional[str] = None       # -> coin.logo_url
    ath: Optional[float] = None           # -> coin.ath
    description: Optional[str] = None     # -> coin.description (Messari)
    updated_at: Optional[datetime] = None

class CoinListResponse(BaseModel):
    coins: List[CoinModel]
    total: int
    page: int
    limit: int

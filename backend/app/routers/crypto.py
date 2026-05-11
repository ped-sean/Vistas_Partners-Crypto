from fastapi import APIRouter,Query
from typing import List,Optional
from pydantic import BaseModel
from datetime import datetime
router=APIRouter()
class CoinPrice(BaseModel):
    coin_id:str;symbol:str;name:str;current_price:float;price_change_24h_pct:float
    market_cap:float;total_volume:float;image_url:Optional[str]=None;market_cap_rank:Optional[int]=None
class MarketSummary(BaseModel):
    total_market_cap:float;total_volume_24h:float;btc_dominance:float
    eth_dominance:float;market_cap_change_24h_pct:float;active_coins:int;updated_at:datetime
@router.get("/overview",response_model=List[CoinPrice])
async def overview(limit:int=Query(20)):
    """TOP coins. SOURCE: Supabase coins_market. FRONTEND: Dashboard coin strip.
    TODO: return supabase.table('coins_market').select('*').order('market_cap_rank').limit(limit).execute().data"""
    raise NotImplementedError
@router.get("/prices",response_model=List[CoinPrice])
async def prices(ids:Optional[str]=Query(None),limit:int=Query(50)):
    """Live prices. SOURCE: Supabase coins_market. FRONTEND: Markets.jsx.
    TODO: filter by ids (comma-separated) if provided"""
    raise NotImplementedError
@router.get("/top-gainers",response_model=List[CoinPrice])
async def top_gainers(limit:int=Query(10)):
    """Best 24h. SOURCE: Supabase ORDER BY price_change_24h_pct DESC."""
    raise NotImplementedError
@router.get("/top-losers",response_model=List[CoinPrice])
async def top_losers(limit:int=Query(10)):
    """Worst 24h. SOURCE: Supabase ORDER BY price_change_24h_pct ASC."""
    raise NotImplementedError
@router.get("/market-summary",response_model=MarketSummary)
async def market_summary():
    """Global stats. SOURCE: Supabase market_global. FRONTEND: Dashboard $3.85T banner.
    TODO: return supabase.table('market_global').select('*').order('updated_at',desc=True).limit(1).execute().data[0]"""
    raise NotImplementedError

from fastapi import APIRouter, Query
from typing import List, Optional
from app.models.coin import CoinModel, CoinListResponse

router = APIRouter()

@router.get("/", response_model=CoinListResponse)
async def get_coins(
    limit: int = Query(50, description="Number of coins to return"),
    page: int = Query(1, description="Page number"),
    sort_by: str = Query("market_cap_rank", description="Field to sort by"),
    order: str = Query("asc", description="asc or desc")
):
    """
    Returns paginated list of coins.
    SOURCE: Supabase coins_market table (populated from CoinGecko)
    FRONTEND: maps to coin.* via COIN_FIELDS in variables.js
    """
    # TODO: Sai/Husain — query Supabase coins_market table here
    # Example: supabase.table('coins_market').select('*').order(sort_by).limit(limit)
    raise NotImplementedError("Connect to Supabase")

@router.get("/compare", response_model=List[CoinModel])
async def compare_coins(
    coin_a: str = Query(..., description="First coin ID e.g. bitcoin"),
    coin_b: str = Query(..., description="Second coin ID e.g. ethereum"),
):
    """
    Side-by-side comparison of two coins.
    FRONTEND: used by CompareView.jsx
    """
    # TODO: fetch both coins from Supabase and return as list of 2
    raise NotImplementedError("Connect to Supabase")

@router.get("/{coin_id}", response_model=CoinModel)
async def get_coin(
    coin_id: str,
    days: int = Query(7, description="Days of price history")
):
    """
    Full detail for a single coin including price_history.
    FRONTEND: maps to PriceChart.jsx via coin.price_history [{t, p}]
    SOURCE: CoinGecko market_chart endpoint + Supabase
    """
    # TODO: fetch from Supabase coin_price_history table
    raise NotImplementedError("Connect to Supabase")

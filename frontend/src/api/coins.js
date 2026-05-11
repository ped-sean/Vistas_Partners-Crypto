import axios from 'axios';
import { API_BASE_URL } from '../constants/variables';

const api = axios.create({ baseURL: API_BASE_URL });

// GET /coins — returns list of CoinModel
// BACKEND: wire to Supabase coins_market table
export const fetchCoins = async (params = {}) => {
  try {
    const res = await api.get('/coins', { params });
    return res.data.coins;
  } catch {
    return null; // falls back to mock data in components
  }
};

// GET /coins/:id — returns single CoinModel with price_history
export const fetchCoinDetail = async (coinId, days = 30) => {
  try {
    const res = await api.get(`/coins/${coinId}`, { params: { days } });
    return res.data;
  } catch {
    return null;
  }
};

// GET /coins/compare?coin_a=bitcoin&coin_b=ethereum
export const fetchCoinCompare = async (coinA, coinB) => {
  try {
    const res = await api.get('/coins/compare', { params: { coin_a: coinA, coin_b: coinB } });
    return res.data;
  } catch {
    return null;
  }
};

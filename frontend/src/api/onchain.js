import axios from 'axios';
import { API_BASE_URL } from '../constants/variables';
const api = axios.create({ baseURL: API_BASE_URL });
export const fetchOnchainMetric = async (metric, asset = 'BTC', from, to) => { try { const r = await api.get(`/onchain/${metric}`, { params: { asset, from, to } }); return r.data; } catch { return null; } };

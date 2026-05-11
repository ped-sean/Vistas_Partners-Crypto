import axios from 'axios';
import { API_BASE_URL } from '../constants/variables';
const api = axios.create({ baseURL: API_BASE_URL });
export const fetchProtocols = async (params = {}) => { try { const r = await api.get('/defi/protocols', { params }); return r.data; } catch { return null; } };
export const fetchTVL = async () => { try { const r = await api.get('/defi/tvl'); return r.data; } catch { return null; } };

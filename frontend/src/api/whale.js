import axios from 'axios';
import { API_BASE_URL } from '../constants/variables';
const api = axios.create({ baseURL: API_BASE_URL });
export const fetchWhaleSignals = async (params = {}) => { try { const r = await api.get('/whale/signals', { params }); return r.data; } catch { return null; } };

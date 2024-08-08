import axios from 'axios';
import { API_BASE_URL, API_KEY } from '../lib/constants';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params['apikey'] = API_KEY;
  return config;
});

export const API_BASE_URL = 'https://api.freecurrencyapi.com/v1';

export const API_KEY = import.meta.env.VITE_API_KEY;
if (!API_KEY) {
  throw new Error('VITE_API_KEY environment variable is not defined.');
}

export const CURRENCIES_TO_FETCH = ['USD', 'GBP', 'EUR', 'CZK', 'PLN'] as const;

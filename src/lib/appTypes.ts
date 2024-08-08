import { CURRENCIES_TO_FETCH } from './constants';

export type CurrencyType = {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
  type: string;
};

export type BaseCurrencyType = (typeof CURRENCIES_TO_FETCH)[number];

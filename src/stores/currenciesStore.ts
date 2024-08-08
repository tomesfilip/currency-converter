import { create } from 'zustand';
import { CurrencyType } from '../lib/appTypes';

type State = {
  currencies: CurrencyType[] | null;
};

type Actions = {
  setCurrencies: (currencies: CurrencyType[]) => void;
};

const initialState: State = {
  currencies: null,
};

export const useCurrenciesStore = create<State & Actions>((set) => ({
  ...initialState,
  setCurrencies: (value: CurrencyType[]) => set({ currencies: value }),
}));

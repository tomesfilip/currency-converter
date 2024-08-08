import { useEffect, useState } from 'react';

import { api } from '../config/api';
import { CurrencyType } from '../lib/appTypes';
import { CURRENCIES_TO_FETCH } from '../lib/constants';
import { useCurrenciesStore } from '../stores/currenciesStore';

const useGetCurrencies = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const setCurrencies = useCurrenciesStore((state) => state.setCurrencies);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const getData = async () => {
      try {
        const response = await api.get<{ data: Record<string, CurrencyType> }>('currencies', {
          signal,
          params: {
            currencies: CURRENCIES_TO_FETCH.join(','),
          },
        });
        setCurrencies(Object.values(response.data.data));
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unexpected error');
        }
      } finally {
        setIsLoading(false);
      }
    };

    getData();
    return () => abortController.abort();
  }, [setCurrencies]);

  return { isLoading, error };
};

export default useGetCurrencies;

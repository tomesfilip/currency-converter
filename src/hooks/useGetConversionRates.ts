import { useEffect, useState } from 'react';
import { api } from '../config/api';
import { BaseCurrencyType } from '../lib/appTypes';
import { CURRENCIES_TO_FETCH } from '../lib/constants';

const useGetConversionRates = (baseCurrency: BaseCurrencyType) => {
  const [data, setData] = useState<null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const getData = async () => {
      try {
        const { data } = await api.get('latest', {
          signal,
          params: {
            base_currency: baseCurrency,
            currencies: CURRENCIES_TO_FETCH.join(','),
          },
        });
        setData(data.data);
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
  }, [baseCurrency]);

  return { data, isLoading, error };
};

export default useGetConversionRates;

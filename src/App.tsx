import { useEffect, useState } from 'react';
import { CurrencyInputField } from './components/CurrencyInputField';
import { SwapFieldsButton } from './components/SwapFieldsButton';
import useGetConversionRates from './hooks/useGetConversionRates';
import useGetCurrencies from './hooks/useGetCurrencies';
import { BaseCurrencyType, CurrencyType } from './lib/appTypes';
import { useCurrenciesStore } from './stores/currenciesStore';

const App = () => {
  // TODO: handle error and loading states
  useGetCurrencies();

  const [fromVal, setFromVal] = useState<number | string>(0);
  const [toVal, setToVal] = useState<number | string>(0);

  const currencies = useCurrenciesStore((state) => state.currencies);

  const [selectedCurrencyFrom, setSelectedCurrencyFrom] = useState<CurrencyType | null>(null);
  const [selectedCurrencyTo, setSelectedCurrencyTo] = useState<CurrencyType | null>(null);

  const { data: conversionRates } = useGetConversionRates(selectedCurrencyFrom?.code as BaseCurrencyType);

  useEffect(() => {
    if (currencies && currencies.length > 1) {
      setSelectedCurrencyFrom(currencies[0]);
      setSelectedCurrencyTo(currencies[1]);
    }
  }, [currencies]);

  const calculateConversion = (value: number, fromCurrency: CurrencyType | null, toCurrency: CurrencyType | null) => {
    if (!value || !fromCurrency || !toCurrency || !conversionRates) {
      return { fromVal: '', toVal: '' };
    }

    const rate = conversionRates[toCurrency.code];
    if (rate) {
      const convertedValue = value * rate;
      return { fromVal: value, toVal: parseFloat(convertedValue.toFixed(2)) };
    }

    return { fromVal: '', toVal: '' };
  };

  const handleFromValChange = (value: number | string) => {
    const numericValue = Number(value);
    const { fromVal, toVal } = calculateConversion(numericValue, selectedCurrencyFrom, selectedCurrencyTo);
    setFromVal(fromVal);
    setToVal(toVal);
  };

  const handleToValChange = (value: number | string) => {
    const numericValue = Number(value);
    const { fromVal, toVal } = calculateConversion(numericValue, selectedCurrencyTo, selectedCurrencyFrom);
    setFromVal(toVal);
    setToVal(fromVal);
  };

  useEffect(() => {
    if (fromVal && selectedCurrencyFrom && selectedCurrencyTo && conversionRates) {
      const { fromVal: newFromVal, toVal: newToVal } = calculateConversion(
        Number(fromVal),
        selectedCurrencyFrom,
        selectedCurrencyTo,
      );
      setFromVal(newFromVal);
      setToVal(newToVal);
    }
  }, [selectedCurrencyTo, selectedCurrencyFrom, conversionRates, calculateConversion]);

  const handleSwap = () => {
    const tempCurrency = selectedCurrencyFrom;
    setSelectedCurrencyFrom(selectedCurrencyTo);
    setSelectedCurrencyTo(tempCurrency);

    const tempVal = fromVal;
    setFromVal(toVal);
    setToVal(tempVal);
  };

  return (
    <div className="w-full flex flex-col items-center h-full min-h-svh bg-background">
      <main className="w-full max-w-screen-2xl px-4 lg:px-10 py-12 space-y-20 lg:space-y-36">
        <h1 className="text-h1-mobile lg:text-h1 w-full max-w-[600px] lg:max-w-[900px]">
          Ready to turn your dollars into donuts (or any other currency)?
          <br />
          Let's get started!
        </h1>
        <div className="flex flex-col lg:flex-row items-center w-full gap-8 relative justify-center">
          {selectedCurrencyFrom && selectedCurrencyTo ? (
            <>
              <CurrencyInputField
                value={fromVal}
                onChange={handleFromValChange}
                selectedCurrency={selectedCurrencyFrom}
                setSelectedCurrency={setSelectedCurrencyFrom}
                // error={error}
              />
              <SwapFieldsButton onClick={handleSwap} />
              <CurrencyInputField
                value={toVal}
                onChange={handleToValChange}
                selectedCurrency={selectedCurrencyTo}
                setSelectedCurrency={setSelectedCurrencyTo}
                // error={error}
              />
            </>
          ) : (
            <></>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;

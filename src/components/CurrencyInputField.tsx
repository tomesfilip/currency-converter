import { useState } from 'react';
import { CurrencyType } from '../lib/appTypes';
import { useCurrenciesStore } from '../stores/currenciesStore';

type Props = {
  value: number | string;
  onChange: (value: number | string) => void;
  selectedCurrency: CurrencyType;
  setSelectedCurrency: React.Dispatch<CurrencyType>;
};

export const CurrencyInputField = ({ value, onChange, selectedCurrency, setSelectedCurrency }: Props) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const currencies = useCurrenciesStore((state) => state.currencies);

  const availableCurrencies = currencies
    ? currencies.filter((currency) => currency.symbol !== selectedCurrency.code)
    : null;

  const handleSelectCurrency = (currency: CurrencyType) => {
    setSelectedCurrency(currency);
    setIsDropdownVisible(false);
  };

  return (
    <div className="relative">
      <div className="rounded-3xl border-solid border-2 border-lightGray px-4 lg:px-8 py-3 w-full max-w-[454px] flex gap-x-5 hover:border-secondary focus-within:border-secondary transition-colors duration-300 ease-in-out">
        <div
          className="flex gap-x-2 items-center shrink-0 cursor-pointer"
          onClick={() => setIsDropdownVisible(!isDropdownVisible)}
        >
          {/* TODO: add dynamic alt attribute based on the currently selected flag */}
          {/* <img
            className="w-[36px] h-[26px] rounded-md"
            src={selectedCurrency.icon}
            alt={`country-flag-${selectedCurrency.name}`}
          /> */}
          <p className="text-text-bold">
            {selectedCurrency.symbol} {selectedCurrency.code}
          </p>
          <svg
            width="16"
            height="9"
            viewBox="0 0 16 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-4 flex-shrink-0 transition-all duration-300 ease-in-out"
            style={{
              rotate: isDropdownVisible ? '-180deg' : '0deg',
            }}
          >
            <path
              d="M8 6.778L1.45475 0.409001C1.402 0.356564 1.33938 0.315108 1.27051 0.287033C1.20163 0.258957 1.12788 0.244818 1.0535 0.245436C0.979127 0.246054 0.905615 0.261416 0.837217 0.290632C0.768819 0.319848 0.706894 0.362338 0.655026 0.415644C0.603158 0.46895 0.562376 0.532013 0.535041 0.601184C0.507706 0.670355 0.49436 0.744262 0.495776 0.818625C0.497192 0.892988 0.513341 0.966331 0.543289 1.03441C0.573238 1.10249 0.61639 1.16396 0.67025 1.21525L7.60775 7.96525C7.71276 8.06742 7.85349 8.12458 8 8.12458C8.14651 8.12458 8.28724 8.06742 8.39225 7.96525L15.3298 1.21525C15.3836 1.16396 15.4268 1.10249 15.4567 1.03441C15.4867 0.966331 15.5028 0.892988 15.5042 0.818625C15.5056 0.744262 15.4923 0.670355 15.465 0.601184C15.4376 0.532013 15.3968 0.46895 15.345 0.415644C15.2931 0.362338 15.2312 0.319848 15.1628 0.290632C15.0944 0.261416 15.0209 0.246054 14.9465 0.245436C14.8721 0.244818 14.7984 0.258957 14.7295 0.287033C14.6606 0.315108 14.598 0.356564 14.5452 0.409001L8 6.778Z"
              fill="#111827"
            />
          </svg>
        </div>
        <div className="min-h-full w-[2px] bg-lightGray" />
        <input
          type="number"
          className="text-input-number-mobile lg:text-input-number w-full outline-none bg-background"
          placeholder="10"
          min={0}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
        />
      </div>
      <ul
        className="absolute rounded-3xl border-solid border-2 border-lightGray py-3 w-full max-w-[454px] flex gap-y-2 flex-col transition-all duration-300 ease-in-out delay-200 z-20 bg-background"
        style={{
          opacity: isDropdownVisible ? 1 : 0,
          top: isDropdownVisible ? '90px' : 0,
          pointerEvents: isDropdownVisible ? 'auto' : 'none',
        }}
      >
        {availableCurrencies?.map((currency) => (
          <li
            key={currency.code}
            className="flex gap-x-2 items-center cursor-pointer hover:bg-secondary/10 px-4 lg:px-8 transition-colors ease-in-out duration-200"
            onClick={() => handleSelectCurrency(currency)}
          >
            {/* <img className="w-[36px] h-[26px] rounded-md" src={currency.icon} alt={`country-flag-${currency.name}`} /> */}
            <p className="text-text-bold flex items-center gap-x-1">
              {currency.code} <span className="text-text-thin text-textSecondary">({currency.name})</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

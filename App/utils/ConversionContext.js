import React, { createContext, useState } from "react";

export const ConversionContext = createContext();

export const ConversionContextProvider = ({ children }) => {
  const [mainCurrency, setMainCurrency] = useState("USD");
  const [mainCurrencyValue, setMainCurrencyValue] = useState("1");
  const [quoteCurrency, setQuoteCurrency] = useState("INR");
  const [quoteCurrencyValue, setQuoteCurrencyValue] = useState("75.8");
  const [exchangeRate, setExchangeRate] = useState(75.8);

  // Exchanges Base Currency and Quote Currency
  const reverseCurrencies = () => {
    let temp = mainCurrency;
    setMainCurrency(quoteCurrency);
    setQuoteCurrency(temp);
    let tempExchangeRate = (1 / exchangeRate).toFixed(6);
    setExchangeRate(tempExchangeRate);
    setQuoteCurrencyValue(
      (tempExchangeRate * parseFloat(mainCurrencyValue)).toFixed(2)
    );
  };

  const initialContextValue = {
    mainCurrency,
    setMainCurrency,
    mainCurrencyValue,
    setMainCurrencyValue,
    quoteCurrency,
    setQuoteCurrency,
    quoteCurrencyValue,
    setQuoteCurrencyValue,
    exchangeRate,
    setExchangeRate,
    reverseCurrencies,
  };

  return (
    <ConversionContext.Provider value={initialContextValue}>
      {children}
    </ConversionContext.Provider>
  );
};

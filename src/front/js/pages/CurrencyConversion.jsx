import React, { useState } from "react";
import { currencyObj } from "../component/currency-converter.js";
import "../../styles/currencies.css";

export function CurrencyConversion () {
  const [baseCurrency, setBaseCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [baseValue, setBaseValue] = useState(1);
  const [targetValue, setTargetValue] = useState(0);
  const [conversionRates, setConversionRates] = useState({
    USD: 1,
    RUB: 77.5,
    EUR: 0.88,
    GBP: 0.75,
    JPY: 113.5,
    AUD: 1.45,
    CAD: 1.35,
    CHF: 0.91,
    CNY: 6.36,
    HKD: 7.83,
    NZD: 1.52,
    SEK: 10.23,
    KRW: 1317.50,
    SGD: 1.36,
    NOK: 10.04,
    MXN: 19.00,
    INR: 83.00,
    ZAR: 17.65,
    TRY: 27.05,
    BRL: 4.85,
    DKK: 6.91,
    MYR: 4.49,
    PHP: 56.05,
    ILS: 3.75,
    IDR: 15463.00,
    THB: 35.70,
    PLN: 4.45,
    CZK: 22.45,
    HUF: 378.50,
    ISK: 137.50
  });

  const handleBaseValueChange = (e) => {
    const newValue = parseFloat(e.target.value) 
    setBaseValue(newValue);
    updateTargetValue(newValue, baseCurrency, targetCurrency);
  };

  const handleBaseCurrencyChange = (e) => {
    const newBaseCurrency = e.target.value;
    setBaseCurrency(newBaseCurrency);
    updateTargetValue(baseValue, newBaseCurrency, targetCurrency);
  };

  const handleTargetCurrencyChange = (e) => {
    const newTargetCurrency = e.target.value;
    setTargetCurrency(newTargetCurrency);
    updateTargetValue(baseValue, baseCurrency, newTargetCurrency);
  };

  const updateTargetValue = (value, fromCurrency, toCurrency) => {
    if (fromCurrency && toCurrency) {
      const rate = conversionRates[toCurrency] / conversionRates[fromCurrency];
      setTargetValue((value * rate).toFixed(2));
    }
  };

  return (
  <div className="content">
    <div className="title-container">
      <h1>Currency Converter</h1>
    </div>
    <div className="convertor-wrapper">
      <div className="convertor-card">
          <div className="base">
              <select value={baseCurrency} onChange={handleBaseCurrencyChange} className="currency-select">
                  <option value="" disabled>Choose your currency</option>
                  {currencyObj.map((currency) => (
                      <option key={currency.currency} value={currency.currency}>
                          {currency.name}
                      </option>
                  ))}
              </select>
              <div className="value-section">
                  <input 
                    type="number" 
                    className="value" 
                    value={baseValue} 
                    onChange={handleBaseValueChange}
                    disabled={!baseCurrency}
                  />
                  <span className="symbol">{currencyObj.find(c => c.currency === baseCurrency)?.symbol}</span>
              </div>
          </div>
          <div className="arrow-container">
              <div className="arrow-icon">↓</div>
          </div>
          <div className="converted lower-value">
              <select value={targetCurrency} onChange={handleTargetCurrencyChange} className="currency-select lower-value">
                  <option value="" disabled>Choose your currency</option>
                  {currencyObj.map((currency) => (
                      <option key={currency.currency} value={currency.currency}>
                          {currency.name}
                      </option>
                  ))}
              </select>
              <div className="value-section lower-value">
                  <input 
                    type="text" 
                    className="value lower-value" 
                    value={targetValue} 
                    readOnly
                    disabled={!targetCurrency}
                  />
                  <span className="symbol">{currencyObj.find(c => c.currency === targetCurrency)?.symbol}</span>
              </div>
          </div>
      </div>
    </div>
  </div>
  );
};



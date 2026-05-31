import React, { createContext, useContext, useState, useEffect } from "react";

export type BaseUnit = "KES" | "CUSTOM";

export interface CurrencyContextType {
  baseUnit: BaseUnit;
  setBaseUnit: (unit: BaseUnit) => void;
  customCode: string;     // e.g., "USD"
  setCustomCode: (code: string) => void;
  customSymbol: string;   // e.g., "$"
  setCustomSymbol: (symbol: string) => void;
  customRate: number;     // e.g., 130 (1 Custom Unit = 130 KES)
  setCustomRate: (rate: number) => void;
  
  // Helpers
  toKES: (amount: number) => number;
  fromKES: (amountInKES: number) => number;
  format: (amountInKES: number) => string;
  formatRaw: (amount: number) => string; // Already in current baseUnit currency
  currencySymbol: string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [baseUnit, setBaseUnitState] = useState<BaseUnit>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("netpay-baseUnit");
      return (saved === "CUSTOM" || saved === "KES") ? saved : "KES";
    }
    return "KES";
  });

  const [customCode, setCustomCodeState] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("netpay-customCode") || "USD";
    }
    return "USD";
  });

  const [customSymbol, setCustomSymbolState] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("netpay-customSymbol") || "$";
    }
    return "$";
  });

  const [customRate, setCustomRateState] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("netpay-customRate");
      return saved ? parseFloat(saved) : 130;
    }
    return 130;
  });

  const setBaseUnit = (unit: BaseUnit) => {
    setBaseUnitState(unit);
    localStorage.setItem("netpay-baseUnit", unit);
  };

  const setCustomCode = (code: string) => {
    setCustomCodeState(code);
    localStorage.setItem("netpay-customCode", code);
  };

  const setCustomSymbol = (symbol: string) => {
    setCustomSymbolState(symbol);
    localStorage.setItem("netpay-customSymbol", symbol);
  };

  const setCustomRate = (rate: number) => {
    const validRate = rate <= 0 ? 1 : rate;
    setCustomRateState(validRate);
    localStorage.setItem("netpay-customRate", validRate.toString());
  };

  // Convert an amount typed in selected currency unit into raw KES
  const toKES = (amount: number): number => {
    if (baseUnit === "KES") return amount;
    return amount * customRate;
  };

  // Convert an actual KES value into the selected base currency display value
  const fromKES = (amountInKES: number): number => {
    if (baseUnit === "KES") return amountInKES;
    return amountInKES / customRate;
  };

  // Formats KES amount in the output design style
  const format = (amountInKES: number): string => {
    const displayVal = fromKES(amountInKES);
    const symbol = baseUnit === "KES" ? "KSh" : customSymbol;
    
    // Check decimal points
    const absoluteVal = Math.abs(displayVal);
    let fractionDigits = 0;
    if (baseUnit === "CUSTOM" && absoluteVal > 0 && absoluteVal < 100) {
      fractionDigits = 2; // For smaller numbers in other currencies, show decimals
    }

    const formatted = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(displayVal);

    return `${symbol} ${formatted}`;
  };

  // Formats a raw value already converted to the active base unit
  const formatRaw = (amount: number): string => {
    const symbol = baseUnit === "KES" ? "KSh" : customSymbol;
    const absoluteVal = Math.abs(amount);
    let fractionDigits = 0;
    if (baseUnit === "CUSTOM" && absoluteVal > 0 && absoluteVal < 100) {
      fractionDigits = 2;
    }
    
    const formatted = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(amount);

    return `${symbol} ${formatted}`;
  };

  const currencySymbol = baseUnit === "KES" ? "KSh" : customSymbol;

  return (
    <CurrencyContext.Provider
      value={{
        baseUnit,
        setBaseUnit,
        customCode,
        setCustomCode,
        customSymbol,
        setCustomSymbol,
        customRate,
        setCustomRate,
        toKES,
        fromKES,
        format,
        formatRaw,
        currencySymbol,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}

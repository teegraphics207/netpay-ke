import { useState, useRef, useEffect } from "react";
import { Coins, ChevronDown, Check, X } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { cn } from "../../lib/utils";

export function CurrencySwitcher({ align = "right" }: { align?: "left" | "right" }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const {
    baseUnit,
    setBaseUnit,
    customCode,
    setCustomCode,
    customSymbol,
    setCustomSymbol,
    customRate,
    setCustomRate,
  } = useCurrency();

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100 shadow-sm text-xs font-semibold focus:outline-none transition-all"
        aria-label="Currency settings"
      >
        <Coins className="h-4 w-4 text-emerald-500 animate-pulse" />
        <span className="max-w-[110px] truncate">
          {baseUnit === "KES" ? "KES (KSh)" : `${customCode} (${customSymbol})`}
        </span>
        <ChevronDown className={cn("h-3 w-3 text-slate-400 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute mt-2 w-72 p-4 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-md text-slate-900 shadow-xl dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100 z-50 animate-fade-in",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Base Currency Unit
            </h4>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              onClick={() => setBaseUnit("KES")}
              className={cn(
                "px-3 py-2 text-xs font-bold rounded-xl border transition-all text-center flex items-center justify-center gap-1.5",
                baseUnit === "KES"
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-600/20"
                  : "border-slate-200 hover:bg-slate-50 text-slate-700 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
              )}
            >
              {baseUnit === "KES" && <Check className="h-3.5 w-3.5" />}
              KES (KSh)
            </button>
            <button
              onClick={() => setBaseUnit("CUSTOM")}
              className={cn(
                "px-3 py-2 text-xs font-bold rounded-xl border transition-all text-center flex items-center justify-center gap-1.5",
                baseUnit === "CUSTOM"
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-600/20"
                  : "border-slate-200 hover:bg-slate-50 text-slate-700 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
              )}
            >
              {baseUnit === "CUSTOM" && <Check className="h-3.5 w-3.5" />}
              Custom Unit
            </button>
          </div>

          {baseUnit === "CUSTOM" && (
            <div className="space-y-3 pt-1 animate-fade-in text-left">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                  Currency Code
                </label>
                <input
                  type="text"
                  maxLength={5}
                  value={customCode}
                  onChange={(e) => setCustomCode(e.target.value.toUpperCase())}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                  placeholder="e.g. USD, EUR, UGX"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                    Symbol
                  </label>
                  <input
                    type="text"
                    maxLength={3}
                    value={customSymbol}
                    onChange={(e) => setCustomSymbol(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                    placeholder="e.g. $, €, USh"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                    Rate (1 {customCode} in KES)
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={customRate}
                    onChange={(e) => setCustomRate(Math.max(0.0001, parseFloat(e.target.value) || 1))}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                    placeholder="e.g. 130"
                  />
                </div>
              </div>
              <div className="rounded-lg bg-emerald-50/50 p-2 border border-emerald-100/50 dark:bg-emerald-950/20 dark:border-emerald-900/40">
                <p className="text-[10px] leading-relaxed text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Conversion Rule:</span>
                  <br />
                  1 {customCode || "Unit"} = {customRate} KSh. Values typed will represent {customCode || "Unit"} and map instantly to Kenyan tax brackets.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { formatKES } from "../lib/utils";
import { calculatePAYE } from "../lib/calculations";
import { CONSTANTS } from "../lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Select } from "../components/ui/Select";
import { usePageTitle } from "../lib/usePageTitle";
import { useCurrency } from "../context/CurrencyContext";

export function PayeCalculator() {
  usePageTitle("PAYE Calculator Kenya | NetPay KE");
  const { format, toKES, currencySymbol } = useCurrency();
  const [taxableIncome, setTaxableIncome] = useState(80000);
  const [isResident, setIsResident] = useState(true);
  
  const taxableIncomeKES = toKES(taxableIncome);
  const results = calculatePAYE(taxableIncomeKES, isResident, 0);

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">PAYE Calculator</h1>
        <p className="text-slate-500 mt-2 text-lg">See how PAYE is calculated based on taxable income and 2026 tax bands.</p>
      </div>

      <Card className="border-0 shadow-sm shadow-slate-200/50 rounded-3xl overflow-hidden bg-white">
        <CardHeader className="bg-slate-50 border-b border-slate-100 pb-5 pt-6 px-6 sm:px-8">
          <CardTitle className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">Enter Taxable Income</CardTitle>
        </CardHeader>
        <CardContent className="pt-8 px-6 sm:px-8 grid gap-6 sm:grid-cols-2 pb-8">
          <div className="space-y-2">
            <Label>Taxable Income (After NSSF, etc)</Label>
            <div className="relative flex items-center">
               <span className="absolute left-3 text-slate-400 text-sm font-medium pointer-events-none">{currencySymbol}</span>
               <Input type="number" className="pl-12 bg-white" value={taxableIncome || ""} onChange={(e) => setTaxableIncome(parseFloat(e.target.value) || 0)} min="0" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Residency</Label>
            <Select className="bg-white" value={isResident.toString()} onChange={(e) => setIsResident(e.target.value === "true")}>
              <option value="true">Resident (Gets Relief)</option>
              <option value="false">Non-Resident</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="border-emerald-200 rounded-3xl overflow-hidden shadow-sm shadow-emerald-100 bg-white">
        <CardHeader className="pb-4 pt-6 px-6 sm:px-8 bg-emerald-50/50 border-b border-emerald-100">
          <CardTitle className="flex items-center gap-2 text-emerald-800">Calculation Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="pt-8 px-6 sm:px-8 pb-8">
          <div className="space-y-4 font-medium text-sm max-w-lg mx-auto">
             <div className="flex justify-between font-sans mb-4 border-b border-slate-100 pb-3">
                 <span className="font-bold text-slate-900">Taxable Income</span>
                 <span className="font-bold text-slate-900">{format(taxableIncomeKES)}</span>
             </div>
             
             {/* Show breakdown by bands */}
             {CONSTANTS.PAYE_BANDS_MONTHLY.map((band, idx) => {
               const prevLimit = idx === 0 ? 0 : CONSTANTS.PAYE_BANDS_MONTHLY[idx-1]!.upperLimit;
               const bandSize = band.upperLimit - prevLimit;
               
               let amountInBand = 0;
               if (taxableIncomeKES > prevLimit) {
                  amountInBand = Math.min(taxableIncomeKES - prevLimit, bandSize);
               }
               
               if (amountInBand > 0) {
                 return (
                   <div key={idx} className="flex justify-between items-center text-slate-500 py-1">
                     <span>{format(amountInBand)} <span className="text-xs text-slate-400 mx-1">@</span> <span className="text-slate-700 font-semibold">{band.rate * 100}%</span></span>
                     <span className="text-slate-700">{format(amountInBand * band.rate)}</span>
                   </div>
                 );
               }
               return null;
             })}
             
             <div className="flex justify-between font-sans mt-5 pt-4 border-t border-slate-100 text-slate-900 bg-slate-50 -mx-6 sm:-mx-8 px-6 sm:px-8 py-3">
                 <span className="font-semibold">Total PAYE Before Relief</span>
                 <span className="font-bold">{format(results.payeBeforeRelief)}</span>
             </div>
             
             {isResident && (
               <div className="flex justify-between font-sans text-emerald-600 pb-2 px-2 mt-4">
                   <span className="font-semibold">Personal Relief</span>
                   <span className="font-bold">-{format(results.personalRelief)}</span>
               </div>
             )}
             
             <div className="flex justify-between font-sans mt-3 pt-4 border-t-2 border-slate-200">
                 <span className="font-black text-slate-900 text-lg uppercase tracking-tight">Final PAYE Payable</span>
                 <span className="font-black text-rose-600 text-xl bg-rose-50 px-3 py-1 rounded-lg">{format(results.finalPaye)}</span>
             </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mt-4">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 text-center mb-1">Ad space</p>
        <p className="text-sm text-slate-500 text-center">Space for targeted financial ads or sponsored payroll tools.</p>
      </div>
    </div>
  )
}

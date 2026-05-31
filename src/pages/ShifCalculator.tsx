import { useState } from "react";
import { formatKES } from "../lib/utils";
import { calculateSHIF } from "../lib/calculations";
import { CONSTANTS } from "../lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { usePageTitle } from "../lib/usePageTitle";
import { useCurrency } from "../context/CurrencyContext";

export function ShifCalculator() {
  usePageTitle("SHIF Calculator Kenya | NetPay KE");
  const { format, toKES, currencySymbol } = useCurrency();
  const [grossSalary, setGrossSalary] = useState(80000);
  
  const shifDeduction = calculateSHIF(toKES(grossSalary));

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">SHIF Calculator</h1>
        <p className="text-slate-500 mt-2">Calculate your Social Health Insurance Fund (SHIF) monthly contribution.</p>
      </div>

      <Card>
        <CardContent className="pt-6 max-w-sm">
          <div className="space-y-2">
            <Label>Gross Salary ({currencySymbol})</Label>
            <Input type="number" value={grossSalary} onChange={(e) => setGrossSalary(parseFloat(e.target.value) || 0)} min="0" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-blue-50/30 overflow-hidden relative">
        <div className="absolute right-0 top-0 h-full w-2 bg-blue-500"></div>
        <CardHeader>
          <CardTitle>Monthly Contribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-blue-700">{format(shifDeduction)}</div>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            <strong>How is this calculated?</strong><br/>
            The general SHIF rate is <strong>2.75%</strong> of your gross salary.<br/>
            {toKES(grossSalary) < CONSTANTS.SHIF.THRESHOLD ? (
              <span className="text-amber-600">Since your gross is below {format(CONSTANTS.SHIF.THRESHOLD)}, the minimum contribution of {format(CONSTANTS.SHIF.MIN_CONTRIBUTION)} applies.</span>
            ) : (
              <span>Your calculation: {format(toKES(grossSalary))} × 2.75% = {format(shifDeduction)}.</span>
            )}
            <br/><br/>
            <span className="text-xs text-slate-500 italic block mt-2">Note: NetPay KE follows the KRA/eCitizen SHIF calculator table (KSh 0–5,999 = KSh 300, and KSh 6,000+ = 2.75%). Some payroll systems may interpret KSh 300 as a minimum floor across all salaries. Confirm final payroll with your employer, SHA/SHIF, or KRA.</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

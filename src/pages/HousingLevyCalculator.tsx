import { useState } from "react";
import { formatKES } from "../lib/utils";
import { calculateHousingLevy } from "../lib/calculations";
import { CONSTANTS } from "../lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { usePageTitle } from "../lib/usePageTitle";
import { useCurrency } from "../context/CurrencyContext";

export function HousingLevyCalculator() {
  usePageTitle("Housing Levy Calculator Kenya | NetPay KE");
  const { format, toKES, currencySymbol } = useCurrency();
  const [grossSalary, setGrossSalary] = useState(80000);
  
  const levy = calculateHousingLevy(toKES(grossSalary));

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Affordable Housing Levy</h1>
        <p className="text-slate-500 mt-2">Calculate the mandate 1.5% deduction for both employee and employer.</p>
      </div>

      <Card>
        <CardContent className="pt-6 max-w-sm">
          <div className="space-y-2">
            <Label>Gross Salary ({currencySymbol})</Label>
            <Input type="number" value={grossSalary} onChange={(e) => setGrossSalary(parseFloat(e.target.value) || 0)} min="0" />
          </div>
        </CardContent>
      </Card>

      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="border-violet-200 bg-violet-50/30">
          <CardHeader>
            <CardTitle className="text-lg">Employee Deduction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-violet-700">{format(levy.employee)}</div>
            <p className="mt-2 text-xs text-slate-500">{format(toKES(grossSalary))} × 1.5%</p>
          </CardContent>
        </Card>
        <Card className="border-violet-200 bg-violet-50/30">
          <CardHeader>
            <CardTitle className="text-lg">Employer Contribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-violet-700">{format(levy.employer)}</div>
            <p className="mt-2 text-xs text-slate-500">{format(toKES(grossSalary))} × 1.5%</p>
          </CardContent>
        </Card>
      </div>
      
       <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <h3 className="font-bold mb-2 text-slate-900">Total Levy Generated</h3>
        <p className="text-xl font-bold text-slate-800">{format(levy.employee + levy.employer)}</p>
        <p className="text-sm text-slate-500 mt-1">Sent to the Affordable Housing Fund monthly.</p>
      </div>
    </div>
  );
}

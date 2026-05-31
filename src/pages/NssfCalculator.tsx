import { useState } from "react";
import { formatKES } from "../lib/utils";
import { calculateNSSF, NSSF_OPTION } from "../lib/calculations";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Select } from "../components/ui/Select";
import { usePageTitle } from "../lib/usePageTitle";
import { useCurrency } from "../context/CurrencyContext";

export function NssfCalculator() {
  usePageTitle("NSSF Calculator Kenya 2026 | NetPay KE");
  const { format, toKES, currencySymbol } = useCurrency();
  const [grossSalary, setGrossSalary] = useState(80000);
  const [option, setOption] = useState<NSSF_OPTION>("TIER_1_AND_2");
  
  const nssf = calculateNSSF(toKES(grossSalary), option);

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">NSSF Calculator (2026 Rates)</h1>
        <p className="text-slate-500 mt-2">Determine your Tier I and Tier II National Social Security Fund deductions.</p>
      </div>

      <Card>
        <CardContent className="pt-6 grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Gross Salary ({currencySymbol})</Label>
            <Input type="number" value={grossSalary} onChange={(e) => setGrossSalary(parseFloat(e.target.value) || 0)} min="0" />
          </div>
          <div className="space-y-2">
            <Label>NSSF Plan</Label>
            <Select value={option} onChange={(e) => setOption(e.target.value as NSSF_OPTION)}>
              <option value="TIER_1_AND_2">Full Tier I + Tier II</option>
              <option value="TIER_1_ONLY">Tier I Only</option>
              <option value="EXEMPT">Exempt / Alternative Scheme</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="border-amber-200 bg-amber-50/30">
          <CardHeader>
            <CardTitle className="text-lg">Employee Deduction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-700">{format(nssf.employee)}</div>
          </CardContent>
        </Card>
        <Card className="border-emerald-200 bg-emerald-50/30">
          <CardHeader>
            <CardTitle className="text-lg">Employer Contribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-700">{format(nssf.employer)}</div>
          </CardContent>
        </Card>
      </div>
      
       <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <h3 className="font-bold mb-2 text-slate-900">Total Monthly Savings</h3>
        <p className="text-xl font-bold text-slate-800">{format(nssf.employee + nssf.employer)}</p>
      </div>
    </div>
  );
}

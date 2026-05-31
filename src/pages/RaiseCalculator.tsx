import { useState } from "react";
import { formatKES } from "../lib/utils";
import { performSalaryCalculation, CalculationInputs } from "../lib/calculations";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { usePageTitle } from "../lib/usePageTitle";
import { useCurrency } from "../context/CurrencyContext";

export function RaiseCalculator() {
  usePageTitle("Salary Raise Calculator | NetPay KE");
  const { format, toKES, currencySymbol } = useCurrency();
  const [currentGross, setCurrentGross] = useState(80000);
  const [newGross, setNewGross] = useState(100000);

  const getResults = (grossKES: number) => {
    return performSalaryCalculation({
      basicSalary: grossKES,
      houseAllowance: 0,
      transportAllowance: 0,
      otherAllowances: 0,
      bonus: 0,
      nonCashBenefits: 0,
      pensionContribution: 0,
      insurancePremium: 0,
      otherDeductions: 0,
      isResident: true,
      nssfOption: "TIER_1_AND_2"
    });
  };

  const currentResult = getResults(toKES(currentGross));
  const newResult = getResults(toKES(newGross));

  const netDiff = newResult.netPay - currentResult.netPay;
  const deductionsDiff = newResult.totalDeductions - currentResult.totalDeductions;
  
  const percentageIncrease = currentResult.netPay > 0 ? (netDiff / currentResult.netPay) * 100 : 0;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Salary Raise Calculator</h1>
        <p className="text-slate-500 mt-2">See how a gross salary increase affects your actual take-home pay.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Salary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label>Current Gross ({currencySymbol})</Label>
              <Input type="number" value={currentGross} onChange={(e) => setCurrentGross(parseFloat(e.target.value) || 0)} min="0" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-emerald-200">
          <CardHeader>
            <CardTitle>New Proposed Salary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-emerald-900 focus-within:text-emerald-700">
              <Label>New Gross ({currencySymbol})</Label>
              <Input type="number" value={newGross} onChange={(e) => setNewGross(parseFloat(e.target.value) || 0)} min="0" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Compare Results</CardTitle>
          <CardDescription>Because of tax bands, a 20% increase in gross pay does not always mean a 20% increase in net pay.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 font-medium">Metric</th>
                    <th className="px-6 py-3 text-right font-medium">Current</th>
                    <th className="px-6 py-3 text-right font-medium text-emerald-700">New</th>
                    <th className="px-6 py-3 text-right font-medium">Difference</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 border-b border-slate-200">
                  <tr className="hover:bg-slate-50/50">
                    <td className="px-6 py-3 font-medium text-slate-900">Gross Pay</td>
                    <td className="px-6 py-3 text-right">{format(toKES(currentGross))}</td>
                    <td className="px-6 py-3 text-right text-emerald-700 font-medium">{format(toKES(newGross))}</td>
                    <td className="px-6 py-3 text-right text-emerald-600">+{format(toKES(newGross - currentGross))}</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="px-6 py-3 font-medium text-red-700">Total Deductions</td>
                    <td className="px-6 py-3 text-right text-red-600">{format(currentResult.totalDeductions)}</td>
                    <td className="px-6 py-3 text-right text-red-600">{format(newResult.totalDeductions)}</td>
                    <td className="px-6 py-3 text-right text-red-600">+{format(deductionsDiff)}</td>
                  </tr>
                  <tr className="bg-emerald-50/50">
                    <td className="px-6 py-4 font-bold text-slate-900 tracking-tight">Net Take-Home Pay</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900">{format(currentResult.netPay)}</td>
                    <td className="px-6 py-4 text-right font-bold text-emerald-700 text-lg">{format(newResult.netPay)}</td>
                    <td className="px-6 py-4 text-right font-bold text-emerald-600">+{format(netDiff)}</td>
                  </tr>
                </tbody>
             </table>
          </div>
          
          <div className="mt-8 flex justify-center">
            <div className="bg-emerald-50 rounded-full px-6 py-2 border border-emerald-200 text-emerald-800 font-medium flex items-center justify-center gap-2">
               Your net pay will increase by {percentageIncrease.toFixed(1)}%
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

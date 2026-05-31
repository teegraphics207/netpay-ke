import { useState } from "react";
import { formatKES } from "../lib/utils";
import { performSalaryCalculation, CalculationInputs } from "../lib/calculations";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Button } from "../components/ui/Button";
import { usePageTitle } from "../lib/usePageTitle";
import { useCurrency } from "../context/CurrencyContext";

export function ReverseCalculator() {
  usePageTitle("Reverse Salary Calculator Kenya | NetPay KE");
  const { format, toKES, currencySymbol } = useCurrency();
  const [targetNet, setTargetNet] = useState(100000);
  const [estimatedGross, setEstimatedGross] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateReverse = () => {
    setIsCalculating(true);
    
    // Convert targetNet input into KES for standard solver logic
    const targetNetKES = toKES(targetNet);
    
    // Very basic iterative search
    let guess = targetNetKES; // Start guess at the target net in KES
    let currentNet = 0;
    
    const inputs: CalculationInputs = {
      basicSalary: guess,
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
    };

    let iterations = 0;
    const maxIterations = 100;
    
    while (Math.abs(currentNet - targetNetKES) > 1 && iterations < maxIterations) {
      inputs.basicSalary = guess;
      const result = performSalaryCalculation(inputs);
      currentNet = result.netPay;
      
      // Adjust guess based on the difference
      const diff = targetNetKES - currentNet;
      
      if (Math.abs(diff) <= 1) break;
      
      // If we are underestimating, increment guess. Taxes get higher, so we need to add more than the raw difference.
      guess += diff * 1.5; 
      iterations++;
    }

    setEstimatedGross(guess);
    setIsCalculating(false);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Reverse Salary Calculator</h1>
        <p className="text-slate-500 mt-2">Enter your desired take-home pay and we'll estimate the gross salary you need.</p>
      </div>

      <Card>
        <CardHeader>
           <CardTitle>Desired Net Pay</CardTitle>
           <CardDescription>How much do you want to take home every month?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Target Net Salary ({currencySymbol})</Label>
            <Input type="number" value={targetNet} onChange={(e) => setTargetNet(parseFloat(e.target.value) || 0)} min="0" />
          </div>
          <Button onClick={calculateReverse} className="w-full" disabled={isCalculating}>
             {isCalculating ? "Calculating..." : "Estimate Gross Salary"}
          </Button>
        </CardContent>
      </Card>

      {estimatedGross !== null && (
        <Card className="border-emerald-200 bg-emerald-50/30 overflow-hidden text-center py-6">
          <CardContent className="pt-6">
             <h3 className="text-slate-600 font-medium mb-2">Estimated Gross Salary Needed</h3>
             <div className="text-4xl font-bold text-emerald-700">{format(estimatedGross)}</div>
             <p className="mt-4 text-sm text-slate-500">
               * This is a mathematical estimation assuming a Resident employee with standard Tier I & II NSSF contributions.
             </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

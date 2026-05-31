import { useState, useEffect, useRef } from "react";
import { performSalaryCalculation, CalculationInputs, CalculationResults } from "../lib/calculations";
import { toast } from "sonner";
import { usePageTitle } from "../lib/usePageTitle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Select } from "../components/ui/Select";
import { Button } from "../components/ui/Button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Copy, Download, RotateCcw, Save, Calculator } from "lucide-react";
import { useCurrency, BaseUnit } from "../context/CurrencyContext";

const DEFAULT_INPUTS: CalculationInputs = {
  basicSalary: 80000,
  houseAllowance: 0,
  transportAllowance: 0,
  otherAllowances: 0,
  bonus: 0,
  nonCashBenefits: 0,
  pensionContribution: 0,
  insurancePremium: 0,
  otherDeductions: 0,
  isResident: true,
  nssfOption: "TIER_1_AND_2",
};

function CurrencyInput({ id, name, value, onChange }: { id: string, name: string, value: number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  const { currencySymbol } = useCurrency();
  const formatValue = (val: number) => {
    return val === 0 ? "" : val.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  };
  const [displayValue, setDisplayValue] = useState(formatValue(value));

  useEffect(() => {
    if (document.activeElement?.id !== id) {
      setDisplayValue(formatValue(value));
    }
  }, [value, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '');
    if (rawValue === "" || /^\d*\.?\d*$/.test(rawValue)) {
      setDisplayValue(e.target.value);
      onChange({
        ...e,
        target: { ...e.target, name, value: rawValue }
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleBlur = () => {
    const num = parseFloat(displayValue.replace(/,/g, ''));
    if (!isNaN(num)) {
      setDisplayValue(formatValue(num));
    } else {
      setDisplayValue("");
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-slate-400 sm:text-sm font-medium">{currencySymbol}</span>
      </div>
      <Input
        id={id}
        name={name}
        type="text"
        inputMode="decimal"
        className="pl-12"
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
}

export function CalculatorPage() {
  usePageTitle("NetPay KE | Kenya Salary Calculator");
  const { format, toKES, fromKES, currencySymbol, baseUnit, customCode, customRate } = useCurrency();
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 640 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [inputs, setInputs] = useState<CalculationInputs>(() => {
    const saved = localStorage.getItem("netpayke-inputs");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_INPUTS;
      }
    }
    return DEFAULT_INPUTS;
  });

  const [results, setResults] = useState<CalculationResults | null>(null);
  const [animateKey, setAnimateKey] = useState(0);

  // Transition numerical inputs when currency base unit switches
  const prevBaseUnitRef = useRef<BaseUnit>("KES");
  useEffect(() => {
    const prev = prevBaseUnitRef.current;
    if (prev !== baseUnit) {
      setInputs((current) => {
        const factor = prev === "KES" ? (1 / customRate) : customRate;
        return {
          ...current,
          basicSalary: Math.round(current.basicSalary * factor * 100) / 100,
          houseAllowance: Math.round(current.houseAllowance * factor * 100) / 100,
          transportAllowance: Math.round(current.transportAllowance * factor * 100) / 100,
          otherAllowances: Math.round(current.otherAllowances * factor * 100) / 100,
          bonus: Math.round(current.bonus * factor * 100) / 100,
          nonCashBenefits: Math.round(current.nonCashBenefits * factor * 100) / 100,
          pensionContribution: Math.round(current.pensionContribution * factor * 100) / 100,
          insurancePremium: Math.round(current.insurancePremium * factor * 100) / 100,
          otherDeductions: Math.round(current.otherDeductions * factor * 100) / 100,
        };
      });
      prevBaseUnitRef.current = baseUnit;
    }
  }, [baseUnit, customRate]);

  useEffect(() => {
    // Convert current custom inputs back to KES before computing statutory values
    const KESInputs: CalculationInputs = {
      ...inputs,
      basicSalary: toKES(inputs.basicSalary),
      houseAllowance: toKES(inputs.houseAllowance),
      transportAllowance: toKES(inputs.transportAllowance),
      otherAllowances: toKES(inputs.otherAllowances),
      bonus: toKES(inputs.bonus),
      nonCashBenefits: toKES(inputs.nonCashBenefits),
      pensionContribution: toKES(inputs.pensionContribution),
      insurancePremium: toKES(inputs.insurancePremium),
      otherDeductions: toKES(inputs.otherDeductions),
    };

    const res = performSalaryCalculation(KESInputs);
    setResults(res);
    setAnimateKey((prev) => prev + 1);
  }, [inputs, baseUnit, toKES]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = value === "" ? 0 : parseFloat(value);
    setInputs((prev) => ({ ...prev, [name]: isNaN(numValue) ? 0 : Math.max(0, numValue) }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "isResident") {
      setInputs((prev) => ({ ...prev, [name]: value === "true" }));
    } else {
      setInputs((prev) => ({ ...prev, [name]: value }));
    }
  };

  const saveCalculation = () => {
    localStorage.setItem("netpayke-inputs", JSON.stringify(inputs));
    toast.success("Calculation saved locally!");
  };

  const resetCalculation = () => {
    setInputs(DEFAULT_INPUTS);
    localStorage.removeItem("netpayke-inputs");
    toast.success("Calculator reset to defaults");
  };

  const copyResults = () => {
    if (!results) return;
    const text = `Salary Calculation (NetPay KE)
Gross Pay: ${format(results.grossPay)}
Net Pay: ${format(results.netPay)}
PAYE: ${format(results.finalPaye)}
SHIF: ${format(results.shif)}
NSSF: ${format(results.nssfEmployee)}
Housing Levy: ${format(results.housingLevyEmployee)}`;
    navigator.clipboard.writeText(text);
    toast.success("Results copied to clipboard!");
  };

  if (!results) return null;

  const chartData = [
    { name: "Net Pay", value: results.netPay, color: "#10b981" }, // emerald-500
    { name: "PAYE", value: results.finalPaye, color: "#ef4444" }, // red-500
    { name: "SHIF", value: results.shif, color: "#3b82f6" }, // blue-500
    { name: "NSSF", value: results.nssfEmployee, color: "#f59e0b" }, // amber-500
    { name: "Housing Levy", value: results.housingLevyEmployee, color: "#8b5cf6" }, // violet-500
  ].filter(item => item.value > 0);

  const breakdownRows = [
    {
      id: "gross", label: "Gross Pay", isSubItem: false,
      amountStr: format(results.grossPay), percentStr: "100.0%",
      type: "income", colorClass: "text-slate-900", bgClass: "bg-white",
    },
    ...(results.nssfEmployee > 0 ? [{
      id: "nssf", label: "NSSF Deduction", isSubItem: false,
      amountStr: `-${format(results.nssfEmployee)}`, percentStr: `${((results.nssfEmployee / (results.grossPay||1)) * 100).toFixed(1)}%`,
      type: "deduction", colorClass: "text-orange-600", bgClass: "bg-white",
    }] : []),
    ...(results.shif > 0 ? [{
      id: "shif", label: "SHIF Deduction", isSubItem: false,
      amountStr: `-${format(results.shif)}`, percentStr: `${((results.shif / (results.grossPay||1)) * 100).toFixed(1)}%`,
      type: "deduction", colorClass: "text-blue-600", bgClass: "bg-white",
    }] : []),
    ...(results.housingLevyEmployee > 0 ? [{
      id: "housing", label: "Affordable Housing Levy", isSubItem: false,
      amountStr: `-${format(results.housingLevyEmployee)}`, percentStr: `${((results.housingLevyEmployee / (results.grossPay||1)) * 100).toFixed(1)}%`,
      type: "deduction", colorClass: "text-violet-600", bgClass: "bg-white",
    }] : []),
    ...(inputs.pensionContribution > 0 ? [{
      id: "pension", label: "Pension Contribution Deducted from Pay", isSubItem: false,
      amountStr: `-${format(toKES(inputs.pensionContribution))}`, percentStr: `${(((toKES(inputs.pensionContribution)) / (results.grossPay||1)) * 100).toFixed(1)}%`,
      type: "deduction", colorClass: "text-slate-600", bgClass: "bg-white",
    }] : []),
    ...(results.allowablePension > 0 ? [{
      id: "allowablePension", label: "Allowable Pension Deduction for PAYE", isSubItem: true,
      amountStr: `-${format(results.allowablePension)}`, percentStr: "",
      type: "info", colorClass: "text-slate-500", bgClass: "bg-slate-50", borderLeft: "border-slate-200",
    }] : []),
    ...(results.nonAllowablePension > 0 ? [{
      id: "nonAllowablePension", label: "Non-Allowable Pension Portion", isSubItem: true,
      amountStr: format(results.nonAllowablePension), percentStr: "",
      type: "info", colorClass: "text-slate-500", bgClass: "bg-slate-50", borderLeft: "border-slate-200",
    }] : []),
    {
      id: "taxable", label: "Taxable Income", isSubItem: false,
      amountStr: format(results.taxableIncome), percentStr: `${((results.taxableIncome / (results.grossPay||1)) * 100).toFixed(1)}%`,
      type: "income", colorClass: "text-slate-900", bgClass: "bg-slate-50",
    },
    ...(results.payeBeforeRelief > 0 ? [{
      id: "payeBefore", label: "PAYE Before Relief", isSubItem: true,
      amountStr: format(results.payeBeforeRelief), percentStr: "",
      type: "info", colorClass: "text-slate-500", bgClass: "bg-slate-50", borderLeft: "border-slate-200",
    }] : []),
    ...(results.personalRelief > 0 ? [{
      id: "personalRelief", label: "Personal Relief", isSubItem: true,
      amountStr: `-${format(results.personalRelief)}`, percentStr: "",
      type: "relief", colorClass: "text-emerald-600", labelColorClass: "text-emerald-700", bgClass: "bg-emerald-50/50", borderLeft: "border-emerald-300",
    }] : []),
    ...(results.insuranceRelief > 0 ? [{
      id: "insuranceRelief", label: "Insurance Relief", isSubItem: true,
      amountStr: `-${format(results.insuranceRelief)}`, percentStr: "",
      type: "relief", colorClass: "text-emerald-600", labelColorClass: "text-emerald-700", bgClass: "bg-emerald-50/50", borderLeft: "border-emerald-300",
    }] : []),
    {
      id: "finalPaye", label: "Final PAYE", isSubItem: false,
      amountStr: `-${format(results.finalPaye)}`, percentStr: `${((results.finalPaye / (results.grossPay||1)) * 100).toFixed(1)}%`,
      type: "deduction", colorClass: "text-red-600", bgClass: "bg-white",
    },
    ...(inputs.otherDeductions > 0 ? [{
      id: "otherDeductions", label: "Other Deductions", isSubItem: false,
      amountStr: `-${format(toKES(inputs.otherDeductions))}`, percentStr: `${(((toKES(inputs.otherDeductions)) / (results.grossPay||1)) * 100).toFixed(1)}%`,
      type: "deduction", colorClass: "text-slate-600", bgClass: "bg-white",
    }] : []),
    {
      id: "netSalary", label: "Net Salary", isSubItem: false,
      amountStr: format(results.netPay), percentStr: `${((results.netPay / (results.grossPay||1)) * 100).toFixed(1)}%`,
      type: "total", colorClass: "text-emerald-600", bgClass: "bg-emerald-50/50",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Salary Calculator</h1>
          <p className="text-slate-500 mt-2">Enter your earnings and deductions to estimate your net pay.</p>
        </div>
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-xs font-medium text-slate-500 border border-slate-200 w-fit">
          Rates last reviewed: May 2026
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-0 shadow-sm shadow-slate-200/50">
            <CardContent className="p-6 space-y-8">
              <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Earnings</h3>
                <div className="grid gap-4">
                  <div className="space-y-1.5 focus-within:text-emerald-600 text-slate-600 transition-colors">
                    <Label htmlFor="basicSalary">Basic Salary</Label>
                    <CurrencyInput id="basicSalary" name="basicSalary" value={inputs.basicSalary} onChange={handleInputChange} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5 focus-within:text-emerald-600 text-slate-600 transition-colors">
                      <Label htmlFor="houseAllowance">House Allowance</Label>
                      <CurrencyInput id="houseAllowance" name="houseAllowance" value={inputs.houseAllowance} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-1.5 focus-within:text-emerald-600 text-slate-600 transition-colors">
                      <Label htmlFor="transportAllowance">Transport Allow.</Label>
                      <CurrencyInput id="transportAllowance" name="transportAllowance" value={inputs.transportAllowance} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1.5 focus-within:text-emerald-600 text-slate-600 transition-colors">
                      <Label htmlFor="otherAllowances">Other Allowances</Label>
                      <CurrencyInput id="otherAllowances" name="otherAllowances" value={inputs.otherAllowances} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-1.5 focus-within:text-emerald-600 text-slate-600 transition-colors">
                      <Label htmlFor="bonus">Bonus / Commission</Label>
                      <CurrencyInput id="bonus" name="bonus" value={inputs.bonus} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="space-y-1.5 focus-within:text-emerald-600 text-slate-600 transition-colors">
                    <Label htmlFor="nonCashBenefits">Taxable Non-Cash Benefits</Label>
                    <CurrencyInput id="nonCashBenefits" name="nonCashBenefits" value={inputs.nonCashBenefits} onChange={handleInputChange} />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Deductions & Reliefs</h3>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5 focus-within:text-emerald-600 text-slate-600 transition-colors">
                      <Label htmlFor="pensionContribution">Pension Cont.</Label>
                      <CurrencyInput id="pensionContribution" name="pensionContribution" value={inputs.pensionContribution} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-1.5 focus-within:text-emerald-600 text-slate-600 transition-colors">
                      <Label htmlFor="insurancePremium">Insurance Premium</Label>
                      <CurrencyInput id="insurancePremium" name="insurancePremium" value={inputs.insurancePremium} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="space-y-1.5 focus-within:text-emerald-600 text-slate-600 transition-colors">
                      <Label htmlFor="otherDeductions">Other Deductions (Loans, etc)</Label>
                      <CurrencyInput id="otherDeductions" name="otherDeductions" value={inputs.otherDeductions} onChange={handleInputChange} />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                 <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Settings</h3>
                 <div className="grid gap-4">
                    <div className="space-y-1.5 text-slate-600">
                      <Label htmlFor="isResident">Residency Status</Label>
                      <Select id="isResident" name="isResident" value={inputs.isResident.toString()} onChange={handleSelectChange}>
                        <option value="true">Resident (Gets Relief)</option>
                        <option value="false">Non-Resident</option>
                      </Select>
                    </div>
                    <div className="space-y-1.5 text-slate-600">
                      <Label htmlFor="nssfOption">NSSF Plan (2026)</Label>
                      <Select id="nssfOption" name="nssfOption" value={inputs.nssfOption} onChange={handleSelectChange}>
                        <option value="TIER_1_AND_2">Full Tier I + Tier II</option>
                        <option value="TIER_1_ONLY">Tier I Only</option>
                        <option value="EXEMPT">Exempt / Alternative Scheme</option>
                      </Select>
                    </div>
                 </div>
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50 border-t border-slate-100 p-6 flex gap-3">
              <Button variant="outline" className="flex-1 bg-white" onClick={resetCalculation}>
                <RotateCcw className="w-4 h-4 mr-2" /> Reset
              </Button>
              <Button className="flex-1" onClick={saveCalculation}>
                <Save className="w-4 h-4 mr-2" /> Save
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Results Column */}
        <div key={animateKey} className="lg:col-span-7 space-y-6 animate-fade-in">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-600 p-5 rounded-2xl text-white shadow-lg shadow-emerald-900/10 col-span-2 sm:col-span-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Calculator className="w-24 h-24 rotate-12" />
               </div>
              <p className="text-xs font-medium text-emerald-100 uppercase tracking-widest relative z-10">Estimated Net Salary</p>
              <p className="text-3xl font-bold mt-1 relative z-10">{format(results.netPay)}</p>
              
              <div className="mt-3 h-1 w-full bg-emerald-500/30 rounded-full relative z-10">
                <div className="h-full bg-white rounded-full" style={{ width: `${Math.min(100, Math.max(0, (results.netPay / (results.grossPay || 1)) * 100))}%` }}></div>
              </div>
              <p className="text-[10px] mt-2 text-emerald-100 relative z-10">~{((results.netPay / (results.grossPay || 1)) * 100).toFixed(0)}% of gross salary remains as take-home</p>
            </div>
            
            <div className="bg-slate-900 p-5 rounded-2xl text-white shadow-lg shadow-slate-900/10 col-span-2 sm:col-span-1">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">Total Employer Cost</p>
              <p className="text-3xl font-bold mt-1">{format(results.employerCost)}</p>
              <div className="mt-3 flex flex-col gap-1">
                <span className="text-[10px] text-slate-400 italic text-right whitespace-nowrap pt-3">Includes employer NSSF and employer Housing Levy.</span>
              </div>
            </div>
          </div>

          <Card className="overflow-hidden">
            <CardHeader className="pb-4 border-b border-slate-100 flex flex-row items-center justify-between">
              <CardTitle>Salary Breakdown</CardTitle>
              <div className="flex gap-2">
                 <Button variant="ghost" size="icon" className="h-8 w-8 !p-0" onClick={copyResults} title="Copy to clipboard">
                   <Copy className="h-4 w-4" />
                 </Button>
                 <Button variant="ghost" size="icon" className="h-8 w-8 !p-0" onClick={() => window.print()} title="Print breakdown">
                   <Download className="h-4 w-4" />
                 </Button>
              </div>
            </CardHeader>
             <CardContent className="p-0">
               <div className="w-full">
                  {isMobile ? (
                    <div className="flex flex-col gap-3 p-4 bg-slate-50/50">
                      {breakdownRows.map((row) => (
                        <div key={row.id} className={`p-4 rounded-xl shadow-sm border border-slate-100 ${row.bgClass}`}>
                           <div className="flex justify-between items-center w-full">
                             <div className={`${row.isSubItem ? (row.labelColorClass || 'text-slate-600') : 'text-slate-600'} ${row.isSubItem ? 'font-normal' : 'font-medium'} ${row.type === 'total' ? 'font-bold text-slate-900 !text-base' : ''}`}>
                               {row.label}
                             </div>
                             <div className={`${row.type === 'total' ? 'font-bold text-lg' : 'font-semibold'} ${row.colorClass}`}>
                               {row.amountStr}
                             </div>
                           </div>
                           {!row.isSubItem && (
                              <div className="flex justify-between items-center w-full mt-2 pt-2 border-t border-slate-50">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">% GROSS</span>
                                <span className={`text-xs font-semibold ${row.type === 'total' ? row.colorClass : 'text-slate-400'}`}>{row.percentStr}</span>
                              </div>
                           )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      {/* Desktop Table Header */}
                      <div className="hidden sm:grid sm:grid-cols-4 bg-slate-50 border-b border-slate-200 px-5 py-3 text-[10px] items-center font-bold text-slate-500 uppercase">
                        <div className="col-span-2">Description</div>
                        <div className="text-right">Amount</div>
                        <div className="text-right">% Gross</div>
                      </div>
                      
                      {/* Rows Container */}
                      <div className="flex flex-col sm:p-0">
                        {breakdownRows.map((row) => (
                          row.isSubItem ? (
                            <div key={row.id} className={`px-5 py-2 text-base flex justify-between border-b border-slate-50 ${row.bgClass}`}>
                              <span className={`${row.labelColorClass || 'text-slate-500'} pl-4 border-l-2 ${row.borderLeft}`}>{row.label}</span>
                              <span className={`${row.colorClass || 'text-slate-500'} text-right`}>{row.amountStr}</span>
                            </div>
                          ) : (
                            <div key={row.id} className={`grid grid-cols-4 px-5 py-3 border-b ${row.type === 'total' ? 'border-emerald-100' : 'border-slate-50'} items-center ${row.bgClass}`}>
                              <div className={`${row.type === 'total' ? 'font-bold text-slate-900' : 'text-slate-600'} col-span-2`}>{row.label}</div>
                              <div className={`text-right ${row.type === 'total' ? 'font-bold text-base flex justify-end items-center' : 'font-medium'} ${row.colorClass}`}>{row.amountStr}</div>
                              <div className={`text-right ${row.type === 'total' ? 'font-bold text-sm' : 'text-slate-400 text-sm'} ${row.type === 'total' ? row.colorClass : ''}`}>{row.percentStr}</div>
                            </div>
                          )
                        ))}
                      </div>
                    </>
                  )}
               </div>
               
               <p className="text-xs text-slate-500 mt-2 px-5 pb-3">
                 Note: NetPay KE follows the KRA/eCitizen SHIF calculator table. Some payroll systems may apply KSh 300 as a minimum floor. Confirm final payroll with your employer or SHA/KRA.
               </p>
               
               <div className="bg-slate-50 p-5 border-y border-slate-200">
                  <h4 className="text-sm font-semibold text-slate-900 mb-4">Deductions Visualizer</h4>
                  <div className="h-48 w-full border border-slate-200 rounded-xl bg-white p-2 shadow-sm">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={70}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => format(value)} />
                        <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '12px' }}/>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
               </div>

               {/* Calculation references section */}
               <div className="bg-slate-50/80 p-5 rounded-b-xl border-t border-slate-200">
                  <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-slate-500" />
                    Calculation References
                  </h4>
                  <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside marker:text-slate-300 mb-4">
                    <li>PAYE bands and personal relief are based on the standard Kenya PAYE structure.</li>
                    <li>SHIF is estimated using the selected SHIF calculation mode (KRA table).</li>
                    <li>NSSF is estimated using the selected NSSF option (Tier I & II based on 2026 limits).</li>
                    <li>Affordable Housing Levy is estimated at 1.5% employee and 1.5% employer.</li>
                    <li>Pension deduction for PAYE is capped at KSh 30,000 monthly in the calculator.</li>
                    <li>Final payroll may differ depending on employer policies, benefits, loans, SACCO deductions, pension schemes, and official updates.</li>
                  </ul>
                  
                  <div className="pt-4 border-t border-slate-200 space-y-2">
                    <h5 className="text-xs font-semibold text-slate-700">Official references:</h5>
                    <div className="flex flex-wrap gap-4 text-xs">
                      <a href="https://kra.go.ke" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-emerald-600 transition-colors underline decoration-slate-300 underline-offset-4">KRA PAYE</a>
                      <a href="https://ecitizen.go.ke" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-emerald-600 transition-colors underline decoration-slate-300 underline-offset-4">KRA/eCitizen SHIF calculator</a>
                      <a href="https://kra.go.ke" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-emerald-600 transition-colors underline decoration-slate-300 underline-offset-4">KRA Affordable Housing Levy notice</a>
                      <a href="https://nssf.or.ke" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-emerald-600 transition-colors underline decoration-slate-300 underline-offset-4">NSSF 2026 contribution rates</a>
                    </div>
                  </div>
               </div>
            </CardContent>
          </Card>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
            <strong>Disclaimer:</strong> Tax and statutory deduction rates can change. Always confirm final payroll with official sources or a payroll professional.
          </div>
        </div>
      </div>
    </div>
  );
}

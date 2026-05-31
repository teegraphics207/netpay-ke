import { useState } from "react";
import { Link } from "react-router-dom";
import { Calculator, CheckCircle2, ChevronRight, ShieldCheck, PieChart, Banknote, Briefcase, FileText, ChevronDown, AlignLeft, TrendingUp, HelpCircle } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { cn } from "../lib/utils";
import { performSalaryCalculation, CalculationInputs } from "../lib/calculations";
import { usePageTitle } from "../lib/usePageTitle";
import { useCurrency } from "../context/CurrencyContext";

const PREVIEW_INPUTS: CalculationInputs = {
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

const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white mb-4 shadow-sm hover:border-slate-300 transition-colors">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
      >
        <span className="font-semibold text-slate-900">{question}</span>
        <ChevronDown className={cn("h-5 w-5 text-slate-400 transition-transform duration-200", isOpen ? "rotate-180" : "")} />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-50 pt-4 bg-slate-50/50">
          {answer}
        </div>
      )}
    </div>
  );
};

export function Home() {
  usePageTitle("NetPay KE | Kenya Salary Calculator");
  const { format } = useCurrency();
  const previewResults = performSalaryCalculation(PREVIEW_INPUTS);

  const faqs = [
    { q: "Is NetPay KE an official KRA calculator?", a: "No. It is an independent estimation tool built to help you understand your payroll deductions. Always verify final figures with a qualified professional or your employer." },
    { q: "Does this include SHIF?", a: "Yes, it estimates the Social Health Insurance Fund (SHIF) deduction based on the current 2.75% rate and minimum contribution rules for 2026." },
    { q: "Does this include NSSF?", a: "Yes, it includes NSSF using configurable Tier I and Tier II settings based on the latest rates." },
    { q: "Does this include Housing Levy?", a: "Yes, it estimates both the 1.5% employee and 1.5% employer Affordable Housing Levy contributions." },
    { q: "Why is my payslip different?", a: "Employers may include additional deductions, non-taxable benefits, pension schemes, loans, SACCO deductions, or special allowance rules that affect the final net pay." },
    { q: "Can employers use this calculator?", a: "Yes, employers can use it to estimate the total cost of employment including employer NSSF and Housing Levy contributions, but it should only be used for planning purposes." }
  ];

  const tools = [
    { title: "PAYE Calculator", icon: <FileText className="h-6 w-6 text-emerald-600" />, desc: "Calculate your Pay As You Earn tax purely based on taxable income.", path: "/paye" },
    { title: "SHIF Calculator", icon: <PieChart className="h-6 w-6 text-blue-600" />, desc: "See your Social Health Insurance Fund monthly deduction.", path: "/shif" },
    { title: "NSSF Calculator", icon: <Briefcase className="h-6 w-6 text-amber-600" />, desc: "Breakdown of Tier 1 & Tier 2 savings.", path: "/nssf" },
    { title: "Housing Levy", icon: <AlignLeft className="h-6 w-6 text-violet-600" />, desc: "Calculate the mandatory 1.5% affordable housing deduction.", path: "/housing-levy" },
    { title: "Reverse Salary", icon: <Calculator className="h-6 w-6 text-slate-700" />, desc: "Want a specific net pay? Find the gross salary you need to ask for.", path: "/reverse" },
    { title: "Salary Raise", icon: <TrendingUp className="h-6 w-6 text-emerald-600" />, desc: "See how a salary increase actually affects your take-home pay.", path: "/raise" },
  ];

  return (
    <div className="flex flex-col selection:bg-emerald-100 selection:text-emerald-900 bg-white">
      {/* Horizontal Ad Placeholder */}
      <div className="bg-slate-50 w-full py-2 border-b border-slate-100 text-center">
        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Sponsored</span>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 pt-16 lg:pt-24 pb-24 md:pb-32 border-b border-slate-200">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full pointer-events-none opacity-40">
           <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-emerald-300 blur-[80px] mix-blend-multiply opacity-30"></div>
           <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-blue-300 blur-[80px] mix-blend-multiply opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 w-full max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            
            {/* Left: Copy & Actions */}
            <div className="flex flex-col justify-center space-y-8 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-200/50 border border-slate-300/50 text-slate-700 text-sm font-medium mx-auto lg:mx-0 shadow-sm backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Ready for 2026 Deductions
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                  Kenya Salary Calculator for PAYE, SHIF, NSSF & Net Pay
                </h1>
                <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Estimate your monthly take-home salary, statutory deductions, and total employer cost in seconds. Clean, fast, and 100% private.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/calculator">
                  <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base shadow-lg shadow-emerald-500/25">
                    Calculate Salary
                  </Button>
                </Link>
                <Link to="#features" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base bg-white/50 backdrop-blur-sm shadow-sm hover:bg-slate-100">
                    View Breakdown <ChevronDown className="ml-2 h-4 w-4 text-slate-400" />
                  </Button>
                </Link>
              </div>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6 pt-4">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" /> Free to use
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <ShieldCheck className="h-5 w-5 text-emerald-500" /> Independent estimate
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" /> Mobile-friendly
                </div>
              </div>
            </div>

            {/* Right: Preview Card */}
            <div className="mx-auto flex w-full max-w-[480px] flex-col justify-center lg:ml-auto perspective-1000">
              <div className="relative rounded-3xl border border-slate-200/80 bg-white/90 backdrop-blur-xl p-8 shadow-2xl shadow-slate-300/50 ring-1 ring-slate-900/5 hover:-translate-y-1 transition-transform duration-500">
                <div className="absolute -top-5 -right-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-emerald-400 shadow-xl shadow-slate-900/20 rotate-6 border border-slate-700">
                  <Calculator className="h-6 w-6" />
                </div>
                
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Live Preview
                </h3>
                
                <div className="space-y-5">
                  <div className="flex justify-between items-end pb-5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Gross Salary</span>
                    <span className="text-xl font-bold text-slate-900">{format(previewResults.grossPay)}</span>
                  </div>
                  
                  <div className="space-y-3 px-1">
                    <div className="flex justify-between items-center text-sm group">
                      <span className="text-slate-500 font-medium group-hover:text-slate-700 transition-colors">PAYE</span>
                      <span className="text-slate-900 font-bold bg-slate-50 px-2 py-1 rounded-md">{format(previewResults.finalPaye)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm group">
                      <span className="text-slate-500 font-medium group-hover:text-slate-700 transition-colors">SHIF</span>
                      <span className="text-slate-900 font-bold bg-slate-50 px-2 py-1 rounded-md">{format(previewResults.shif)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm group">
                      <span className="text-slate-500 font-medium group-hover:text-slate-700 transition-colors">NSSF</span>
                      <span className="text-slate-900 font-bold bg-slate-50 px-2 py-1 rounded-md">{format(previewResults.nssfEmployee)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm group">
                      <span className="text-slate-500 font-medium group-hover:text-slate-700 transition-colors">Housing Levy</span>
                      <span className="text-slate-900 font-bold bg-slate-50 px-2 py-1 rounded-md">{format(previewResults.housingLevyEmployee)}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-6 mt-4 border-t border-slate-200">
                    <span className="text-slate-900 font-extrabold text-sm tracking-widest uppercase">Net Pay</span>
                    <span className="text-2xl font-black text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl">{format(previewResults.netPay)}</span>
                  </div>
                </div>

                <div className="mt-8">
                  <Link to="/calculator">
                    <Button className="w-full h-12 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 text-sm">Calculate Your Salary</Button>
                  </Link>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Why Use NetPay KE Section */}
      <section id="features" className="py-24 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center mb-16 max-w-3xl mx-auto">
             <h2 className="text-[13px] font-bold tracking-widest uppercase text-emerald-600 mb-3">Why Use Us</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">Understand exactly where your money goes</h3>
            <p className="mt-5 text-lg text-slate-500 leading-relaxed">A clean, transparent breakdown of your earnings and deductions that feels like a modern banking app.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-slate-200/40 hover:-translate-y-1 transition-all group">
               <div className="h-12 w-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-sm mb-6 group-hover:text-emerald-600 transition-colors">
                  <Calculator className="h-6 w-6" />
               </div>
               <h4 className="text-lg font-bold text-slate-900 mb-3">Fast Salary Estimates</h4>
               <p className="text-slate-500 text-sm leading-relaxed">Instantly see your net take-home pay, total deductions, and taxable income purely in your browser.</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-slate-200/40 hover:-translate-y-1 transition-all group">
               <div className="h-12 w-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-sm mb-6 group-hover:text-blue-600 transition-colors">
                  <PieChart className="h-6 w-6" />
               </div>
               <h4 className="text-lg font-bold text-slate-900 mb-3">All Major Deductions</h4>
               <p className="text-slate-500 text-sm leading-relaxed">Fully updated for Tier I & II NSSF, SHIF (2.75%), and the Affordable Housing Levy (1.5%).</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-slate-200/40 hover:-translate-y-1 transition-all group">
               <div className="h-12 w-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-sm mb-6 group-hover:text-amber-600 transition-colors">
                  <Briefcase className="h-6 w-6" />
               </div>
               <h4 className="text-lg font-bold text-slate-900 mb-3">Employer Cost Breakdown</h4>
               <p className="text-slate-500 text-sm leading-relaxed">Employers can see exactly how much it costs to hire someone, including matching statutory contributions.</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-slate-200/40 hover:-translate-y-1 transition-all group">
               <div className="h-12 w-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-sm mb-6 group-hover:text-violet-600 transition-colors">
                  <ShieldCheck className="h-6 w-6" />
               </div>
               <h4 className="text-lg font-bold text-slate-900 mb-3">Private & Mobile-Friendly</h4>
               <p className="text-slate-500 text-sm leading-relaxed">No data is sent to external servers. Experience a clean, fast interface optimized for any screen size.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Calculators Section */}
      <section className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
           <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Explore More Kenya Payroll Tools</h2>
                <p className="mt-4 text-lg text-slate-500">Need specific calculations? Use our dedicated mini-calculators.</p>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, i) => (
                 <Link to={tool.path} key={i} className="group flex flex-col h-full bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all">
                    <div className="h-12 w-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                       {tool.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{tool.title}</h3>
                    <p className="text-sm text-slate-500 mb-6 flex-1">{tool.desc}</p>
                    <div className="font-semibold text-sm text-emerald-600 group-hover:text-emerald-700 flex items-center gap-1">
                      Open Tool <ChevronRight className="h-4 w-4" />
                    </div>
                 </Link>
              ))}
           </div>
        </div>
      </section>

      {/* Embedded Ad Space */}
      <div className="container mx-auto px-4 max-w-4xl py-12">
         <div className="bg-slate-100 border border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
             <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Ad Space</span>
             <p className="text-slate-500 font-medium">Sponsored payroll tool placeholder</p>
         </div>
      </div>

      {/* Educational Guides Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Learn Kenyan Payroll Deductions</h2>
            <p className="mt-4 text-lg text-slate-500">Resources to help you understand payslips and statutory laws.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <Card className="hover:shadow-lg hover:-translate-y-1 transition-all rounded-3xl border-slate-200 shadow-sm bg-slate-50/50 flex flex-col h-full overflow-hidden relative">
              <Link to="/guides/gross-pay-vs-net-pay" className="absolute inset-0 z-10">
                 <span className="sr-only">Read full article</span>
              </Link>
              <div className="h-40 rounded-t-3xl bg-emerald-100 flex items-center justify-center border-b border-emerald-200">
                 <FileText className="h-12 w-12 text-emerald-600 opacity-80" />
              </div>
              <CardContent className="p-6 flex flex-col flex-1 relative z-20 pointer-events-none">
                <span className="inline-block px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4 self-start">Tax Basics</span>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Gross Pay vs Net Pay</h3>
                <p className="text-sm text-slate-500 line-clamp-3 mb-6 flex-1">Why is your take-home pay significantly lower than your actual salary? Understand the journey from gross to net.</p>
                <div className="font-semibold text-emerald-600">Read article →</div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg hover:-translate-y-1 transition-all rounded-3xl border-slate-200 shadow-sm bg-slate-50/50 flex flex-col h-full overflow-hidden relative">
              <Link to="/guides/how-shif-works-in-2026" className="absolute inset-0 z-10">
                 <span className="sr-only">Read full article</span>
              </Link>
              <div className="h-40 rounded-t-3xl bg-blue-100 flex items-center justify-center border-b border-blue-200">
                 <PieChart className="h-12 w-12 text-blue-600 opacity-80" />
              </div>
              <CardContent className="p-6 flex flex-col flex-1 relative z-20 pointer-events-none">
                <span className="inline-block px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4 self-start">Statutory</span>
                <h3 className="text-xl font-bold text-slate-900 mb-3">How SHIF is Calculated</h3>
                <p className="text-sm text-slate-500 line-clamp-3 mb-6 flex-1">Understanding the transition to the Social Health Insurance Fund and how the 2.75% rate hits your payslip.</p>
                <div className="font-semibold text-emerald-600">Read article →</div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg hover:-translate-y-1 transition-all rounded-3xl border-slate-200 shadow-sm bg-slate-50/50 flex flex-col h-full overflow-hidden relative">
              <Link to="/guides/nssf-tier-i-and-tier-ii" className="absolute inset-0 z-10">
                 <span className="sr-only">Read full article</span>
              </Link>
              <div className="h-40 rounded-t-3xl bg-amber-100 flex items-center justify-center border-b border-amber-200">
                 <Briefcase className="h-12 w-12 text-amber-600 opacity-80" />
              </div>
              <CardContent className="p-6 flex flex-col flex-1 relative z-20 pointer-events-none">
                <span className="inline-block px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4 self-start">Pension</span>
                <h3 className="text-xl font-bold text-slate-900 mb-3">NSSF Tier I & Tier II</h3>
                <p className="text-sm text-slate-500 line-clamp-3 mb-6 flex-1">A clear breakdown of the new pension contributions for employers and employees based on the latest NSSF act.</p>
                <div className="font-semibold text-emerald-600">Read article →</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <Link to="/guides">
               <Button variant="outline" size="lg" className="rounded-full">View All Guides</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
           <div className="flex flex-col items-center text-center mb-16">
              <div className="h-16 w-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm mb-6">
                 <HelpCircle className="h-8 w-8 text-emerald-600" />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Frequently Asked Questions</h2>
           </div>
           
           <div className="space-y-1">
             {faqs.map((faq, idx) => (
               <AccordionItem key={idx} question={faq.q} answer={faq.a} />
             ))}
           </div>
        </div>
      </section>

      {/* Disclaimer Banner */}
      <section className="bg-amber-50 border-t border-amber-200 py-10">
         <div className="container mx-auto px-4 max-w-4xl text-center">
            <h3 className="text-sm font-bold uppercase tracking-widest text-amber-700 mb-3">Important Disclaimer</h3>
            <p className="text-sm text-amber-800 leading-relaxed font-medium max-w-2xl mx-auto">
              NetPay KE is an independent estimation tool. Final payroll figures may differ significantly depending on employer policies, mid-year tax updates, non-taxable benefits, private pension schemes, and other specific deductions. NetPay KE is not affiliated with KRA, SHIF/SHA, NSSF, or any government agency.
            </p>
         </div>
      </section>
    </div>
  );
}

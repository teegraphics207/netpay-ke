import { BookOpen, HelpCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";
import { guideArticles } from "../data/guides";
import { usePageTitle } from "../lib/usePageTitle";

export function GuidesPage() {
  usePageTitle("Kenya Payroll Guides | NetPay KE");

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-6xl">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">Learn Kenyan Payroll Deductions</h1>
        <p className="text-lg text-slate-500 leading-relaxed">Resources and articles to help you understand your payslip, statutory deductions, and tax laws entirely.</p>
      </div>

      <div className="mb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 hover-group">
           {guideArticles.map((guide, i) => (
             <Link key={i} to={`/guides/${guide.slug}`} className="block">
               <Card className="hover:shadow-xl hover:shadow-slate-200/50 transition-all rounded-3xl border-slate-200 shadow-sm flex flex-col h-full bg-white group hover:-translate-y-1">
                 <CardHeader className="pt-8 px-8 pb-4">
                   <CardTitle className="text-xl font-bold leading-tight text-slate-900 capitalize tracking-normal">{guide.title}</CardTitle>
                 </CardHeader>
                 <CardContent className="px-8 pb-8 flex flex-col flex-1">
                   <p className="text-sm text-slate-500 mb-6 leading-relaxed flex-1">{guide.description}</p>
                   <span className="font-semibold text-emerald-600 justify-start group-hover:text-emerald-700">Read full article →</span>
                 </CardContent>
               </Card>
             </Link>
           ))}
        </div>
        
        {/* Ad Placeholder */}
        <div className="mt-12 bg-slate-50 py-6 border border-slate-200 rounded-2xl text-center flex flex-col items-center justify-center">
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Ad Space</span>
           <p className="text-slate-500 text-sm font-medium">Sponsored payroll tool or banking offer</p>
        </div>
      </div>

      <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 lg:p-16 text-center max-w-4xl mx-auto relative overflow-hidden shadow-2xl">
         {/* Background decoration */}
         <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl pointer-events-none"></div>

         <div className="relative z-10">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Want to calculate your salary now?</h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">Use our free, private, mobile-friendly calculator to get an exact estimate of your net pay and deductions.</p>
            <Link to="/calculator">
               <Button size="lg" className="bg-emerald-500 text-white hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 rounded-full px-8 py-3 h-auto text-base">
                 Open Salary Calculator
               </Button>
            </Link>
         </div>
      </div>
    </div>
  )
}

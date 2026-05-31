import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 dark:bg-slate-950 dark:border-slate-800 transition-colors duration-200">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
               <span className="text-xl font-bold tracking-tight text-slate-900 leading-none dark:text-slate-100">NetPay <span className="text-emerald-600">KE</span></span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-[280px] dark:text-slate-400">
              Independent Kenya salary estimation tool helping you understand where your money goes. Not affiliated with KRA, NSSF, or SHIF/SHA.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-slate-300">Calculators</h4>
            <div className="flex flex-col gap-3">
              <Link to="/calculator" className="text-sm font-medium text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">Salary Calculator</Link>
              <Link to="/paye" className="text-sm font-medium text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">PAYE Calculator</Link>
              <Link to="/shif" className="text-sm font-medium text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">SHIF Calculator</Link>
              <Link to="/nssf" className="text-sm font-medium text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">NSSF Calculator</Link>
              <Link to="/housing-levy" className="text-sm font-medium text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">Housing Levy Calculator</Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-slate-300">Resources</h4>
            <div className="flex flex-col gap-3">
              <Link to="/guides" className="text-sm font-medium text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">Guides</Link>
              <Link to="/about" className="text-sm font-medium text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">About</Link>
              <Link to="/disclaimer" className="text-sm font-medium text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">Disclaimer</Link>
              <Link to="/privacy" className="text-sm font-medium text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">Privacy Policy</Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-slate-300">Contact</h4>
            <p className="text-sm text-slate-500 leading-relaxed dark:text-slate-400">
              Have questions or spotted an issue with the calculator? Let us know.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-emerald-600 transition-colors group dark:text-slate-100">
              <div className="h-8 w-8 rounded-lg bg-slate-200 flex items-center justify-center group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors dark:bg-slate-800 dark:group-hover:bg-emerald-950/40 dark:group-hover:text-emerald-300">
                 <Mail className="h-4 w-4" />
              </div>
              Contact Us
            </Link>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center gap-4 text-center border-t border-slate-200 pt-8 sm:flex-row sm:justify-between sm:text-left dark:border-slate-800">
          <p className="text-xs text-slate-500 font-medium dark:text-slate-400">
            &copy; {new Date().getFullYear()} NetPay KE. All rights reserved.
            <span className="block sm:inline sm:ml-4 text-emerald-600 dark:text-emerald-400">Rates last reviewed: May 2026.</span>
          </p>
          <p className="text-xs text-slate-400 font-medium max-w-md dark:text-slate-500">
            Independent salary estimation tool. Not affiliated with KRA, SHIF/SHA, NSSF, or any government agency. Estimates are for general planning purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}

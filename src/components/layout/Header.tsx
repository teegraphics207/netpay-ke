import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calculator, Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";
import { CurrencySwitcher } from "./CurrencySwitcher";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "dark" || saved === "light") return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Calculator", path: "/calculator" },
    { name: "PAYE", path: "/paye" },
    { name: "SHIF", path: "/shif" },
    { name: "NSSF", path: "/nssf" },
    { name: "Housing Levy", path: "/housing-levy" },
    { name: "Guides", path: "/guides" },
  ];

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-200 border-b",
      scrolled 
        ? "bg-white/95 border-slate-200 shadow-sm py-3 dark:bg-slate-950/95 dark:border-slate-800 dark:shadow-none backdrop-blur-md" 
        : "bg-white border-transparent py-5 dark:bg-slate-950 dark:border-transparent"
    )}>
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-emerald-400 group-hover:bg-slate-800 transition-colors shadow-sm dark:bg-slate-800 dark:text-emerald-400 dark:group-hover:bg-slate-700">
            <Calculator className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-none">NetPay <span className="text-emerald-600">KE</span></span>
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1 hidden sm:block">Kenya Salary Calculator</span>
          </div>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.slice(1).map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className="text-sm font-medium text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          
          {/* Currency Switcher */}
          <CurrencySwitcher align="right" />
          
          {/* Theme Switcher */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100 shadow-sm"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <Link to="/calculator">
            <Button className="shadow-sm hover:shadow">Calculate Now</Button>
          </Link>
        </nav>

        {/* Mobile menu controls */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Currency Switcher */}
          <CurrencySwitcher align="right" />

          {/* Mobile Theme Switcher */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none bg-slate-50 rounded-lg border border-slate-200 dark:text-slate-300 dark:hover:text-slate-100 dark:bg-slate-900 dark:border-slate-800"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          
          {/* Mobile menu toggle */}
          <button 
            className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none bg-slate-50 rounded-lg border border-slate-200 dark:text-slate-400 dark:hover:text-slate-100 dark:bg-slate-900 dark:border-slate-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-4 shadow-xl absolute w-full left-0 top-full dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-semibold text-slate-700 p-3 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-colors dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-emerald-400"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/calculator" onClick={() => setIsMenuOpen(false)} className="mt-4 block">
              <Button size="lg" className="w-full">Calculate Now</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}


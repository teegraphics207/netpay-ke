import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 selection:bg-emerald-500/20 selection:text-emerald-900 selection:dark:bg-emerald-500/30 selection:dark:text-emerald-400 transition-colors duration-200">
      <Header />
      <main className="flex-1 w-full relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

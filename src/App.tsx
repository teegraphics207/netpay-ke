import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { Suspense, lazy } from "react";
import { Layout } from "./components/layout/Layout";
import { CurrencyProvider } from "./context/CurrencyContext";

const Home = lazy(() => import("./pages/Home").then(module => ({ default: module.Home })));
const CalculatorPage = lazy(() => import("./pages/CalculatorPage").then(module => ({ default: module.CalculatorPage })));
const PayeCalculator = lazy(() => import("./pages/PayeCalculator").then(module => ({ default: module.PayeCalculator })));
const ShifCalculator = lazy(() => import("./pages/ShifCalculator").then(module => ({ default: module.ShifCalculator })));
const NssfCalculator = lazy(() => import("./pages/NssfCalculator").then(module => ({ default: module.NssfCalculator })));
const HousingLevyCalculator = lazy(() => import("./pages/HousingLevyCalculator").then(module => ({ default: module.HousingLevyCalculator })));
const GuidesPage = lazy(() => import("./pages/GuidesPage").then(module => ({ default: module.GuidesPage })));
const ArticlePage = lazy(() => import("./pages/ArticlePage").then(module => ({ default: module.ArticlePage })));
const PrivacyPolicy = lazy(() => import("./pages/StaticPages").then(module => ({ default: module.PrivacyPolicy })));
const Disclaimer = lazy(() => import("./pages/StaticPages").then(module => ({ default: module.Disclaimer })));
const About = lazy(() => import("./pages/StaticPages").then(module => ({ default: module.About })));
const Contact = lazy(() => import("./pages/StaticPages").then(module => ({ default: module.Contact })));
const ReverseCalculator = lazy(() => import("./pages/ReverseCalculator").then(module => ({ default: module.ReverseCalculator })));
const RaiseCalculator = lazy(() => import("./pages/RaiseCalculator").then(module => ({ default: module.RaiseCalculator })));

export default function App() {
  return (
    <CurrencyProvider>
      <BrowserRouter>
        <Toaster position="top-center" />
        <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="calculator" element={<CalculatorPage />} />
              <Route path="paye" element={<PayeCalculator />} />
              <Route path="shif" element={<ShifCalculator />} />
              <Route path="nssf" element={<NssfCalculator />} />
              <Route path="housing-levy" element={<HousingLevyCalculator />} />
              <Route path="guides" element={<GuidesPage />} />
              <Route path="guides/:slug" element={<ArticlePage />} />
              <Route path="privacy" element={<PrivacyPolicy />} />
              <Route path="disclaimer" element={<Disclaimer />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="reverse" element={<ReverseCalculator />} />
              <Route path="raise" element={<RaiseCalculator />} />
              <Route path="*" element={<div className="container mx-auto px-4 py-12 text-center text-slate-500">Page not found</div>} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </CurrencyProvider>
  );
}

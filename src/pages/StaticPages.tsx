import { Link } from "react-router-dom";
import { usePageTitle } from "../lib/usePageTitle";

export function PrivacyPolicy() {
  usePageTitle("Privacy Policy | NetPay KE");
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-slate-900">Privacy Policy</h1>
      <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
        <p>Last updated: May 2026</p>
        <p>NetPay KE ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how your information is collected, used, and disclosed by NetPay KE.</p>
        <h2 className="text-xl font-bold mt-8 text-slate-900">Data Collection</h2>
        <p>We do not collect, store, or transmit your salary or financial data to any servers. All calculations are performed entirely within your web browser (client-side).</p>
        <h2 className="text-xl font-bold mt-8 text-slate-900">Local Storage</h2>
        <p>If you use the "Save" feature, your inputs are saved locally on your device using browser `localStorage` to persist between visits. You can clear this data anytime by using the "Reset" button.</p>
        <h2 className="text-xl font-bold mt-8 text-slate-900">Analytics</h2>
        <p>We may use basic privacy-friendly analytics to understand traffic patterns, but these do not capture personal financial inputs.</p>
      </div>
    </div>
  );
}

export function Disclaimer() {
  usePageTitle("Disclaimer | NetPay KE");
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-slate-900">Disclaimer</h1>
      <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
        <p>Last updated: May 2026</p>
        <p><strong>NetPay KE is an independent estimation tool.</strong></p>
        <p>The calculations provided on this website are for planning and estimation purposes only. We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the calculator or the information contained herein.</p>
        <p>Tax laws, statutory deductions, and payroll policies change periodically. Final payroll figures may differ significantly depending on employer policies, mid-year tax updates, non-taxable benefits, private pension schemes, and other specific deductions.</p>
        <p>NetPay KE is not affiliated with the Kenya Revenue Authority (KRA), the Social Health Authority (SHA/SHIF), the National Social Security Fund (NSSF), or any government agency.</p>
      </div>
    </div>
  );
}

export function About() {
  usePageTitle("About NetPay KE");
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-slate-900">About NetPay KE</h1>
      <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
        <p>NetPay KE was created to provide Kenyans with a clean, fast, and transparent way to understand their monthly statutory payroll deductions.</p>
        <p>Our mission is to help both employees and employers accurately forecast take-home pay and total cost of employment, using the latest legislative changes including SHIF and the Affordable Housing Levy.</p>
      </div>
    </div>
  );
}

export function Contact() {
  usePageTitle("Contact NetPay KE");
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-slate-900">Contact Us</h1>
      <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
        <p>We value your feedback. If you notice any inaccuracies in our calculation logic based on recent legislative updates, or if you have suggestions for new features, please reach out.</p>
        <p><strong>Email:</strong> support@netpay.co.ke</p>
        <p className="mt-8 text-sm italic">Please do not send us personal identifiable information or sensitive salary details over email.</p>
      </div>
    </div>
  );
}

import React from "react";

export interface GuideArticle {
  title: string;
  slug: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  seoTitle: string;
  seoDescription: string;
  content: React.ReactNode;
}

export const guideArticles: GuideArticle[] = [
  {
    title: "What is PAYE in Kenya?",
    slug: "what-is-paye-in-kenya",
    description: "Learn how Pay As You Earn tax is calculated based on income bands, and how personal relief applies to residents compared to non-residents.",
    category: "Tax Basics",
    date: "January 2026",
    readTime: "4 min read",
    seoTitle: "What is PAYE in Kenya? | NetPay KE Guides",
    seoDescription: "Learn how Pay As You Earn (PAYE) tax is calculated in Kenya based on income bands and personal relief.",
    content: React.createElement(React.Fragment, null, 
      React.createElement("p", null, "PAYE (Pay As You Earn) is the national income tax deducted from employees' salaries and remitted to the Kenya Revenue Authority (KRA)."),
      React.createElement("h2", { className: "text-2xl font-bold mt-8 mb-4 text-slate-800" }, "Income Bands"),
      React.createElement("p", null, "Kenya uses a progressive tax system. As your income increases, you move into higher tax bands, paying a higher percentage only on the amount within that band."),
      React.createElement("h2", { className: "text-2xl font-bold mt-8 mb-4 text-slate-800" }, "Personal Relief"),
      React.createElement("p", null, "Resident individuals are entitled to a personal relief, which is currently set at KSh 2,400 per month. This amount is subtracted directly from your calculated PAYE, reducing your final tax burden.")
    )
  },
  {
    title: "How SHIF works in 2026",
    slug: "how-shif-works-in-2026",
    description: "Understanding the transition from NHIF to the Social Health Insurance Fund, containing details on the flat 2.75% deduction rate.",
    category: "Statutory",
    date: "January 2026",
    readTime: "3 min read",
    seoTitle: "How SHIF works in 2026 | NetPay KE Guides",
    seoDescription: "Understanding the transition to SHIF in Kenya, the 2.75% deduction rate, and how it impacts your net salary.",
    content: React.createElement(React.Fragment, null,
      React.createElement("p", null, "The transition to the Social Health Insurance Fund (SHIF) introduced a flat-rate deduction model for all employees, replacing the old tiered NHIF system."),
      React.createElement("h2", { className: "text-2xl font-bold mt-8 mb-4 text-slate-800" }, "The 2.75% Rule"),
      React.createElement("p", null, "SHIF is calculated as a flat ", React.createElement("strong", null, "2.75% of your Gross Salary"), ". There is no longer an upper cap. This means higher earners contribute proportionately more than they did under NHIF."),
      React.createElement("h2", { className: "text-2xl font-bold mt-8 mb-4 text-slate-800" }, "The Minimum Contribution"),
      React.createElement("p", null, "NetPay KE follows the KRA/eCitizen calculator table: KSh 0–5,999 = KSh 300, and KSh 6,000+ = 2.75% of gross salary. Some payroll teams may interpret KSh 300 as a minimum floor, so confirm final payroll with your employer or official sources.")
    )
  },
  {
    title: "NSSF Tier I & Tier II",
    slug: "nssf-tier-i-and-tier-ii",
    description: "A comprehensive breakdown of the new pension contributions for both employers and employees based on the current NSSF Act guidelines.",
    category: "Pension",
    date: "January 2026",
    readTime: "5 min read",
    seoTitle: "NSSF Tier I & Tier II Explained | NetPay KE Guides",
    seoDescription: "A breakdown of the new NSSF pension contributions in Kenya for both employers and employees.",
    content: React.createElement(React.Fragment, null,
      React.createElement("p", null, "The National Social Security Fund (NSSF) act structures contributions into two tiers to improve retirement savings."),
      React.createElement("h2", { className: "text-2xl font-bold mt-8 mb-4 text-slate-800" }, "Understanding the Tiers"),
      React.createElement("ul", { className: "list-disc pl-6 space-y-2 mt-4" },
        React.createElement("li", null, React.createElement("strong", null, "Tier I: "), "Based on the Lower Earnings Limit. Both employee and employer contribute 6% of this limit."),
        React.createElement("li", null, React.createElement("strong", null, "Tier II: "), "Based on the Upper Earnings Limit minus the Lower Limit. Again, matched at 6% by both parties.")
      ),
      React.createElement("h2", { className: "text-2xl font-bold mt-8 mb-4 text-slate-800" }, "Can you opt out?"),
      React.createElement("p", null, "While Tier I goes strictly to NSSF, employers with their own registered and approved occupational pension schemes can opt to remit Tier II contributions to their private schemes instead of NSSF.")
    )
  },
  {
    title: "The Affordable Housing Levy",
    slug: "affordable-housing-levy-kenya",
    description: "Everything you need to know about the mandatory 1.5% gross salary deduction designed to fund affordable housing projects.",
    category: "Statutory",
    date: "January 2026",
    readTime: "2 min read",
    seoTitle: "The Affordable Housing Levy | NetPay KE Guides",
    seoDescription: "Learn about the mandatory 1.5% Affordable Housing Levy deduction in Kenya.",
    content: React.createElement(React.Fragment, null,
      React.createElement("p", null, "The Affordable Housing Levy is a mandatory deduction aimed at funding affordable housing projects across Kenya."),
      React.createElement("h2", { className: "text-2xl font-bold mt-8 mb-4 text-slate-800" }, "The Rate"),
      React.createElement("p", null, "Both the employer and the employee contribute 1.5% of the employee's gross monthly salary. There is no upper limit or cap on this deduction."),
      React.createElement("h2", { className: "text-2xl font-bold mt-8 mb-4 text-slate-800" }, "Is it refundable?"),
      React.createElement("p", null, "Currently, the Affordable Housing Levy is a tax/levy, not a savings contribution, meaning it is not refundable to the employee.")
    )
  },
  {
    title: "Gross Pay vs Net Pay",
    slug: "gross-pay-vs-net-pay",
    description: "Why is your take-home pay significantly lower than your actual salary? Understand the journey from gross income to final net payout.",
    category: "Tax Basics",
    date: "January 2026",
    readTime: "4 min read",
    seoTitle: "Gross Pay vs Net Pay in Kenya | NetPay KE Guides",
    seoDescription: "Understand the difference between gross pay and net pay in Kenya, and the journey from gross income to final take-home salary.",
    content: React.createElement(React.Fragment, null,
      React.createElement("p", null, "Understanding the difference between gross pay and net pay is the first step to financial literacy in Kenya."),
      React.createElement("h2", { className: "text-2xl font-bold mt-8 mb-4 text-slate-800" }, "What is Gross Pay?"),
      React.createElement("p", null, "Gross pay is the total amount of money you earn before any taxes or deductions are taken out. This includes your basic salary, house allowance, commuter allowance, and any bonuses or taxable benefits."),
      React.createElement("h2", { className: "text-2xl font-bold mt-8 mb-4 text-slate-800" }, "What is Net Pay?"),
      React.createElement("p", null, "Net pay, also known as \"take-home pay,\" is what actually hits your bank account. It is your gross pay minus all statutory deductions (PAYE, NSSF, SHIF, Housing Levy) and any personal deductions (like SACCO loans or advance payments)."),
      React.createElement("h2", { className: "text-2xl font-bold mt-8 mb-4 text-slate-800" }, "The Journey from Gross to Net"),
      React.createElement("p", null, "To get from gross to net, your employer calculates deductions in a specific sequence. For instance, NSSF and allowable pensions are deducted before calculating PAYE, which lowers your taxable income.")
    )
  },
  {
    title: "Understanding Employer Costs",
    slug: "understanding-employer-costs",
    description: "Calculate how much an employer actually pays on top of your gross salary, including mandatory matching statutory contributions.",
    category: "Employer",
    date: "January 2026",
    readTime: "3 min read",
    seoTitle: "Understanding Employer Costs | NetPay KE Guides",
    seoDescription: "Calculate how much an employer actually pays on top of an employee's gross salary in Kenya.",
    content: React.createElement(React.Fragment, null,
      React.createElement("p", null, "When an employer agrees to a gross salary, their actual cost of employment is higher due to mandatory statutory contributions they must match or pay on behalf of the employee."),
      React.createElement("h2", { className: "text-2xl font-bold mt-8 mb-4 text-slate-800" }, "Employer Matching Contributions"),
      React.createElement("ul", { className: "list-disc pl-6 space-y-2 mt-4" },
        React.createElement("li", null, React.createElement("strong", null, "NSSF: "), "The employer matches the employee's Tier I and Tier II contributions (up to 6% of the respective limits)."),
        React.createElement("li", null, React.createElement("strong", null, "Housing Levy: "), "The employer pays an additional 1.5% of the gross salary toward the Affordable Housing Levy, matching the employee's deduction.")
      ),
      React.createElement("h2", { className: "text-2xl font-bold mt-8 mb-4 text-slate-800" }, "No SHIF Matching"),
      React.createElement("p", null, "It's important to note that SHIF is an employee-only deduction. The employer does not match the 2.75% contribution.")
    )
  }
];

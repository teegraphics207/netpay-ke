# NetPay KE — Kenya Salary, PAYE, SHIF, NSSF & Housing Levy Calculator

NetPay KE is a clean, modern, independent estimation tool built to help Kenyans calculate their monthly net take-home pay, understand statutory deductions, and analyze the total cost of employment for employers. 

## Features

- **Net Salary Calculator:** Calculates your net pay considering all 2026 tax bands, NSSF tiers, and relief.
- **SHIF Calculation:** Fully updated for the Social Health Insurance Fund (2.75%), including the minimum contribution logic.
- **NSSF Tiers I & II:** Computes employer and employee NSSF deductions based on the 2026 limits.
- **Affordable Housing Levy:** Calculates the mandatory 1.5% deduction for both employers and employees.
- **Reverse Calculator:** Enter your desired net pay to compute the gross salary you must ask for (grossing up).
- **Salary Raise Calculator:** Understand how a pay raise affects your take-home pay (marginal tax rate analysis).
- **Educational Guides:** Detailed guides breaking down how PAYE, SHIF, Housing Levy, and NSSF work.
- **Offline / Private:** Runs entirely server-less on the client side (after loading). No personal financial data is stored on remote servers.

## Tech Stack

- React 19
- Vite
- TypeScript
- Tailwind CSS v4
- shadcn/ui components (Lucide Icons, generic styling)
- Recharts (for deduction visualizations)
- React Router (for navigation)

## How to Run Locally

1. **Clone the repository.**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
4. **Access the application:** The app will be running at `http://localhost:3000` (or another port if 3000 is occupied).

## Available Calculators

- Net Salary Calculator (`/calculator`)
- PAYE Calculator (`/paye`)
- SHIF Calculator (`/shif`)
- NSSF Calculator (`/nssf`)
- Housing Levy Calculator (`/housing-levy`)
- Reverse Salary Calculator (`/reverse`)
- Salary Raise Calculator (`/raise`)

## Project Structure

- `src/pages/` - Contains all unique calculator pages and static guides
- `src/lib/` - Contains calculation logic, helpers, and types
- `src/components/` - Shared UI components (shadcn-based)
- `src/data/` - Content data (e.g., guide articles)

## Disclaimer

This calculator provides estimates for planning purposes only. Tax laws and statutory deductions change. Final payroll figures may differ significantly depending on employer policies, mid-year tax updates, non-taxable benefits, private pension schemes, and other specific deductions. NetPay KE is not affiliated with KRA, SHIF/SHA, NSSF, or any government agency.

## Deployment Notes

NetPay KE is built as a static Single Page Application (SPA). To deploy it to a static host (like Vercel, Netlify, or GitHub Pages), simply run `npm run build` and serve the `/dist` directory. Ensure your host is configured to fall back to `index.html` for client-side routing.

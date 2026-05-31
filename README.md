# NetPay KE

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![GitHub issues](https://img.shields.io/github/issues/teegraphics207/netpay-ke)](https://github.com/teegraphics207/netpay-ke/issues)
[![GitHub stars](https://img.shields.io/github/stars/teegraphics207/netpay-ke)](https://github.com/teegraphics207/netpay-ke/stargazers)
[![Live Demo](https://img.shields.io/badge/demo-live-success.svg)](https://netpay-ke.vercel.app)

NetPay KE is an open-source Kenyan salary and payroll calculator. It helps employees, HR teams, accountants, students, and small businesses estimate PAYE, SHIF/SHA, NSSF, Housing Levy, gross-to-net pay, and net pay deductions.

**[Live Demo: https://netpay-ke.vercel.app](https://netpay-ke.vercel.app)**

## Screenshots

![Screenshot 1](screenshots/Screenshot%202026-05-31%20154557.png)
![Screenshot 2](screenshots/Screenshot%202026-05-31%20154624.png)
![Screenshot 3](screenshots/Screenshot%202026-05-31%20154647.png)
![Screenshot 4](screenshots/Screenshot%202026-05-31%20154725.png)
![Screenshot 5](screenshots/Screenshot%202026-05-31%20154745.png)
![Screenshot 6](screenshots/Screenshot%202026-05-31%20154801.png)

## Why This Project Matters
Payroll calculation in Kenya can be complex due to frequent statutory changes like the introduction of the Housing Levy and the shift to SHIF/SHA. NetPay KE provides a transparent, easy-to-use tool to demystify these deductions, making it easier for everyone to understand their take-home pay.

## Key Features

- **Net Salary Calculator:** Calculates your net pay considering all 2026 tax bands, NSSF tiers, and relief.
- **SHIF Calculation:** Fully updated for the Social Health Insurance Fund (2.75%), including the minimum contribution logic.
- **NSSF Tiers I & II:** Computes employer and employee NSSF deductions based on the 2026 limits.
- **Affordable Housing Levy:** Calculates the mandatory 1.5% deduction for both employers and employees.
- **Reverse Calculator:** Enter your desired net pay to compute the gross salary you must ask for (grossing up).
- **Salary Raise Calculator:** Understand how a pay raise affects your take-home pay (marginal tax rate analysis).
- **Educational Guides:** Detailed guides breaking down how PAYE, SHIF, Housing Levy, and NSSF work.
- **Offline / Private:** Runs entirely server-less on the client side. No personal financial data is stored on remote servers.

## Tech Stack

- React 19
- Vite
- TypeScript
- Tailwind CSS v4
- shadcn/ui components (Lucide Icons, generic styling)
- Recharts (for deduction visualizations)
- React Router (for navigation)

## Installation & Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/teegraphics207/netpay-ke.git
   cd netpay-ke
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview the production build:**
   ```bash
   npm run preview
   ```

## Documentation & Community

- [Changelog](CHANGELOG.md)
- [Roadmap](ROADMAP.md)
- [Contributing](CONTRIBUTING.md)
- [License](LICENSE)
- [Security Policy](SECURITY.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)

## Disclaimer

This calculator provides estimates for educational and planning purposes only. Tax laws and statutory deductions change. Final payroll figures may differ significantly depending on employer policies, mid-year tax updates, non-taxable benefits, private pension schemes, and other specific deductions. NetPay KE is not affiliated with KRA, SHIF/SHA, NSSF, or any government agency. Users should verify official payroll rules.

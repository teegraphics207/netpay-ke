import { CONSTANTS } from "./constants";

export type NSSF_OPTION = "TIER_1_AND_2" | "TIER_1_ONLY" | "EXEMPT";

export interface CalculationInputs {
  basicSalary: number;
  houseAllowance: number;
  transportAllowance: number;
  otherAllowances: number;
  bonus: number;
  nonCashBenefits: number;
  pensionContribution: number;
  insurancePremium: number;
  otherDeductions: number;
  isResident: boolean;
  nssfOption: NSSF_OPTION;
}

export interface CalculationResults {
  grossPay: number;
  nssfEmployee: number;
  nssfEmployer: number;
  shif: number;
  housingLevyEmployee: number;
  housingLevyEmployer: number;
  allowablePension: number;
  nonAllowablePension: number;
  taxableIncome: number;
  payeBeforeRelief: number;
  personalRelief: number;
  insuranceRelief: number;
  finalPaye: number;
  netPay: number;
  employerCost: number;
  totalDeductions: number;
}

export function calculateNSSF(grossPay: number, option: NSSF_OPTION) {
  if (option === "EXEMPT" || grossPay <= 0) return { employee: 0, employer: 0 };

  const pensionablePay = grossPay; // Simplified for MVP

  let tier1 = 0;
  let tier2 = 0;

  if (pensionablePay > 0) {
    const tier1Limit = Math.min(pensionablePay, CONSTANTS.NSSF_2026.LOWER_EARNINGS_LIMIT);
    tier1 = tier1Limit * CONSTANTS.NSSF_2026.EMPLOYEE_RATE;

    if (option === "TIER_1_AND_2" && pensionablePay > CONSTANTS.NSSF_2026.LOWER_EARNINGS_LIMIT) {
      const tier2Limit = Math.min(pensionablePay, CONSTANTS.NSSF_2026.UPPER_EARNINGS_LIMIT) - CONSTANTS.NSSF_2026.LOWER_EARNINGS_LIMIT;
      tier2 = tier2Limit * CONSTANTS.NSSF_2026.EMPLOYEE_RATE;
    }
  }

  const employee = tier1 + tier2;
  const employer = employee; // Assuming matched

  return { employee, employer };
}

export function calculateSHIF(grossPay: number) {
  if (grossPay <= 0) return 0;
  if (grossPay < CONSTANTS.SHIF.THRESHOLD) return CONSTANTS.SHIF.MIN_CONTRIBUTION;
  return grossPay * CONSTANTS.SHIF.RATE;
}

export function calculateHousingLevy(grossPay: number) {
  if (grossPay <= 0) return { employee: 0, employer: 0 };
  const amount = grossPay * CONSTANTS.HOUSING_LEVY.EMPLOYEE_RATE;
  return { employee: amount, employer: amount };
}

export function calculatePAYE(taxableIncome: number, isResident: boolean, insurancePremium: number) {
  if (taxableIncome <= 0) return { payeBeforeRelief: 0, personalRelief: 0, insuranceRelief: 0, finalPaye: 0 };

  let remainingIncome = taxableIncome;
  let payeBeforeRelief = 0;
  let previousLimit = 0;

  for (const band of CONSTANTS.PAYE_BANDS_MONTHLY) {
    if (remainingIncome > 0) {
      const taxableInBand = Math.min(remainingIncome, band.upperLimit - previousLimit);
      payeBeforeRelief += taxableInBand * band.rate;
      remainingIncome -= taxableInBand;
      previousLimit = band.upperLimit;
    } else {
      break;
    }
  }

  const personalRelief = isResident ? CONSTANTS.PERSONAL_RELIEF_MONTHLY : 0;
  
  let insuranceRelief = 0;
  if (isResident && insurancePremium > 0) {
    insuranceRelief = Math.min(insurancePremium * CONSTANTS.INSURANCE_RELIEF_RATE, CONSTANTS.MAX_INSURANCE_RELIEF);
  }

  let finalPaye = payeBeforeRelief - personalRelief - insuranceRelief;
  finalPaye = Math.max(0, finalPaye);

  return { payeBeforeRelief, personalRelief, insuranceRelief, finalPaye };
}

export function performSalaryCalculation(inputs: CalculationInputs): CalculationResults {
  const grossPay = inputs.basicSalary + inputs.houseAllowance + inputs.transportAllowance + 
                   inputs.otherAllowances + inputs.bonus + inputs.nonCashBenefits;

  const nssf = calculateNSSF(grossPay, inputs.nssfOption);
  const shif = calculateSHIF(grossPay);
  const housingLevy = calculateHousingLevy(grossPay);

  // Prompt logic: Taxable Income = max(Gross Pay - employee NSSF - SHIF - employee Affordable Housing Levy - allowable pension contribution, 0)
  const allowablePension = Math.min(inputs.pensionContribution, 30000);
  const nonAllowablePension = inputs.pensionContribution - allowablePension;
  let taxableIncome = grossPay - nssf.employee - shif - housingLevy.employee - allowablePension;
  taxableIncome = Math.max(0, taxableIncome);

  const paye = calculatePAYE(taxableIncome, inputs.isResident, inputs.insurancePremium);

  const totalDeductions = nssf.employee + shif + housingLevy.employee + paye.finalPaye + inputs.otherDeductions + inputs.pensionContribution;
  const netPay = grossPay - totalDeductions;
  
  const employerCost = grossPay + nssf.employer + housingLevy.employer;

  return {
    grossPay,
    nssfEmployee: nssf.employee,
    nssfEmployer: nssf.employer,
    shif,
    housingLevyEmployee: housingLevy.employee,
    housingLevyEmployer: housingLevy.employer,
    allowablePension,
    nonAllowablePension,
    taxableIncome,
    payeBeforeRelief: paye.payeBeforeRelief,
    personalRelief: paye.personalRelief,
    insuranceRelief: paye.insuranceRelief,
    finalPaye: paye.finalPaye,
    netPay,
    employerCost,
    totalDeductions,
  };
}

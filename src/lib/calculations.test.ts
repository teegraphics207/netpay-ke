import { describe, it, expect } from "vitest";
import {
  calculateNSSF,
  calculateSHIF,
  calculateHousingLevy,
  calculatePAYE,
  performSalaryCalculation,
  CalculationInputs,
} from "./calculations";

const DEFAULT_INPUTS: CalculationInputs = {
  basicSalary: 80000,
  houseAllowance: 0,
  transportAllowance: 0,
  otherAllowances: 0,
  bonus: 0,
  nonCashBenefits: 0,
  pensionContribution: 0,
  insurancePremium: 0,
  otherDeductions: 0,
  isResident: true,
  nssfOption: "TIER_1_AND_2",
};

describe("Calculations logic", () => {
  it("calculates SHIF correctly at 2.75%", () => {
    // Under KSh 6000 gross
    expect(calculateSHIF(5000)).toBe(300);
    // Above KSh 6000 gross
    expect(calculateSHIF(100000)).toBe(2750);
  });

  it("calculates Housing Levy correctly at 1.5%", () => {
    expect(calculateHousingLevy(100000).employee).toBe(1500);
  });

  it("calculates TIER_1_AND_2 NSSF correctly", () => {
    // 80,000 < 108,000 (Upper Limit for 2026)
    // Total is 6% of 80,000 = 4,800
    const nssf = calculateNSSF(80000, "TIER_1_AND_2");
    expect(nssf.employee).toBe(4800);
    expect(nssf.employer).toBe(4800);
  });

  it("calculates PAYE for a standard case correctly", () => {
    const paye = calculatePAYE(50000, true, 0); // KSh 50,000 taxable income
    expect(paye.payeBeforeRelief).toBeCloseTo(9783.35, 1);
    expect(paye.personalRelief).toBe(2400);
    expect(paye.finalPaye).toBeCloseTo(7383.35, 1);
  });

  it("calculates Net Pay correctly", () => {
    const results = performSalaryCalculation({
      ...DEFAULT_INPUTS, // KSh 80,000 basic
    });
    // Gross: 80,000
    // NSSF: 4,800
    // SHIF: 2.75% of 80,000 = 2,200
    // Housing Levy: 1.5% of 80,000 = 1,200
    // Taxable: 80,000 - 4,800 - 2,200 - 1,200 = 71,800
    // PAYE before: 2400 + 2083.25 + 11840.10 = 16323.35
    // Final PAYE: 16323.35 - 2400 = 13923.35
    // Total deductions = 4800 + 13923.35 + 2200 + 1200 = 22123.35
    // Net Pay = 80,000 - 22123.35 = 57,876.65
    expect(results.grossPay).toBe(80000);
    expect(results.taxableIncome).toBe(71800);
    expect(results.nssfEmployee).toBe(4800);
    expect(results.finalPaye).toBeCloseTo(13923.35, 1);
    expect(results.netPay).toBeCloseTo(57876.65, 1);
  });

  it("caps allowable pension deduction at KSh 30,000 per month", () => {
    const inputs: CalculationInputs = {
        ...DEFAULT_INPUTS,
        basicSalary: 150000,
        pensionContribution: 50000,
    };
    const results = performSalaryCalculation(inputs);
    
    // NSSF is 6,480 (capped at 108,000 * 6%)
    // SHIF is 4,125
    // Housing Levy is 2,250
    // Allowable pension capped at 30,000
    // Taxable income = 150,000 - 6480 - 4125 - 2250 - 30000 = 107,145
    expect(results.taxableIncome).toBe(107145);
  });
});

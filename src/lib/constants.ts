export const CONSTANTS = {
  PERSONAL_RELIEF_MONTHLY: 2400,
  MAX_INSURANCE_RELIEF: 5000,
  INSURANCE_RELIEF_RATE: 0.15,

  PAYE_BANDS_MONTHLY: [
    { upperLimit: 24000, rate: 0.10 },
    { upperLimit: 32333, rate: 0.25 },
    { upperLimit: 500000, rate: 0.30 },
    { upperLimit: 800000, rate: 0.325 },
    { upperLimit: Infinity, rate: 0.35 },
  ],

  SHIF: {
    RATE: 0.0275,
    MIN_CONTRIBUTION: 300,
    THRESHOLD: 6000,
  },

  HOUSING_LEVY: {
    EMPLOYEE_RATE: 0.015,
    EMPLOYER_RATE: 0.015,
  },

  NSSF_2026: {
    LOWER_EARNINGS_LIMIT: 9000,
    UPPER_EARNINGS_LIMIT: 108000,
    EMPLOYEE_RATE: 0.06,
    EMPLOYER_RATE: 0.06,
  }
};

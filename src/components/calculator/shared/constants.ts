import type { MotivationDriver } from '@/types/calculator'

/** National average APR — confirm with stakeholders */
export const DEFAULT_APR = 22.76

export const DEBT_STATS = {
  americansInDebtLabel: '127 million',
  americansInDebtNumber: 127,
  avgHouseholdDebt: '$10,479',
  avgAPR: '22.76%',
  annualInterestCost: '$2,388',
  source: 'Federal Reserve, 2025',
} as const

/** Static landing comparison — placeholder assumptions (confirm with compliance) */
export const COMPARISON_STATIC = {
  debtAmount: 25000,
  aprPercent: 22,
  startYear: 2026,
  withoutRelief: {
    debtFreeYear: 2041,
    totalPaid: 48700,
    monthlyPayment: 350,
    paymentYears: 15,
    interestPaid: 23700,
  },
  withRelief: {
    debtFreeYear: 2029,
    totalPaid: 17500,
    monthlyPayment: 486,
    programYears: 3,
    interestSaved: 23700,
    totalSaved: 31200,
  },
} as const

export const SUCCESS_DATA = {
  percentage: 85,
  avgReduction: 14500,
  source: 'Program data, 2023–2025',
  /** Flip when real partner data is approved */
  show: false,
} as const

export const MOTIVATION_DEFAULTS: Record<
  MotivationDriver,
  { debtAmount: number; monthlyPayment: number }
> = {
  debt_free_fast: { debtAmount: 20000, monthlyPayment: 450 },
  pay_less_interest: { debtAmount: 20000, monthlyPayment: 400 },
  lower_monthly_payments: { debtAmount: 25000, monthlyPayment: 250 },
  debt_free_date: { debtAmount: 15000, monthlyPayment: 350 },
  all_of_the_above: { debtAmount: 20000, monthlyPayment: 350 },
}

/** Landing radio labels (same order as MotivationDriver keys above) */
export const MOTIVATION_OPTIONS: { id: MotivationDriver; label: string }[] = [
  { id: 'debt_free_fast', label: 'Getting out of debt faster' },
  { id: 'pay_less_interest', label: 'Reducing what I pay overall' },
  { id: 'lower_monthly_payments', label: 'Lowering my monthly burden' },
  { id: 'all_of_the_above', label: "I'm not sure yet" },
]

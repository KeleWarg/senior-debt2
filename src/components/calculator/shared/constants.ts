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
    totalPaid: 12500,
    monthlyPayment: 347,
    programYears: 3,
    interestSaved: 23700,
    totalSaved: 36200,
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
  stop_credit_damage: { debtAmount: 20000, monthlyPayment: 400 },
  resolve_faster: { debtAmount: 20000, monthlyPayment: 400 },
  keep_cash_flow: { debtAmount: 25000, monthlyPayment: 350 },
  separate_liability: { debtAmount: 20000, monthlyPayment: 350 },
}

export const FAQ_ITEMS = [
  {
    id: 'nursing_license',
    question: 'Will this affect my nursing license or background check?',
    answer: 'Debt relief doesn\u2019t appear on nursing license records or most healthcare employer background checks. Credit checks may show enrolled accounts during the program, but the relief process itself isn\u2019t a regulatory issue for healthcare licensing.',
  },
  {
    id: 'continuing_education',
    question: 'What if my debt is from continuing education or certifications?',
    answer: 'Personal unsecured debt qualifies regardless of what it was used for \u2014 including continuing education, certification fees, or licensing prep. The exception is federal student loans, which aren\u2019t covered by these programs.',
  },
  {
    id: 'overtime',
    question: 'Can I keep working overtime while in the program?',
    answer: 'Yes. The program works in the background \u2014 you continue your normal schedule. Many enrollees actually reduce their overtime once the monthly burden eases.',
  },
  {
    id: 'employer',
    question: 'Will my hospital or employer find out?',
    answer: 'No. The program is private \u2014 no court filings, no public records, no employer notifications. It does not appear on standard employment verifications.',
  },
  {
    id: 'bankruptcy',
    question: 'How is this different from bankruptcy?',
    answer: 'Debt settlement is a private negotiation \u2014 no court, no public record, typically completed in 24\u201348 months. Bankruptcy is a legal proceeding that appears on your public record for 7\u201310 years and can affect licensing in some healthcare specialties. Many healthcare workers use settlement specifically to avoid that risk.',
  },
] as const

export const CLOSING_PROOF = {
  title: '$5.6 billion in debt settled in 2022',
  description: 'Across 1.2 million accounts, settlements averaged 50¢ on the dollar — resolving debts for half the original balance.',
  source: 'American Association for Debt Resolution, 2023',
} as const

export const CLOSING_TRUST = {
  title: 'Your information is protected',
  description: "Your data is encrypted, confidential, and never shared without your explicit permission. Powered by Forbes Advisor's vetted partner network.",
} as const

/** Landing radio labels (same order as MotivationDriver keys above) */
export const MOTIVATION_OPTIONS: { id: MotivationDriver; label: string }[] = [
  { id: 'resolve_faster', label: 'Resolving it in years, not decades' },
  { id: 'pay_less_interest', label: 'Stopping interest from eating my paycheck' },
  { id: 'lower_monthly_payments', label: 'Lowering the monthly burden' },
  { id: 'debt_free_fast', label: 'Getting back the hours I\u2019ve been losing' },
]

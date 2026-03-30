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

export const FAQ_ITEMS = [
  {
    id: 'credit_score',
    question: 'Will this hurt my credit score?',
    answer: 'Debt relief may temporarily affect your credit score while accounts are being negotiated. However, most participants see their credit improve within 12–24 months of completing the program — and the alternative of minimum payments for 15+ years keeps your utilization high the entire time.',
  },
  {
    id: 'cost',
    question: 'How much does debt relief cost?',
    answer: 'This calculator is 100% free. If you choose to enroll in a relief program, fees are typically 15–25% of the enrolled debt — but you only pay on debt that gets successfully settled. There are no upfront costs.',
  },
  {
    id: 'safety',
    question: 'Is my information safe?',
    answer: "Your data is encrypted and never shared without your explicit permission. This tool is powered by Forbes Advisor's vetted partner network, and all data handling follows industry-standard security protocols.",
  },
  {
    id: 'bankruptcy',
    question: 'How is this different from bankruptcy?',
    answer: 'Debt relief is a private negotiation — no court filings, no public record, no asset liquidation. A specialist negotiates directly with your creditors to reduce what you owe. Bankruptcy stays on your credit report for 7–10 years; debt relief programs typically complete in 2–4.',
  },
  {
    id: 'qualify',
    question: 'Do I qualify?',
    answer: 'Most people with $7,500 or more in unsecured debt — credit cards, medical bills, personal loans — qualify. The free calculator will show you your estimated savings and timeline — no commitment required.',
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
  { id: 'debt_free_fast', label: 'Getting out of debt faster' },
  { id: 'pay_less_interest', label: 'Reducing what I pay overall' },
  { id: 'lower_monthly_payments', label: 'Lowering my monthly burden' },
  { id: 'all_of_the_above', label: "I'm not sure yet" },
]

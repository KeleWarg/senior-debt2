import type { MotivationDriver } from '@/types/calculator'

export const DEFAULT_APR = 22.76

export const DEBT_STATS = {
  americansInDebtLabel: '127 million',
  americansInDebtNumber: 127,
  avgHouseholdDebt: '$10,479',
  avgAPR: '22.76%',
  annualInterestCost: '$2,388',
  source: 'Federal Reserve, 2025',
} as const

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
  show: false,
} as const

export const MOTIVATION_DEFAULTS: Record<
  MotivationDriver,
  { debtAmount: number; monthlyPayment: number }
> = {
  stop_shrinking_income: { debtAmount: 25000, monthlyPayment: 350 },
  pay_off_faster: { debtAmount: 20000, monthlyPayment: 400 },
  protect_social_security: { debtAmount: 20000, monthlyPayment: 300 },
  one_manageable_payment: { debtAmount: 25000, monthlyPayment: 250 },
}

export const FAQ_ITEMS = [
  {
    id: 'monthly_payment',
    question: 'How much will I have to pay each month?',
    answer: 'Debt relief programs typically lower your total amount owed by 40–60% by negotiating with creditors who prefer a smaller payment over nothing. Your debt is consolidated into one manageable monthly payment — most people save hundreds per month compared to minimums.',
  },
  {
    id: 'credit_score',
    question: 'Will this destroy my credit score?',
    answer: 'Checking eligibility has zero impact. Enrolling does temporarily affect your score, but most people already have damaged credit from late payments. Scores typically begin recovering within 12–18 months of completing the program.',
  },
  {
    id: 'fees',
    question: 'Is there a fee to check?',
    answer: 'No upfront fees, ever. Programs only charge after a reduction has been reached. This is standard industry practice, required by FTC rules.',
  },
  {
    id: 'minimum_debt',
    question: 'What\'s the minimum debt to qualify?',
    answer: 'Most programs require at least $10,000 in unsecured debt. Credit cards, medical bills, and personal loans typically qualify. Mortgages, auto loans, and public student loans generally do not.',
  },
  {
    id: 'bankruptcy',
    question: 'How is this different from bankruptcy?',
    answer: 'Debt relief is a private negotiation — no court, no public record. Most people complete the process in 24–48 months. Bankruptcy appears on your record for 7–10 years and affects significantly more aspects of your financial life.',
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

export const MOTIVATION_OPTIONS: { id: MotivationDriver; label: string }[] = [
  { id: 'stop_shrinking_income', label: 'Stopping debt from shrinking my monthly income' },
  { id: 'pay_off_faster', label: 'Paying it off in years, not decades' },
  { id: 'protect_social_security', label: 'Keeping my Social Security protected' },
  { id: 'one_manageable_payment', label: 'Getting one manageable payment I can budget around' },
]

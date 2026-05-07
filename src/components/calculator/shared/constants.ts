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
}

export const FAQ_ITEMS = [
  {
    id: 'monthly_payment',
    question: 'How much will I have to pay each month?',
    answer: 'Debt relief companies typically lower your total amount owed by 40-60%. They do this by negotiating lower rates with creditors who prefer a smaller payment instead of nothing. While everyone\u2019s situation is different and results vary, all your debt is consolidated into 1 manageable payment each month:',
    bullets: [
      'Clients with $10,000 to $20,000 in debt save an average of $317 per month (that\u2019s around $3,800 a year!)',
      'Clients with $20,000 to $40,000 in debt save an average of $585 per month (that\u2019s around $7,000 a year!)',
    ],
  },
  {
    id: 'credit_score',
    question: 'Will this destroy my credit score?',
    answer: 'Checking eligibility has zero impact. Enrolling in debt settlement does affect your credit score, this is worth being honest about. Accounts become delinquent during the process, which impacts your score. However, most people enrolling already have damaged credit from late payments, and most find their score begins recovering within 12\u201318 months of completing the program. The question to weigh: does a temporary credit impact matter more than eliminating five or six figures of compounding debt?',
  },
  {
    id: 'fee',
    question: 'Is there a fee to check?',
    answer: 'No upfront fees, ever. Programs only charge a fee after a settlement has been reached. This is standard industry practice, required by FTC rules.',
  },
  {
    id: 'qualify',
    question: 'What\u2019s the minimum debt to qualify?',
    answer: 'Most programs require at least $10,000 in unsecured debt. Credit cards, medical bills, and personal loans typically qualify; mortgages, auto loans and public student loans generally do not.',
  },
  {
    id: 'bankruptcy',
    question: 'How is this different from bankruptcy?',
    answer: 'Debt settlement is a private negotiation\u2014 no court, no public record. Most people complete the process in 24\u201348 months. Bankruptcy (Chapter 7 or 13) is a legal proceeding that appears on your public record for 7\u201310 years and affects significantly more aspects of your financial life. Many people who qualify for settlement use it precisely to avoid bankruptcy.',
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
  { id: 'pay_less_interest', label: 'Reduce my total debt amount' },
  { id: 'lower_monthly_payments', label: 'Lowering my monthly payments' },
  { id: 'all_of_the_above', label: "I'm not sure yet" },
]

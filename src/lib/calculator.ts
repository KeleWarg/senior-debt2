/**
 * Debt-Free Calculator Math
 *
 * Standard amortization to calculate payoff timeline.
 * Relief estimate uses industry-average assumptions:
 *   - 50% balance reduction through settlement
 *   - 22% fee on settled amount
 *   - 36-month program duration (v3 spec — confirm with partner)
 */

export interface DebtFreeResult {
  months: number
  totalPaid: number
  totalInterest: number
  year: number
  monthName: string
  reachable: boolean
}

export interface ReliefResult {
  months: number
  totalCost: number
  monthlyPayment: number
  year: number
  monthName: string
  saved: number
}

const MAX_MONTHS = 600 // 50 year cap

export function calculateDebtFreeDate(
  principal: number,
  apr: number,
  monthlyPayment: number
): DebtFreeResult {
  const monthlyRate = apr / 100 / 12

  if (monthlyPayment <= principal * monthlyRate) {
    return {
      months: Infinity,
      totalPaid: Infinity,
      totalInterest: Infinity,
      year: 2080,
      monthName: '',
      reachable: false,
    }
  }

  let balance = principal
  let months = 0
  let totalPaid = 0
  let totalInterest = 0

  while (balance > 0.01 && months < MAX_MONTHS) {
    const interest = balance * monthlyRate
    const principalPaid = Math.min(monthlyPayment - interest, balance)
    const payment = Math.min(monthlyPayment, balance + interest)
    balance -= principalPaid
    totalInterest += interest
    totalPaid += payment
    months++
  }

  const now = new Date()
  const freeDate = new Date(now.getFullYear(), now.getMonth() + months)

  return {
    months,
    totalPaid: Math.round(totalPaid),
    totalInterest: Math.round(totalInterest),
    year: freeDate.getFullYear(),
    monthName: freeDate.toLocaleString('default', { month: 'long' }),
    reachable: true,
  }
}

const SETTLEMENT_RATE = 0.5
const PROGRAM_FEE_RATE = 0.22
const PROGRAM_MONTHS = 36

export function calculateReliefTimeline(principal: number): ReliefResult {
  const settledAmount = principal * SETTLEMENT_RATE
  const programFee = settledAmount * PROGRAM_FEE_RATE
  const totalCost = Math.round(settledAmount + programFee)
  const monthlyPayment = totalCost / PROGRAM_MONTHS
  const months = PROGRAM_MONTHS

  const now = new Date()
  const freeDate = new Date(now.getFullYear(), now.getMonth() + months)

  return {
    months,
    totalCost,
    monthlyPayment: Math.round(monthlyPayment),
    year: freeDate.getFullYear(),
    monthName: freeDate.toLocaleString('default', { month: 'long' }),
    saved: Math.round(principal - totalCost),
  }
}

export function estimateSavingsRange(debtRangeId: string): string {
  const ranges: Record<string, string> = {
    '7500-10000': '$2,500 – $5,000',
    '10000-20000': '$4,000 – $10,000',
    '20000-40000': '$8,000 – $20,000',
    '40000-70000': '$16,000 – $35,000',
    '70000+': '$28,000+',
  }
  return ranges[debtRangeId] || '$4,000 – $10,000'
}

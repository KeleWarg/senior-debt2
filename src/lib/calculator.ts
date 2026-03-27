/**
 * Debt-Free Calculator Math
 *
 * Standard amortization to calculate payoff timeline.
 * Relief estimate uses industry-average assumptions:
 *   - 50% balance reduction through settlement
 *   - 22% fee on settled amount
 *   - 24-48 month program duration (scales with debt)
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

export function calculateReliefTimeline(principal: number): ReliefResult {
  const settledAmount = Math.round(principal * 0.50)
  const fee = Math.round(settledAmount * 0.22)
  const totalCost = settledAmount + fee
  const months = Math.min(Math.round(24 + (principal / 10000) * 8), 48)

  const now = new Date()
  const freeDate = new Date(now.getFullYear(), now.getMonth() + months)

  return {
    months,
    totalCost,
    year: freeDate.getFullYear(),
    monthName: freeDate.toLocaleString('default', { month: 'long' }),
    saved: principal - totalCost,
  }
}

/**
 * Estimate savings range for advertorial funnel (range-based debt input)
 */
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

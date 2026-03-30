import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes with clsx
 * Handles conditional classes and removes duplicates
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format currency values
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

/** e.g. "15 years" or "2 years 3 months" */
export function formatMonthsAsYears(months: number): string {
  if (!Number.isFinite(months) || months <= 0) return '—'
  const y = Math.floor(months / 12)
  const m = months % 12
  if (y === 0) return `${m} ${m === 1 ? 'month' : 'months'}`
  if (m === 0) return `${y} ${y === 1 ? 'year' : 'years'}`
  return `${y} yr ${m} mo`
}

/** "$350/mo for 15 years" */
export function formatMonthlyForDuration(monthly: number, months: number): string {
  if (!Number.isFinite(months) || months <= 0) return `${formatCurrency(monthly)}/mo`
  const y = Math.floor(months / 12)
  const m = months % 12
  const dur =
    y > 0 && m === 0
      ? `${y} ${y === 1 ? 'year' : 'years'}`
      : y > 0
        ? `${y} years${m > 0 ? ` ${m} mo` : ''}`
        : `${m} months`
  return `${formatCurrency(monthly)}/mo for ${dur}`
}

/**
 * Format phone number as (###) ###-####
 */
export function formatPhoneNumber(value: string): string {
  const cleaned = value.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/)
  
  if (!match) return value
  
  const [, area, prefix, line] = match
  
  if (line) return `(${area}) ${prefix}-${line}`
  if (prefix) return `(${area}) ${prefix}`
  if (area) return `(${area}`
  return ''
}

/**
 * Calculate debt savings estimate
 */
export function calculateSavings(debtAmount: number): {
  newDebtAmount: number
  savings: number
  monthlyPayment: number
} {
  // Estimate 40% debt reduction
  const reductionRate = 0.4
  const newDebtAmount = Math.round(debtAmount * (1 - reductionRate))
  const savings = debtAmount - newDebtAmount
  // Estimate 48-month payment plan
  const monthlyPayment = Math.round(newDebtAmount / 48)
  
  return { newDebtAmount, savings, monthlyPayment }
}

/**
 * Types for Calculator Funnel (Path B) and Advertorial Funnel (Path A)
 */

// ── Calculator Funnel State ──

export type CalcStep =
  | 'intro'
  | 'role'
  | 'totalDebt'
  | 'shiftSituation'
  | 'loader'
  | 'reveal'

export type HealthcareRole =
  | 'rn'
  | 'lpn_lvn'
  | 'cna_aide_tech'
  | 'therapist_allied'
  | 'physician_np_pa'
  | 'other'

export type TotalDebtRange =
  | '15k-20k'
  | '20k-35k'
  | '35k-50k'
  | '50k-75k'
  | '75k-100k'
  | '100k+'

export type ShiftSituation =
  | 'full_time_no_extra'
  | 'occasional_overtime'
  | 'regular_overtime'
  | 'multiple_jobs'

/** v3 landing motivation — maps to calculator defaults */
export type MotivationDriver =
  | 'debt_free_fast'
  | 'pay_less_interest'
  | 'lower_monthly_payments'
  | 'debt_free_date'
  | 'all_of_the_above'
  | 'stop_credit_damage'
  | 'resolve_faster'
  | 'keep_cash_flow'
  | 'separate_liability'

export interface CalcFunnelData {
  debtAmount: number
  /** Fraction of total debt that is business-related (0–1) */
  businessDebtShare?: number
  interestRate: number
  monthlyPayment: number
  monthlyRevenue?: number
  motivationDriver?: MotivationDriver | null
  role?: HealthcareRole
  totalDebt?: TotalDebtRange
  totalDebtMid?: number
  shiftSituation?: ShiftSituation
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
}

// ── Advertorial Funnel State ──

export type AdvertorialStep =
  | 'article'
  | `bridge-${number}`
  | 'debtType'
  | 'paymentStatus'
  | 'state'
  | 'loading'
  | 'results'
  | 'pii'

export interface AdvertorialFunnelData {
  segment: string
  role?: string
  debtAmount?: string
  hardshipStatus?: string
  debtType?: string
  paymentStatus?: string
  state?: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
}

// ── Shared Lead Model ──

export interface Lead {
  id?: string
  funnel: 'calculator' | 'advertorial'
  segment?: string

  debtAmount: number | string
  debtType: string
  hardshipStatus: string
  paymentStatus?: string
  state?: string

  interestRate?: number
  monthlyPayment?: number
  currentDebtFreeYear?: number
  reliefDebtFreeYear?: number

  role?: string

  firstName: string
  lastName: string
  email: string
  phone: string

  createdAt?: Date
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmContent?: string
  fbclid?: string
  deviceType?: string
  entryUrl?: string
}

// ── Advertorial Content Schema ──

export interface SegmentContent {
  meta: {
    slug: string
    brandName: string
    brandColor: string
    sponsoredLabel: string
  }
  article: {
    headline: string
    byline: {
      name: string
      initials: string
      date: string
      readTime: string
    }
    heroImageAlt: string
    body: ContentBlock[]
    testimonial: {
      quote: string
      attribution: string
    }
    closingParagraph: string
    closingSubtext: string
    ctaLabel: string
  }
  bridge: {
    headerText: string
    screens: BridgeScreen[]
  }
  confirmations: {
    afterDebtType: string
    afterPaymentStatus: string
    afterState: string
  }
}

export interface ContentBlock {
  type: 'paragraph' | 'heading' | 'pullquote' | 'data-callout' | 'emphasis'
  text?: string
  heading?: string
  quote?: string
  stats?: { value: string; label: string; color?: 'green' | 'red' }[]
  emphasis?: string
}

export interface BridgeScreen {
  question: string
  subtext: string
  fieldKey: string
  options: {
    id: string
    label: string
    sub?: string
  }[]
  confirmation: string
}

/**
 * Types for Calculator Funnel (Path B) and Advertorial Funnel (Path A)
 */

// ── Calculator Funnel State ──

export type CalcStep =
  | 'intro'
  | 'debtAmount'
  | 'monthlyPayment'
  | 'loader'
  | 'reveal'
  | 'pii'

export interface CalcFunnelData {
  debtAmount: number
  interestRate: number
  monthlyPayment: number
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

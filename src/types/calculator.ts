/**
 * Types for Senior Debt Relief Calculator Funnel
 */

export type CalcStep =
  | 'intro'
  | 'incomeSource'
  | 'totalDebt'
  | 'paymentSituation'
  | 'nameCapture'
  | 'emailCapture'
  | 'loader'
  | 'reveal'
  | 'leadCapture'

export type IncomeSource =
  | 'social_security'
  | 'ssdi_ssi'
  | 'pension_retirement'
  | 'va_benefits'

export type TotalDebtRange =
  | 'under_10k'
  | '10k-25k'
  | '25k-50k'
  | '50k+'

export type PaymentSituation =
  | 'keeping_up'
  | 'struggling'
  | 'behind'
  | 'stopped'

export type MotivationDriver =
  | 'stop_shrinking_income'
  | 'pay_off_faster'
  | 'protect_social_security'
  | 'one_manageable_payment'

export interface CalcFunnelData {
  debtAmount: number
  interestRate: number
  monthlyPayment: number
  motivationDriver?: MotivationDriver | null
  incomeSource?: IncomeSource
  incomeSources?: IncomeSource[]
  totalDebt?: TotalDebtRange
  totalDebtMid?: number
  paymentSituation?: PaymentSituation
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
}

export interface Lead {
  id?: string
  funnel: 'calculator'
  debtAmount: number | string
  paymentSituation?: string
  incomeSource?: string
  interestRate?: number
  monthlyPayment?: number
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

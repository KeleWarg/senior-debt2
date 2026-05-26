'use client'

import * as React from 'react'
import { Button } from '@/components/ui'
import { formatCurrency } from '@/lib/utils'

const NAVY = '#1B2A4A'
const TEAL = '#007AC8'
const CAPTION_GREY = '#999999'

interface LeadCaptureStepProps {
  debtAmount: number
  onSubmit: (data: { firstName: string; lastName: string; email: string; phone: string }) => void
}

export function LeadCaptureStep({ debtAmount, onSubmit }: LeadCaptureStepProps) {
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')

  const potentialSavings = formatCurrency(Math.round(debtAmount * 0.39 / 250) * 250)
  const timeSaved = '3–4 years'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (firstName && lastName && email && phone) {
      onSubmit({ firstName, lastName, email, phone })
    }
  }

  return (
    <div className="w-full max-w-[555px] mx-auto px-4 sm:px-6 pt-2 sm:pt-4 pb-4 sm:pb-8">
      <div className="flex flex-col items-center w-full">

        <p
          className="animate-fade-in-up text-xs font-medium uppercase tracking-wider text-neutral-400 mb-3 text-center"
          style={{ animationDelay: '200ms' }}
        >
          Almost Done
        </p>

        <h1
          className="animate-fade-in-up font-display text-center mb-3"
          style={{ animationDelay: '300ms', fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 600, color: NAVY }}
        >
          We made you a debt-free timeline with program recommendations.
        </h1>

        <p
          className="animate-fade-in-up text-center leading-relaxed mb-6"
          style={{ animationDelay: '400ms', fontSize: '15px', color: '#666666' }}
        >
          Where should we send your free report?
        </p>

        {/* Summary stats */}
        <div
          className="animate-fade-in-up w-full rounded-xl border border-neutral-200 bg-white p-5 mb-6 grid grid-cols-3 gap-4"
          style={{ animationDelay: '450ms' }}
        >
          <div className="text-center">
            <p style={{ fontSize: '12px', color: CAPTION_GREY, marginBottom: '4px' }}>Total Debt</p>
            <p style={{ fontSize: '18px', fontWeight: 700, color: NAVY }}>{formatCurrency(debtAmount)}</p>
          </div>
          <div className="text-center">
            <p style={{ fontSize: '12px', color: CAPTION_GREY, marginBottom: '4px' }}>Potential Savings</p>
            <p style={{ fontSize: '18px', fontWeight: 700, color: TEAL }}>{potentialSavings}</p>
          </div>
          <div className="text-center">
            <p style={{ fontSize: '12px', color: CAPTION_GREY, marginBottom: '4px' }}>Time Saved</p>
            <p style={{ fontSize: '18px', fontWeight: 700, color: TEAL }}>{timeSaved}</p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="animate-fade-in-up w-full flex flex-col gap-4"
          style={{ animationDelay: '500ms' }}
        >
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-xl border-2 border-neutral-200 px-4 py-3.5 text-sm focus:border-primary-700 focus:outline-none transition-colors"
              style={{ color: NAVY }}
              required
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full rounded-xl border-2 border-neutral-200 px-4 py-3.5 text-sm focus:border-primary-700 focus:outline-none transition-colors"
              style={{ color: NAVY }}
              required
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border-2 border-neutral-200 px-4 py-3.5 text-sm focus:border-primary-700 focus:outline-none transition-colors"
            style={{ color: NAVY }}
            required
          />
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border-2 border-neutral-200 px-4 py-3.5 text-sm focus:border-primary-700 focus:outline-none transition-colors"
            style={{ color: NAVY }}
            required
          />

          <Button fullWidth showTrailingIcon type="submit">
            Get My Free Report
          </Button>

          <p className="text-center" style={{ fontSize: '13px', color: CAPTION_GREY }}>
            $100 value, zero obligation
          </p>
        </form>
      </div>
    </div>
  )
}

export default LeadCaptureStep

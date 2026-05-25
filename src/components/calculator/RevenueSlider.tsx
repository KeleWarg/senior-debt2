'use client'

import * as React from 'react'
import { RadioGroup, RadioCard } from '@/components/ui'

interface RevenueSliderProps {
  onSubmit: (value: number) => void
}

const REVENUE_RANGES = [
  { id: 'under-2k', label: 'Under $2,000/mo', mid: 1000 },
  { id: '2k-5k', label: '$2,000 – $5,000/mo', mid: 3500 },
  { id: '5k-10k', label: '$5,000 – $10,000/mo', mid: 7500 },
  { id: '10k-25k', label: '$10,000 – $25,000/mo', mid: 17500 },
  { id: '25k-50k', label: '$25,000 – $50,000/mo', mid: 37500 },
  { id: '50k+', label: '$50,000+/mo', mid: 75000 },
]

export function RevenueSlider({ onSubmit }: RevenueSliderProps) {
  const handleSelect = (id: string) => {
    const range = REVENUE_RANGES.find((r) => r.id === id)
    if (!range) return
    setTimeout(() => onSubmit(range.mid), 300)
  }

  return (
    <div className="w-full max-w-[555px] mx-auto px-4 sm:px-6 pt-2 sm:pt-4 pb-4 sm:pb-8">
      <div className="flex flex-col items-start w-full">
        <p
          className="animate-fade-in-up text-xs font-medium uppercase tracking-wider text-neutral-400 mb-3"
          style={{ animationDelay: '400ms' }}
        >
          Step 3 of 3
        </p>

        <h1
          className="animate-fade-in-up font-display text-headline-lg sm:text-display lg:text-display-md mb-3"
          style={{ animationDelay: '400ms', color: '#1B2A4A' }}
        >
          What&apos;s your business{' '}
          <span style={{ color: '#007AC8' }}>bringing in right now?</span>
        </h1>

        <p
          className="animate-fade-in-up leading-relaxed mb-6"
          style={{ animationDelay: '500ms', fontSize: '15px', color: '#666666' }}
        >
          Approximate monthly revenue. If your business is closed or paused,
          use your current personal income from all sources.
        </p>

        <div
          className="animate-fade-in-up w-full h-px mb-6"
          style={{ animationDelay: '550ms', backgroundColor: 'rgba(26, 26, 46, 0.08)' }}
        />

        <div className="animate-fade-in-up w-full mb-6" style={{ animationDelay: '600ms' }}>
          <RadioGroup
            onValueChange={handleSelect}
            className="grid grid-cols-2 gap-3"
          >
            {REVENUE_RANGES.map((range) => (
              <RadioCard key={range.id} value={range.id}>
                {range.label}
              </RadioCard>
            ))}
          </RadioGroup>
        </div>

        <div
          className="animate-fade-in-up w-full text-left"
          style={{
            animationDelay: '700ms',
            backgroundColor: '#EEF2F7',
            borderRadius: '12px',
            padding: '20px',
          }}
        >
          <p className="font-semibold mb-1" style={{ fontSize: '14px', color: '#1B2A4A' }}>
            Did You Know?
          </p>
          <p style={{ fontSize: '14px', color: '#1B2A4A', lineHeight: '1.6' }}>
            Cash flow is the #1 challenge for small business owners and nearly half rely on the
            owner&apos;s personal funds to bridge the gap when revenue dips. Lower revenue often
            qualifies you for stronger relief options, not weaker ones.
          </p>
          <p className="mt-2" style={{ fontSize: '11px', color: '#8899AA', lineHeight: '1.4' }}>
            Source: Federal Reserve Small Business Credit Survey
          </p>
        </div>
      </div>
    </div>
  )
}

export default RevenueSlider

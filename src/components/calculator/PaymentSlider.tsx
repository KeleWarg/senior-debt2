'use client'

import * as React from 'react'
import { RadioGroup, RadioCard } from '@/components/ui'

interface PaymentSliderProps {
  onSubmit: (value: number) => void
}

const PAYMENT_RANGES = [
  { id: '100-300', label: '$100 – $300/mo', mid: 200, min: 100, max: 300 },
  { id: '300-500', label: '$300 – $500/mo', mid: 400, min: 300, max: 500 },
  { id: '500-800', label: '$500 – $800/mo', mid: 650, min: 500, max: 800 },
  { id: '800-1200', label: '$800 – $1,200/mo', mid: 1000, min: 800, max: 1200 },
  { id: '1200-1600', label: '$1,200 – $1,600/mo', mid: 1400, min: 1200, max: 1600 },
  { id: '1600-2000', label: '$1,600 – $2,000/mo', mid: 1800, min: 1600, max: 2000 },
]

export function PaymentSlider({
  onSubmit,
}: PaymentSliderProps) {
  const handleSelect = (id: string) => {
    const range = PAYMENT_RANGES.find((r) => r.id === id)
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
          Step 2 of 2
        </p>

        <h1
          className="animate-fade-in-up font-display text-headline-lg sm:text-display lg:text-display-md mb-3"
          style={{ animationDelay: '400ms', color: '#1B2A4A' }}
        >
          How much are you paying each month in{' '}
          <span style={{ color: '#007AC8' }}>minimum payments?</span>
        </h1>

        <p
          className="animate-fade-in-up leading-relaxed mb-6"
          style={{ animationDelay: '500ms', fontSize: '15px', color: '#666666' }}
        >
          The average person paying minimums stays in debt for 21+ years.
          A relief program can cut that to 12–48 months.
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
            {PAYMENT_RANGES.map((range) => (
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
          <p style={{ fontSize: '14px', color: '#1B2A4A', lineHeight: '1.6' }}>
            Your information is secure and private. It will never be shared without your permission.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PaymentSlider

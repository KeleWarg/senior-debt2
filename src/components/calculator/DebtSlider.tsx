'use client'

import * as React from 'react'
import Image from 'next/image'
import { RadioGroup, RadioCard } from '@/components/ui'

interface DebtSliderProps {
  onSubmit: (value: number) => void
}

const DEBT_RANGES = [
  { id: '15k-20k', label: '$15k – $20k', mid: 17500, min: 15000, max: 20000 },
  { id: '20k-30k', label: '$20k – $30k', mid: 25000, min: 20000, max: 30000 },
  { id: '30k-40k', label: '$30k – $40k', mid: 35000, min: 30000, max: 40000 },
  { id: '40k-50k', label: '$40k – $50k', mid: 45000, min: 40000, max: 50000 },
  { id: '50k-75k', label: '$50k – $75k', mid: 62500, min: 50000, max: 75000 },
  { id: '75k+', label: '$75k+', mid: 87500, min: 75000, max: 150000 },
]

export function DebtSlider({ onSubmit }: DebtSliderProps) {
  const handleSelect = (id: string) => {
    const range = DEBT_RANGES.find((r) => r.id === id)
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
          Step 1 of 2
        </p>

        <h1
          className="animate-fade-in-up font-display text-headline-lg sm:text-display lg:text-display-md mb-3"
          style={{ animationDelay: '400ms', color: '#1B2A4A' }}
        >
          How much debt do{' '}
          <span style={{ color: '#007AC8' }}>you owe?</span>
        </h1>

        <p
          className="animate-fade-in-up leading-relaxed mb-6"
          style={{ animationDelay: '500ms', fontSize: '15px', color: '#666666' }}
        >
          An estimate is fine. Include all credit card and personal loan balances.
          Don&apos;t include auto loans, mortgages, or medical bills.
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
            {DEBT_RANGES.map((range) => (
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
            The average American&apos;s credit card debt rose by{' '}
            <span className="font-bold" style={{ color: '#0C7663' }}>15%</span> in the past year, reaching over{' '}
            <span className="font-bold" style={{ color: '#0C7663' }}>$7,900</span> — the highest jump in over two decades.
          </p>
        </div>
      </div>
    </div>
  )
}

export default DebtSlider

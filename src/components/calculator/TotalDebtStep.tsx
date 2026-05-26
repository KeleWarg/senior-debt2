'use client'

import * as React from 'react'
import { RadioGroup, RadioCard } from '@/components/ui'
import type { TotalDebtRange } from '@/types/calculator'

interface TotalDebtStepProps {
  onSubmit: (range: TotalDebtRange, mid: number) => void
}

const DEBT_RANGES: { id: TotalDebtRange; label: string; mid: number }[] = [
  { id: '15k-20k', label: '$15k – $20k', mid: 17500 },
  { id: '20k-35k', label: '$20k – $35k', mid: 27500 },
  { id: '35k-50k', label: '$35k – $50k', mid: 42500 },
  { id: '50k-75k', label: '$50k – $75k', mid: 62500 },
  { id: '75k-100k', label: '$75k – $100k', mid: 87500 },
  { id: '100k+', label: '$100k+', mid: 125000 },
]

export function TotalDebtStep({ onSubmit }: TotalDebtStepProps) {
  const handleSelect = (id: string) => {
    const range = DEBT_RANGES.find((r) => r.id === id)
    if (!range) return
    setTimeout(() => onSubmit(range.id as TotalDebtRange, range.mid), 300)
  }

  return (
    <div className="w-full max-w-[555px] mx-auto px-4 sm:px-6 pt-2 sm:pt-4 pb-4 sm:pb-8">
      <div className="flex flex-col items-start w-full">
        <p
          className="animate-fade-in-up text-xs font-medium uppercase tracking-wider text-neutral-400 mb-3"
          style={{ animationDelay: '400ms' }}
        >
          Step 2 of 3
        </p>

        <h1
          className="animate-fade-in-up font-display text-headline-lg sm:text-display lg:text-display-md mb-3"
          style={{ animationDelay: '400ms', color: '#1B2A4A' }}
        >
          How much do you owe across all your{' '}
          <span style={{ color: '#007AC8' }}>cards and loans?</span>
        </h1>

        <p
          className="animate-fade-in-up leading-relaxed mb-6"
          style={{ animationDelay: '500ms', fontSize: '15px', color: '#666666' }}
        >
          Credit cards, personal loans, lines of credit, medical bills you&apos;ve put on
          plastic. Don&apos;t include auto loans, mortgages, or federal student loans.
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
            Most healthcare workers we work with carry between{' '}
            <span className="font-bold" style={{ color: '#0C7663' }}>$25k and $60k</span> in
            personal unsecured debt — often the result of years of underpayment relative to
            workload. Eligibility starts at $15k.
          </p>
        </div>
      </div>
    </div>
  )
}

export default TotalDebtStep

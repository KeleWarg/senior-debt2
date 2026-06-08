'use client'

import * as React from 'react'
import { RadioGroup, RadioCard } from '@/components/ui'
import type { TotalDebtRange } from '@/types/calculator'

interface TotalDebtStepProps {
  onSubmit: (range: TotalDebtRange, mid: number) => void
}

const DEBT_RANGES: { id: TotalDebtRange; label: string; mid: number }[] = [
  { id: 'under_10k', label: 'Less than $10,000', mid: 7500 },
  { id: '10k-25k', label: '$10,000 – $24,999', mid: 17500 },
  { id: '25k-50k', label: '$25,000 – $49,999', mid: 37500 },
  { id: '50k+', label: '$50,000 or more', mid: 62500 },
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
          Question 2 of 5
        </p>

        <h1
          className="animate-fade-in-up font-display text-headline-lg sm:text-display lg:text-display-md mb-3"
          style={{ animationDelay: '400ms', color: '#1B2A4A' }}
        >
          What is your total unsecured debt —{' '}
          <span style={{ color: '#007AC8' }}>credit cards and personal loans?</span>
        </h1>

        <p
          className="animate-fade-in-up leading-relaxed mb-6"
          style={{ animationDelay: '500ms', fontSize: '15px', color: '#666666' }}
        >
          Don&apos;t include your mortgage or student loans. An estimate is fine.
        </p>

        <div
          className="animate-fade-in-up w-full h-px mb-6"
          style={{ animationDelay: '550ms', backgroundColor: 'rgba(26, 26, 46, 0.08)' }}
        />

        <div className="animate-fade-in-up w-full mb-6" style={{ animationDelay: '600ms' }}>
          <RadioGroup
            onValueChange={handleSelect}
            className="flex flex-col gap-3"
          >
            {DEBT_RANGES.map((range) => (
              <RadioCard key={range.id} value={range.id}>
                {range.label}
              </RadioCard>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  )
}

export default TotalDebtStep

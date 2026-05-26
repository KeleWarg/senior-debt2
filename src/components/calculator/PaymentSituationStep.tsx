'use client'

import * as React from 'react'
import { RadioGroup, RadioCard } from '@/components/ui'
import type { PaymentSituation } from '@/types/calculator'

interface PaymentSituationStepProps {
  onSubmit: (situation: PaymentSituation) => void
}

const SITUATION_OPTIONS: { id: PaymentSituation; label: string; icon: string }[] = [
  { id: 'keeping_up', label: 'Keeping up, but it\'s a real stretch each month', icon: '✓' },
  { id: 'struggling', label: 'Struggling — I\'ve had to skip payments or dip into savings', icon: '!' },
  { id: 'behind', label: 'Behind — missed several payments, collectors are calling', icon: '!' },
  { id: 'stopped', label: 'I\'ve stopped paying — the debt feels overwhelming', icon: '✕' },
]

export function PaymentSituationStep({ onSubmit }: PaymentSituationStepProps) {
  const handleSelect = (id: string) => {
    const option = SITUATION_OPTIONS.find((o) => o.id === id)
    if (!option) return
    setTimeout(() => onSubmit(option.id), 300)
  }

  return (
    <div className="w-full max-w-[555px] mx-auto px-4 sm:px-6 pt-2 sm:pt-4 pb-4 sm:pb-8">
      <div className="flex flex-col items-start w-full">
        <p
          className="animate-fade-in-up text-xs font-medium uppercase tracking-wider text-neutral-400 mb-3"
          style={{ animationDelay: '400ms' }}
        >
          Question 3 of 3
        </p>

        <h1
          className="animate-fade-in-up font-display text-headline-lg sm:text-display lg:text-display-md mb-3"
          style={{ animationDelay: '400ms', color: '#1B2A4A' }}
        >
          How would you describe your{' '}
          <span style={{ color: '#007AC8' }}>current debt payments?</span>
        </h1>

        <p
          className="animate-fade-in-up leading-relaxed mb-6"
          style={{ animationDelay: '500ms', fontSize: '15px', color: '#666666' }}
        >
          Be honest — this helps us find the right program for your situation.
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
            {SITUATION_OPTIONS.map((option) => (
              <RadioCard key={option.id} value={option.id}>
                {option.label}
              </RadioCard>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  )
}

export default PaymentSituationStep

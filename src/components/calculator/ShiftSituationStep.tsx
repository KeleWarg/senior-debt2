'use client'

import * as React from 'react'
import { RadioGroup, RadioCard } from '@/components/ui'
import type { ShiftSituation } from '@/types/calculator'

interface ShiftSituationStepProps {
  onSubmit: (situation: ShiftSituation) => void
}

const SHIFT_OPTIONS: { id: ShiftSituation; label: string }[] = [
  { id: 'full_time_no_extra', label: 'Full-time, no extra shifts' },
  { id: 'occasional_overtime', label: 'Occasional overtime when offered' },
  { id: 'regular_overtime', label: 'Regular overtime to make ends meet' },
  { id: 'multiple_jobs', label: 'Multiple jobs to stay afloat' },
]

export function ShiftSituationStep({ onSubmit }: ShiftSituationStepProps) {
  const handleSelect = (id: string) => {
    const option = SHIFT_OPTIONS.find((o) => o.id === id)
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
          Step 3 of 3
        </p>

        <h1
          className="animate-fade-in-up font-display text-headline-lg sm:text-display lg:text-display-md mb-3"
          style={{ animationDelay: '400ms', color: '#1B2A4A' }}
        >
          What does your schedule{' '}
          <span style={{ color: '#007AC8' }}>look like right now?</span>
        </h1>

        <p
          className="animate-fade-in-up leading-relaxed mb-6"
          style={{ animationDelay: '500ms', fontSize: '15px', color: '#666666' }}
        >
          The honest answer. Your schedule determines which programs fit without
          burning you out further.
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
            {SHIFT_OPTIONS.map((option) => (
              <RadioCard key={option.id} value={option.id}>
                {option.label}
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
            <span className="font-bold" style={{ color: '#0C7663' }}>37%</span> of healthcare
            workers are working extra shifts not by choice — but because they have to. Lower
            scheduling flexibility doesn&apos;t disqualify you. In some cases, it qualifies you for
            stronger relief options.
          </p>
          <p className="mt-2" style={{ fontSize: '11px', color: '#8899AA', lineHeight: '1.4' }}>
            Source: OR Manager Study
          </p>
        </div>
      </div>
    </div>
  )
}

export default ShiftSituationStep

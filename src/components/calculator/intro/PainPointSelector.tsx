'use client'

import * as React from 'react'
import { RadioGroup, RadioCard } from '@/components/ui'
import { MOTIVATION_OPTIONS } from '@/components/calculator/shared/constants'
import type { MotivationDriver } from '@/types/calculator'
import { trackEvent } from '@/components/calculator/shared/tracking'

interface PainPointSelectorProps {
  value: MotivationDriver | null
  onSelect: (id: MotivationDriver) => void
  onAfterSelect?: () => void
}

export function PainPointSelector({ value, onSelect, onAfterSelect }: PainPointSelectorProps) {
  const handleValue = (id: string) => {
    const m = id as MotivationDriver
    onSelect(m)
    trackEvent('motivation_selected', { option: m, section: 'pain_point_selector' })
    window.setTimeout(() => onAfterSelect?.(), 300)
  }

  return (
    <section className="w-full max-w-[555px] mx-auto px-4 sm:px-6 pt-2 sm:pt-4 pb-4 sm:pb-8">
      <div className="flex flex-col items-start w-full">
        <h1
          className="font-display text-headline-lg sm:text-display lg:text-display-md mb-6 text-left w-full"
          style={{ color: '#1B2A4A' }}
        >
          What best describes your{' '}
          <span style={{ color: '#007AC8' }}>debt situation?</span>
        </h1>

        <RadioGroup
          value={value ?? undefined}
          onValueChange={handleValue}
          className="flex flex-col gap-3 w-full"
        >
          {MOTIVATION_OPTIONS.map((opt) => (
            <RadioCard key={opt.id} value={opt.id}>
              {opt.label}
            </RadioCard>
          ))}
        </RadioGroup>

        <p className="text-[15px] leading-relaxed text-center mt-4 w-full" style={{ color: '#666666' }}>
          Your answers are confidential and won&apos;t affect your credit score.
        </p>
      </div>
    </section>
  )
}

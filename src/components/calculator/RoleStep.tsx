'use client'

import * as React from 'react'
import { RadioGroup, RadioCard } from '@/components/ui'
import type { HealthcareRole } from '@/types/calculator'

interface RoleStepProps {
  onSubmit: (role: HealthcareRole) => void
}

const ROLE_OPTIONS: { id: HealthcareRole; label: string }[] = [
  { id: 'rn', label: 'RN (Registered Nurse)' },
  { id: 'lpn_lvn', label: 'LPN / LVN' },
  { id: 'cna_aide_tech', label: 'CNA / Aide / Tech' },
  { id: 'therapist_allied', label: 'Therapist / Allied Health' },
  { id: 'physician_np_pa', label: 'Physician / NP / PA' },
  { id: 'other', label: 'Other healthcare role' },
]

export function RoleStep({ onSubmit }: RoleStepProps) {
  const handleSelect = (id: string) => {
    const option = ROLE_OPTIONS.find((o) => o.id === id)
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
          Step 1 of 3
        </p>

        <h1
          className="animate-fade-in-up font-display text-headline-lg sm:text-display lg:text-display-md mb-3"
          style={{ animationDelay: '400ms', color: '#1B2A4A' }}
        >
          Which best describes{' '}
          <span style={{ color: '#007AC8' }}>your work?</span>
        </h1>

        <p
          className="animate-fade-in-up leading-relaxed mb-6"
          style={{ animationDelay: '500ms', fontSize: '15px', color: '#666666' }}
        >
          This helps us match you with relief options designed for healthcare workers.
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
            {ROLE_OPTIONS.map((option) => (
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
            <span className="font-bold" style={{ color: '#0C7663' }}>66%</span> of healthcare
            workers live paycheck to paycheck — and most relief programs aren&apos;t built around the
            shift work that&apos;s keeping them afloat.
          </p>
          <p className="mt-2" style={{ fontSize: '11px', color: '#8899AA', lineHeight: '1.4' }}>
            Source: Nurse.org 2025
          </p>
        </div>
      </div>
    </div>
  )
}

export default RoleStep

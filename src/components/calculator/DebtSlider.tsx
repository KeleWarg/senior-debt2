'use client'

import * as React from 'react'
import { RadioGroup, RadioCard } from '@/components/ui'

interface DebtSliderProps {
  onSubmit: (share: number) => void
}

const BUSINESS_SHARE_OPTIONS = [
  { id: 'most', label: 'Most of it (70%+)', mid: 0.75 },
  { id: 'half', label: 'About half (40–70%)', mid: 0.55 },
  { id: 'chunk', label: 'A meaningful chunk (20–40%)', mid: 0.30 },
  { id: 'smaller', label: 'A smaller portion (under 20%)', mid: 0.10 },
]

export function DebtSlider({ onSubmit }: DebtSliderProps) {
  const handleSelect = (id: string) => {
    const option = BUSINESS_SHARE_OPTIONS.find((o) => o.id === id)
    if (!option) return
    setTimeout(() => onSubmit(option.mid), 300)
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
          How much of your debt is really{' '}
          <span style={{ color: '#007AC8' }}>business debt?</span>
        </h1>

        <p
          className="animate-fade-in-up leading-relaxed mb-6"
          style={{ animationDelay: '500ms', fontSize: '15px', color: '#666666' }}
        >
          Personal cards used for inventory, payroll, ad spend, contractor invoices,
          equipment. If it kept the business running, it counts.
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
            {BUSINESS_SHARE_OPTIONS.map((option) => (
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
            <span className="font-bold" style={{ color: '#0C7663' }}>88%</span> of small businesses rely on the
            owner&apos;s personal credit to secure financing. Programs built for entrepreneur debt know how to unwind it.
          </p>
          <p className="mt-2" style={{ fontSize: '11px', color: '#8899AA', lineHeight: '1.4' }}>
            Source: Federal Reserve Small Business Credit Survey (2019 data, published 2020)
          </p>
        </div>
      </div>
    </div>
  )
}

export default DebtSlider

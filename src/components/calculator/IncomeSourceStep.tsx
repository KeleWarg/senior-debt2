'use client'

import * as React from 'react'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import type { IncomeSource } from '@/types/calculator'

interface IncomeSourceStepProps {
  onSubmit: (sources: IncomeSource[]) => void
}

const INCOME_OPTIONS: { id: IncomeSource; label: string }[] = [
  { id: 'social_security', label: 'Social Security (retirement or spousal)' },
  { id: 'ssdi_ssi', label: 'Social Security Disability (SSDI or SSI)' },
  { id: 'pension_retirement', label: 'Pension or retirement income' },
  { id: 'va_benefits', label: 'VA Benefits' },
]

export function IncomeSourceStep({ onSubmit }: IncomeSourceStepProps) {
  const [selected, setSelected] = React.useState<IncomeSource[]>([])

  const toggle = (id: IncomeSource) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  return (
    <div className="w-full max-w-[555px] mx-auto px-4 sm:px-6 pt-2 sm:pt-4 pb-4 sm:pb-8">
      <div className="flex flex-col items-start w-full">
        <p
          className="animate-fade-in-up text-xs font-medium uppercase tracking-wider text-neutral-400 mb-3"
          style={{ animationDelay: '400ms' }}
        >
          Question 1 of 3
        </p>

        <h1
          className="animate-fade-in-up font-display text-headline-lg sm:text-display lg:text-display-md mb-3"
          style={{ animationDelay: '400ms', color: '#1B2A4A' }}
        >
          Which of the following do you currently{' '}
          <span style={{ color: '#007AC8' }}>receive each month?</span>
        </h1>

        <p
          className="animate-fade-in-up leading-relaxed mb-6"
          style={{ animationDelay: '500ms', fontSize: '15px', color: '#666666' }}
        >
          Select all that apply.
        </p>

        <div
          className="animate-fade-in-up w-full h-px mb-6"
          style={{ animationDelay: '550ms', backgroundColor: 'rgba(26, 26, 46, 0.08)' }}
        />

        <div className="animate-fade-in-up w-full mb-6" style={{ animationDelay: '600ms' }}>
          <div className="flex flex-col gap-3">
            {INCOME_OPTIONS.map((option) => {
              const isSelected = selected.includes(option.id)
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => toggle(option.id)}
                  className={cn(
                    'group flex items-start gap-3 w-full bg-white border rounded-[8px]',
                    'p-4 cursor-pointer transition-all duration-200',
                    'hover:border-primary-700',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
                    isSelected
                      ? 'border-primary-700 bg-primary-300'
                      : 'border-neutral-200'
                  )}
                >
                  <div className="flex items-start gap-2">
                    <div
                      className={cn(
                        'flex items-center justify-center w-5 h-5 rounded flex-shrink-0 mt-0.5',
                        'border-2 transition-colors duration-200',
                        isSelected
                          ? 'border-primary-700 bg-primary-700'
                          : 'border-neutral-200'
                      )}
                    >
                      {isSelected && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>

                    <div className="text-body font-medium text-neutral-800 text-left">
                      {option.label}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div
          className="animate-fade-in-up w-full text-left mb-6"
          style={{
            animationDelay: '700ms',
            backgroundColor: '#E1F5EE',
            borderRadius: '12px',
            padding: '20px',
          }}
        >
          <div className="flex items-start gap-3">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-0.5">
              <path d="M16 5L7.75 14.5L4 10.5" stroke="#0C7663" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p style={{ fontSize: '14px', color: '#1B2A4A', lineHeight: '1.6' }}>
              <span className="font-bold" style={{ color: '#0C7663' }}>Good news:</span> Social Security, disability, and pension income is federally protected from most debt collectors. This assessment shows you how to use that protection.
            </p>
          </div>
        </div>

        <div className="animate-fade-in-up w-full" style={{ animationDelay: '800ms' }}>
          <Button
            fullWidth
            showTrailingIcon
            onClick={() => {
              if (selected.length > 0) onSubmit(selected)
            }}
            disabled={selected.length === 0}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

export default IncomeSourceStep

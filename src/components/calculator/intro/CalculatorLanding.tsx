'use client'

import * as React from 'react'
import { ClosingSection } from '@/components/calculator/intro/ClosingSection'
import { ComparisonTimeline } from '@/components/calculator/intro/ComparisonTimeline'
import { DebtRealityAnchor } from '@/components/calculator/intro/DebtRealityAnchor'
import { FAQ } from '@/components/calculator/intro/FAQ'
import { PressMentions } from '@/components/calculator/intro/PressMentions'
import { SuccessRate } from '@/components/calculator/intro/SuccessRate'
import { Testimonials } from '@/components/calculator/intro/Testimonials'
import { TrustBar } from '@/components/calculator/intro/TrustBar'
import { ValueBanner } from '@/components/calculator/intro/ValueBanner'
import { Button, ScrollReveal } from '@/components/ui'
import { MOTIVATION_OPTIONS } from '@/components/calculator/shared/constants'
import { trackEvent } from '@/components/calculator/shared/tracking'
import type { MotivationDriver } from '@/types/calculator'

interface CalculatorLandingProps {
  motivation: MotivationDriver | null
  onMotivationSelect: (id: MotivationDriver) => void
  onCta: () => void
}

export function CalculatorLanding({
  motivation,
  onMotivationSelect,
  onCta,
}: CalculatorLandingProps) {
  const handleValue = (id: string) => {
    const m = id as MotivationDriver
    onMotivationSelect(m)
    trackEvent('motivation_selected', { option: m, section: 'pain_point_selector' })
    window.setTimeout(() => onCta(), 300)
  }

  return (
    <div className="w-full flex flex-col">
      <ValueBanner />

      {/* ── Hero fold — two-column on lg ── */}
      <div className="w-full max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-10 pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-12 lg:pb-16">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-14">

          {/* Hero — headline + options + trust */}
          <div className="w-full max-w-[820px] mx-auto flex flex-col items-center text-center overflow-hidden">
            <h1
              className="animate-fade-in-up font-display text-display sm:text-display-md lg:text-display-lg mb-2"
              style={{ animationDelay: '200ms', color: '#1B2A4A' }}
            >
              Stop Trading Shifts For{' '}
              <span style={{ color: '#0C7663' }}>Interest Payments.</span>
            </h1>

            <p
              className="animate-fade-in-up leading-relaxed mb-3 max-w-[480px]"
              style={{ animationDelay: '250ms', fontSize: '15px', color: '#666666' }}
            >
              Resolve it in <span className="font-bold" style={{ color: '#0C7663' }}>3 years</span> instead of{' '}
              <span className="font-bold" style={{ color: '#EB4015' }}>15</span> — and stop working overtime to keep up with interest.
            </p>

            <div
              className="animate-fade-in-up w-full h-px mb-3 max-w-[480px]"
              style={{ animationDelay: '280ms', backgroundColor: 'rgba(26, 26, 46, 0.08)' }}
            />

            <p
              className="animate-fade-in-up font-semibold mb-3 lg:max-w-[480px]"
              style={{ animationDelay: '300ms', fontSize: '16px', color: '#1B2A4A' }}
            >
              What matters most to you?
            </p>

            <div
              className="animate-fade-in-up w-full max-w-md lg:max-w-[480px] mb-5"
              style={{ animationDelay: '400ms' }}
              role="group"
              aria-label="What matters most to you?"
            >
              <div className="flex flex-col gap-3 w-full">
                {MOTIVATION_OPTIONS.map((opt) => (
                  <Button
                    key={opt.id}
                    fullWidth
                    onClick={() => handleValue(opt.id)}
                  >
                    {opt.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div className="animate-fade-in-up w-full" style={{ animationDelay: '500ms' }}>
              <TrustBar />
            </div>
          </div>
        </div>
      </div>

      {/* ── Below-fold: timeline comparison ── */}
      <DebtRealityAnchor onCta={onCta}>
        <ComparisonTimeline
          businessOriginDebt={45000}
          currentPayment={{
            years: 15,
            endYear: 2041,
            totalPaid: 87650,
          }}
          withProgram={{
            years: 3,
            endYear: 2029,
            totalPaid: 22500,
          }}
          disclaimer="Based on $45,000 in unsecured debt at 22% APR, starting 2026. Relief estimate uses industry-average program terms. Individual results vary; not a guarantee of savings or timeline."
          onCta={onCta}
        />
      </DebtRealityAnchor>

      <ScrollReveal>
        <PressMentions />
      </ScrollReveal>

      <ScrollReveal>
        <Testimonials />
      </ScrollReveal>

      <ScrollReveal>
        <FAQ />
      </ScrollReveal>

      <ScrollReveal>
        <SuccessRate />
      </ScrollReveal>

      <ScrollReveal>
        <ClosingSection onCta={onCta} />
      </ScrollReveal>

    </div>
  )
}

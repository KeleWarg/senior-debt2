'use client'

import * as React from 'react'
import Image from 'next/image'
import { ComparisonTable } from '@/components/calculator/intro/ComparisonTable'
import { ConfidentialityBlock } from '@/components/calculator/intro/ConfidentialityBlock'
import { DebtRealityAnchor } from '@/components/calculator/intro/DebtRealityAnchor'
import { DebtReliefExplainer } from '@/components/calculator/intro/DebtReliefExplainer'
import { IndustryProof } from '@/components/calculator/intro/IndustryProof'
import { SuccessRate } from '@/components/calculator/intro/SuccessRate'
import { TrustBar } from '@/components/calculator/intro/TrustBar'
import { ValueBanner } from '@/components/calculator/intro/ValueBanner'
import { ScrollReveal } from '@/components/ui'
import { COMPARISON_STATIC, MOTIVATION_OPTIONS } from '@/components/calculator/shared/constants'
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
      <ValueBanner onContinue={onCta} />

      {/* ── Hero fold — two-column on lg ── */}
      <div className="w-full max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-10 pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-12 lg:pb-16">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-14">

          {/* Left column — hero visuals (desktop only) */}
          <div className="hidden lg:flex flex-col w-[38%] shrink-0 gap-6">
            <div className="flex gap-3">
              <div className="relative w-1/2 aspect-[3/5] rounded-2xl overflow-hidden bg-neutral-100">
                <Image
                  src="/hero-woman.jpg"
                  alt="Woman reviewing her debt relief plan"
                  fill
                  className="object-cover"
                  style={{ objectPosition: '60% center' }}
                  sizes="(min-width: 1024px) 25vw, 0px"
                  priority
                />
              </div>
              <div className="relative w-1/2 aspect-[3/4] rounded-2xl overflow-hidden border border-neutral-200 bg-gradient-to-b from-slate-50 to-blue-50">
                <Image
                  src="/hero-phone.png"
                  alt="Debt relief app showing personalized results"
                  fill
                  className="object-contain"
                  style={{ transform: 'scale(1.2) translateY(-40px)' }}
                  sizes="(min-width: 1024px) 25vw, 0px"
                  priority
                />
              </div>
            </div>

            {/* Social proof — floating clock stat block (reused from CalcIntro) */}
            <div
              className="w-full text-left"
              style={{ backgroundColor: '#F5F5F7', borderRadius: '12px', padding: '20px' }}
            >
              <div className="flex items-start gap-3">
                <Image
                  src="/clock-icon.png"
                  alt="Clock"
                  width={64}
                  height={64}
                  unoptimized
                  className="flex-shrink-0 animate-float"
                />
                <div>
                  <p style={{ fontSize: '14px', color: '#1B2A4A', lineHeight: '1.6' }}>
                    <strong>42% of Americans</strong> say paying off debt is their #1 goal this year
                  </p>
                  <p style={{ fontSize: '11px', color: '#999999', marginTop: '6px' }}>
                    — CFP Board, 2025
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column — headline + options + trust */}
          <div className="w-full max-w-[520px] mx-auto lg:max-w-none lg:mx-0 lg:flex-1 lg:min-w-0 flex flex-col items-center text-center lg:items-start lg:text-left lg:pl-8 overflow-hidden">
            <h1
              className="animate-fade-in-up font-display text-display sm:text-display-md lg:text-display-lg mb-2 lg:w-[130%] lg:max-w-none"
              style={{ animationDelay: '200ms', color: '#1B2A4A' }}
            >
              Resolve your debt for up to{' '}
              <br className="hidden sm:block" />
              <span className="relative inline-block" style={{ color: '#EB4015', fontSize: '0.75em' }}>
                90%
                <span
                  className="absolute left-0 right-0 top-1/2 h-[2px] bg-[#EB4015]"
                  style={{ transform: 'rotate(-12deg)' }}
                  aria-hidden
                />
              </span>{' '}
              <span className="whitespace-nowrap" style={{ color: '#0C7663' }}>half what you owe.</span>
            </h1>

            <p
              className="animate-fade-in-up leading-relaxed mb-3 lg:max-w-[480px]"
              style={{ animationDelay: '250ms', fontSize: '15px', color: '#666666' }}
            >
              The average American with $15,000 in credit card debt could be debt-free by{' '}
              <span className="font-bold" style={{ color: '#0C7663' }}>2028</span> instead of{' '}
              <span className="font-bold" style={{ color: '#EB4015' }}>2049</span> on minimum payments.
            </p>

            <div
              className="animate-fade-in-up w-full h-px mb-3 lg:max-w-[480px]"
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
                {MOTIVATION_OPTIONS.map((opt, i) => {
                  const letter = String.fromCharCode(65 + i)
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleValue(opt.id)}
                      className="group flex items-center gap-4 w-full px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl border border-neutral-200 bg-[#FAFAFA] text-left text-[15px] font-medium text-[#1B2A4A] hover:border-primary-700 hover:bg-primary-300 active:bg-primary-300 transition-all duration-200"
                    >
                      <span className="flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-neutral-200 text-xs sm:text-sm font-bold text-[#1B2A4A] shrink-0 group-hover:bg-primary-700 group-hover:text-white transition-colors duration-200">
                        {letter}
                      </span>
                      <span>{opt.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Trust badges */}
            <div className="animate-fade-in-up w-full" style={{ animationDelay: '500ms' }}>
              <TrustBar />
            </div>
          </div>
        </div>
      </div>

      {/* ── Below-fold: headline + stats + comparison table ── */}
      <ScrollReveal>
        <DebtRealityAnchor>
          <ComparisonTable
            withoutRelief={{
              totalPaid: COMPARISON_STATIC.withoutRelief.totalPaid,
              debtFreeYear: COMPARISON_STATIC.withoutRelief.debtFreeYear,
              monthlyPayment: COMPARISON_STATIC.withoutRelief.monthlyPayment,
              paymentYears: COMPARISON_STATIC.withoutRelief.paymentYears,
            }}
            withRelief={{
              totalCost: COMPARISON_STATIC.withRelief.totalPaid,
              debtFreeYear: COMPARISON_STATIC.withRelief.debtFreeYear,
              monthlyPayment: COMPARISON_STATIC.withRelief.monthlyPayment,
              programYears: COMPARISON_STATIC.withRelief.programYears,
            }}
            totalSaved={COMPARISON_STATIC.withRelief.totalSaved}
            disclaimer={`Based on $${COMPARISON_STATIC.debtAmount.toLocaleString()} in credit card debt at ${COMPARISON_STATIC.aprPercent}% APR, starting ${COMPARISON_STATIC.startYear}. Relief estimate assumes industry-average program terms.`}
          />
        </DebtRealityAnchor>
      </ScrollReveal>

      <ScrollReveal>
        <DebtReliefExplainer onCta={onCta} />
      </ScrollReveal>

      <ScrollReveal>
        <div className="w-full max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-10 py-10">
          <div className="flex flex-col lg:flex-row lg:items-stretch gap-6">
            <div className="lg:w-1/2">
              <IndustryProof inline />
            </div>
            <div className="lg:w-1/2">
              <ConfidentialityBlock inline />
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <SuccessRate />
      </ScrollReveal>

    </div>
  )
}

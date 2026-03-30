'use client'

import { CreditCard, Clock, Check } from 'lucide-react'
import { Button, ScrollReveal } from '@/components/ui'
import { COMPARISON_STATIC } from '@/components/calculator/shared/constants'

interface DebtReliefExplainerProps {
  onCta: () => void
}

export function DebtReliefExplainer({ onCta }: DebtReliefExplainerProps) {
  const debt = COMPARISON_STATIC.debtAmount
  const settlement = Math.round(debt * 0.5)
  const saved = debt - settlement
  const debtFreeYear = COMPARISON_STATIC.withRelief.debtFreeYear

  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-24">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">

          {/* ── Left column: copy ── */}
          <ScrollReveal className="lg:w-[48%] mb-12 lg:mb-0">
            {/* Pill badge — filled green, like CK "Spending" */}
            <span
              className="inline-block text-[11px] font-bold uppercase tracking-[0.08em] text-white rounded px-2.5 py-1 mb-5"
              style={{ backgroundColor: '#0C7663' }}
            >
              Debt Relief
            </span>

            {/* Large serif heading — dark, like CK "Every transaction, tracked." */}
            <h2
              className="font-display leading-[1.15] mb-4"
              style={{ fontSize: 'clamp(30px, 4vw, 42px)', color: '#1B2A4A' }}
            >
              Settle your debt for less than you owe.
            </h2>

            {/* Subtitle */}
            <p className="text-[16px] leading-relaxed mb-10 max-w-[460px]" style={{ color: '#666666' }}>
              Trained negotiators work with your creditors to reduce your balance —
              typically to 40–60% of what you owe. No court, no bankruptcy, no public record.
            </p>

            {/* Two feature columns — simple icons, no boxes */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-10">
              <div>
                <CreditCard className="w-6 h-6 mb-3" style={{ color: '#1B2A4A' }} strokeWidth={1.2} />
                <p className="text-[14px] leading-relaxed" style={{ color: '#666666' }}>
                  Works on credit cards, medical bills, and personal loans.
                </p>
              </div>
              <div>
                <Clock className="w-6 h-6 mb-3" style={{ color: '#1B2A4A' }} strokeWidth={1.2} />
                <p className="text-[14px] leading-relaxed" style={{ color: '#666666' }}>
                  Most programs complete in 2–4 years instead of decades.
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              fullWidth
              showTrailingIcon
              onClick={onCta}
              className="max-w-[400px]"
            >
              See if you qualify
            </Button>
          </ScrollReveal>

          {/* ── Right column: decorative circle + floating card ── */}
          <ScrollReveal delay={150} className="lg:w-[52%] flex items-center justify-center relative min-h-[420px]">
            {/* Large decorative circle */}
            <div
              className="absolute rounded-full"
              style={{
                width: '420px',
                height: '420px',
                backgroundColor: '#E8F5EC',
                right: '-40px',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />

            {/* Floating summary card */}
            <div
              className="relative z-10 w-full max-w-[340px] rounded-2xl bg-white overflow-hidden animate-float"
              style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)' }}
            >
              {/* Card header */}
              <div className="text-center pt-6 pb-4 px-6">
                <p className="text-[13px] mb-1.5" style={{ color: '#999999' }}>Your debt</p>
                <p
                  className="font-semibold leading-none line-through decoration-1"
                  style={{ fontSize: '38px', color: '#CCCCCC', textDecorationColor: '#DDDDDD' }}
                >
                  ${debt.toLocaleString()}
                </p>
              </div>

              {/* Rows */}
              <div className="px-6">
                <div className="flex items-center justify-between py-3.5" style={{ borderTop: '1px solid #F0F0F0' }}>
                  <span className="text-[14px]" style={{ color: '#666666' }}>Settlement estimate</span>
                  <span className="text-[18px] font-bold" style={{ color: '#0C7663' }}>${settlement.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between py-3.5" style={{ borderTop: '1px solid #F0F0F0' }}>
                  <span className="text-[14px]" style={{ color: '#666666' }}>You save</span>
                  <span className="text-[18px] font-bold" style={{ color: '#0C7663' }}>${saved.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between py-3.5" style={{ borderTop: '1px solid #F0F0F0' }}>
                  <span className="text-[14px]" style={{ color: '#666666' }}>Debt-free by</span>
                  <span className="text-[18px] font-semibold" style={{ color: '#1B2A4A' }}>{debtFreeYear}</span>
                </div>
              </div>

              {/* Reduction pill */}
              <div className="text-center px-6 pt-1 pb-5">
                <span
                  className="inline-block text-[13px] font-semibold rounded-full px-4 py-1.5"
                  style={{ color: '#0C7663', border: '1px solid rgba(12,118,99,0.2)' }}
                >
                  50% reduction on average
                </span>
              </div>

              {/* Bottom trust bar */}
              <div className="flex items-center justify-center gap-5 px-6 py-3" style={{ backgroundColor: '#F5F5F7' }}>
                <span className="inline-flex items-center gap-1.5 text-[12px] font-medium" style={{ color: '#666666' }}>
                  <Check className="w-3.5 h-3.5" style={{ color: '#0C7663' }} strokeWidth={2.5} />
                  No upfront cost
                </span>
                <span className="inline-flex items-center gap-1.5 text-[12px] font-medium" style={{ color: '#666666' }}>
                  <Check className="w-3.5 h-3.5" style={{ color: '#0C7663' }} strokeWidth={2.5} />
                  No bankruptcy
                </span>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}

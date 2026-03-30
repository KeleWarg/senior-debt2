'use client'

import { Button } from '@/components/ui'
import { CLOSING_PROOF, CLOSING_TRUST } from '@/components/calculator/shared/constants'
import { trackEvent } from '@/components/calculator/shared/tracking'

interface ClosingSectionProps {
  onCta: () => void
}

export function ClosingSection({ onCta }: ClosingSectionProps) {
  const handleClick = () => {
    trackEvent('cta_clicked', { section: 'closing_cta' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => onCta(), 300)
  }

  return (
    <section className="w-full px-4 sm:px-6 pb-16">
      <div className="max-w-[680px] mx-auto">
        <div className="border border-neutral-200 rounded-2xl overflow-hidden bg-white">
          {/* Row 1: Proof */}
          <div className="flex items-start gap-4 sm:gap-5 px-5 sm:px-8 py-6 sm:py-7 border-b border-neutral-200">
            <div
              className="flex items-center justify-center rounded-full shrink-0"
              style={{ width: '44px', height: '44px', backgroundColor: '#E1F5EE' }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M16 5L7.75 14.5L4 10.5" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="font-semibold mb-1" style={{ fontSize: '17px', color: '#1B2A4A' }}>
                {CLOSING_PROOF.title}
              </p>
              <p className="mb-2" style={{ fontSize: '14px', color: '#6B7280', lineHeight: '1.5' }}>
                {CLOSING_PROOF.description}
              </p>
              <p style={{ fontSize: '12px', color: '#9CA3AF' }}>
                {CLOSING_PROOF.source}
              </p>
            </div>
          </div>

          {/* Row 2: Trust */}
          <div className="flex items-start gap-4 sm:gap-5 px-5 sm:px-8 py-6 sm:py-7 border-b border-neutral-200">
            <div
              className="flex items-center justify-center rounded-full shrink-0"
              style={{ width: '44px', height: '44px', backgroundColor: '#E1F5EE' }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="4" y="8" width="12" height="9" rx="1.5" stroke="#0F766E" strokeWidth="1.5" />
                <path d="M7 8V5.5C7 3.84 8.34 2.5 10 2.5C11.66 2.5 13 3.84 13 5.5V8" stroke="#0F766E" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="10" cy="12.5" r="1" fill="#0F766E" />
              </svg>
            </div>
            <div>
              <p className="font-semibold mb-1" style={{ fontSize: '17px', color: '#1B2A4A' }}>
                {CLOSING_TRUST.title}
              </p>
              <p className="mb-3" style={{ fontSize: '14px', color: '#6B7280', lineHeight: '1.5' }}>
                {CLOSING_TRUST.description}
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <span className="inline-flex items-baseline gap-0.5">
                  <span className="font-display" style={{ fontSize: '15px', fontWeight: 600, color: '#1B2A4A' }}>Forbes</span>
                  <span style={{ fontSize: '12px', color: '#6B7280', letterSpacing: '0.02em' }}>&nbsp;ADVISOR</span>
                </span>

                <span className="hidden sm:block" style={{ width: '0.5px', height: '20px', backgroundColor: '#E5E7EB' }} />

                <span className="inline-flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 0L8.9 4.5L14 5.2L10.5 8.5L11.3 14L7 11.5L2.7 14L3.5 8.5L0 5.2L5.1 4.5L7 0Z" fill="#00B67A" />
                  </svg>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#00B67A' }}>Excellent</span>
                  <span style={{ fontSize: '12px', color: '#6B7280' }}>Trustpilot</span>
                </span>

                <span className="hidden sm:block" style={{ width: '0.5px', height: '20px', backgroundColor: '#E5E7EB' }} />

                <span style={{ fontSize: '12px', color: '#6B7280' }}>BBB A+</span>
              </div>
            </div>
          </div>

          {/* Row 3: CTA */}
          <div className="text-center px-5 sm:px-8 py-8" style={{ backgroundColor: '#F9FAFB' }}>
            <h3
              className="font-display mb-5"
              style={{ fontSize: '20px', fontWeight: 600, color: '#1B2A4A' }}
            >
              Ready to see your debt-free date?
            </h3>

            <Button
              fullWidth
              showTrailingIcon
              onClick={handleClick}
              className="max-w-[420px] mx-auto"
            >
              Calculate your debt-free date
            </Button>

            <p className="mt-3" style={{ fontSize: '13px', color: '#9CA3AF' }}>
              Takes 30 seconds · No signup required · Free ($50–$100 value)
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ClosingSection

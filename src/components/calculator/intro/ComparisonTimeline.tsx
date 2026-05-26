'use client'

import * as React from 'react'
import { formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui'

export interface ComparisonTimelineProps {
  businessOriginDebt: number
  currentPayment: {
    years: number
    endYear: number
    totalPaid: number
  }
  withProgram: {
    years: number
    endYear: number
    totalPaid: number
  }
  disclaimer: string
  className?: string
  onCta?: () => void
}

const NAVY = '#1B2A4A'
const GREEN = '#0C7663'
const RED = '#EB4015'
const MUTED = '#888899'
const DIVIDER = '#E0E0E6'

type AnimPhase = 'idle' | 'header' | 'bad' | 'arrow' | 'good' | 'climax' | 'done'
const PHASE_ORDER: AnimPhase[] = [
  'idle',
  'header',
  'bad',
  'arrow',
  'good',
  'climax',
  'done',
]

function phaseAtLeast(current: AnimPhase, target: AnimPhase) {
  return PHASE_ORDER.indexOf(current) >= PHASE_ORDER.indexOf(target)
}

export function ComparisonTimeline({
  businessOriginDebt,
  currentPayment,
  withProgram,
  disclaimer,
  className,
  onCta,
}: ComparisonTimelineProps) {
  const interestAccrued = Math.max(0, currentPayment.totalPaid - businessOriginDebt)
  const settlementReduction = Math.max(0, businessOriginDebt - withProgram.totalPaid)
  const youKeepAmount = Math.max(0, currentPayment.totalPaid - withProgram.totalPaid)
  const yearsSaved = Math.max(0, currentPayment.years - withProgram.years)

  const containerRef = React.useRef<HTMLDivElement>(null)
  const [phase, setPhase] = React.useState<AnimPhase>('idle')

  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect()
          startSequence()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  function startSequence() {
    setTimeout(() => setPhase('header'), 0)
    setTimeout(() => setPhase('bad'), 300)
    setTimeout(() => setPhase('arrow'), 900)
    setTimeout(() => setPhase('good'), 1100)
    setTimeout(() => setPhase('climax'), 1700)
    setTimeout(() => setPhase('done'), 1900)
  }

  const show = (target: AnimPhase) => phaseAtLeast(phase, target)

  return (
    <div className={className} ref={containerRef}>
      {/* ── Section header ── */}
      <div
        className="mb-8 transition-all duration-500 ease-out"
        style={{
          opacity: show('header') ? 1 : 0,
          transform: show('header') ? 'translateY(0)' : 'translateY(12px)',
        }}
      >
        <p
          className="mb-4"
          style={{
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: MUTED,
          }}
        >
          The Comparison
        </p>
        <h2
          className="font-display mb-3"
          style={{
            fontSize: 'clamp(24px, 4vw, 28px)',
            fontWeight: 600,
            lineHeight: 1.15,
            color: NAVY,
          }}
        >
          Two ways this {formatCurrency(businessOriginDebt)} plays out
        </h2>
        <p
          style={{
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: 1.5,
            color: '#666666',
          }}
        >
          Both paths carry the same debt. The difference is whether you keep
          paying it off in overtime.
        </p>
      </div>

      {/* ── Receipt cards — side by side on sm+ ── */}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-stretch gap-4 sm:gap-0">
        {/* Bad receipt card */}
        <div
          className="transition-all duration-500 ease-out"
          style={{
            opacity: show('bad') ? 1 : 0,
            transform: show('bad') ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          <div
            className="rounded-2xl h-full flex flex-col"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(235, 64, 21, 0.4)',
              padding: 'clamp(20px, 4vw, 24px)',
            }}
          >
            <p
              className="mb-4"
              style={{
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: RED,
                opacity: 0.85,
              }}
            >
              At Your Current Payment
            </p>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-baseline gap-2">
                <span style={{ fontSize: '14px', fontWeight: 400, color: NAVY }}>
                  Starting debt
                </span>
                <span
                  className="font-display whitespace-nowrap"
                  style={{ fontSize: '16px', fontWeight: 500, color: NAVY }}
                >
                  {formatCurrency(businessOriginDebt)}
                </span>
              </div>
              <div className="flex justify-between items-baseline gap-2">
                <span style={{ fontSize: '14px', fontWeight: 400, color: NAVY }}>
                  Interest over {currentPayment.years}yr
                </span>
                <span
                  className="font-display whitespace-nowrap"
                  style={{ fontSize: '16px', fontWeight: 500, color: NAVY }}
                >
                  {formatCurrency(interestAccrued)}
                </span>
              </div>
            </div>

            <div
              className="my-3"
              style={{ height: '1px', backgroundColor: DIVIDER }}
            />

            <div className="flex justify-between items-baseline gap-2 mt-auto">
              <span style={{ fontSize: '14px', fontWeight: 600, color: NAVY }}>
                Total you&apos;d pay
              </span>
              <span
                className="font-display whitespace-nowrap"
                style={{
                  fontSize: 'clamp(18px, 3vw, 20px)',
                  fontWeight: 700,
                  color: NAVY,
                }}
              >
                {formatCurrency(currentPayment.totalPaid)}
              </span>
            </div>
            <p
              className="text-right mt-2"
              style={{ fontSize: '12px', color: '#999999' }}
            >
              Resolved by {currentPayment.endYear}
            </p>
          </div>
        </div>

        {/* Arrow — vertical on mobile, horizontal on sm+ */}
        <div
          className="flex items-center justify-center transition-opacity duration-300"
          style={{ opacity: show('arrow') ? 1 : 0 }}
        >
          {/* Mobile: down arrow */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden
            className="sm:hidden"
          >
            <path
              d="M8 2v10m0 0l-4-4m4 4l4-4"
              stroke="#999999"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {/* Desktop: right arrow */}
          <svg
            width="24"
            height="16"
            viewBox="0 0 24 16"
            fill="none"
            aria-hidden
            className="hidden sm:block mx-3"
          >
            <path
              d="M2 8h18m0 0l-4-4m4 4l-4 4"
              stroke="#999999"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Good receipt card */}
        <div
          className="transition-all duration-500 ease-out"
          style={{
            opacity: show('good') ? 1 : 0,
            transform: show('good') ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          <div
            className="rounded-2xl h-full flex flex-col"
            style={{
              backgroundColor: '#FFFFFF',
              border: `2px solid ${GREEN}`,
              padding: 'clamp(20px, 4vw, 24px)',
            }}
          >
            <p
              className="mb-4"
              style={{
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: GREEN,
              }}
            >
              With Healthcare-Worker-Tier Relief
            </p>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-baseline gap-2">
                <span style={{ fontSize: '14px', fontWeight: 400, color: NAVY }}>
                  Starting debt
                </span>
                <span
                  className="font-display whitespace-nowrap"
                  style={{ fontSize: '16px', fontWeight: 500, color: NAVY }}
                >
                  {formatCurrency(businessOriginDebt)}
                </span>
              </div>
              <div className="flex justify-between items-baseline gap-2">
                <span style={{ fontSize: '14px', fontWeight: 400, color: NAVY }}>
                  Settlement reduction
                </span>
                <span
                  className="font-display whitespace-nowrap"
                  style={{ fontSize: '16px', fontWeight: 500, color: GREEN }}
                >
                  &minus;{formatCurrency(settlementReduction)}
                </span>
              </div>
            </div>

            <div
              className="my-3"
              style={{ height: '1px', backgroundColor: DIVIDER }}
            />

            <div className="flex justify-between items-baseline gap-2 mt-auto">
              <span style={{ fontSize: '14px', fontWeight: 600, color: NAVY }}>
                Total you&apos;d pay
              </span>
              <span
                className="font-display whitespace-nowrap"
                style={{
                  fontSize: 'clamp(18px, 3vw, 20px)',
                  fontWeight: 700,
                  color: GREEN,
                }}
              >
                {formatCurrency(withProgram.totalPaid)}
              </span>
            </div>
            <p
              className="text-right mt-2"
              style={{ fontSize: '12px', color: GREEN, opacity: 0.7 }}
            >
              Resolved by {withProgram.endYear}
            </p>
          </div>
        </div>
      </div>

      {/* ── "You keep" climax ── */}
      <div
        className="text-center transition-all duration-700 ease-out"
        style={{
          marginTop: '40px',
          marginBottom: '32px',
          opacity: show('climax') ? 1 : 0,
          transform: show('climax') ? 'translateY(0)' : 'translateY(12px)',
        }}
      >
        <p
          className="font-display"
          style={{
            fontSize: 'clamp(24px, 4vw, 28px)',
            fontWeight: 600,
            lineHeight: 1.25,
            color: NAVY,
          }}
        >
          You keep{' '}
          <span style={{ color: GREEN }}>
            {formatCurrency(youKeepAmount)}
          </span>{' '}
          and{' '}
          <span style={{ color: GREEN }}>
            {yearsSaved} years
          </span>
          .
        </p>
      </div>

      {/* ── CTA ── */}
      {onCta && (
        <div
          className="transition-all duration-500 ease-out"
          style={{
            opacity: show('done') ? 1 : 0,
            transform: show('done') ? 'translateY(0)' : 'translateY(8px)',
          }}
        >
          <Button fullWidth showTrailingIcon onClick={onCta}>
            Calculate my Shift-to-Relief plan
          </Button>
        </div>
      )}

      <p className="text-[11px] text-neutral-500 text-center mt-4 max-w-[600px] mx-auto leading-relaxed">
        {disclaimer}
      </p>
    </div>
  )
}

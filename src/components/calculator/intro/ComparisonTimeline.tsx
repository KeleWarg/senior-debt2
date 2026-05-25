'use client'

import * as React from 'react'
import { formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui'

export interface ComparisonTimelineProps {
  currentPayment: {
    years: number
    startYear: number
    endYear: number
    totalPaid: number
  }
  withProgram: {
    years: number
    startYear: number
    endYear: number
    totalPaid: number
  }
  disclaimer: string
  className?: string
  onCta?: () => void
}

type AnimPhase = 'idle' | 'verdict' | 'bar1' | 'bar1amount' | 'bar2' | 'bar2amount' | 'done'

const PHASE_ORDER: AnimPhase[] = ['idle', 'verdict', 'bar1', 'bar1amount', 'bar2', 'bar2amount', 'done']

function phaseAtLeast(current: AnimPhase, target: AnimPhase) {
  return PHASE_ORDER.indexOf(current) >= PHASE_ORDER.indexOf(target)
}

export function ComparisonTimeline({
  currentPayment,
  withProgram,
  disclaimer,
  className,
  onCta,
}: ComparisonTimelineProps) {
  const yearsSaved = currentPayment.years - withProgram.years
  const moneySaved = currentPayment.totalPaid - withProgram.totalPaid
  const programWidthPercent = Math.round((withProgram.years / currentPayment.years) * 100)

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
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  function startSequence() {
    setTimeout(() => setPhase('verdict'), 0)
    setTimeout(() => setPhase('bar1'), 200)
    setTimeout(() => setPhase('bar1amount'), 800)
    setTimeout(() => setPhase('bar2'), 1000)
    setTimeout(() => setPhase('bar2amount'), 1600)
    setTimeout(() => setPhase('done'), 1800)
  }

  const show = (target: AnimPhase) => phaseAtLeast(phase, target)

  return (
    <div className={className} ref={containerRef}>
      <div className="rounded-xl border border-neutral-200 bg-white shadow-card overflow-hidden">
        <div className="px-5 sm:px-8 py-8">

          {/* Verdict headline — large serif */}
          <div
            className="mb-8 transition-all duration-[400ms] ease-out"
            style={{
              opacity: show('verdict') ? 1 : 0,
              transform: show('verdict') ? 'translateY(0)' : 'translateY(12px)',
            }}
          >
            <h3
              className="font-display font-semibold text-[32px] sm:text-[40px] leading-[1.15]"
              style={{ color: '#1B2A4A' }}
            >
              {yearsSaved} years sooner.
            </h3>
            <h3
              className="font-display font-semibold text-[32px] sm:text-[40px] leading-[1.15]"
              style={{ color: '#1B2A4A' }}
            >
              <span style={{ color: '#0C7663' }}>{formatCurrency(moneySaved)}</span> less paid.
            </h3>
          </div>

          {/* Bar 1: At current payment — dashed outline */}
          <div className="mb-2">
            <p className="text-[13px] font-medium mb-2" style={{ color: '#1B2A4A' }}>
              At your current payment
            </p>

            <div
              className="relative rounded-md flex items-center justify-end px-4 h-10 sm:h-12"
              style={{
                border: '2px dashed #EB4015',
                backgroundColor: 'transparent',
                width: show('bar1') ? '100%' : '0%',
                transition: 'width 800ms cubic-bezier(0.22, 1, 0.36, 1)',
                overflow: 'hidden',
              }}
            >
              <span
                className="text-[18px] font-medium whitespace-nowrap transition-opacity duration-300"
                style={{
                  color: '#EB4015',
                  opacity: show('bar1amount') ? 1 : 0,
                }}
              >
                {formatCurrency(currentPayment.totalPaid)}
              </span>
            </div>

            {/* Year labels below bar */}
            <div
              className="flex justify-between mt-1.5 transition-opacity duration-300"
              style={{ opacity: show('bar1') ? 1 : 0 }}
            >
              <span className="text-[12px] text-neutral-500">{currentPayment.startYear}</span>
              <span className="text-[12px] text-neutral-500">{currentPayment.endYear}</span>
            </div>
          </div>

          <div className="h-8" />

          {/* Bar 2: With structured program — solid teal, no track */}
          <div>
            <p className="text-[13px] font-medium mb-2" style={{ color: '#1B2A4A' }}>
              With a structured program
            </p>

            <div className="relative">
              <div
                className="relative rounded-md flex items-center justify-end px-4 h-10 sm:h-12"
                style={{
                  backgroundColor: '#0C7663',
                  width: show('bar2') ? `${programWidthPercent}%` : '0%',
                  minWidth: show('bar2') ? 80 : 0,
                  transition: 'width 600ms cubic-bezier(0.22, 1, 0.36, 1)',
                  overflow: 'hidden',
                }}
              >
                {/* Amount inside bar — desktop */}
                <span
                  className="hidden sm:inline text-[20px] font-bold text-white whitespace-nowrap transition-opacity duration-300"
                  style={{ opacity: show('bar2amount') ? 1 : 0 }}
                >
                  {formatCurrency(withProgram.totalPaid)}
                </span>
              </div>

              {/* Amount outside bar — mobile fallback */}
              <span
                className="sm:hidden absolute top-1/2 -translate-y-1/2 text-[20px] font-bold whitespace-nowrap transition-opacity duration-300"
                style={{
                  left: show('bar2') ? `calc(${programWidthPercent}% + 8px)` : '88px',
                  color: '#0C7663',
                  opacity: show('bar2amount') ? 1 : 0,
                }}
              >
                {formatCurrency(withProgram.totalPaid)}
              </span>
            </div>

            {/* Year labels — anchored to bar width only */}
            <div
              className="flex justify-between mt-1.5 transition-opacity duration-300"
              style={{
                width: `${programWidthPercent}%`,
                minWidth: 80,
                opacity: show('bar2') ? 1 : 0,
              }}
            >
              <span className="text-[12px] text-neutral-500">{withProgram.startYear}</span>
              <span className="text-[12px] text-neutral-500">{withProgram.endYear}</span>
            </div>
          </div>

          {onCta && (
            <div className="mt-8">
              <Button fullWidth showTrailingIcon onClick={onCta}>
                Calculate my business-to-personal separation
              </Button>
            </div>
          )}
        </div>
      </div>

      <p className="text-[11px] text-neutral-500 text-center mt-4 max-w-[600px] mx-auto leading-relaxed">
        {disclaimer}
      </p>
    </div>
  )
}

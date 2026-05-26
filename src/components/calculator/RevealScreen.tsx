'use client'

import * as React from 'react'
import confetti from 'canvas-confetti'
import { Button } from '@/components/ui'
import { formatCurrency, cn } from '@/lib/utils'

const NAVY = '#1B2A4A'
const TEAL = '#007AC8'
const GREEN = '#0C7663'
const RED = '#EB4015'
const MUTED = '#888899'
const CAPTION_GREY = '#999999'
const SEGMENT_GREY = '#E0E0E6'

const VB_W = 480
const VB_H = 240
const PAD = { top: 32, right: 48, bottom: 44, left: 48 }
const INNER_W = VB_W - PAD.left - PAD.right
const INNER_H = VB_H - PAD.top - PAD.bottom

function generateCurrentPaymentCurve(): string {
  const pts: string[] = []
  const n = 60
  for (let i = 0; i <= n; i++) {
    const t = i / n
    const remaining = Math.max(0, 1 - t * t * 0.3 - t * 0.7)
    const x = PAD.left + t * INNER_W
    const y = PAD.top + (1 - remaining) * INNER_H
    pts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`)
  }
  return pts.join(' ')
}

function generateProgramCurve(reliefFraction: number): string {
  const pts: string[] = []
  const reliefFrac = Math.max(0.08, Math.min(0.95, reliefFraction))
  const n = 30
  for (let i = 0; i <= n; i++) {
    const t = i / n
    const x = PAD.left + t * reliefFrac * INNER_W
    const remaining = Math.max(0, 1 - t * t * 0.4 - t * 0.6)
    const y = PAD.top + (1 - remaining) * INNER_H
    pts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`)
  }
  return pts.join(' ')
}

function generateAreaPath(linePath: string): string {
  const bottomY = PAD.top + INNER_H
  const parts = linePath.split(' ')
  const firstX = parts[1]
  const lastX = parts[parts.length - 2]
  return `${linePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`
}

const DONUT_VB = 240
const DONUT_CENTER = DONUT_VB / 2
const DONUT_OUTER_R = 100
const DONUT_INNER_R = 55
const DONUT_STROKE = DONUT_OUTER_R - DONUT_INNER_R
const DONUT_R = (DONUT_OUTER_R + DONUT_INNER_R) / 2
const DONUT_CIRC = 2 * Math.PI * DONUT_R

function roundTo(value: number, multiple: number): number {
  return Math.round(value / multiple) * multiple
}

function useInView(threshold = 0.3) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [inView, setInView] = React.useState(false)
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, inView] as const
}

interface RevealScreenProps {
  debtAmount: number
  businessDebtShare: number
  monthlyRevenue?: number
  onContinue?: () => void
  skipIntro?: boolean
}

interface RevenueBandProfile {
  currentMultiplier: number
  settlementRate: number
  currentYears: number
  programYears: number
}

function getRevenueBandProfile(monthlyRevenue?: number): RevenueBandProfile {
  if (!monthlyRevenue || monthlyRevenue <= 0) {
    return { currentMultiplier: 1.95, settlementRate: 0.5, currentYears: 15, programYears: 3 }
  }
  if (monthlyRevenue <= 2000) {
    return { currentMultiplier: 2.15, settlementRate: 0.46, currentYears: 18, programYears: 3 }
  }
  if (monthlyRevenue <= 5000) {
    return { currentMultiplier: 2.05, settlementRate: 0.48, currentYears: 17, programYears: 3 }
  }
  if (monthlyRevenue <= 10000) {
    return { currentMultiplier: 1.95, settlementRate: 0.5, currentYears: 15, programYears: 3 }
  }
  if (monthlyRevenue <= 25000) {
    return { currentMultiplier: 1.9, settlementRate: 0.52, currentYears: 14, programYears: 3 }
  }
  if (monthlyRevenue <= 50000) {
    return { currentMultiplier: 1.85, settlementRate: 0.54, currentYears: 13, programYears: 3 }
  }
  return { currentMultiplier: 1.8, settlementRate: 0.56, currentYears: 12, programYears: 3 }
}

export function RevealScreen({
  debtAmount,
  businessDebtShare,
  monthlyRevenue,
  onContinue,
  skipIntro,
}: RevealScreenProps) {
  const [stage, setStage] = React.useState(skipIntro ? 2 : 0)
  const [pieRef, pieInView] = useInView(0.2)
  const [barsRef, barsInView] = useInView(0.2)

  React.useEffect(() => {
    if (skipIntro) return

    const t1 = setTimeout(() => setStage(1), 300)
    const t2 = setTimeout(() => setStage(2), 1000)

    const tConfetti = setTimeout(() => {
      const duration = 800
      const end = Date.now() + duration
      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 70,
          origin: { x: 0, y: 0.6 },
          colors: [TEAL, GREEN, '#FFB934'],
          gravity: 1.2,
        })
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 70,
          origin: { x: 1, y: 0.6 },
          colors: [TEAL, GREEN, '#FFB934'],
          gravity: 1.2,
        })
        if (Date.now() < end) requestAnimationFrame(frame)
      }
      frame()
    }, 400)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(tConfetti)
    }
  }, [skipIntro])

  const businessOriginDebt = roundTo(debtAmount * businessDebtShare, 500)
  const personalOriginDebt = debtAmount - businessOriginDebt
  const businessPct = Math.round(businessDebtShare * 100)
  const personalPct = 100 - businessPct
  const profile = getRevenueBandProfile(monthlyRevenue)
  const currentPaymentTotal = roundTo(businessOriginDebt * profile.currentMultiplier, 500)
  const estimatedSettlement = roundTo(businessOriginDebt * profile.settlementRate, 500)
  const amountLessPaid = Math.max(0, currentPaymentTotal - estimatedSettlement)
  const yearsSaved = Math.max(0, profile.currentYears - profile.programYears)
  const hasCostSavings = amountLessPaid > 0
  const hasTimeSavings = yearsSaved > 0
  const currentYearsLabel = `${profile.currentYears} ${profile.currentYears === 1 ? 'year' : 'years'}`
  const programYearsLabel = `${profile.programYears} ${profile.programYears === 1 ? 'year' : 'years'}`
  const savingsHeading = hasCostSavings && hasTimeSavings
    ? `Qualifying saves you ~${formatCurrency(amountLessPaid)} and ${yearsSaved} years.`
    : hasCostSavings
      ? `Qualifying saves you ~${formatCurrency(amountLessPaid)}.`
      : hasTimeSavings
        ? `Qualifying can cut your payoff timeline by ${yearsSaved} years.`
        : 'Qualifying can simplify your payoff timeline.'
  const timelineBlurb = hasTimeSavings
    ? `At your current pace, this debt runs alongside your business for the next ${currentYearsLabel}. Entrepreneur-tier relief closes it in ${programYearsLabel}, and gives you back the runway in between.`
    : `At your current pace, this debt still stretches over roughly ${currentYearsLabel}. Entrepreneur-tier relief can reduce the amount resolved and simplify how it gets paid.`

  const businessArc = (businessPct / 100) * DONUT_CIRC

  const clipId = React.useId()
  const startYear = new Date().getFullYear()
  const currentEndYear = startYear + profile.currentYears
  const programEndYear = startYear + profile.programYears
  const reliefFraction = profile.programYears / profile.currentYears
  const currentD = generateCurrentPaymentCurve()
  const reliefD = generateProgramCurve(reliefFraction)
  const reliefEndX = PAD.left + reliefFraction * INNER_W
  const currentEndX = PAD.left + INNER_W
  const bottomY = PAD.top + INNER_H

  const totalYears = Math.max(1, profile.currentYears)
  const yearStep = totalYears > 15 ? 4 : 3
  const xTicks: { year: number; x: number }[] = []
  for (let y = startYear; y <= currentEndYear; y += yearStep) {
    const t = (y - startYear) / totalYears
    xTicks.push({ year: y, x: PAD.left + t * INNER_W })
  }
  if (xTicks[xTicks.length - 1]?.year !== currentEndYear) {
    xTicks.push({ year: currentEndYear, x: PAD.left + INNER_W })
  }

  return (
    <div className="w-full max-w-[555px] mx-auto px-4 sm:px-6 pt-2 sm:pt-4 pb-4 sm:pb-8">
      <div className="flex flex-col items-start w-full">

        {/* ── Phase label — H3 ── */}
        <p
          className={cn(
            'mb-3 transition-opacity duration-500',
            stage >= 1 ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            color: MUTED,
          }}
        >
          You Qualify
        </p>

        {/* ── Headline — H1 ── */}
        <h1
          className={cn(
            'font-display mb-3 transition-opacity duration-700',
            stage >= 1 ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            fontSize: 'clamp(32px, 5vw, 40px)',
            fontWeight: 600,
            lineHeight: 1.15,
            color: NAVY,
          }}
        >
          Of your {formatCurrency(debtAmount)} total,{' '}
          <span style={{ color: TEAL }}>{formatCurrency(businessOriginDebt)} qualifies</span> for
          entrepreneur-tier relief.
        </h1>

        {/* ── Sub-copy — Body lead ── */}
        <p
          className={cn(
            'mb-10 transition-opacity duration-700',
            stage >= 1 ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            fontSize: '15px',
            fontWeight: 400,
            lineHeight: 1.5,
            color: '#666666',
            transitionDelay: '200ms',
          }}
        >
          Most owners in your position will pay roughly {formatCurrency(currentPaymentTotal)} on
          this debt over the next {currentYearsLabel}. Entrepreneur-tier relief drops that to
          ~{formatCurrency(estimatedSettlement)} over {programYearsLabel}. Here&apos;s the
          breakdown.
        </p>

        {/* ── Section 1: The split (donut chart) ── */}
        <div
          ref={pieRef}
          className={cn(
            'w-full rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 mb-8 transition-all duration-700',
            stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          )}
        >
          <p className="font-bold mb-5" style={{ fontSize: '14px', color: NAVY }}>
            The split, based on your answers
          </p>

          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6 sm:gap-8">
            {/* Donut */}
            <div className="w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] flex-shrink-0">
              <svg viewBox={`0 0 ${DONUT_VB} ${DONUT_VB}`} className="w-full h-full">
                <circle
                  cx={DONUT_CENTER}
                  cy={DONUT_CENTER}
                  r={DONUT_R}
                  fill="none"
                  stroke={SEGMENT_GREY}
                  strokeWidth={DONUT_STROKE}
                />
                <circle
                  cx={DONUT_CENTER}
                  cy={DONUT_CENTER}
                  r={DONUT_R}
                  fill="none"
                  stroke={TEAL}
                  strokeWidth={DONUT_STROKE}
                  strokeDasharray={`${DONUT_CIRC} ${DONUT_CIRC}`}
                  strokeDashoffset={pieInView ? DONUT_CIRC - businessArc : DONUT_CIRC}
                  transform={`rotate(-90 ${DONUT_CENTER} ${DONUT_CENTER})`}
                  style={{ transition: 'stroke-dashoffset 800ms ease-out' }}
                />
                <text
                  x={DONUT_CENTER}
                  y={DONUT_CENTER - 6}
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="700"
                  fill={TEAL}
                >
                  {formatCurrency(businessOriginDebt)}
                </text>
                <text
                  x={DONUT_CENTER}
                  y={DONUT_CENTER + 14}
                  textAnchor="middle"
                  fontSize="13"
                  fill={CAPTION_GREY}
                >
                  qualifies
                </text>
              </svg>
            </div>

            {/* Legend */}
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div
                  className="w-4 h-4 rounded-sm flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: TEAL }}
                />
                <p style={{ fontSize: '14px', fontWeight: 600, color: NAVY }}>
                  Qualifies for entrepreneur relief: {formatCurrency(businessOriginDebt)}
                  <span style={{ color: CAPTION_GREY, fontWeight: 400, marginLeft: '6px' }}>
                    ({businessPct}%)
                  </span>
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div
                  className="w-4 h-4 rounded-sm flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: SEGMENT_GREY }}
                />
                <p style={{ fontSize: '14px', fontWeight: 600, color: NAVY }}>
                  Standard consumer relief: {formatCurrency(personalOriginDebt)}
                  <span style={{ color: CAPTION_GREY, fontWeight: 400, marginLeft: '6px' }}>
                    ({personalPct}%)
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── CTA (after donut) ── */}
        <div
          className={cn(
            'w-full mb-8 transition-all duration-700',
            stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          )}
          style={{ transitionDelay: '100ms' }}
        >
          <Button fullWidth showTrailingIcon onClick={onContinue}>
            Claim my entrepreneur-tier relief
          </Button>
          <div className="flex flex-col items-center gap-1 mt-3">
            <p style={{ fontSize: '14px', color: CAPTION_GREY }}>
              Your information is secure and never shared
            </p>
            <p style={{ fontSize: '13px', color: '#BBBBBB' }}>
              30 seconds · No signup required · Free
            </p>
          </div>
        </div>

        {/* ── Section 2: The math — H2 header + chart ── */}
        <h2
          className={cn(
            'mb-1 transition-opacity duration-700',
            stage >= 2 ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            fontSize: 'clamp(20px, 3.5vw, 24px)',
            fontWeight: 600,
            lineHeight: 1.25,
            color: NAVY,
            transitionDelay: '100ms',
          }}
        >
          {savingsHeading}
        </h2>
        <p
          className={cn(
            'mb-5 transition-opacity duration-700',
            stage >= 2 ? 'opacity-100' : 'opacity-0'
          )}
          style={{ fontSize: '14px', color: CAPTION_GREY, transitionDelay: '100ms' }}
        >
          {timelineBlurb}
        </p>

        <div
          ref={barsRef}
          className={cn(
            'w-full bg-white border border-neutral-200 rounded-xl overflow-hidden mb-4 transition-all duration-700',
            stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          )}
          style={{ transitionDelay: '150ms' }}
        >
          <div className="px-4 pt-4 pb-1">
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              className="w-full"
              role="img"
              aria-label="Debt payoff comparison chart"
            >
              <defs>
                <clipPath id={clipId}>
                  <rect
                    x={PAD.left}
                    y={0}
                    height={VB_H}
                    width={barsInView ? INNER_W + PAD.right : 0}
                    style={{ transition: 'width 900ms ease-out' }}
                  />
                </clipPath>
                <linearGradient id={`${clipId}-relief`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={GREEN} stopOpacity="0.15" />
                  <stop offset="100%" stopColor={GREEN} stopOpacity="0.02" />
                </linearGradient>
                <linearGradient id={`${clipId}-current`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={RED} stopOpacity="0.10" />
                  <stop offset="100%" stopColor={RED} stopOpacity="0.02" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              {[0.25, 0.5, 0.75, 1].map((frac) => (
                <line
                  key={frac}
                  x1={PAD.left}
                  y1={PAD.top + frac * INNER_H}
                  x2={PAD.left + INNER_W}
                  y2={PAD.top + frac * INNER_H}
                  stroke="#F0F0F0"
                  strokeWidth="1"
                />
              ))}

              {/* Area fills */}
              <path
                d={generateAreaPath(currentD)}
                fill={`url(#${clipId}-current)`}
                className="transition-opacity duration-300"
                style={{ opacity: barsInView ? 1 : 0 }}
              />
              <path
                d={generateAreaPath(reliefD)}
                fill={`url(#${clipId}-relief)`}
                className="transition-opacity duration-300"
                style={{ opacity: barsInView ? 1 : 0 }}
              />

              {/* Lines */}
              <g clipPath={`url(#${clipId})`}>
                <path d={currentD} fill="none" stroke={RED} strokeWidth="3" />
                <path d={reliefD} fill="none" stroke={GREEN} strokeWidth="3" />
                <circle cx={PAD.left} cy={PAD.top} r="4" fill={NAVY} />
                <circle
                  cx={reliefEndX}
                  cy={bottomY}
                  r="5"
                  fill={GREEN}
                  className="transition-opacity duration-500"
                  style={{ opacity: barsInView ? 1 : 0 }}
                />
                <circle
                  cx={currentEndX}
                  cy={bottomY}
                  r="4"
                  fill={RED}
                  className="transition-opacity duration-500"
                  style={{ opacity: barsInView ? 1 : 0 }}
                />
              </g>

              {/* Y-axis labels */}
              <text x={PAD.left - 6} y={PAD.top + 4} textAnchor="end" fontSize="9" fill="#B0B0B0">
                {formatCurrency(businessOriginDebt)}
              </text>
              <text x={PAD.left - 6} y={bottomY + 3} textAnchor="end" fontSize="9" fill="#B0B0B0">
                $0
              </text>

              {/* X-axis baseline */}
              <line
                x1={PAD.left}
                y1={bottomY}
                x2={PAD.left + INNER_W}
                y2={bottomY}
                stroke="#EDEDED"
                strokeWidth="1"
              />

              {/* X-axis ticks */}
              {xTicks.map((tick) => (
                <text
                  key={tick.year}
                  x={tick.x}
                  y={bottomY + 16}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#6A6A6A"
                >
                  {tick.year}
                </text>
              ))}

              {/* Endpoint annotations */}
              <text
                x={reliefEndX}
                y={bottomY + 32}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill={GREEN}
                className="transition-opacity duration-500"
                style={{ opacity: barsInView ? 1 : 0 }}
              >
                {programEndYear}
              </text>
              <text
                x={currentEndX}
                y={bottomY + 32}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill={RED}
                className="transition-opacity duration-500"
                style={{ opacity: barsInView ? 1 : 0 }}
              >
                {currentEndYear}
              </text>

              {/* Legend */}
              <line x1={PAD.left} y1={PAD.top - 16} x2={PAD.left + 18} y2={PAD.top - 16} stroke={GREEN} strokeWidth="3" />
              <text x={PAD.left + 22} y={PAD.top - 13} fontSize="9" fill={NAVY} fontWeight="500">
                With entrepreneur relief
              </text>
              <line x1={PAD.left + 160} y1={PAD.top - 16} x2={PAD.left + 178} y2={PAD.top - 16} stroke={RED} strokeWidth="3" />
              <text x={PAD.left + 182} y={PAD.top - 13} fontSize="9" fill="#B0B0B0">
                At your current payment
              </text>
            </svg>
          </div>
        </div>

        {/* ── Disclaimer — Caption ── */}
        <div
          className={cn(
            'w-full rounded-xl px-5 py-4 mb-6 flex items-start gap-3 transition-all duration-700',
            stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          )}
          style={{ backgroundColor: '#F0F5FA', transitionDelay: '350ms' }}
        >
          <svg
            className="w-5 h-5 shrink-0 mt-0.5"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden
          >
            <circle cx="10" cy="10" r="9" stroke="#6A6A6A" strokeWidth="1.5" />
            <path
              d="M10 9v4M10 6.5v.01"
              stroke="#6A6A6A"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <p style={{ fontSize: '13px', color: '#555555', lineHeight: '1.5' }}>
            These estimates are based on industry-average settlement outcomes from the American
            Association for Debt Resolution. Your actual results depend on your specific financial
            situation, creditor agreements, and the program you enroll in. Not a guarantee of savings
            or timeline.
          </p>
        </div>
      </div>
    </div>
  )
}

export default RevealScreen

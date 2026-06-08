'use client'

import * as React from 'react'
import confetti from 'canvas-confetti'
import { Phone } from 'lucide-react'
import { Button, Input, StickyButtonContainer } from '@/components/ui'
import { formatCurrency, cn } from '@/lib/utils'

const NAVY = '#1B2A4A'
const TEAL = '#007AC8'
const GREEN = '#0C7663'
const MUTED = '#888899'
const CAPTION_GREY = '#999999'

function roundTo250(value: number): number {
  return Math.round(value / 250) * 250
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
  onContinue?: () => void
  onPhoneSubmit?: (phone: string) => void
  skipIntro?: boolean
}

export function RevealScreen({
  debtAmount,
  onContinue,
  onPhoneSubmit,
  skipIntro,
}: RevealScreenProps) {
  const [stage, setStage] = React.useState(skipIntro ? 2 : 0)
  const [phone, setPhone] = React.useState('')
  const [scoreRef, scoreInView] = useInView(0.2)
  const [animatedScore, setAnimatedScore] = React.useState(0)

  const protectionScore = 72
  const estimatedReduction = roundTo250(debtAmount * 0.39)
  const monthlyRelief = Math.round((debtAmount * 0.03) / 12) * 10

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

  React.useEffect(() => {
    if (!scoreInView) return
    let current = 0
    const target = protectionScore
    const duration = 1200
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      current = Math.round(eased * target)
      setAnimatedScore(current)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [scoreInView, protectionScore])

  const needleAngle = Math.PI * (1 - animatedScore / 100)

  return (
    <div className="w-full max-w-[555px] mx-auto px-4 sm:px-6 pt-2 sm:pt-4 pb-4 sm:pb-8">
      <div className="flex flex-col items-center w-full">

        <p
          className={cn(
            'mb-2 text-center transition-opacity duration-500',
            stage >= 1 ? 'opacity-100' : 'opacity-0'
          )}
          style={{ fontSize: '13px', color: MUTED }}
        >
          Your personalized results are ready
        </p>

        <h1
          className={cn(
            'font-display mb-6 text-center transition-opacity duration-700',
            stage >= 1 ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            fontSize: 'clamp(24px, 4vw, 32px)',
            fontWeight: 600,
            lineHeight: 1.2,
            color: NAVY,
          }}
        >
          Your Fixed-Income<br />Protection Score
        </h1>

        {/* Score Gauge */}
        <div
          ref={scoreRef}
          className={cn(
            'w-full rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 mb-6 transition-all duration-700',
            stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          )}
        >
          <div className="flex flex-col items-center">
            <div className="relative w-[200px] h-[110px] mb-4">
              <svg viewBox="0 0 200 110" className="w-full h-full">
                {/* Background arc */}
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                {/* Colored arc (green portion) */}
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke={GREEN}
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${(animatedScore / 100) * 251.3} 251.3`}
                  style={{ transition: 'stroke-dasharray 100ms ease-out' }}
                />
                {/* Needle */}
                <line
                  x1="100"
                  y1="100"
                  x2={100 + 60 * Math.cos(needleAngle)}
                  y2={100 - 60 * Math.sin(needleAngle)}
                  stroke={NAVY}
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={{ transition: 'all 100ms ease-out' }}
                />
                <circle cx="100" cy="100" r="6" fill={NAVY} />
              </svg>
            </div>

            <p className="text-center mb-1" style={{ fontSize: '48px', fontWeight: 700, color: TEAL }}>
              {animatedScore} <span style={{ fontSize: '18px', fontWeight: 400, color: CAPTION_GREY }}>out of 100</span>
            </p>

            <div className="flex items-center gap-4 mb-4">
              <span style={{ fontSize: '12px', color: CAPTION_GREY }}>Some risk</span>
              <div className="w-32 h-2 rounded-full overflow-hidden" style={{ background: 'linear-gradient(to right, #EB4015, #F3C060, #0C7663)' }} />
              <span style={{ fontSize: '12px', color: CAPTION_GREY }}>Very protected</span>
            </div>
          </div>

          {/* Qualification badge */}
          <div
            className="w-full rounded-xl px-5 py-4 mb-4"
            style={{ backgroundColor: '#E1F5EE' }}
          >
            <div className="flex items-center justify-center gap-2">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
                <path d="M15 4.5L6.75 13.5L3 9.5" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-bold" style={{ fontSize: '15px', color: GREEN }}>
                You qualify for significant debt reduction
              </span>
            </div>
          </div>

          {/* Stats cards */}
          <div className="flex flex-col gap-3">
            <div className="w-full rounded-xl border border-neutral-200 bg-white px-5 py-6 text-center">
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: NAVY }}>
                You Could Save
              </p>
              <p className="font-display mb-1" style={{ fontSize: 'clamp(32px, 5vw, 44px)', fontWeight: 700, color: TEAL }}>
                {formatCurrency(estimatedReduction)}
              </p>
              <p style={{ fontSize: '14px', color: CAPTION_GREY }}>
                Estimated total debt reduction
              </p>
            </div>

            <div className="w-full rounded-xl border border-neutral-200 bg-white px-5 py-6 text-center">
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: NAVY }}>
                Debt-Free In About
              </p>
              <p className="font-display mb-1" style={{ fontSize: 'clamp(32px, 5vw, 44px)', fontWeight: 700, color: TEAL }}>
                3-4 Yrs
              </p>
              <p style={{ fontSize: '14px', color: CAPTION_GREY }}>
                Estimated timeline
              </p>
            </div>
          </div>

          <p className="text-center mt-4" style={{ fontSize: '12px', color: CAPTION_GREY }}>
            23 people in your area checked their score today
          </p>
        </div>

        {/* Phone capture */}
        <div
          className={cn(
            'w-full rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 mb-6 transition-all duration-700',
            stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          )}
          style={{ transitionDelay: '100ms' }}
        >
          <div className="flex items-start gap-3 mb-4">
            <div
              className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#EEF2FF' }}
            >
              <Phone className="w-5 h-5" style={{ color: TEAL }} />
            </div>
            <div>
              <h3 className="font-bold" style={{ fontSize: '16px', color: NAVY }}>
                Enter Your Phone Number To Get your personalized debt-free plan
              </h3>
            </div>
          </div>

          <p className="mb-5" style={{ fontSize: '14px', color: '#666666', lineHeight: 1.6 }}>
            A debt relief specialist may call to walk you through your estimated savings, monthly payment range, and next steps.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (phone.trim()) {
                onPhoneSubmit?.(phone.trim())
                onContinue?.()
              }
            }}
          >
            <div className="mb-4">
              <Input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <Button fullWidth type="submit">
              Unlock Your Debt Relief Plan
            </Button>
          </form>

          <p className="text-center mt-3" style={{ fontSize: '13px', color: CAPTION_GREY }}>
            Free &bull; No obligation
          </p>
        </div>

        {/* Explanation card */}
        <div
          className={cn(
            'w-full rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 mb-6 transition-all duration-700',
            stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          )}
          style={{ transitionDelay: '200ms' }}
        >
          <h3 className="font-bold mb-2" style={{ fontSize: '16px', color: NAVY }}>
            Good protection potential
          </h3>
          <p style={{ fontSize: '14px', color: '#666666', lineHeight: 1.6 }}>
            Your profile fits several fixed-income relief options. Many clients in similar
            situations see meaningful debt reduction — often 40% or more of unsecured balances.
          </p>
          <div className="flex items-start gap-2 mt-3 rounded-lg px-3 py-2" style={{ backgroundColor: '#F9FAFB' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
              <circle cx="8" cy="8" r="7" stroke="#9CA3AF" strokeWidth="1.5" />
              <path d="M8 7v3.5M8 5v.01" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p style={{ fontSize: '12px', color: '#9CA3AF', lineHeight: 1.5 }}>
              Estimates based on typical program outcomes. Individual results vary. Not legal or financial advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RevealScreen

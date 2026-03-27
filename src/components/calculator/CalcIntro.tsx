'use client'

import * as React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui'
import { LottieIcon } from '@/components/ui/LottieIcon'
import relaxAnimation from '../../../public/Relax.json'

interface CalcIntroProps {
  onStart: () => void
}

const START_YEAR = 2049
const END_YEAR = 2028
const TICK_MS = 80
const START_DELAY_MS = 600

function yearColor(year: number): string {
  const total = START_YEAR - END_YEAR
  const progress = (START_YEAR - year) / total // 0 → 1

  if (progress < 0.33) {
    // Red → Yellow
    const t = progress / 0.33
    const r = Math.round(235 + (234 - 235) * t)
    const g = Math.round(64 + (179 - 64) * t)
    const b = Math.round(21 + (8 - 21) * t)
    return `rgb(${r},${g},${b})`
  }
  if (progress < 0.66) {
    // Yellow → Green
    const t = (progress - 0.33) / 0.33
    const r = Math.round(234 + (12 - 234) * t)
    const g = Math.round(179 + (118 - 179) * t)
    const b = Math.round(8 + (99 - 8) * t)
    return `rgb(${r},${g},${b})`
  }
  // Green — settle into final color
  return '#0C7663'
}

export function CalcIntro({ onStart }: CalcIntroProps) {
  const [displayYear, setDisplayYear] = React.useState(START_YEAR)

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      let year = START_YEAR
      const interval = setInterval(() => {
        year -= 1
        setDisplayYear(year)
        if (year <= END_YEAR) clearInterval(interval)
      }, TICK_MS)
      return () => clearInterval(interval)
    }, START_DELAY_MS)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="w-full max-w-[555px] mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-4 sm:pb-8">
      <div className="flex flex-col items-center w-full text-center">
        {/* Lottie animation */}
        <div className="animate-fade-in-up mb-4" style={{ width: '160px', height: '160px', animationDelay: '200ms' }}>
          <LottieIcon animationData={relaxAnimation} className="w-full h-full" />
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-in-up font-display text-display sm:text-display-md lg:text-display-lg mb-3"
          style={{ animationDelay: '300ms', color: '#1B2A4A' }}
        >
          You could be debt-free
          <br />
          <span style={{ color: yearColor(displayYear), fontVariantNumeric: 'tabular-nums' }}>
            by {displayYear}
          </span>
        </h1>

        {/* Subtext */}
        <p
          className="animate-fade-in-up leading-relaxed mb-6"
          style={{ animationDelay: '400ms', fontSize: '15px', color: '#666666' }}
        >
          Most people have never calculated it. Get your personalized savings timeline in seconds.
        </p>

        {/* Example box */}
        <div
          className="animate-fade-in-up w-full text-left mb-8"
          style={{
            animationDelay: '500ms',
            backgroundColor: '#F5F5F7',
            borderRadius: '12px',
            padding: '20px',
          }}
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
                The average American with $15,000 in credit card debt could be debt-free by{' '}
                <span className="font-bold" style={{ color: '#0C7663' }}>2028</span> instead of{' '}
                <span className="font-bold" style={{ color: '#EB4015' }}>2049</span> on minimum payments.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="animate-fade-in-up w-full" style={{ animationDelay: '600ms' }}>
          <Button fullWidth showTrailingIcon onClick={onStart}>
            See How Much I Could Save
          </Button>
        </div>

        {/* Trust badges */}
        <div
          className="animate-fade-in-up w-full px-5 py-4 mt-6"
          style={{ animationDelay: '700ms' }}
        >
          <p style={{ fontSize: '13px', color: '#666666', marginBottom: '10px' }}>
            It&apos;s free and will not affect your credit score
          </p>

          {/* Trustpilot row */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#1B2A4A' }}>Excellent</span>
            <Image src="/trustpilot-stars.svg" alt="Trustpilot 5 stars" width={120} height={24} unoptimized />
            <Image src="/trustpilot-logo.svg" alt="Trustpilot" width={90} height={22} unoptimized className="ml-1" />
          </div>

          {/* BBB row */}
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-3 border border-neutral-200 rounded-lg px-4 py-2.5 bg-white">
              <Image src="/bbb-accredited.svg" alt="BBB Accredited Business" width={90} height={44} unoptimized />
              <div className="text-left">
                <p style={{ fontSize: '12px', fontWeight: 700, color: '#1B2A4A' }}>BBB Rating: A+</p>
                <p style={{ fontSize: '10px', color: '#00B67A' }}>As of 3/26/2026</p>
                <p style={{ fontSize: '9px', color: '#999999' }}>Click for Profile</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalcIntro

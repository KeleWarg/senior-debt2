'use client'

import * as React from 'react'
import Image from 'next/image'
import { Lock, ShieldCheck } from 'lucide-react'
import { trackEvent } from '@/components/calculator/shared/tracking'

function TrustItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 shrink-0 px-6">
      {children}
    </div>
  )
}

function TrustStrip() {
  return (
    <>
      <TrustItem>
        <span style={{ fontSize: '14px', fontWeight: 700, color: '#1B2A4A' }}>4.5</span>
        <svg width="120" height="24" viewBox="0 0 120 24" fill="none" aria-label="4.5 out of 5 stars">
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={i * 25} y="0" width="22" height="22" rx="2" fill="#00B67A" />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M${i * 25 + 11},3.5 L${i * 25 + 13.5},9 L${i * 25 + 19.5},9.5 L${i * 25 + 15},13.5 L${i * 25 + 16},19 L${i * 25 + 11},16 L${i * 25 + 6},19 L${i * 25 + 7},13.5 L${i * 25 + 2.5},9.5 L${i * 25 + 8.5},9 Z`} fill="#fff" />
          ))}
          <defs>
            <clipPath id="half-star-clip">
              <rect x="100" y="0" width="11" height="22" />
            </clipPath>
          </defs>
          <rect x="100" y="0" width="22" height="22" rx="2" fill="#DCDCE6" />
          <rect x="100" y="0" width="11" height="22" rx="0" fill="#00B67A" />
          <path d="M111,3.5 L113.5,9 L119.5,9.5 L115,13.5 L116,19 L111,16 L106,19 L107,13.5 L102.5,9.5 L108.5,9 Z" fill="#fff" />
        </svg>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#1B2A4A' }}>Excellent</span>
        <Image src="/trustpilot-logo.svg" alt="Trustpilot" width={90} height={22} unoptimized />
      </TrustItem>

      <TrustItem>
        <Image src="/bbb-accredited.svg" alt="BBB Accredited Business" width={90} height={44} unoptimized />
        <span style={{ fontSize: '13px', fontWeight: 700, color: '#1B2A4A' }}>BBB Rating: A+</span>
        <span style={{ fontSize: '11px', color: '#00B67A' }}>As of 3/2026</span>
      </TrustItem>

      <TrustItem>
        <Lock className="w-4 h-4 text-[#0C7663]" aria-hidden />
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#1B2A4A' }}>256-bit SSL Encryption</span>
      </TrustItem>

      <TrustItem>
        <ShieldCheck className="w-4 h-4 text-[#0C7663]" aria-hidden />
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#1B2A4A' }}>No credit score impact</span>
      </TrustItem>
    </>
  )
}

export function TrustBar() {
  React.useEffect(() => {
    trackEvent('trust_bar_impression', { section: 'trust_bar' })
  }, [])

  return (
    <section
      className="w-full py-1 overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
      }}
    >
      <div className="trust-marquee flex items-center w-max">
        <div className="trust-marquee-inner flex items-center">
          <TrustStrip />
        </div>
        <div className="trust-marquee-inner flex items-center" aria-hidden>
          <TrustStrip />
        </div>
      </div>
    </section>
  )
}

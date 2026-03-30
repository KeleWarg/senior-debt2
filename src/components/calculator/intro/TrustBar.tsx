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
        <span style={{ fontSize: '14px', fontWeight: 700, color: '#1B2A4A' }}>Excellent</span>
        <Image src="/trustpilot-stars.svg" alt="Trustpilot 5 stars" width={120} height={24} unoptimized />
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

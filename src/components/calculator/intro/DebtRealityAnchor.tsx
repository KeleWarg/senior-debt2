'use client'

import * as React from 'react'
import { trackEvent } from '@/components/calculator/shared/tracking'

export function DebtRealityAnchor({ children, onCta }: { children?: React.ReactNode; onCta?: () => void }) {
  const sectionRef = React.useRef<HTMLDivElement>(null)
  const viewed = React.useRef(false)

  React.useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3 && !viewed.current) {
          viewed.current = true
          trackEvent('section_viewed', { section: 'comparison_timeline' })
        }
      },
      { threshold: [0.3] }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={sectionRef} className="w-full" style={{ backgroundColor: '#E8F5EC' }}>
      <section className="w-full max-w-[720px] mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-10">
        <p className="text-[13px] font-medium text-neutral-500 text-center mb-3 tracking-wide uppercase">
          Compare your paths
        </p>
        <h2 className="font-sans text-center mb-4 max-w-[500px] mx-auto text-[32px] sm:text-[38px] text-neutral-800 leading-[1.15] font-semibold">
          Three years to clear it. Or fifteen.
        </h2>
        <p className="text-center max-w-[520px] mx-auto mb-10 text-[15px] text-neutral-500 leading-relaxed">
          See what a structured program does to $45K in business-origin debt
        </p>

        {children}
      </section>
    </div>
  )
}

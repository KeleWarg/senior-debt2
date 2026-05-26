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
        {children}
      </section>
    </div>
  )
}

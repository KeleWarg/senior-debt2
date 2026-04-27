'use client'

import * as React from 'react'
import { Button } from '@/components/ui'
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
          trackEvent('section_viewed', { section: 'comparison_table' })
        }
      },
      { threshold: [0.3] }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={sectionRef} className="w-full" style={{ backgroundColor: '#E8F5EC' }}>
      <section className="w-full max-w-[720px] mx-auto px-4 sm:px-6 pt-16 pb-10">
        <p className="text-[13px] font-medium text-neutral-500 text-center mb-3 tracking-wide uppercase">
          Compare your options
        </p>
        <h2 className="font-sans text-center mb-4 max-w-[500px] mx-auto text-[32px] sm:text-[38px] text-neutral-800 leading-[1.15] font-semibold">
          See the difference debt relief could make
        </h2>
        <p className="text-center max-w-[520px] mx-auto mb-10 text-[15px] text-neutral-500 leading-relaxed">
          Instead of paying back 90–100% of your balance plus interest, debt relief
          programs negotiate to settle for as little as{' '}
          <span className="font-semibold text-neutral-800">50%</span>.
        </p>

        {children}

        {onCta && (
          <div className="w-full max-w-md mx-auto mt-10">
            <Button fullWidth showTrailingIcon onClick={onCta}>
              Calculate your debt-free date
            </Button>
          </div>
        )}
      </section>
    </div>
  )
}

'use client'

import * as React from 'react'
import { Gift } from 'lucide-react'
import { trackEvent } from '@/components/calculator/shared/tracking'

interface ValueBannerProps {
  onContinue?: () => void
}

export function ValueBanner({ onContinue }: ValueBannerProps) {
  React.useEffect(() => {
    trackEvent('banner_impression', { section: 'value_banner', page: 'calculator_intro' })
  }, [])

  return (
    <div
      className="sticky top-14 z-40 w-full overflow-hidden text-white px-4 py-3 sm:py-3.5 flex items-center justify-center gap-3 sm:gap-4 text-center shadow-sm"
      style={{ background: '#3D1D93' }}
    >
      <span className="relative z-10 shrink-0 inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
        <Gift className="h-3.5 w-3.5" aria-hidden />
        New
      </span>

      <p className="relative z-10 text-sm sm:text-base font-medium leading-snug text-white text-left">
        Get a free personalized debt-free program: Typically costs $50–$100.
      </p>

      {/* Continue CTA — stays to the right */}
      <button
        type="button"
        onClick={onContinue}
        className="relative z-10 shrink-0 inline-flex items-center gap-1.5 rounded-full border border-white bg-white text-[#3D1D93] px-4 py-1.5 text-sm font-semibold hover:bg-white/90 transition-colors"
      >
        Continue
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

'use client'

import * as React from 'react'
import { Gift } from 'lucide-react'
import { trackEvent } from '@/components/calculator/shared/tracking'

export function ValueBanner() {
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
    </div>
  )
}

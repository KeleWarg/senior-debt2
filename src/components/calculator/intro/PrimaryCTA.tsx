'use client'

import { Button } from '@/components/ui'
import type { MotivationDriver } from '@/types/calculator'
import { trackEvent } from '@/components/calculator/shared/tracking'

interface PrimaryCTAProps {
  motivation: MotivationDriver | null
  onClick: () => void
}

export function PrimaryCTA({ motivation, onClick }: PrimaryCTAProps) {
  const handle = () => {
    trackEvent('cta_clicked', {
      section: 'primary_cta',
      motivation: motivation ? String(motivation) : 'none',
    })
    onClick()
  }

  return (
    <section className="w-full max-w-[555px] mx-auto px-4 sm:px-6 py-12 pb-16">
      <Button fullWidth showTrailingIcon onClick={handle}>
        Calculate Your Debt-Free Date
      </Button>
      <p className="text-center mt-3 leading-relaxed" style={{ fontSize: '13px', color: '#666666' }}>
        Takes 30 seconds · No signup required · Free ($50–$100 value)
      </p>
    </section>
  )
}

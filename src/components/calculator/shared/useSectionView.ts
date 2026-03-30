'use client'

import * as React from 'react'
import { trackEvent } from './tracking'

export function useSectionViewOnce(
  ref: React.RefObject<HTMLElement | null>,
  section: string,
  extra?: Record<string, string | number>
): void {
  const fired = React.useRef(false)
  const extraRef = React.useRef(extra)
  extraRef.current = extra

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5 && !fired.current) {
          fired.current = true
          trackEvent('section_viewed', { section, ...extraRef.current })
        }
      },
      { threshold: [0.5] }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [ref, section])
}

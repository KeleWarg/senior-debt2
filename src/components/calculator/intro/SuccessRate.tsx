'use client'

import * as React from 'react'
import { SUCCESS_DATA } from '@/components/calculator/shared/constants'
import { formatCurrency } from '@/lib/utils'
import { useSectionViewOnce } from '@/components/calculator/shared/useSectionView'

function useCountUp(target: number, active: boolean, durationMs = 1500) {
  const [n, setN] = React.useState(0)
  React.useEffect(() => {
    if (!active) return
    const start = performance.now()
    const run = (t: number) => {
      const p = Math.min((t - start) / durationMs, 1)
      const eased = 1 - (1 - p) ** 3
      setN(Math.round(target * eased))
      if (p < 1) requestAnimationFrame(run)
    }
    requestAnimationFrame(run)
  }, [active, target])
  return n
}

export function SuccessRate() {
  const ref = React.useRef<HTMLElement>(null)
  const [active, setActive] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setActive(true)
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useSectionViewOnce(ref, 'success_rate')

  const pct = useCountUp(SUCCESS_DATA.percentage, active)
  const display = SUCCESS_DATA.show

  if (!display) return null

  return (
    <section
      ref={ref}
      className="w-full max-w-[555px] mx-auto px-4 sm:px-6 py-12"
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-center gap-2 sm:gap-4 text-center">
        <span className="font-display text-display sm:text-display-md lg:text-display-lg font-bold text-feedback-success tabular-nums">
          {pct}%
        </span>
        <p className="max-w-md leading-relaxed" style={{ fontSize: '15px', color: '#666666' }}>
          of enrolled participants reduced their total debt by an average of{' '}
          {formatCurrency(SUCCESS_DATA.avgReduction)}
        </p>
      </div>
      <p className="text-caption text-neutral-500 text-center mt-4">{SUCCESS_DATA.source}</p>
    </section>
  )
}

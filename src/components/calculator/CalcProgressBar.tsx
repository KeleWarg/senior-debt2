'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { CalcStep } from '@/types/calculator'

const STEP_PROGRESS: Partial<Record<CalcStep, number>> = {
  intro: 0,
  role: 33,
  totalDebt: 66,
  shiftSituation: 90,
  loader: 95,
  reveal: 100,
}

interface CalcProgressBarProps {
  step: CalcStep
  onBack?: () => void
  dark?: boolean
}

export function CalcProgressBar({ step, onBack, dark }: CalcProgressBarProps) {
  const target = STEP_PROGRESS[step] ?? 0
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setProgress(target)
    })
    return () => cancelAnimationFrame(raf)
  }, [target])

  return (
    <div className="w-full py-3">
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className={cn(
              'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors',
              dark
                ? 'bg-white/10 text-white hover:bg-white/20'
                : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
            )}
            aria-label="Go back"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        <div
          className="flex-1 h-[6px] rounded-full overflow-hidden"
          style={{ backgroundColor: dark ? 'rgba(255,255,255,0.2)' : '#E0E0E6' }}
        >
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${progress}%`,
              backgroundColor: dark ? '#FFB934' : '#1A1A2E',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default CalcProgressBar

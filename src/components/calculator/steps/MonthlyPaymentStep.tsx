'use client'

import * as React from 'react'
import { Input, RadioGroup, RadioGridCard } from '@/components/ui'
import { cn } from '@/lib/utils'

const PRESETS = [
  { id: 'lt200', label: 'Less than $200', mid: 150 },
  { id: '200-350', label: '$200 – $350', mid: 275 },
  { id: '350-500', label: '$350 – $500', mid: 425 },
  { id: '500-750', label: '$500 – $750', mid: 625 },
  { id: '750p', label: '$750+', mid: 850 },
] as const

interface MonthlyPaymentStepProps {
  initialValue: number
  onSubmit: (value: number) => void
  onBack: () => void
}

function parseMoney(raw: string): number {
  const n = Number.parseInt(raw.replace(/\D/g, ''), 10)
  return Number.isFinite(n) ? n : 0
}

export function MonthlyPaymentStep({ initialValue, onSubmit, onBack }: MonthlyPaymentStepProps) {
  const [custom, setCustom] = React.useState('')
  const [preset, setPreset] = React.useState<string | undefined>(undefined)

  React.useEffect(() => {
    const match = PRESETS.find((p) => p.mid === initialValue)
    if (match) setPreset(match.id)
  }, [initialValue])

  const scheduleSubmit = React.useCallback(
    (value: number) => {
      window.setTimeout(() => onSubmit(value), 500)
    },
    [onSubmit]
  )

  const handlePreset = (id: string) => {
    setPreset(id)
    setCustom('')
    const p = PRESETS.find((x) => x.id === id)
    if (p) scheduleSubmit(p.mid)
  }

  const handleCustomBlur = () => {
    const v = parseMoney(custom)
    if (v > 0) {
      setPreset(undefined)
      scheduleSubmit(v)
    }
  }

  return (
    <div className="w-full max-w-[555px] mx-auto px-4 sm:px-6 pt-2 sm:pt-4 pb-4 sm:pb-8">
      <button
        type="button"
        onClick={onBack}
        className="text-body-sm font-medium text-primary-700 mb-4 hover:underline"
      >
        ← Back
      </button>

      <p className="text-label uppercase tracking-wider text-neutral-500 mb-3">Step 2 of 2</p>

      <h1 className="font-editorial text-headline-lg sm:text-display text-[#1B2A4A] mb-2">
        About how much do you pay toward debt each month?
      </h1>
      <p className="text-body text-neutral-500 mb-6">Your best estimate is fine.</p>

      <RadioGroup value={preset} onValueChange={handlePreset} className="grid grid-cols-2 gap-3 mb-6">
        {PRESETS.map((p) => (
          <RadioGridCard key={p.id} value={p.id}>
            {p.label}
          </RadioGridCard>
        ))}
      </RadioGroup>

      <div>
        <p className="text-body-sm text-neutral-500 mb-2">Or enter exact amount:</p>
        <Input
          type="text"
          inputMode="numeric"
          placeholder="$350"
          value={custom}
          onChange={(e) => {
            setCustom(e.target.value)
            setPreset(undefined)
          }}
          onBlur={handleCustomBlur}
          className={cn(preset && 'opacity-60')}
        />
      </div>
    </div>
  )
}

'use client'

import * as React from 'react'
import {
  CalcLoader,
  RoleStep,
  TotalDebtStep,
  ShiftSituationStep,
  RevealScreen,
} from '@/components/calculator'
import { CalculatorLanding } from '@/components/calculator/intro/CalculatorLanding'
import { CalcProgressBar } from '@/components/calculator/CalcProgressBar'
import { Header } from '@/components/layout/Header'
import { DEFAULT_APR, MOTIVATION_DEFAULTS } from '@/components/calculator/shared/constants'
import type {
  CalcStep,
  CalcFunnelData,
  MotivationDriver,
  HealthcareRole,
  TotalDebtRange,
  ShiftSituation,
} from '@/types/calculator'

const STEP_ORDER: CalcStep[] = [
  'intro',
  'role',
  'totalDebt',
  'shiftSituation',
  'loader',
  'reveal',
]

const FULL_SCREEN_STEPS: CalcStep[] = ['intro', 'loader']

export default function CalculatorPage() {
  const [step, setStep] = React.useState<CalcStep>('intro')
  const [data, setData] = React.useState<CalcFunnelData>({
    debtAmount: 15000,
    interestRate: DEFAULT_APR,
    monthlyPayment: 350,
    motivationDriver: null,
  })
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [step])

  const goTo = (s: CalcStep) => setStep(s)

  const goBack = React.useCallback(() => {
    const idx = STEP_ORDER.indexOf(step)
    if (idx > 0) {
      let prev = idx - 1
      if (STEP_ORDER[prev] === 'loader') prev--
      setStep(STEP_ORDER[prev])
    }
  }, [step])

  const update = (partial: Partial<CalcFunnelData>) => {
    setData((prev) => ({ ...prev, ...partial }))
  }

  const handleLoaderComplete = React.useCallback(() => {
    setStep('reveal')
  }, [])

  const isFullScreen = FULL_SCREEN_STEPS.includes(step)
  const showProgress = !isFullScreen
  const showBack = step !== 'intro' && step !== 'loader'

  if (step === 'intro') {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="flex-1">
          <CalculatorLanding
            motivation={data.motivationDriver ?? null}
            onMotivationSelect={(id: MotivationDriver) => {
              const d = MOTIVATION_DEFAULTS[id]
              update({
                motivationDriver: id,
                debtAmount: d.debtAmount,
                monthlyPayment: d.monthlyPayment,
              })
            }}
            onCta={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
              goTo('role')
            }}
          />
        </div>
      </div>
    )
  }

  if (step === 'loader') {
    return <CalcLoader onComplete={handleLoaderComplete} />
  }

  const renderStep = () => {
    switch (step) {
      case 'role':
        return (
          <RoleStep
            onSubmit={(role: HealthcareRole) => {
              update({ role })
              goTo('totalDebt')
            }}
          />
        )
      case 'totalDebt':
        return (
          <TotalDebtStep
            onSubmit={(range: TotalDebtRange, mid: number) => {
              update({ totalDebt: range, totalDebtMid: mid, debtAmount: mid })
              goTo('shiftSituation')
            }}
          />
        )
      case 'shiftSituation':
        return (
          <ShiftSituationStep
            onSubmit={(situation: ShiftSituation) => {
              update({ shiftSituation: situation })
              goTo('loader')
            }}
          />
        )
      case 'reveal':
        return (
          <RevealScreen
            debtAmount={data.debtAmount}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-page-gradient overflow-auto">
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      {showProgress && (
        <div className="sticky top-[56px] z-40 bg-white">
          <div className="max-w-[555px] mx-auto px-4 sm:px-6">
            <CalcProgressBar step={step} onBack={showBack ? goBack : undefined} />
          </div>
        </div>
      )}
      <div className="flex-1 min-h-0 pb-24 sm:pb-0">
        {renderStep()}
      </div>
    </div>
  )
}

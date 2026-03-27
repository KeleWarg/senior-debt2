'use client'

import * as React from 'react'
import {
  CalcIntro,
  DebtSlider,
  PaymentSlider,
  CalcLoader,
  RevealScreen,
  CalcPII,
} from '@/components/calculator'
import { CalcProgressBar } from '@/components/calculator/CalcProgressBar'
import { Header } from '@/components/layout/Header'
import {
  calculateDebtFreeDate,
  calculateReliefTimeline,
} from '@/lib/calculator'
import type { DebtFreeResult, ReliefResult } from '@/lib/calculator'
import type { CalcStep, CalcFunnelData } from '@/types/calculator'

const DEFAULT_APR = 24.37

const STEP_ORDER: CalcStep[] = [
  'intro',
  'debtAmount',
  'monthlyPayment',
  'loader',
  'reveal',
  'pii',
]

const FULL_SCREEN_STEPS: CalcStep[] = ['intro', 'loader']

export default function CalculatorPage() {
  const [step, setStep] = React.useState<CalcStep>('intro')
  const [data, setData] = React.useState<CalcFunnelData>({
    debtAmount: 15000,
    interestRate: DEFAULT_APR,
    monthlyPayment: 350,
  })
  const [currentResult, setCurrentResult] = React.useState<DebtFreeResult | null>(null)
  const [reliefResult, setReliefResult] = React.useState<ReliefResult | null>(null)

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
    const current = calculateDebtFreeDate(data.debtAmount, DEFAULT_APR, data.monthlyPayment)
    const relief = calculateReliefTimeline(data.debtAmount)
    setCurrentResult(current)
    setReliefResult(relief)
    setStep('reveal')
  }, [data.debtAmount, data.monthlyPayment])

  const isFullScreen = FULL_SCREEN_STEPS.includes(step)
  const showProgress = !isFullScreen
  const showBack = step !== 'intro' && step !== 'loader'

  // Full-screen steps (intro hero, loader)
  if (step === 'intro') {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="flex-1">
          <CalcIntro onStart={() => goTo('debtAmount')} />
        </div>
      </div>
    )
  }

  if (step === 'loader') {
    return <CalcLoader onComplete={handleLoaderComplete} />
  }

  // Standard layout for all other steps
  const renderStep = () => {
    switch (step) {
      case 'debtAmount':
        return (
          <DebtSlider
            initialValue={data.debtAmount}
            onSubmit={(v) => { update({ debtAmount: v }); goTo('monthlyPayment') }}
          />
        )
      case 'monthlyPayment':
        return (
          <PaymentSlider
            initialValue={data.monthlyPayment}
            debtAmount={data.debtAmount}
            interestRate={DEFAULT_APR}
            onSubmit={(v) => { update({ monthlyPayment: v }); goTo('loader') }}
          />
        )
      case 'reveal':
        if (!currentResult || !reliefResult) return null
        return (
          <RevealScreen
            debtAmount={data.debtAmount}
            interestRate={DEFAULT_APR}
            monthlyPayment={data.monthlyPayment}
            currentPath={currentResult}
            reliefPath={reliefResult}
            onContinue={() => goTo('pii')}
          />
        )
      case 'pii':
        {
          const cappedMonths = currentResult?.reachable ? currentResult.months : 420
          const mSaved = Math.max(0, cappedMonths - (reliefResult?.months ?? 0))
          return (
            <CalcPII
              debtAmount={data.debtAmount}
              potentialSavings={
                currentResult?.reachable
                  ? (currentResult.totalPaid - (reliefResult?.totalCost ?? 0))
                  : (data.debtAmount - (reliefResult?.totalCost ?? 0))
              }
              yearsSaved={mSaved >= 12 ? `${Math.floor(mSaved / 12)} years` : `${mSaved} months`}
              onSubmit={(pii) => {
                update(pii)
                alert('Lead submitted! (API integration pending)')
              }}
            />
          )
        }
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
            <CalcProgressBar
              step={step}
              onBack={showBack ? goBack : undefined}
            />
          </div>
        </div>
      )}
      <div className={`flex-1 min-h-0 ${step === 'pii' ? 'pb-44' : 'pb-24 sm:pb-0'}`}>
        {renderStep()}
      </div>
    </div>
  )
}

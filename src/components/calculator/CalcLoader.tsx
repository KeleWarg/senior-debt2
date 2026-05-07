'use client'

import * as React from 'react'
import { Shield, Check, Users } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { cn } from '@/lib/utils'

interface CalcLoaderProps {
  onComplete: () => void
}

const STEPS = [
  'Analyzing your payment structure...',
  'Calculating interest accumulation...',
  'Projecting your debt-free timeline...',
  'Building your personalized report...',
]

export function CalcLoader({ onComplete }: CalcLoaderProps) {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= STEPS.length) {
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 50)
    return () => clearInterval(interval)
  }, [])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onComplete()
    }, 5500)
    return () => clearTimeout(timeout)
  }, [onComplete])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-lg mx-auto text-center py-12 px-4 animate-slide-up">
          <h1
            className="font-display text-display sm:text-display-md"
            style={{ color: '#1B2A4A' }}
          >
            Crunching your numbers...
          </h1>
          <p
            className="mt-3 leading-relaxed"
            style={{ fontSize: '15px', color: '#666666' }}
          >
            We&apos;re building a personalized debt-free timeline based on your inputs.
          </p>

          <div className="space-y-3 inline-flex flex-col items-start mt-8">
            {STEPS.map((step, index) => {
              const isComplete = index < currentStep
              const isCurrent = index === currentStep
              const isPending = index > currentStep

              return (
                <div key={index} className="flex items-center gap-3">
                  {isComplete && (
                    <div className="w-5 h-5 rounded-full bg-feedback-success flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                  )}
                  {isCurrent && (
                    <div className="w-5 h-5 rounded-full border-2 border-primary-700 border-t-transparent animate-spin" />
                  )}
                  {isPending && (
                    <div className="w-5 h-5 rounded-full border-2 border-neutral-200" />
                  )}
                  <span
                    className={cn(
                      'text-body-sm transition-colors duration-300',
                      isPending ? 'text-neutral-500' : 'text-neutral-800'
                    )}
                  >
                    {step}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="w-full max-w-xs mx-auto mt-8">
            <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-feedback-success rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-caption text-neutral-500 text-center mt-2">
              {progress}% complete
            </p>
          </div>


          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mt-8 text-neutral-500">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="text-caption">Secure & Private</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span className="text-caption">No credit impact</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="text-caption">100% Free</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default CalcLoader

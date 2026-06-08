'use client'

import * as React from 'react'
import { Lock } from 'lucide-react'
import { Button, Input } from '@/components/ui'

interface EmailCaptureStepProps {
  firstName?: string
  onSubmit: (email: string) => void
}

export function EmailCaptureStep({ firstName, onSubmit }: EmailCaptureStepProps) {
  const [email, setEmail] = React.useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) onSubmit(email.trim())
  }

  return (
    <div className="w-full max-w-[555px] mx-auto px-4 sm:px-6 pt-2 sm:pt-4 pb-4 sm:pb-8">
      <div className="flex flex-col items-start w-full">
        <p
          className="animate-fade-in-up text-xs font-medium uppercase tracking-wider text-neutral-400 mb-3"
          style={{ animationDelay: '400ms' }}
        >
          Question 5 of 5
        </p>

        <h1
          className="animate-fade-in-up font-display text-headline-lg sm:text-display lg:text-display-md mb-3"
          style={{ animationDelay: '400ms', color: '#1B2A4A' }}
        >
          {firstName ? `${firstName}, where` : 'Where'} should we send your{' '}
          <span style={{ color: '#007AC8' }}>personalized</span> debt-free plan?
        </h1>

        <div
          className="animate-fade-in-up w-full h-px mb-6"
          style={{ animationDelay: '550ms', backgroundColor: 'rgba(26, 26, 46, 0.08)' }}
        />

        <form onSubmit={handleSubmit} className="animate-fade-in-up w-full" style={{ animationDelay: '600ms' }}>
          <div className="mb-2">
            <Input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="flex items-center gap-1.5 mb-4">
            <Lock className="w-3.5 h-3.5 text-[#0C7663]" aria-hidden />
            <span className="text-xs text-neutral-800">Secured by</span>
            <span className="text-xs font-semibold text-neutral-800">Forbes</span>
          </div>
          <Button fullWidth type="submit">
            See Your Debt Relief Plan
          </Button>
        </form>
      </div>
    </div>
  )
}

export default EmailCaptureStep

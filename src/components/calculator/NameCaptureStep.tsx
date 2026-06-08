'use client'

import * as React from 'react'
import { Button, Input } from '@/components/ui'

interface NameCaptureStepProps {
  onSubmit: (firstName: string, lastName: string) => void
}

export function NameCaptureStep({ onSubmit }: NameCaptureStepProps) {
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (firstName.trim() && lastName.trim()) {
      onSubmit(firstName.trim(), lastName.trim())
    }
  }

  return (
    <div className="w-full max-w-[555px] mx-auto px-4 sm:px-6 pt-2 sm:pt-4 pb-4 sm:pb-8">
      <div className="flex flex-col items-start w-full">
        <p
          className="animate-fade-in-up text-xs font-medium uppercase tracking-wider text-neutral-400 mb-3"
          style={{ animationDelay: '400ms' }}
        >
          Question 4 of 5
        </p>

        <h1
          className="animate-fade-in-up font-display text-headline-lg sm:text-display lg:text-display-md mb-3"
          style={{ animationDelay: '400ms', color: '#1B2A4A' }}
        >
          Who should we{' '}
          <span style={{ color: '#007AC8' }}>personalize</span> this plan for?
        </h1>

        <div
          className="animate-fade-in-up w-full h-px mb-6"
          style={{ animationDelay: '550ms', backgroundColor: 'rgba(26, 26, 46, 0.08)' }}
        />

        <form onSubmit={handleSubmit} className="animate-fade-in-up w-full" style={{ animationDelay: '600ms' }}>
          <div className="flex flex-col gap-3 mb-4">
            <Input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              autoFocus
            />
            <Input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <Button fullWidth type="submit">
            See Your Debt Relief Plan
          </Button>
        </form>
      </div>
    </div>
  )
}

export default NameCaptureStep

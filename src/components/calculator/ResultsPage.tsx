'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ComparisonTable } from '@/components/calculator/intro/ComparisonTable'
import { TrustBar } from '@/components/calculator/intro/TrustBar'
import { Button, Input } from '@/components/ui'
import {
  formatCurrency,
  formatPhoneNumber,
} from '@/lib/utils'
import type { DebtFreeResult, ReliefResult } from '@/lib/calculator'

const piiSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(14, 'Please enter a valid phone number'),
})

type PIIFormValues = z.infer<typeof piiSchema>

interface ResultsPageProps {
  debtAmount: number
  aprPercent: number
  monthlyPayment: number
  currentPath: DebtFreeResult
  reliefPath: ReliefResult
  onSubmitLead: (data: PIIFormValues) => void
}

export function ResultsPage({
  debtAmount,
  aprPercent,
  monthlyPayment,
  currentPath,
  reliefPath,
  onSubmitLead,
}: ResultsPageProps) {
  const [loading, setLoading] = React.useState(false)

  const monthsMin = currentPath.reachable ? currentPath.months : 420
  const monthsSaved = Math.max(0, monthsMin - reliefPath.months)
  const yearsSaved = Math.floor(monthsSaved / 12)
  const soonerLabel =
    monthsSaved >= 12
      ? `${yearsSaved} ${yearsSaved === 1 ? 'year' : 'years'} sooner`
      : monthsSaved > 0
        ? `${monthsSaved} ${monthsSaved === 1 ? 'month' : 'months'} sooner`
        : null
  const totalSavings = currentPath.reachable
    ? currentPath.totalPaid - reliefPath.totalCost
    : Math.max(0, debtAmount - reliefPath.totalCost)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PIIFormValues>({
    resolver: zodResolver(piiSchema),
  })

  const onFormSubmit = async (form: PIIFormValues) => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 600))
    onSubmitLead(form)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setValue('phone', formatted, { shouldValidate: true })
  }

  const cappedTotalPaid = currentPath.reachable ? currentPath.totalPaid : debtAmount * 3
  const cappedYearsMin = Math.ceil(monthsMin / 12)
  const debtFreeYearWithout = currentPath.reachable ? currentPath.year : new Date().getFullYear() + cappedYearsMin

  const disclaimer = `Based on ${formatCurrency(debtAmount)} in estimated debt at ${aprPercent.toFixed(2)}% APR. Relief estimate uses industry-average program terms; your offer may vary.`

  const aprDisplay = aprPercent.toFixed(2)

  return (
    <div className="w-full max-w-[680px] mx-auto px-4 sm:px-6 pt-4 pb-44">
      <h1 className="font-editorial text-headline-lg sm:text-display text-center text-[#1B2A4A] mb-2">
        Here&apos;s your personalized debt-free timeline
      </h1>
      <p className="text-body-sm text-neutral-500 text-center mb-8">
        Based on {formatCurrency(debtAmount)} in debt at {aprDisplay}% APR
      </p>

      {(soonerLabel || !currentPath.reachable) && (
        <div className="text-center mb-10">
          <p className="font-editorial text-[40px] sm:text-[56px] font-bold text-feedback-success leading-tight">
            {soonerLabel ?? 'You could be debt-free faster'}
          </p>
          <p className="text-body-lg text-neutral-800 mt-2">
            By <span className="font-semibold text-feedback-success">{reliefPath.year}</span> instead of{' '}
            <span className="font-semibold text-feedback-error">{currentPath.reachable ? currentPath.year : '30+ years'}</span> on minimum payments
          </p>
        </div>
      )}

      <ComparisonTable
        withoutRelief={{
          totalPaid: cappedTotalPaid,
          debtFreeYear: debtFreeYearWithout,
          monthlyPayment,
          paymentYears: cappedYearsMin,
        }}
        withRelief={{
          totalCost: reliefPath.totalCost,
          debtFreeYear: reliefPath.year,
          monthlyPayment: reliefPath.monthlyPayment,
          programYears: Math.ceil(reliefPath.months / 12),
        }}
        totalSaved={Math.max(0, totalSavings)}
        disclaimer={disclaimer}
        className="mb-12"
      />

      <div className="rounded-xl border border-neutral-200 bg-white shadow-card p-6 mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <h2 className="font-editorial text-headline-sm text-[#1B2A4A] font-semibold">
            Get your complete debt-free plan
          </h2>
          <span className="rounded-full bg-secondary-300 px-3 py-1 text-label font-bold text-neutral-800">
            Typically $50–$100, yours free today
          </span>
        </div>
        <p className="text-body-sm text-neutral-500 mb-6">
          Includes program recommendations matched to your profile
        </p>

        <form id="results-pii-form" onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="First name"
              placeholder="First name"
              error={errors.firstName?.message}
              {...register('firstName')}
            />
            <Input
              label="Last name"
              placeholder="Last name"
              error={errors.lastName?.message}
              {...register('lastName')}
            />
          </div>
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            label="Phone"
            type="tel"
            placeholder="(555) 123-4567"
            error={errors.phone?.message}
            {...register('phone', { onChange: handlePhoneChange })}
          />
        </form>

        <p className="text-legal text-neutral-500 text-center mt-4">
          By submitting, you agree to be connected with a debt relief specialist who can walk you through your
          options. Your information is encrypted and protected.
        </p>
      </div>

      <TrustBar />

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="max-w-[680px] mx-auto px-4 sm:px-6 pt-3 pb-[max(12px,env(safe-area-inset-bottom))]">
          <Button type="submit" form="results-pii-form" fullWidth showTrailingIcon loading={loading}>
            Get My Free Plan
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ResultsPage

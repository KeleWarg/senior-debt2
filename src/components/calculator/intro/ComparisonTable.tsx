'use client'

import * as React from 'react'
import { cn, formatCurrency } from '@/lib/utils'
import { ScrollReveal } from '@/components/ui'

export interface ComparisonTableProps {
  withoutRelief: {
    totalPaid: number
    debtFreeYear: number
    monthlyPayment: number
    paymentYears: number
  }
  withRelief: {
    totalCost: number
    debtFreeYear: number
    monthlyPayment: number
    programYears: number
  }
  totalSaved: number
  disclaimer: string
  className?: string
}

export function ComparisonTable({
  withoutRelief,
  withRelief,
  totalSaved,
  disclaimer,
  className,
}: ComparisonTableProps) {
  const yearsSooner = withoutRelief.debtFreeYear - withRelief.debtFreeYear
  const percentLess = Math.round((1 - withRelief.totalCost / withoutRelief.totalPaid) * 100)

  return (
    <div className={cn('w-full', className)}>
      <div className="rounded-xl border border-neutral-200 bg-white shadow-card overflow-hidden">
        <div className="px-6 sm:px-8 pt-6 pb-0">
          {/* Legend */}
          <ScrollReveal>
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-feedback-error" />
                <span className="text-[11px] font-medium text-neutral-500">Minimum payments</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-feedback-success" />
                <span className="text-[11px] font-medium text-neutral-800">With relief program</span>
              </div>
            </div>
          </ScrollReveal>

          {/* ── Row 1: Total cost ── */}
          <ScrollReveal delay={80}>
            <ComparisonRow
              label="Total you'll pay"
              leftValue={formatCurrency(withoutRelief.totalPaid)}
              leftSub={`pay ${Math.round((withoutRelief.totalPaid / 25000) * 100)}%`}
              rightValue={formatCurrency(withRelief.totalCost)}
              rightSub={`pay ${Math.round((withRelief.totalCost / 25000) * 100)}%`}
              badge={`${percentLess}% less`}
              strikeLeft
            />
          </ScrollReveal>

          <div className="h-px bg-neutral-100" />

          {/* ── Row 2: Debt-free by ── */}
          <ScrollReveal delay={160}>
            <ComparisonRow
              label="Debt-free by"
              leftValue={String(withoutRelief.debtFreeYear)}
              leftSub={`${withoutRelief.paymentYears} years from now`}
              rightValue={String(withRelief.debtFreeYear)}
              rightSub={`${withRelief.programYears} years from now`}
              badge={yearsSooner > 0 ? `${yearsSooner} years saved` : undefined}
            />
          </ScrollReveal>

          <div className="h-px bg-neutral-100" />

          {/* ── Row 3: Monthly payment ── */}
          <ScrollReveal delay={240}>
            <div className="py-6">
              <p className="text-[12px] text-neutral-500 mb-3 text-center">Monthly payment</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-feedback-error/20 bg-feedback-error/[0.04] px-4 py-3">
                  <p className="text-[22px] sm:text-[24px] font-semibold text-feedback-error leading-tight">
                    {formatCurrency(withoutRelief.monthlyPayment)}
                    <span className="text-[13px] font-normal">/mo</span>
                  </p>
                  <p className="text-[11px] text-neutral-500 mt-1">for {withoutRelief.paymentYears} years</p>
                </div>
                <div className="rounded-lg border border-feedback-success/20 bg-feedback-success/[0.04] px-4 py-3">
                  <p className="text-[22px] sm:text-[24px] font-semibold text-feedback-success leading-tight">
                    {formatCurrency(withRelief.monthlyPayment)}
                    <span className="text-[13px] font-normal">/mo</span>
                  </p>
                  <p className="text-[11px] text-feedback-success mt-1">for {withRelief.programYears} years</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Savings row */}
        <div className="border-t border-feedback-success/15 bg-feedback-success/[0.04] px-6 sm:px-8 py-4 flex flex-col items-center justify-center text-center gap-1">
          <span className="text-[13px] text-feedback-success font-medium">Estimated savings</span>
          <span className="text-[22px] font-semibold text-feedback-success">
            {formatCurrency(totalSaved)}
          </span>
        </div>
      </div>

      <p className="text-[11px] text-neutral-500 text-center mt-4 max-w-[600px] mx-auto leading-relaxed">
        {disclaimer}
      </p>
    </div>
  )
}

/* ─── Reusable comparison row ────────────────────────────────────── */

function ComparisonRow({
  label,
  leftValue,
  leftSub,
  rightValue,
  rightSub,
  badge,
  strikeLeft,
}: {
  label: string
  leftValue: string
  leftSub?: string
  rightValue: string
  rightSub?: string
  badge?: string
  strikeLeft?: boolean
}) {
  return (
    <div className="py-6">
      <p className="text-[12px] text-neutral-500 mb-2 text-center">{label}</p>
      <div className="flex items-center justify-between">
        <div>
          <span
            className={cn(
              'text-[28px] sm:text-[32px] font-semibold leading-none text-feedback-error',
              strikeLeft && 'line-through decoration-feedback-error/50 decoration-2'
            )}
          >
            {leftValue}
          </span>
          {leftSub && <p className="text-[11px] text-neutral-500 mt-1">{leftSub}</p>}
        </div>

        {badge && (
          <div className="flex items-center gap-2">
            <div className="hidden sm:block h-px w-6 bg-feedback-success/40" />
            <span className="text-[11px] font-semibold text-white bg-feedback-success rounded-full px-3 py-1">
              {badge}
            </span>
            <div className="hidden sm:block h-px w-6 bg-feedback-success/40" />
          </div>
        )}

        <div className="text-right">
          <span className="text-[28px] sm:text-[32px] font-semibold leading-none text-feedback-success">
            {rightValue}
          </span>
          {rightSub && <p className="text-[11px] text-neutral-500 mt-1">{rightSub}</p>}
        </div>
      </div>
    </div>
  )
}

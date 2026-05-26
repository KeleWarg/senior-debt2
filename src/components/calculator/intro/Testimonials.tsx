'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface TestimonialData {
  quote: string
  name: string
  initials: string
  color: string
  rating: number
  subtitle: string
}

const TESTIMONIALS: TestimonialData[] = [
  {
    quote:
      'This program reduced my balance by $14,000. My monthly payments went from $480 down to $180.',
    name: 'Margaret T.',
    initials: 'MT',
    color: '#2A6B5A',
    rating: 5,
    subtitle: '71, retired school teacher · Verified client',
  },
  {
    quote:
      'They explained what was protected and what we could negotiate. I finally stopped choosing between groceries and the credit card bill.',
    name: 'James R.',
    initials: 'JR',
    color: '#4A6274',
    rating: 5,
    subtitle: '68, retired postal worker · Verified client',
  },
  {
    quote:
      'One payment plan replaced three minimums we could barely afford. It feels manageable again on a fixed income.',
    name: 'Dorothy & Frank M.',
    initials: 'DM',
    color: '#D4A843',
    rating: 5,
    subtitle: '74 & 76, retired · Verified clients',
  },
  {
    quote:
      'No one pressured me — they walked through options in plain English. Six months later I\'m on track to be done in under three years.',
    name: 'Patricia L.',
    initials: 'PL',
    color: '#7B5EA7',
    rating: 5,
    subtitle: '63, on disability benefits · Verified client',
  },
  {
    quote:
      'At 79 they made sure I understood my Social Security was not at risk. That peace of mind mattered as much as the lower payment.',
    name: 'Harold W.',
    initials: 'HW',
    color: '#5A7A4A',
    rating: 5,
    subtitle: '79, widower on fixed income · Verified client',
  },
  {
    quote:
      'The plan cut what I owed and gave me one monthly amount I could budget around my pension.',
    name: 'Robert K.',
    initials: 'RK',
    color: '#4A5D8A',
    rating: 5,
    subtitle: '72, retired engineer · Verified client',
  },
]

function TestimonialCard({ testimonial, className }: { testimonial: TestimonialData; className?: string }) {
  const { quote, name, initials, color, rating, subtitle } = testimonial
  return (
    <div
      className={cn(
        'rounded-xl bg-white border border-neutral-200 p-6 shadow-card',
        className
      )}
    >
      <div className="flex items-center gap-3 mb-1">
        <div
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
          style={{ backgroundColor: color }}
        >
          {initials}
        </div>
        <div>
          <span className="text-sm font-semibold" style={{ color: '#1B2A4A' }}>{name}</span>
          <div className="flex items-center gap-0.5 mt-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 flex items-center justify-center"
                style={{ backgroundColor: i < rating ? '#00B67A' : '#E5E7EB' }}
              >
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M6 0.5L7.4 4.3H11.5L8.2 6.7L9.5 10.5L6 8.1L2.5 10.5L3.8 6.7L0.5 4.3H4.6L6 0.5Z"
                    fill="white"
                  />
                </svg>
              </div>
            ))}
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="ml-1">
              <path
                d="M3 8.5L6.5 12L13 4"
                stroke="#00B67A"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[10px] text-neutral-500 ml-0.5">Verified</span>
          </div>
        </div>
      </div>

      <p className="text-sm leading-relaxed mt-3" style={{ color: '#1B2A4A' }}>
        {quote}
      </p>

      <p className="mt-3" style={{ fontSize: '12px', color: '#9CA3AF' }}>
        {subtitle}
      </p>
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
      <div className="max-w-[1120px] mx-auto">
        <p className="text-[13px] font-medium text-neutral-500 text-center mb-3 tracking-wide uppercase">
          What customers are saying
        </p>
        <h2
          className="font-sans text-center mb-10 text-[32px] sm:text-[38px] leading-[1.15] font-semibold"
          style={{ color: '#1B2A4A' }}
        >
          Real people, real relief
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials

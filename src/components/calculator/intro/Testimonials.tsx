'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface TestimonialData {
  quote: string
  name: string
  initials: string
  color: string
  rating: number
  image?: string
  partnerLogo?: string
  partnerName?: string
  date?: string
}

const TESTIMONIALS: TestimonialData[] = [
  {
    quote:
      'Very professional and accurate when setting up my account. Kept in touch throughout the process. Seemed to really care about helping me resolve my debt to feel financially stable once again.',
    name: 'Jenifer O\u2019Connor',
    initials: 'JO',
    color: '#D4A843',
    rating: 5,
    image: '/testimonial-jenifer-oconnor.png',
    partnerLogo: '/freedom-debt-relief_logo.png',
    partnerName: 'Freedom Debt Relief',
    date: 'Jan 22, 2026',
  },
  {
    quote:
      'I have been very nervous to do this again since I was screwed by another company. My experience so far has been awesome. They\u2019ve negotiated 2 of my 4 debts already with great results.',
    name: 'Sue A. Gleason',
    initials: 'SG',
    color: '#4A6274',
    rating: 5,
    image: '/testimonial-sue-gleason.png',
    partnerLogo: '/National_logo.svg',
    partnerName: 'National Debt Relief',
    date: 'Feb 8, 2026',
  },
  {
    quote:
      'Having paid off a debt through Freedom Debt Relief is definitely a "relief." I appreciate the assistance from FDR as it has made a rather low spot in my life easier to handle and cope with.',
    name: 'Rich Cupertino',
    initials: 'RC',
    color: '#2A6B5A',
    rating: 5,
    image: '/testimonial-rich-cupertino.png',
    partnerLogo: '/freedom-debt-relief_logo.png',
    partnerName: 'Freedom Debt Relief',
    date: 'Mar 19, 2026',
  },
]

function TestimonialCard({ testimonial, className }: { testimonial: TestimonialData; className?: string }) {
  const { quote, name, initials, color, rating, image, partnerLogo, partnerName, date } = testimonial
  return (
    <div
      className={cn(
        'rounded-xl bg-white border border-neutral-200 p-6 shadow-card relative pb-10',
        className
      )}
    >
      {partnerLogo && (
        <img
          src={partnerLogo}
          alt={partnerName || ''}
          className="absolute top-4 right-4 h-5 max-w-[80px] w-auto object-contain opacity-60"
        />
      )}

      <div className="flex items-center gap-3 mb-1">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-10 w-10 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
            style={{ backgroundColor: color }}
          >
            {initials}
          </div>
        )}
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

      {date && (
        <span className="absolute bottom-4 right-6 text-[10px] text-neutral-500">{date}</span>
      )}
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
      <div className="max-w-[1120px] mx-auto">
        <p className="text-[13px] font-medium text-neutral-500 text-center mb-3 tracking-wide uppercase">
          What others are saying
        </p>
        <h2
          className="font-sans text-center mb-10 text-[32px] sm:text-[38px] leading-[1.15] font-semibold"
          style={{ color: '#1B2A4A' }}
        >
          Real people, real relief
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials

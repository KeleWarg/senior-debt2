'use client'

import * as React from 'react'

interface PressQuote {
  logoSrc: string
  logoAlt: string
  /** Tailwind height class controlling the logo size */
  logoHeightClass: string
  quote: string
}

const QUOTES: PressQuote[] = [
  {
    logoSrc: '/press-usatoday.svg',
    logoAlt: 'USA Today',
    logoHeightClass: 'h-5',
    quote:
      '"Millions of Americans are turning to debt-relief programs as credit card balances reach record highs."',
  },
  {
    logoSrc: '/press-cnbc.svg',
    logoAlt: 'CNBC',
    logoHeightClass: 'h-7',
    quote:
      '"Consumers enrolled in debt-relief programs typically resolve their debt in 24 to 48 months instead of decades."',
  },
  {
    logoSrc: '/press-newsweek.svg',
    logoAlt: 'Newsweek',
    logoHeightClass: 'h-5',
    quote:
      '"Debt settlement is increasingly recognized as a legitimate alternative to bankruptcy for households in financial distress."',
  },
]

interface StripLogo {
  src: string
  alt: string
  heightClass: string
}

const LOGO_STRIP: StripLogo[] = [
  { src: '/press-usatoday.svg', alt: 'USA Today', heightClass: 'h-5' },
  { src: '/press-cnbc.svg', alt: 'CNBC', heightClass: 'h-7' },
  { src: '/press-nbcnews.svg', alt: 'NBC News', heightClass: 'h-6' },
  { src: '/press-cnn.svg', alt: 'CNN', heightClass: 'h-6' },
  { src: '/press-foxbusiness.svg', alt: 'Fox Business', heightClass: 'h-6' },
  { src: '/press-newsweek.svg', alt: 'Newsweek', heightClass: 'h-5' },
]

function QuoteCard({ q }: { q: PressQuote }) {
  return (
    <div className="rounded-xl bg-white border border-neutral-200 shadow-card px-6 py-6 flex flex-col h-full">
      <div className="mb-3 flex items-center">
        <img src={q.logoSrc} alt={q.logoAlt} className={`${q.logoHeightClass} w-auto object-contain`} />
      </div>
      <p className="text-sm leading-relaxed italic" style={{ color: '#1B2A4A' }}>
        {q.quote}
      </p>
    </div>
  )
}

export function PressMentions() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
      <div className="max-w-[1120px] mx-auto">
        <p className="text-[13px] font-medium text-neutral-500 text-center mb-3 tracking-wide uppercase">
          As covered by
        </p>
        <h2
          className="font-sans text-center mb-10 text-[32px] sm:text-[38px] leading-[1.15] font-semibold"
          style={{ color: '#1B2A4A' }}
        >
          Debt relief in the news
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {QUOTES.map((q) => (
            <QuoteCard key={q.logoAlt} q={q} />
          ))}
        </div>

        <div className="border-t border-neutral-200 pt-8">
          <div
            className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 opacity-70"
            aria-label="Publications that have covered debt relief"
          >
            {LOGO_STRIP.map((logo) => (
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                className={`${logo.heightClass} w-auto object-contain`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PressMentions

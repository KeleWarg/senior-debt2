'use client'

import * as React from 'react'
import { FAQ_ITEMS } from '@/components/calculator/shared/constants'
import { trackEvent } from '@/components/calculator/shared/tracking'

export function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)

  const toggle = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null)
    } else {
      setOpenIndex(index)
      trackEvent('faq_expanded', { question: FAQ_ITEMS[index].id, section: 'faq' })
    }
  }

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
      <div className="max-w-[1120px] mx-auto">
        <h2
          className="font-display text-center mb-8 text-[32px] sm:text-[38px] leading-[1.15] font-semibold"
          style={{ color: '#1B2A4A' }}
        >
          Common questions
        </h2>

        <div style={{ borderTop: '1px solid #E5E7EB' }}>
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div key={item.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="flex items-center justify-between w-full text-left"
                  style={{ padding: '20px 0' }}
                  aria-expanded={isOpen}
                >
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#1B2A4A', paddingRight: '16px' }}>
                    {item.question}
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="shrink-0"
                    style={{
                      color: '#6B7280',
                      transition: 'transform 200ms ease',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <div
                  style={{
                    maxHeight: isOpen ? '300px' : '0',
                    opacity: isOpen ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 200ms ease, opacity 200ms ease',
                  }}
                >
                  <p style={{ fontSize: '14px', color: '#4B5563', lineHeight: '1.6', paddingBottom: '20px' }}>
                    {item.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQ

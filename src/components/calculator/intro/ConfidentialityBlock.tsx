'use client'

import * as React from 'react'
import Image from 'next/image'
import { Lock } from 'lucide-react'

export function ConfidentialityBlock({ inline = false }: { inline?: boolean }) {
  const card = (
    <div className="rounded-xl border border-neutral-200 bg-white shadow-card px-6 py-8 text-center h-full flex flex-col items-center justify-center">
      <div className="w-10 h-10 flex items-center justify-center mb-4">
        <Lock className="w-6 h-6 text-[#1B2A4A]" aria-hidden />
      </div>
      <h3 className="font-display text-headline-md sm:text-headline-lg text-[#1B2A4A] mb-2 leading-tight">
        Your info is protected
      </h3>
      <p className="text-[15px] leading-relaxed max-w-[320px] mx-auto" style={{ color: '#666666' }}>
        Encrypted, confidential, and never shared without your explicit permission.
      </p>
      <div className="flex items-center justify-center gap-3 mt-4">
        <span className="font-display text-[14px]" style={{ color: '#999999' }}>Forbes Advisor</span>
        <Image src="/icon-shield.png" alt="" width={24} height={24} unoptimized />
      </div>
    </div>
  )

  if (inline) return card

  return (
    <section className="w-full max-w-[555px] mx-auto px-4 sm:px-6">
      {card}
    </section>
  )
}

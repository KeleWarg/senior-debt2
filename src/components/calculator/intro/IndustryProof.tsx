'use client'

import Image from 'next/image'

export function IndustryProof({ inline = false }: { inline?: boolean }) {
  const card = (
    <div className="rounded-xl border border-neutral-200 bg-white shadow-card px-6 py-8 text-center h-full flex flex-col items-center justify-center">
      <div className="w-10 h-10 flex items-center justify-center mb-4">
        <Image
          src="/icon-shield.png"
          alt=""
          width={40}
          height={40}
          unoptimized
        />
      </div>
      <h3 className="font-display text-headline-md sm:text-headline-lg text-[#1B2A4A] mb-2 leading-tight">
        $5.6B in debt settled
      </h3>
      <p className="text-[15px] leading-relaxed max-w-[320px] mx-auto" style={{ color: '#666666' }}>
        1.2M accounts settled at 50¢ on the dollar — half the original balance.
      </p>
      <p className="text-[12px] mt-4" style={{ color: '#999999' }}>
        AADR, 2023 Economic Impact Report
      </p>
    </div>
  )

  if (inline) return card

  return (
    <div className="w-full max-w-[720px] mx-auto px-4 sm:px-6 py-10">
      {card}
    </div>
  )
}

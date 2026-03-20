'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function TypingIndicator() {
  const dotsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return

    const timeline = gsap.timeline({ repeat: -1 })
    dotsRef.current.forEach((dot, i) => {
      timeline.to(
        dot,
        {
          opacity: 0.3,
          duration: 0.6,
          ease: 'sine.inOut',
        },
        0
      )

      timeline.to(
        dot,
        {
          opacity: 1,
          duration: 0.6,
          ease: 'sine.inOut',
        },
        0.2 * i
      )
    })

    return () => {
      timeline.kill()
    }
  }, [])

  return (
    <div className="flex items-center gap-1 p-3 bg-primary/10 rounded-xl w-fit border border-primary/20">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) dotsRef.current[i] = el
          }}
          className="w-2 h-2 rounded-full bg-primary"
        />
      ))}
    </div>
  )
}

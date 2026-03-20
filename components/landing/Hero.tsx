'use client'

import Link from 'next/link'
import { useFadeInUp } from '@/hooks/useGsap'
import Button from '@/components/Button'

export default function Hero() {
  const titleRef = useFadeInUp({ delay: 0 })
  const subtitleRef = useFadeInUp({ delay: 0.1 })
  const ctaRef = useFadeInUp({ delay: 0.2 })

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div
          ref={titleRef as any}
          className="mb-6"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-4 leading-tight">
            Your Health, <span className="text-primary">Our Priority</span>
          </h1>
        </div>

        <div
          ref={subtitleRef as any}
          className="mb-10"
        >
          <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Experience compassionate, AI-powered healthcare support available 24/7. Get health guidance, medical insights, and wellness advice whenever you need it.
          </p>
        </div>

        <div
          ref={ctaRef as any}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/signup">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              Get Started
            </Button>
          </Link>
          <Link href="/signin">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

'use client'

import { AuthProvider } from '@/lib/auth-context'
import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'
import Testimonials from '@/components/landing/Testimonials'
import CTA from '@/components/landing/CTA'

export default function Home() {
  return (
    <AuthProvider>
      <main className="flex flex-col">
        <Hero />
        <Features />
        <Testimonials />
        <CTA />
      </main>
    </AuthProvider>
  )
}

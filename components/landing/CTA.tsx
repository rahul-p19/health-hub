'use client'

import Link from 'next/link'
import { useFadeInUp } from '@/hooks/useGsap'
import Button from '@/components/Button'

export default function CTA() {
  const contentRef = useFadeInUp({ delay: 0 })

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="max-w-4xl mx-auto text-center" ref={contentRef as any}>
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
          Ready to Take Control of Your Health?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Join thousands of people who are experiencing better health outcomes with MediCare. Start your wellness journey today.
        </p>
        <Link href="/signup">
          <Button variant="primary" size="lg" className="px-8">
            Get Started Free
          </Button>
        </Link>
      </div>
    </section>
  )
}

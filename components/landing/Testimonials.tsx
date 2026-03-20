'use client'

import { useStaggerAnimation } from '@/hooks/useGsap'
import { Card, CardContent } from '@/components/Card'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Patient',
    content: 'MediCare helped me understand my symptoms better. The AI chatbot was incredibly helpful and gave me peace of mind.',
    avatar: '👩‍⚕️',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Healthcare Professional',
    content: 'As a nurse, I appreciate how MediCare provides accessible health information to patients. It empowers them to ask better questions.',
    avatar: '👨‍⚕️',
  },
  {
    id: 3,
    name: 'Emma Wilson',
    role: 'Patient',
    content: 'Available whenever I need it. No more waiting days for appointments. The care I receive is compassionate and informative.',
    avatar: '👩‍💼',
  },
]

export default function Testimonials() {
  const containerRef = useStaggerAnimation({ delay: 0.3 })

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Trusted by Thousands</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from real people who found health solutions with MediCare
          </p>
        </div>

        <div ref={containerRef as any} className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="stagger-item">
              <Card className="h-full flex flex-col">
                <CardContent className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                    <span className="text-4xl">{testimonial.avatar}</span>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-foreground leading-relaxed flex-1 italic">"{testimonial.content}"</p>
                  <div className="flex gap-1 mt-4 text-accent">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

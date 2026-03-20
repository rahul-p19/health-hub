'use client'

import { useStaggerAnimation } from '@/hooks/useGsap'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/Card'

const features = [
  {
    id: 1,
    title: 'AI-Powered Chatbot',
    description: 'Get instant medical guidance from our intelligent healthcare assistant trained on medical knowledge.',
    icon: '💬',
  },
  {
    id: 2,
    title: '24/7 Availability',
    description: 'Access healthcare support anytime, anywhere. No waiting rooms, just instant expert advice.',
    icon: '🕐',
  },
  {
    id: 3,
    title: 'Personalized Care',
    description: 'Receive tailored health recommendations based on your specific health concerns and history.',
    icon: '👥',
  },
  {
    id: 4,
    title: 'Secure & Private',
    description: 'Your health data is encrypted and protected with the highest security standards.',
    icon: '🔒',
  },
  {
    id: 5,
    title: 'Easy to Use',
    description: 'Intuitive interface designed for everyone. No medical knowledge needed to get started.',
    icon: '✨',
  },
  {
    id: 6,
    title: 'Health Insights',
    description: 'Track your wellness journey with detailed insights and health metrics.',
    icon: '📊',
  },
]

export default function Features() {
  const containerRef = useStaggerAnimation({ delay: 0.2 })

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Why Choose MediCare</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience healthcare the way it should be - fast, personalized, and always available
          </p>
        </div>

        <div ref={containerRef as any} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div key={feature.id} className="stagger-item">
              <Card interactive className="h-full">
                <CardHeader>
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

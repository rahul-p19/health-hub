'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/lib/auth-context'
import { generateBotResponse, createMessage, Message } from '@/lib/chatbot-utils'
import { useFadeInUp } from '@/hooks/useGsap'
import Button from '@/components/Button'
import Input from '@/components/Input'
import MessageComponent from '@/components/chatbot/Message'
import TypingIndicator from '@/components/chatbot/TypingIndicator'
import { Card } from '@/components/Card'

export default function ChatbotPage() {
  const router = useRouter()
  const { user, signout, isAuthenticated } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const headerRef = useFadeInUp({ delay: 0 })

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !useAuth().isLoading) {
      router.push('/signin')
    }
  }, [isAuthenticated, router])

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage = createMessage(
        'assistant',
        "Hello! I'm your MediCare health companion. I'm here to provide health guidance and answer your medical questions. How can I help you today?"
      )
      setMessages([welcomeMessage])
    }
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage = createMessage('user', input)
    setMessages((prev) => [...prev, userMessage])
    setInput('')

    // Simulate bot thinking time
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Generate bot response
    const botResponse = generateBotResponse(input)
    const assistantMessage = createMessage('assistant', botResponse)
    setMessages((prev) => [...prev, assistantMessage])
    setIsLoading(false)
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header
        ref={headerRef as any}
        className="border-b border-border bg-card shadow-sm"
      >
        <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              M
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">MediCare</h1>
              <p className="text-xs text-muted-foreground">Your Health Companion</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                signout()
                router.push('/')
              }}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageComponent key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <TypingIndicator />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-card">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <Card className="p-0 border-0 shadow-lg">
            <form onSubmit={handleSendMessage} className="flex flex-col sm:flex-row gap-2 p-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about your health..."
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 rounded-lg border-2 border-input bg-background text-foreground placeholder:text-muted-foreground transition-smooth focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
              />
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                disabled={isLoading || !input.trim()}
                className="w-full sm:w-auto"
              >
                Send
              </Button>
            </form>

            <div className="px-4 pb-3">
              <p className="text-xs text-muted-foreground text-center">
                Remember: This is a general health assistant. For medical emergencies, please contact emergency services immediately.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

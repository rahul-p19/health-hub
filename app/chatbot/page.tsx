'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/lib/auth-context'
import { createMessage, Message, toChatRequestMessages } from '@/lib/chatbot-utils'
import Button from '@/components/Button'
import MessageComponent from '@/components/chatbot/Message'
import { Card } from '@/components/Card'

export default function ChatbotPage() {
  const router = useRouter()
  const { user, signout, isAuthenticated, isLoading: isAuthLoading } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !isAuthLoading) {
      router.push('/signin')
    }
  }, [isAuthenticated, isAuthLoading, router])

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

    const userInput = input.trim()
    const userMessage = createMessage('user', userInput)
    const assistantMessage = createMessage('assistant', '')
    const updatedMessages = [...messages, userMessage, assistantMessage]

    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: toChatRequestMessages(updatedMessages.filter((message) => message.content.trim())),
        }),
      })

      if (!response.ok) {
        let errorMessage = 'Unable to stream assistant response.'

        try {
          const errorPayload = (await response.json()) as { error?: string }
          if (errorPayload.error) {
            errorMessage = errorPayload.error
          }
        } catch {
          // Ignore JSON parse failures and keep fallback message.
        }

        throw new Error(errorMessage)
      }

      if (!response.body) {
        throw new Error('No response body was received from the chat API.')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let streamedText = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        streamedText += decoder.decode(value, { stream: true })

        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantMessage.id
              ? { ...message, content: streamedText }
              : message
          )
        )
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'I am having trouble reaching the symptom analysis service right now. Please try again shortly.'

      setMessages((prev) =>
        prev.map((chatMessage) =>
          chatMessage.id === assistantMessage.id
            ? {
                ...chatMessage,
                content: message,
              }
            : chatMessage
        )
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header
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

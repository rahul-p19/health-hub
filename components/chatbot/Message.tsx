'use client'

import { Message } from '@/lib/chatbot-utils'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface MessageProps {
  message: Message
}

export default function MessageComponent({ message }: MessageProps) {
  const messageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messageRef.current && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
      gsap.fromTo(
        messageRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        }
      )
    }
  }, [])

  const isAssistant = message.role === 'assistant'

  return (
    <div
      ref={messageRef}
      className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-xl ${
          isAssistant
            ? 'bg-primary/10 text-foreground border border-primary/20 rounded-bl-none'
            : 'bg-primary text-primary-foreground rounded-br-none'
        }`}
      >
        <p className="text-sm leading-relaxed break-words">{message.content}</p>
        <span className={`text-xs mt-2 block ${isAssistant ? 'text-muted-foreground' : 'text-primary-foreground/70'}`}>
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  )
}

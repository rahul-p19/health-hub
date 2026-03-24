export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface ChatRequestMessage {
  role: 'user' | 'assistant'
  content: string
}

export function createMessage(role: 'user' | 'assistant', content: string): Message {
  return {
    id: Math.random().toString(36).slice(2, 11),
    role,
    content,
    timestamp: new Date(),
  }
}

export function toChatRequestMessages(messages: Message[]): ChatRequestMessage[] {
  return messages.map(({ role, content }) => ({ role, content }))
}

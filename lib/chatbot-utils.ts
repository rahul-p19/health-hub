// Simple rule-based chatbot responses for healthcare guidance
const medicalResponses: { [key: string]: string[] } = {
  greeting: [
    "Hello! I'm MediCare, your health companion. How can I help you with your health concerns today?",
    "Welcome! I'm here to provide health guidance. What health topic would you like to discuss?",
  ],
  symptoms: [
    "I can help you understand your symptoms. Please describe what you're experiencing in detail. For severe symptoms, please seek immediate medical attention.",
    "Symptoms can have various causes. Could you provide more details about when they started and what triggers them?",
  ],
  fever: [
    "A fever is your body's natural response to infection. Common remedies include rest, hydration, and over-the-counter fever reducers. If fever persists beyond 3 days or is very high, consult a doctor.",
  ],
  headache: [
    "Headaches can result from stress, dehydration, or other factors. Try resting, staying hydrated, and using over-the-counter pain relievers. If headaches are frequent or severe, see a healthcare provider.",
  ],
  cold: [
    "Common cold symptoms usually improve with rest, fluids, and time. Consider using saline nasal drops and throat lozenges. Most colds resolve within 7-10 days.",
  ],
  anxiety: [
    "Anxiety is manageable with proper support. Try deep breathing exercises, regular exercise, and adequate sleep. If anxiety affects your daily life, speaking with a mental health professional can help.",
  ],
  sleep: [
    "Good sleep is crucial for health. Try maintaining a regular sleep schedule, avoiding screens before bed, and creating a comfortable sleep environment. If insomnia persists, consult a healthcare provider.",
  ],
  exercise: [
    "Regular exercise is beneficial for overall health. Aim for at least 150 minutes of moderate activity weekly. Always consult with a doctor before starting a new exercise program, especially if you have existing conditions.",
  ],
  diet: [
    "A balanced diet is important for health. Include fruits, vegetables, whole grains, and lean proteins. Consider consulting a nutritionist for personalized dietary advice.",
  ],
  medication: [
    "Always take medications as prescribed. If you experience side effects, consult your healthcare provider. Don't stop medications without medical advice.",
  ],
  default: [
    "I appreciate your question. While I can provide general health information, for specific medical conditions, please consult with a healthcare professional. Is there anything else I can help with?",
  ],
}

function getKeywordMatches(userMessage: string): string[] {
  const lowerMessage = userMessage.toLowerCase()
  const matches: string[] = []

  for (const keyword of Object.keys(medicalResponses)) {
    if (keyword === 'default') continue
    if (lowerMessage.includes(keyword)) {
      matches.push(keyword)
    }
  }

  return matches
}

export function generateBotResponse(userMessage: string): string {
  const matches = getKeywordMatches(userMessage)

  if (matches.length > 0) {
    const selectedKeyword = matches[0]
    const responses = medicalResponses[selectedKeyword]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // Check for common greeting patterns
  if (
    userMessage.toLowerCase().match(/^(hi|hello|hey|good morning|good afternoon|greetings)/)
  ) {
    const greetings = medicalResponses.greeting
    return greetings[Math.floor(Math.random() * greetings.length)]
  }

  // Default response
  const defaults = medicalResponses.default
  return defaults[Math.floor(Math.random() * defaults.length)]
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export function createMessage(role: 'user' | 'assistant', content: string): Message {
  return {
    id: Math.random().toString(36).substr(2, 9),
    role,
    content,
    timestamp: new Date(),
  }
}

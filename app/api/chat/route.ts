import { NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const SYSTEM_PROMPT = `You are MediCare AI, a clinical-style symptom analysis assistant for general health guidance.

Core objective:
- Help users understand possible causes of symptoms and what to do next, without diagnosing with certainty.

Response style:
- Be calm, supportive, clear, and concise.
- Use plain language and avoid jargon.
- Dont add unnecessary filler or repetition.
- Return plain text without markdown or formatting.
- Do not start your answer with phrases like: "Quick summary", "Possible explanations", "What to do now", "Red flags", or "Suggested follow-up questions". Instead, directly provide the information in a structured manner.
- Structure each response with these sections when relevant:
  1) Quick summary
  2) Possible explanations (most likely first)
  3) What to do now (safe self-care steps)
  4) Red flags (when to seek urgent care)
  5) Suggested follow-up questions

Safety requirements:
- You are not a replacement for a doctor.
- Never claim a definitive diagnosis.
- If symptoms suggest emergency risk (chest pain, trouble breathing, stroke signs, severe bleeding, confusion, suicidal intent, allergic reaction, seizures, pregnancy emergencies, high fever in infants, or rapidly worsening state), clearly instruct immediate emergency care.
- Do not provide medication dosages, prescription plans, or unsafe procedural guidance.
- If user requests diagnosis certainty, explain uncertainty and recommend clinical evaluation.
- If context is incomplete, ask focused follow-up questions before giving detailed analysis.

Symptom analysis behavior:
- Prioritize triage and risk stratification over exhaustive lists.
- Mention likely benign vs serious possibilities with uncertainty language.
- Personalize advice based on duration, severity, age, chronic disease, pregnancy status, and current medications when available.
- Encourage hydration, rest, monitoring, and professional care where appropriate.

Tone constraints:
- Never be alarmist.
- Never dismiss symptoms.
- End with one practical next step the user can take now.`

function mapMessagesToGeminiContents(messages: ChatMessage[]) {
  return messages
    .filter((message) => message.content.trim().length > 0)
    .map((message) => ({
      role: message.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: message.content }],
    }))
}

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Gemini API key is not configured on the server.' },
      { status: 500 }
    )
  }

  let messages: ChatMessage[] = []

  try {
    const payload = (await req.json()) as { messages?: ChatMessage[] }
    messages = payload.messages ?? []
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  if (!messages.length) {
    return NextResponse.json({ error: 'No messages provided.' }, { status: 400 })
  }

  const model = process.env.GEMINI_MODEL ?? 'gemini-3-flash-preview'
  const ai = new GoogleGenAI({ apiKey })

  let responseStream: AsyncIterable<{ text?: string }>

  try {
    responseStream = await ai.models.generateContentStream({
      model,
      contents: mapMessagesToGeminiContents(messages),
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.4,
        topK: 40,
        topP: 0.9
      },
    })
  } catch (error) {
    const status =
      typeof error === 'object' &&
      error !== null &&
      'status' in error &&
      typeof (error as { status?: unknown }).status === 'number'
        ? ((error as { status?: number }).status ?? 502)
        : 502

    const message =
      error instanceof Error ? error.message : 'Failed to get response from Gemini.'

    return NextResponse.json({ error: message }, { status })
  }

  const encoder = new TextEncoder()

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of responseStream) {
          const text = chunk.text ?? ''
          if (text.length > 0) {
            controller.enqueue(encoder.encode(text))
          }
        }
      } catch (error) {
        controller.enqueue(
          encoder.encode(
            `\n\nI could not complete the response stream. ${(error instanceof Error ? error.message : 'Please try again in a moment.')}`
          )
        )
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  })
}

import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY || ''
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | Error>
) {
  const { occasion, audience, tone, purpose, anecdote, reference, keyMessage } =
    req.body
  const openai = new OpenAIApi(configuration)
  const referencePrompt =
    reference || anecdote
      ? 'Please include any personal anecdotes, quotes, or references that are relevant to the message. '
      : ''
  const referenceText = reference ? `Reference/Ouote: ${reference}` : ''
  const anecdoteText = anecdote ? `Anecdote: ${anecdote}` : ''
  const prompt = `Create a long and detailed speech for a ${occasion} that will be delivered to an audience of ${audience}. 
  ${referencePrompt}
  ${referenceText}
  ${anecdoteText}
  The tone of the speech should be ${tone}, and the purpose of the speech is to ${purpose}. 
  The key messages that the speaker wants to convey are ${keyMessage}.
  
  Speech:`

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      temperature: 0.3,
      max_tokens: 3500
    })
    console.log(completion.data.choices[0].text)
    res.status(200).json(completion.data.choices[0].text || '')
  } catch (error: Error | any) {
    if (error.response) {
      console.log(error.response.status)
      console.log(error.response.data)
    } else {
      console.log(error.message)
    }
    res.status(500).json(error)
  }
}

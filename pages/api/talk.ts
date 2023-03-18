import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'
import { getAuth } from '@clerk/nextjs/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

import { getXataClient } from 'lib/db/xata'
import { SpeakerType } from 'lib/jotai/text'

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY || ''
})

const xata = getXataClient()

const redis = new Redis({
  url: 'https://eu2-merry-bird-32058.upstash.io',
  token:
    'AX06ASQgNzU2ZTljYzAtMjU0Mi00N2QxLTgyNWQtY2Q4MjgwMDIyNDg4ZjQ2MzM1MGM3NWU4NDRkNWEwMWRjM2E5YjY5OWY1NjE='
})
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(30, '2592000 s')
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { userId } = getAuth(req)
  if (!userId) {
    res.status(401).json('Unauthorized')
    return
  }
  const { isQ, limited } = req.body
  let rateLimitResult
  if (!isQ && limited) {
    rateLimitResult = await ratelimit.limit(userId)
    res.setHeader('X-RateLimit-Limit', rateLimitResult.limit)
    res.setHeader('X-RateLimit-Remaining', rateLimitResult.remaining)

    if (!rateLimitResult.success) {
      res.status(403).json({
        message: 'The request has been rate limited.',
        rateLimitState: rateLimitResult
      })
      return
    }
  }
  const { text } = req.body
  const openai = new OpenAIApi(configuration)

  try {
    // const reqBody = JSON.stringify({
    //   model: 'gpt-3.5-turbo',
    //   messages: [
    //     {
    //       role: 'system',
    //       content:
    //         'Your are a speech recoginition assistant with the sole purpose of determining if a text contains a question.'
    //     },
    //     {
    //       role: 'user',
    //       content: `Does the folowing text contain a question? Repsond with {q: true} if it does and {q: false} if it does not contain a question. Text: ${text}`
    //     }
    //   ]
    // })
    // const response = await fetch('https://api.openai.com/v1/chat/completions', {
    //   headers: {
    //     Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
    //     'Content-Type': 'application/json'
    //   },
    //   method: 'POST',
    //   body: reqBody
    // })

    const resp = await openai.createEmbedding({
      input: text,
      model: 'text-embedding-ada-002'
    })

    const [{ embedding }] = resp.data.data

    // const referencePrompt =
    //   reference || anecdote
    //     ? 'Please include any personal anecdotes, quotes, or references that are relevant to the message. '
    //     : ''
    // const referenceText = reference ? `Reference/Ouote: ${reference}` : ''
    // const anecdoteText = anecdote ? `Anecdote: ${anecdote}` : ''
    // const prompt = `Create a long and detailed speech for a ${occasion} that will be delivered to an audience of ${audience}.
    // ${referencePrompt}
    // ${referenceText}
    // ${anecdoteText}
    // The tone of the speech should be ${tone}, and the purpose of the speech is to ${purpose}.
    // The key messages that the speaker wants to convey are ${keyMessage}.

    // Speech:`

    // const json = await response.json()
    // const isQuestion = json.choices[0].message?.content?.includes('true')

    if (!userId || !text) {
      res.status(400).json('Missing data')
    }
    const record = await xata.db.dialogues.create({
      user_id: userId,
      speaker: [SpeakerType.USER],
      text,
      created_at: new Date(),
      embedding,
      is_question: Boolean(isQ)
    })
    res
      .status(200)
      .json({ ...record, rateLimitState: rateLimitResult || undefined })

    // const completion = await openai.createCompletion({
    //   model: 'text-davinci-003',
    //   prompt: prompt,
    //   temperature: 0.3,
    //   max_tokens: 3500
    // })
    // console.log('👉 ~ completion:', completion)
    // console.log(completion.data.choices[0].text)
    // res.status(200).json(completion.data.choices[0].text || '')
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

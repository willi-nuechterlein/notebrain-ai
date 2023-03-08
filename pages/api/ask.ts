import type { NextApiRequest, NextApiResponse } from 'next'
import { getXataClient } from 'lib/db/xata'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY || ''
})

const xata = getXataClient()
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | Error>
) {
  const { user } = req.query
  const { question, embedding: questionEmbedding } = req.body
  console.log('👉 ~ question:', question)

  try {
    const answerRecord = await xata.db.dialogues.vectorSearch(
      'embedding',
      questionEmbedding,
      { filter: { user_id: Number(user) } }
    )
    const { embedding, text, ...restRecord } = answerRecord[0]
    console.log('👉 ~ answer:', text)

    res.status(200).json(JSON.stringify({ text, ...restRecord }))
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

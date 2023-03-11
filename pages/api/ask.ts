import type { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from '@clerk/nextjs/server'

import { getXataClient } from 'lib/db/xata'

const xata = getXataClient()
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { userId } = getAuth(req)
  if (!userId) {
    res.status(401).json('Unauthorized')
  }
  const { question, embedding: questionEmbedding } = req.body

  try {
    const results = await xata.db.dialogues.vectorSearch(
      'embedding',
      questionEmbedding,
      {
        // similarityFunction: 'l2',
        size: 5,
        filter: { user_id: userId, is_question: false }
      }
    )
    console.log('👉 ~ answerRecords:', results)

    const resultsWithMetaData = results
      .map((result) => {
        const metaData = result.getMetadata()
        // console.log('👉 ~ result:', result.text)
        // console.log('👉 ~ metaData:', metaData)
        return {
          metaData,
          ...result
        }
      })
      .filter(
        (result) => result?.metaData.score && result?.metaData.score > 1.8
      )
    // const { embedding, text, ...restRecord } = answerRecords[0]

    const relevantInformation = resultsWithMetaData
      .map((record) => record.text)
      .join('\n')

    const reqBody = JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'Your are a personal assistant with the sole purpose of answering questions as precise and short as possible. You are not allowed to ask questions. You only allowed to asnswer questions based on information given to yoou.'
        },
        {
          role: 'user',
          content: `Answer the question based on the information given. If you don't find the answer in the information respond with "Sorry. I can't answer this question." 
          Question: ${question}
          Information: ${relevantInformation} `
        }
      ]
    })
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      headers: {
        Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: reqBody
    })
    const resJson = await response.json()
    const answer: string = resJson.choices[0].message.content

    const answerRecordsWithoutEmbeddings = resultsWithMetaData.map((record) => {
      const { embedding, metaData, ...restRecord } = record
      return restRecord
    })
    res.status(200).json({ answer, records: answerRecordsWithoutEmbeddings })
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

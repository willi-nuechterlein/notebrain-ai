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
    // console.log('👉 ~ answerRecords:', results)

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
        (result) => result?.metaData.score && result?.metaData.score > 1.75
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
          content: `Your are a personal assistant with of answering questions and retrieving information from given notes. 
            You are not allowed to ask questions. Limit prose.`
        },
        // {
        //   role: 'user',
        //   content: `Please provide a set of notes and a question or instruction about the information you need from those notes.
        //   I will retrieve the answer or information based on the provided notes.
        //   If your notes don't contain enough data, I will let you know that the necessary information is not available in the notes.
        //   Remember, I will only use the information from the notes you provide and will not rely on any external knowledge.
        //   Notes: ${relevantInformation}
        //   Question/Instruction: ${question} Limit prose.
        //   Response:`
        // }
        {
          role: 'user',
          content: `Answer the question based on the information given. If you don't find the answer in the information respond with "Sorry. Your notes don't contain any relevant information." 
          Information: ${relevantInformation} 
          Question: ${question}
          `
        }
        // {
        //   role: 'user',
        //   content: `Based on a given context, answer a question or follow an instruction.
        //   If you don't find the necessary information in the context to respond with "Sorry. Your notes don't contain any relevant information."
        //   Never user information that is not in the context.
        //   Context: ${relevantInformation}
        //   Question/Instruction: ${question} Limit prose.`
        // }
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

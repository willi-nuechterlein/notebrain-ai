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
  try {
    const records = await xata.db.dialogues
      .filter({ user_id: userId, is_question: false })
      .sort('created_at', 'desc')
      .getAll()
    const removeEmbedding = records.map((record) => {
      const { embedding, ...restRecord } = record
      return restRecord
    })
    res.status(200).json(removeEmbedding)
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

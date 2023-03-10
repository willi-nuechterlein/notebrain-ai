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
      .sort('created_at', 'asc')
      .getAll()
    res.status(200).json(records)
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

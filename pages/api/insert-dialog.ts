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
    const { speaker, text } = req.body
    if (!text || !speaker) res.status(400).json('Missing data')
    const record = await xata.db.dialogues.create({
      user_id: userId,
      speaker: [speaker],
      text,
      created_at: new Date()
    })
    console.log(record)
    res.status(200).json(record)
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

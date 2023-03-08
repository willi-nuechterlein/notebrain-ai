import type { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from '@clerk/nextjs/server'
import { getXataClient } from 'lib/db/xata'
const xata = getXataClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | Error>
) {
  const { userId } = getAuth(req)
  if (!userId) {
    res.status(401).json('Unauthorized')
  }
  try {
    const { user } = req.query
    if (!user) res.status(400).json('Missing data')
    const records = await xata.db.dialogues
      .filter({ user_id: Number(user) })
      .sort('created_at', 'asc')
      .getMany()
    res.status(200).json(JSON.stringify(records))
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

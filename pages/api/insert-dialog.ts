import type { NextApiRequest, NextApiResponse } from 'next'
import { getXataClient } from 'lib/db/xata'
const xata = getXataClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | Error>
) {
  try {
    const { speaker, text, user } = req.body
    if (!text || !speaker || !user) res.status(400).json('Missing data')
    const record = await xata.db.dialogues.create({
      user_id: user,
      speaker: [speaker],
      text,
      created_at: new Date()
    })
    console.log(record)
    res.status(200).json(JSON.stringify(record))
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

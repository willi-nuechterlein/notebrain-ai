import { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'
import { Readable } from 'stream'
import clerk from '@clerk/clerk-sdk-node'

const signingSecret = process.env.LEMON_SIGNING_SECRET || ''

const verifySignature = (signature: string, payload: Buffer): boolean => {
  const hmac = crypto.createHmac('sha256', signingSecret)
  const digest = Buffer.from(hmac.update(payload).digest('hex'), 'utf8')
  const receivedSignature = Buffer.from(signature, 'utf8')
  return crypto.timingSafeEqual(digest, receivedSignature)
}

async function getRawBody(readable: Readable): Promise<Buffer> {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

const handleWebhookEvent = async (lemonData: any) => {
  const { data, meta } = lemonData
  const userId = meta?.custom_data?.user_id
  if (!userId) {
    return
  }
  const subscription = {
    status: data?.attributes?.status,
    statusFormatted: data?.attributes?.status_formatted,
    pause: data?.attributes?.pause,
    canceled: data?.attributes?.canceled,
    renewalDate: data?.attributes?.renews_at,
    productId: data?.attributes?.product_id,
    variantId: data?.attributes?.variant_id,
    productName: data?.attributes?.product_name,
    variantName: data?.attributes?.variant_name,
    subscriptionId: data?.id
  }
  try {
    await clerk.users.updateUser(userId, {
      publicMetadata: { subscription: subscription }
    })
  } catch (error) {}
}

export const config = {
  api: {
    bodyParser: false
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const signature = req.headers['x-signature'] as string
      const rawBody = await getRawBody(req)

      if (!signature || !verifySignature(signature, rawBody)) {
        res.status(400).json({ message: 'Invalid signature' })
      } else {
        const data = JSON.parse(Buffer.from(rawBody).toString('utf8'))
        await handleWebhookEvent(data)
        res.status(200).json({ message: 'Webhook successfully captured' })
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}

export default handler

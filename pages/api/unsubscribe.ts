import type { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from '@clerk/nextjs/server'
import clerk from '@clerk/clerk-sdk-node'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { userId } = getAuth(req)
  if (!userId) {
    res.status(401).json('Unauthorized')
    return
  }
  const { subscriptionId } = req.body
  if (!subscriptionId) {
    res.status(400).json('Missing subscription ID')
    return
  }
  const apiUrl = `https://api.lemonsqueezy.com/v1/subscriptions/${subscriptionId}`
  const apiKey = process.env.LEMON_SQUEEZY_API_KEY

  const headers = {
    'Accept': 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
    'Authorization': `Bearer ${apiKey}`
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers
    })
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const { data } = await response.json()
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
    await clerk.users.updateUser(userId, {
      publicMetadata: { subscription: subscription }
    })
    res.status(200).send('ok')
  } catch (error) {
    res.status(500).json(error)
  }
}

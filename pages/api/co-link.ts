import type { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from '@clerk/nextjs/server'
import clerk from '@clerk/clerk-sdk-node'
import { LEMON_STORE_ID, LEMON_VARIANT_ID } from 'lib/consts/lemon'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { userId } = getAuth(req)
  if (!userId) {
    res.status(401).json('Unauthorized')
    return
  }
  const { emailAddresses } = await clerk.users.getUser(userId)
  const email = emailAddresses[0].emailAddress
  const apiUrl = 'https://api.lemonsqueezy.com/v1/checkouts'
  const apiKey = process.env.LEMON_SQUEEZY_API_KEY

  const headers = {
    'Accept': 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
    'Authorization': `Bearer ${apiKey}`
  }

  const payload = {
    data: {
      type: 'checkouts',
      attributes: {
        product_options: {
          redirect_url: process.env.CHECKOUT_REDIRECT_URL
        },
        checkout_options: {
          button_color: '#4468de'
        },
        checkout_data: {
          email,
          custom: {
            user_id: userId
          }
        }
      },
      relationships: {
        store: {
          data: {
            type: 'stores',
            id: LEMON_STORE_ID
          }
        },
        variant: {
          data: {
            type: 'variants',
            id: LEMON_VARIANT_ID
          }
        }
      }
    }
  }
  let checkoutUrl = ''
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    })
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const data = await response.json()
    checkoutUrl = data.data.attributes.url
    res.status(200).json(checkoutUrl)
  } catch (error) {
    res.status(500).json({ error })
  }
}

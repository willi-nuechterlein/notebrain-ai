import { useUser } from '@clerk/nextjs'
import Script from 'next/script'
import { useEffect } from 'react'
import useSWRMutation from 'swr/mutation'

import { Box } from 'components/atoms/Box'
import Button from 'components/atoms/Button'
import { Paragraph } from 'components/atoms/Paragraph'
import { Title } from 'components/atoms/Title'
import userSubscriptionStatus from 'lib/utils/userSubscriptionStatus'
import DialogWrapper from 'components/molecules/Dialog'
import { toast } from 'react-hot-toast'
import * as Dialog from '@radix-ui/react-dialog'

export default function Account() {
  const { user, isLoaded } = useUser()
  const subscription = userSubscriptionStatus(user)
  const { data: checkoutUrl, trigger } = useSWRMutation(
    '/api/co-link',
    async () => {
      const res = await fetch('/api/co-link')
      const d = await res.json()
      return d
    },
    {
      revalidate: false
    }
  )
  useEffect(() => {
    if (isLoaded && !subscription.active && !checkoutUrl) {
      trigger()
    }
  }, [checkoutUrl, isLoaded, subscription, trigger])

  const unsubscribe = async () => {
    const res = await fetch('/api/unsubscribe', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        subscriptionId: subscription.id
      })
    })
    if (res.ok) {
      toast.success('Subscription cancelled.')
    } else {
      toast.error('Ups. Please try again.')
    }
  }

  if (!isLoaded) return <Paragraph>Loading...</Paragraph>
  return (
    <>
      <Script src="https://assets.lemonsqueezy.com/lemon.js" defer></Script>
      <Box
        css={{
          height: '100vh',
          width: '100%',
          maxWidth: '50rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          marginX: '$2',
          paddingTop: '10vh',
          gap: '$4'
        }}
      >
        <Title>Account</Title>
        <Paragraph>Name: {user?.fullName}</Paragraph>
        <Paragraph>Email: {user?.emailAddresses[0]?.emailAddress}</Paragraph>
        <Paragraph>
          <>
            Subscription: {/* @ts-ignore */}
            {user?.publicMetadata?.subscription?.status || 'unsubscribed'}
          </>
        </Paragraph>
        {!subscription.willRenew ? (
          <DialogWrapper
            title="Unsubscribe"
            trigger={<Button outlined>cancel subscription</Button>}
            description=" You will lose access to notebrain's premium features."
            actions={
              <Dialog.Close asChild>
                <Button
                  onClick={() => {
                    unsubscribe()
                  }}
                  color="primary"
                >
                  Unsubscribe
                </Button>
              </Dialog.Close>
            }
          />
        ) : (
          // <a href={checkoutUrl} className="lemonsqueezy-button">
          <Button>Buy notebrain Pro (coming soon)</Button>
          // </a>
        )}
      </Box>
    </>
  )
}

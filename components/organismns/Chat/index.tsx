import useSWR from 'swr'
import { styled, keyframes } from 'stitches.config'
import { DialogPart, getSetDialogAtom, SpeakerType } from 'lib/jotai/text'
import { Box } from 'components/atoms/Box'
import Button from 'components/atoms/Button'
import { Typography } from 'components/atoms/Typography'
import { useAtom } from 'jotai'
import { useState } from 'react'

interface ChatProps {
  messages: DialogPart[]
}

const slideIn = keyframes({
  from: { opacity: 0, transform: 'translateY(50%)' },
  to: { opacity: 1, transform: 'translateY(0%)' }
})

const ChatContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  gap: '10px',
  borderRadius: '$mediumRadius',
  boxShadow: '$tileShadow',
  padding: '$7',
  width: '100%',
  maxWidth: '50rem',
  // height: '100%',
  minHeight: '5rem',
  maxHeight: '50rem',
  backgroundColor: '$white',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    display: 'none'
  },
  '-ms-overflow-style': 'none',
  scrollbarWidth: 'none'
})

const ChatMessageContainer = styled('div', {
  padding: '$4',
  borderRadius: '$smallRadius',
  fontSize: '$5',
  maxWidth: '60%',
  animation: `${slideIn} 0.5s ease`,
  backgroundColor: '$gray1',
  border: '1px solid $secondary2'
})

const ChatMessageText = styled('div', {})

export const Chat: React.FC<ChatProps> = ({ messages }) => {
  const [, setDialog] = useAtom(getSetDialogAtom)
  const [historyVisible, setHistoryVisible] = useState(false)
  const { data } = useSWR(`/api/get-dialog`, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })
  if (data) {
    console.log('👉 ~ data:', data)
  }

  return (
    <>
      <Box
        css={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '$2',
          alignItems: 'center'
        }}
      >
        <Typography
          as="span"
          css={{
            fontSize: '$4',
            color: '$secondary1'
          }}
        >
          You have {data?.length || 0} notes
        </Typography>
        {!historyVisible ? (
          <Button
            size="small"
            color="secondary"
            outlined
            onClick={() => {
              setHistoryVisible(true)
              setDialog(data)
            }}
          >
            show all
          </Button>
        ) : (
          <Button
            size="small"
            color="secondary"
            outlined
            onClick={() => {
              setHistoryVisible(false)
              setDialog([])
            }}
          >
            hide all
          </Button>
        )}
      </Box>
      <ChatContainer>
        {!messages.length ? (
          <Typography
            css={{
              fontSize: '$5',
              color: '$secondary2'
            }}
          >
            Your results will appear here. You can also click on the &quot;show
            all&quot; to see all your notes.
          </Typography>
        ) : null}
        {messages.map((message) => (
          <Box key={message.text.substring(0, 20)}>
            <ChatMessageContainer
              css={{
                alignSelf: 'flex-start',
                color:
                  message.speaker === SpeakerType.AI
                    ? '$primary12'
                    : '$secondary2',
                backgroundColor:
                  message.speaker === SpeakerType.AI ? '$primary4' : '$gray1'
              }}
            >
              <ChatMessageText>{message.text}</ChatMessageText>
            </ChatMessageContainer>
            <Typography
              css={{
                fontSize: '$3',
                color: '$secondary4',
                marginTop: '$2',
                marginBottom: '$3'
              }}
            >
              {message.created_at?.substring(0, 10)}
            </Typography>
          </Box>
        ))}
      </ChatContainer>
    </>
  )
}

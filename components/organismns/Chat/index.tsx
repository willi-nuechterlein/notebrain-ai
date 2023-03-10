import useSWR from 'swr'
import { styled } from 'stitches.config'
import { getSetDialogAtom, SpeakerType } from 'lib/jotai/text'
import { Box } from 'components/atoms/Box'
import Button from 'components/atoms/Button'
import { Typography } from 'components/atoms/Typography'
import { useAtom } from 'jotai'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const ChatContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  gap: '$4',
  width: '100%',
  maxWidth: '50rem',
  height: '100%',
  maxHeight: '50rem',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    display: 'none'
  },
  '-ms-overflow-style': 'none',
  scrollbarWidth: 'none'
})

const ChatMessageContainer = styled('div', {
  padding: '$4',
  paddingTop: '$6',
  borderRadius: '$smallRadius',
  fontSize: '$5',
  maxWidth: '60%',
  backgroundColor: '$gray1',
  border: '1px solid $secondary2'
})

const ChatMessageText = styled('div', {})

export const Chat: React.FC = () => {
  const [parent] = useAutoAnimate()
  const [dialog, setDialog] = useAtom(getSetDialogAtom)
  const { data } = useSWR(`/api/get-dialog`)
  if (data) {
    console.log('👉 ~ data:', data)
  }
  // useEffect(() => {
  //   if (data) {
  //     setDialog(data)
  //   }
  // }, [data, setDialog])
  return (
    <>
      {data?.length > 1 && (
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
              color: '$secondary2'
            }}
          >
            You have {data?.length || 0} notes
          </Typography>
          {dialog.length <= 1 ? (
            <Button
              size="small"
              color="secondary"
              outlined
              onClick={() => {
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
                setDialog([])
              }}
            >
              hide all
            </Button>
          )}
        </Box>
      )}
      <ChatContainer ref={parent}>
        {dialog.map((message) => (
          <Box key={message.created_at || message.text}>
            <ChatMessageContainer
              css={{
                position: 'relative',
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
              <Typography
                css={{
                  position: 'absolute',
                  fontSize: '$3',
                  color: '$secondary4',
                  top: '$2',
                  right: '$3'
                }}
              >
                {message.created_at?.substring(0, 10)}
              </Typography>
            </ChatMessageContainer>
          </Box>
        ))}
      </ChatContainer>
    </>
  )
}

import useSWR, { mutate } from 'swr'
import { styled } from 'stitches.config'
import { useAtom } from 'jotai'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useEffect, useState } from 'react'
import { TrashIcon } from '@radix-ui/react-icons'
import { toast } from 'react-hot-toast'

import { getSetDialogAtom, SpeakerType } from 'lib/jotai/text'
import { Box } from 'components/atoms/Box'
import Button from 'components/atoms/Button'
import { Typography } from 'components/atoms/Typography'

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
  scrollbarWidth: 'none',
  marginTop: '$5'
})

const ChatMessageContainer = styled('div', {
  padding: '$4',
  paddingBottom: '$7',
  borderRadius: '$smallRadius',
  fontSize: '$5',
  width: '100%',
  marginX: 'auto',
  backgroundColor: '$white',
  border: '1px solid $secondary6',
  color: '$text',
  boxShadow: '$noteShadow',
  whiteSpace: 'pre-wrap'
})

const ChatMessageText = styled('div', {})

const DeleteButton = styled('button', {
  display: 'none',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: '$2',
  right: '$4',
  backgroundColor: '$gray4',
  border: '1px solid $secondary6',
  cursor: 'pointer',
  padding: '$1',
  color: '$error',
  borderRadius: '$smallRadius',
  '&:focus': {
    outline: 'none'
  },
  '&:hover': {
    backgroundColor: '$gray5',
    borderColor: '$error'
  }
})

export const Chat: React.FC = () => {
  const [parent] = useAutoAnimate()
  const [dialog, setDialog] = useAtom(getSetDialogAtom)
  const [selectedNote, setSelectedNote] = useState<string>()
  const { data } = useSWR(`/api/get-dialog`)
  useEffect(() => {
    if (data?.length > 1 && dialog.length > 0) {
      setDialog(data)
    }
  })
  const deleteNote = async () => {
    const res = await fetch('/api/delete', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        id: selectedNote
      })
    })
    if (res.ok) {
      mutate('/api/get-dialog')
      toast.success('Note deleted.')
    } else {
      toast.error('Ups. Please try again.')
    }
  }
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
              show
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
              hide
            </Button>
          )}
        </Box>
      )}

      <ChatContainer ref={parent}>
        {dialog.map((message) => (
          <Box key={message.created_at || message.text}>
            <ChatMessageContainer
              onMouseLeave={() => {
                setSelectedNote(undefined)
              }}
              css={{
                position: 'relative',
                alignSelf: 'flex-start',
                color:
                  message.speaker === SpeakerType.AI
                    ? '$primary10'
                    : '$secondary2',
                backgroundColor:
                  message.speaker === SpeakerType.AI ? '$primary4' : '$white',
                borderColor:
                  message.speaker === SpeakerType.AI
                    ? '$primary6'
                    : '$secondary6',
                paddingBottom: message.speaker === SpeakerType.AI ? '$4' : '$7',
                '&:hover': {
                  '& .trash': {
                    display: 'flex'
                  }
                }
              }}
            >
              <ChatMessageText>
                {message.text}
                <DeleteButton
                  onClick={() => {
                    if (selectedNote === message.id) {
                      deleteNote()
                    }
                    setSelectedNote(message.id)
                  }}
                  className="trash"
                >
                  {selectedNote === message.id && (
                    <Typography
                      css={{
                        fontSize: '$4',
                        marginLeft: '$1'
                      }}
                    >
                      click to delete
                    </Typography>
                  )}
                  <TrashIcon />
                </DeleteButton>
              </ChatMessageText>
              <Typography
                css={{
                  position: 'absolute',
                  fontSize: '$3',
                  color: '$secondary4',
                  bottom: '$2',
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

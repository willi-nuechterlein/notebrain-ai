import { SpeakerType } from 'lib/jotai/text'
import { styled, keyframes } from 'stitches.config'

interface ChatMessage {
  text: string
  speaker: string
}

interface ChatProps {
  messages: ChatMessage[]
}

const slideIn = keyframes({
  from: { opacity: 0, transform: 'translateY(50%)' },
  to: { opacity: 1, transform: 'translateY(0%)' }
})

const ChatContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  gap: '10px',
  borderRadius: '$mediumRadius',
  boxShadow: '$tileShadow',
  padding: '$7',
  width: '100%',
  maxWidth: '50rem',
  height: '100%',
  maxHeight: '50rem',
  backgroundColor: '$white',
  overflowY: 'scroll'
})

const ChatMessageContainer = styled('div', {
  padding: '$4',
  borderRadius: '$mediumRadius',
  fontSize: '$5',
  maxWidth: '70%',
  animation: `${slideIn} 0.5s ease`,
  backgroundColor: '$gray1',
  border: '1px solid $secondary2'
})

const ChatMessageText = styled('div', {})

export const Chat: React.FC<ChatProps> = ({ messages }) => {
  return (
    <ChatContainer>
      {messages.map((message, index) => (
        <ChatMessageContainer
          key={index}
          style={{
            alignSelf:
              message.speaker === SpeakerType.AI ? 'flex-start' : 'flex-end'
          }}
        >
          <ChatMessageText>{message.text}</ChatMessageText>
        </ChatMessageContainer>
      ))}
    </ChatContainer>
  )
}

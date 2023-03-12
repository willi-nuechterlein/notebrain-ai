import { Box } from 'components/atoms/Box'
import NoteInput from 'components/atoms/NoteInput'

import { Chat } from 'components/organismns/Chat'

export default function AppPage() {
  return (
    <Box
      css={{
        height: '100vh',
        width: '100%',
        maxWidth: '50rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingX: '$2'
      }}
    >
      <NoteInput />
      <Chat />
    </Box>
  )
}

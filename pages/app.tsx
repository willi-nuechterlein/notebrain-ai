import { Box } from 'components/atoms/Box'
import RecorderControls from 'components/atoms/RecorderControls'
import Footer from 'components/molecules/Footer'

import { UseRecorder } from 'lib/types/recorder'
import useRecorder from 'lib/utils/audio/hooks/useRecorder'
import { Chat } from 'components/organismns/Chat'

export default function AppPage() {
  const { recorderState, ...handlers }: UseRecorder = useRecorder()

  return (
    <Box
      css={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      {/* <Nav /> */}
      <Box
        css={{
          height: '100vh',
          width: '100%',
          maxWidth: '50rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <RecorderControls recorderState={recorderState} handlers={handlers} />
        <Chat />
      </Box>
      <Footer />
    </Box>
  )
}

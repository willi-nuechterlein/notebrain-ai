import { useAtom } from 'jotai'

import { Box } from 'components/atoms/Box'
import RecorderControls from 'components/atoms/RecorderControls'
import Footer from 'components/molecules/Footer'

import { getSetDialogAtom } from 'lib/jotai/text'
import { UseRecorder } from 'lib/types/recorder'
import useRecorder from 'lib/utils/audio/hooks/useRecorder'
import { Chat } from 'components/organismns/Chat'

export default function Home() {
  const { recorderState, ...handlers }: UseRecorder = useRecorder()
  const [dialog] = useAtom(getSetDialogAtom)

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
          // marginTop: '10vh',
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
        <Chat messages={dialog} />
      </Box>
      <Footer />
    </Box>
  )
}

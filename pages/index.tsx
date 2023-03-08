import { Box } from 'components/atoms/Box'
import RecorderControls from 'components/atoms/RecordButton'
import { Typography } from 'components/atoms/Typography'
import Footer from 'components/molecules/Footer'
import { useAtom } from 'jotai'
import { dialogAtom } from 'lib/jotai/text'
import { UseRecorder } from 'lib/types/recorder'
import useRecorder from 'lib/utils/audio/hooks/useRecorder'

export default function Home() {
  const { recorderState, ...handlers }: UseRecorder = useRecorder()
  const [dialog] = useAtom(dialogAtom)
  return (
    <Box
      css={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        height: '100',
        flexDirection: 'column'
      }}
    >
      {/* <Nav /> */}
      <Box css={{ marginTop: '10vh', height: '100vh' }}>
        <RecorderControls recorderState={recorderState} handlers={handlers} />
        {dialog?.length
          ? dialog.map((part) => (
              <Typography key={part.text.substring(0, 5)}>
                {part.text}
              </Typography>
            ))
          : null}
      </Box>
      <Footer />
    </Box>
  )
}

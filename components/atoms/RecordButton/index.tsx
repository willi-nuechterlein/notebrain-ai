import { Box } from 'components/atoms/Box'
import Button from 'components/atoms/Button'
import { RecorderControlsProps } from 'lib/types/recorder'
import { keyframes } from 'stitches.config'

const pulsate = keyframes({
  '0%': {
    transform: 'scale(1)',
    opacity: 1
  },
  '50%': {
    transform: 'scale(1.2)',
    opacity: 0.5
  },
  '100%': {
    transform: 'scale(1)',
    opacity: 1
  }
})

export default function RecorderControls({
  recorderState,
  handlers
}: RecorderControlsProps) {
  const { recordingSeconds, initRecording } = recorderState
  const { startRecording, saveRecording, cancelRecording } = handlers

  return (
    <Box
      css={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {initRecording ? (
        <Button disabled={recordingSeconds === 0} onClick={saveRecording}>
          <Box
            css={{
              width: '20px',
              height: '20px',
              backgroundColor: '$white',
              borderRadius: '50%',
              animationName: `${pulsate}`,
              animationDuration: '1s',
              animationIterationCount: 'infinite',
              animationTimingFunction: 'ease-in-out',
              marginRight: '10px'
            }}
          />
          Submit
        </Button>
      ) : (
        <Button onClick={startRecording}>Record</Button>
      )}
      {initRecording && (
        <Button
          outlined
          css={{
            marginLeft: '10px'
          }}
          onClick={cancelRecording}
        >
          Cancel
        </Button>
      )}
    </Box>
  )
}

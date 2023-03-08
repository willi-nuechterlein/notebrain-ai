import { Box } from 'components/atoms/Box'
import Button from 'components/atoms/Button'
import { useAtom } from 'jotai'
import { getSetDialogAtom } from 'lib/jotai/text'
import { RecorderControlsProps } from 'lib/types/recorder'
import { useState } from 'react'
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
  const { recordingSeconds } = recorderState
  const { startRecording, saveRecording, cancelRecording } = handlers
  const [isListening, setIsListening] = useState<boolean>(false)
  const [, setDialog] = useAtom(getSetDialogAtom)

  return (
    <Box
      css={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        height: '10rem',
        backgroundColor: '$white',
        borderRadius: '$smallRadius',
        boxShadow: '$tileShadow',
        marginTop: '$5',
        padding: '$3'
      }}
    >
      <Box>
        {isListening ? (
          <Button
            disabled={recordingSeconds === 0}
            onClick={() => {
              setIsListening(false)
              saveRecording()
            }}
          >
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
          <Button
            onClick={() => {
              setIsListening(true)
              startRecording()
            }}
          >
            Record
          </Button>
        )}
        {isListening && (
          <Button
            outlined
            css={{
              marginLeft: '10px'
            }}
            onClick={() => {
              setIsListening(false)
              cancelRecording()
            }}
          >
            Cancel
          </Button>
        )}
      </Box>
      <Button
        onClick={() => {
          setDialog([])
        }}
        outlined
        color="secondary"
        size="small"
        css={{
          alignSelf: 'flex-end'
        }}
      >
        clear conversation
      </Button>
    </Box>
  )
}

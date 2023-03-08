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
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        backgroundColor: '$white',
        borderRadius: '$smallRadius',
        boxShadow: '$tileShadow',
        marginTop: '$5',
        paddingX: '$7',
        paddingY: '$5'
      }}
    >
      <Box
        css={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {isListening ? (
          <Button
            css={{
              width: '18rem'
            }}
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
            Send
          </Button>
        ) : (
          <Button
            css={{
              width: '25rem'
            }}
            onClick={() => {
              setIsListening(true)
              startRecording()
            }}
          >
            Talk
          </Button>
        )}
        {isListening && (
          <Button
            outlined
            css={{
              marginLeft: '1rem',
              width: '6rem'
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
          alignSelf: 'center',
          marginTop: '$12'
        }}
      >
        Clear Conversation
      </Button>
    </Box>
  )
}

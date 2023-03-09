import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { keyframes } from 'stitches.config'

import { Box } from 'components/atoms/Box'
import Button from 'components/atoms/Button'
import { InputField } from 'components/atoms/InputField'

import {
  addDialogPartAtom,
  getSetDialogAtom,
  SpeakerType
} from 'lib/jotai/text'
import { RecorderControlsProps } from 'lib/types/recorder'
import { toast } from 'react-hot-toast'
import {
  CircleIcon,
  MagnifyingGlassIcon,
  PaperPlaneIcon
} from '@radix-ui/react-icons'

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

const talk = async (text: string) => {
  const res = await fetch(`/api/talk?speaker=user`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      text
    })
  })
  toast.success('Success!')
  if (!res.ok) {
    throw new Error('Error')
  }
  const data = await res.json()
  return data
}

interface NoteFormProps {
  text: string
}
export default function RecorderControls({
  recorderState,
  handlers
}: RecorderControlsProps) {
  const { recordingSeconds } = recorderState
  const { startRecording, saveRecording, cancelRecording } = handlers
  const [isListening, setIsListening] = useState<boolean>(false)
  const [, addDialog] = useAtom(addDialogPartAtom)
  const [, setDialog] = useAtom(getSetDialogAtom)

  const formik = useFormik<NoteFormProps>({
    initialValues: {
      text: ''
    },
    validationSchema: Yup.object({
      text: Yup.string().required('Required')
    }),
    onSubmit: async (values) => {
      console.log('👉 ~ values:', values)
      // setLoading(true)
      try {
        const data = await talk(values.text)
        console.log('👉 ~ data:', data)
        // setSpeech(data)
      } catch (error) {
        toast.error('Ups! Something went wrong.')
        console.error(error)
        // setSpeech('Error')
      }
      // setLoading(false)
    }
  })

  const sendQuestion = async () => {
    // setLoading(true)
    if (formik.values.text) {
      const data = await talk(formik.values.text)
      console.log('👉 ~ data:', data)
      try {
        const answer = await fetch(`/api/ask`, {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            question: data.text,
            embedding: data.embedding
          })
        })
        const answerJson = await answer.json()
        addDialog({
          speaker: SpeakerType.AI,
          text: answerJson.answer
        })
      } catch (error) {
        toast.error('Ups! Something went wrong.')
        console.error(error)
        // setSpeech('Error')
      }
    }
    // setLoading(false)
  }

  return (
    <Box
      css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        backgroundColor: '$white',
        borderRadius: '$mediumRadius',
        boxShadow: '$tileShadow',
        marginTop: '$12',
        // paddingX: '$7',
        // paddingY: '$5',
        marginBottom: '$5',
        position: 'relative'
      }}
    >
      <form
        onSubmit={formik.handleSubmit}
        style={{ width: '100%', height: '100%' }}
      >
        <InputField
          textarea
          id="text"
          formik={formik}
          css={{
            width: '100%',
            margin: 0,
            borderWidth: '0'
          }}
          cssInput={{
            borderRadius: '$mediumRadius $mediumRadius 0 0 ',
            borderWidth: '0',
            padding: '$6'
          }}
        />
        <Box
          css={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Button
            css={{
              width: '100%',
              margin: 0,
              borderRadius: '0 0 0 $mediumRadius'
            }}
            type="submit"
          >
            <PaperPlaneIcon />
            <Box
              as="span"
              css={{
                marginLeft: '$2'
              }}
            >
              add
            </Box>
          </Button>
          <Button
            outlined
            css={{
              width: '100%',
              margin: 0,
              borderRadius: '0 0 $mediumRadius 0'
            }}
            type="button"
            onClick={() => sendQuestion()}
          >
            <MagnifyingGlassIcon />
            <Box
              as="span"
              css={{
                marginLeft: '$2'
              }}
            >
              find
            </Box>
          </Button>
        </Box>
      </form>
      <Box
        css={{
          position: 'absolute',
          top: '4%',
          right: '-40%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {isListening ? (
          <Button
            size="small"
            outlined
            color="secondary"
            css={{
              width: '7rem'
            }}
            disabled={recordingSeconds === 0}
            onClick={() => {
              setIsListening(false)
              saveRecording()
            }}
          >
            <Box
              css={{
                width: '15px',
                height: '15px',
                backgroundColor: '$primary10',
                borderRadius: '50%',
                animationName: `${pulsate}`,
                animationDuration: '1s',
                animationIterationCount: 'infinite',
                animationTimingFunction: 'ease-in-out',
                marginRight: '$2'
              }}
            />
            Stop
          </Button>
        ) : (
          <Button
            size="small"
            outlined
            color="secondary"
            css={{
              width: '7rem'
            }}
            onClick={() => {
              setIsListening(true)
              startRecording()
            }}
          >
            <CircleIcon />
            <Box
              as="span"
              css={{
                marginLeft: '$2'
              }}
            >
              Record
            </Box>
          </Button>
        )}
        {/* {isListening && (
          <Button
            outlined
            css={{
              marginLeft: '1rem',
              width: '1rem'
            }}
            onClick={() => {
              setIsListening(false)
              cancelRecording()
            }}
          >
            <Cross2Icon color="primary" />
          </Button>
        )} */}
      </Box>

      {/* <Button
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
      </Button> */}
    </Box>
  )
}

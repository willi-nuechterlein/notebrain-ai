import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { keyframes } from 'stitches.config'

import { Box } from 'components/atoms/Box'
import Button from 'components/atoms/Button'
import { InputField } from 'components/atoms/InputField'

import {
  getSetDialogAtom,
  getSetInputTextAtom,
  getSetIsInputLoadingAtom,
  SpeakerType
} from 'lib/jotai/text'
import { RecorderControlsProps } from 'lib/types/recorder'
import { toast } from 'react-hot-toast'
import {
  CircleIcon,
  MagnifyingGlassIcon,
  PaperPlaneIcon
} from '@radix-ui/react-icons'
import LoadingSpinner from 'components/atoms/LoadingSpinner'
import { useSWRConfig } from 'swr'

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

const talk = async (text: string, isQuestion?: boolean) => {
  const res = await fetch(`/api/talk${isQuestion ? '?isQ=true' : ''}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      text
    })
  })
  toast.success('sent')
  if (!res.ok) {
    toast.success('Ups! Something went wrong.')
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
  const { startRecording, saveRecording } = handlers
  const { mutate } = useSWRConfig()
  const [isListening, setIsListening] = useState<boolean>(false)
  const [, setDialog] = useAtom(getSetDialogAtom)
  const [inputText] = useAtom(getSetInputTextAtom)
  const [isInputLoading, setIsInputLoading] = useAtom(getSetIsInputLoadingAtom)

  const formik = useFormik<NoteFormProps>({
    initialValues: {
      text: ''
    },
    validationSchema: Yup.object({
      text: Yup.string().required('Required')
    }),
    onSubmit: async (values) => {
      setIsInputLoading(true)
      try {
        await talk(values.text)
      } catch (error) {
        toast.error('Ups! Something went wrong.')
        console.error(error)
      }
      setIsInputLoading(false)
      mutate(`/api/get-dialog`)
      formik.resetForm()
    }
  })
  useEffect(() => {
    if (inputText) {
      formik.setFieldValue('text', inputText)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputText])

  const sendQuestion = async () => {
    setIsInputLoading(true)
    if (formik.values.text) {
      const data = await talk(formik.values.text, true)
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
        setDialog([
          {
            speaker: SpeakerType.AI,
            text: answerJson.answer
          }
        ])
      } catch (error) {
        toast.error('Ups! Something went wrong.')
        console.error(error)
      }
    }
    formik.resetForm()
    setIsInputLoading(false)
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
        marginBottom: '$5',
        position: 'relative'
      }}
    >
      {isInputLoading ? (
        <Box
          css={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            borderRadius: '$mediumRadius',
            opacity: 0.4,
            backdropFilter: 'blur(120px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <LoadingSpinner />
        </Box>
      ) : null}
      <form
        onSubmit={formik.handleSubmit}
        style={{ width: '100%', height: '100%' }}
      >
        <InputField
          textarea
          id="text"
          formik={formik}
          placeholder={`Add a note here... or ask a question about your notes...`}
          css={{
            width: '100%',
            margin: 0,
            borderWidth: '0'
          }}
          cssInput={{
            borderRadius: '$mediumRadius $mediumRadius 0 0 ',
            borderWidth: '0',
            padding: '$6',
            paddingTop: '$10'
          }}
        />
        <Box
          css={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Button
            color="secondary"
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
            color="secondary"
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
              ask
            </Box>
          </Button>
        </Box>
      </form>
      <Box
        css={{
          position: 'absolute',
          top: '2%',
          right: '-41%',
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

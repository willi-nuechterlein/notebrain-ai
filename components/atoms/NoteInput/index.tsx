import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { HiOutlineMicrophone } from 'react-icons/hi'

import { Box } from 'components/atoms/Box'
import Button from 'components/atoms/Button'
import { InputField } from 'components/atoms/InputField'

import {
  getSetAnswerTextAtom,
  getSetInputTextAtom,
  getSetIsInputLoadingAtom,
  getSetSourcesAtom,
  SpeakerType
} from 'lib/jotai/text'
import { toast } from 'react-hot-toast'
import { MagnifyingGlassIcon, PlusIcon } from '@radix-ui/react-icons'
import LoadingSpinner from 'components/atoms/LoadingSpinner'
import { useSWRConfig } from 'swr'
import userSubscriptionStatus from 'lib/utils/userSubscriptionStatus'
import { useUser } from '@clerk/nextjs'
import { UseRecorder } from 'lib/types/recorder'
import useRecorder from 'lib/utils/audio/hooks/useRecorder'
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

const talk = async (text: string, isQuestion?: boolean, limited = true) => {
  const res = await fetch(`/api/talk`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      text,
      limited,
      isQ: isQuestion
    })
  })
  if (res.status === 403) {
    toast.error('You reached your monthly limit.')
    return
  }
  if (!res.ok) {
    toast.error('Ups! Something went wrong.')
  }
  const data = await res.json()
  toast.success('sent')
  return data
}

interface NoteFormProps {
  text: string
}

export type NoteInputProps = {
  isDemo?: boolean
}
export default function NoteInput({ isDemo }: NoteInputProps) {
  const { user } = useUser()
  const subscription = userSubscriptionStatus(user)
  const { recorderState, ...handlers }: UseRecorder = useRecorder()

  const { startRecording, saveRecording } = handlers
  const [isListening, setIsListening] = useState<boolean>(false)
  const [, setAnswer] = useAtom(getSetAnswerTextAtom)
  const [, setSources] = useAtom(getSetSourcesAtom)
  const { mutate } = useSWRConfig()
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
        await talk(values.text, false, !subscription?.active)
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
      const data = await talk(formik.values.text, true, false)
      if (!data.text || !data.embedding) {
        toast.error('Ups! Something went wrong.')
        setIsInputLoading(false)
        return
      }
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
        if (!answer.ok) {
          toast.error('Ups! Something went wrong.')
          setIsInputLoading(false)
          return
        }
        const answerJson = await answer.json()
        setAnswer({
          id: answerJson.id,
          speaker: SpeakerType.AI,
          text: answerJson.answer
        })
        setSources(
          answerJson.records.map((r: any) => ({
            speaker: SpeakerType.USER,
            text: r.text,
            created_at: r.created_at,
            id: r.id
          }))
        )
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
        borderRadius: '$largeRadius',
        boxShadow: '$tileShadow',
        position: 'relative',
        zIndex: 2
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
          placeholder={`Add a note... or find information in your notes...`}
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
            disabled={isDemo}
            color="secondary"
            css={{
              width: '100%',
              margin: 0,
              borderRadius: '0 0 0 $mediumRadius'
            }}
            type="submit"
          >
            <PlusIcon />
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
            disabled={isDemo}
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
              find
            </Box>
          </Button>
        </Box>
      </form>
      <Box
        css={{
          position: 'absolute',
          bottom: '3.2rem',
          right: '1rem'
        }}
      >
        <Button
          size="small"
          outlined
          color="secondary"
          plain
          css={{
            width: '3rem',
            height: '3rem',
            borderRadius: '50%'
          }}
          disabled={isDemo || isInputLoading}
          onClick={() => {
            if (isListening) {
              setIsListening(false)
              saveRecording()
            } else {
              setIsListening(true)
              startRecording()
            }
          }}
        >
          {isListening ? (
            <Box
              css={{
                width: '15px',
                height: '15px',
                backgroundColor: '$primary10',
                borderRadius: '50%',
                animationName: `${pulsate}`,
                animationDuration: '1s',
                animationIterationCount: 'infinite',
                animationTimingFunction: 'ease-in-out'
              }}
            />
          ) : (
            <HiOutlineMicrophone width={30} height={30} />
          )}
        </Button>
      </Box>
    </Box>
  )
}

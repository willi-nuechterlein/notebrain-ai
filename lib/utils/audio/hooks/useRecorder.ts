import { useState, useEffect } from 'react'
import {
  startRecording,
  saveRecording
} from 'lib/utils/audio/handlers/recorderControls'
import {
  Recorder,
  Interval,
  AudioTrack,
  MediaRecorderEvent
} from 'lib/types/recorder'
import { toast } from 'react-hot-toast'
import { useAtom } from 'jotai'
import { addDialogPartAtom, SpeakerType } from 'lib/jotai/text'
import { userAtom } from 'lib/jotai/user'

const initialState: Recorder = {
  recordingMinutes: 0,
  recordingSeconds: 0,
  initRecording: false,
  mediaStream: null,
  mediaRecorder: null,
  audio: null
}

export default function useRecorder() {
  const [recorderState, setRecorderState] = useState<Recorder>(initialState)
  const [, addDialog] = useAtom(addDialogPartAtom)
  const [user] = useAtom(userAtom)
  useEffect(() => {
    const MAX_RECORDER_TIME = 5
    let recordingInterval: Interval = null

    if (recorderState.initRecording) {
      recordingInterval = setInterval(() => {
        setRecorderState((prevState: Recorder) => {
          if (
            prevState.recordingMinutes === MAX_RECORDER_TIME &&
            prevState.recordingSeconds === 0
          ) {
            if (typeof recordingInterval === 'number')
              clearInterval(recordingInterval)

            return prevState
          }

          if (
            prevState.recordingSeconds >= 0 &&
            prevState.recordingSeconds < 59
          )
            return {
              ...prevState,
              recordingSeconds: prevState.recordingSeconds + 1
            }
          else if (prevState.recordingSeconds === 59)
            return {
              ...prevState,
              recordingMinutes: prevState.recordingMinutes + 1,
              recordingSeconds: 0
            }
          else return prevState
        })
      }, 1000)
    } else {
      if (typeof recordingInterval === 'number') {
        clearInterval(recordingInterval)
      }
    }

    return () => {
      if (typeof recordingInterval === 'number') {
        clearInterval(recordingInterval)
      }
    }
  })

  useEffect(() => {
    setRecorderState((prevState) => {
      if (prevState.mediaStream)
        return {
          ...prevState,
          mediaRecorder: new MediaRecorder(prevState.mediaStream)
        }
      else return prevState
    })
  }, [recorderState.mediaStream])

  useEffect(() => {
    const recorder = recorderState.mediaRecorder
    let chunks: Blob[] = []

    if (recorder && recorder.state === 'inactive') {
      recorder.start()

      recorder.ondataavailable = (e: MediaRecorderEvent) => {
        chunks.push(e.data)
      }

      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/wav' })
        chunks = []
        const file = new File([blob], 'audio.wav', { type: 'audio/wav' })
        const data = new FormData()
        data.append('file', file)
        data.append('model', 'whisper-1')
        data.append('language', 'en')
        try {
          const response = await fetch(
            ' https://api.openai.com/v1/audio/transcriptions',
            {
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPEN_AI_KEY}`
              },
              method: 'POST',
              body: data
            }
          )
          const json = await response.json()
          const { text } = json
          addDialog({
            speaker: SpeakerType.USER,
            text
          })
          if (user?.id && text) {
            const res = await fetch(` /api/talk?user=${user.id}&speaker=user`, {
              headers: {
                'Content-Type': 'application/json'
              },
              method: 'POST',
              body: JSON.stringify({
                text
              })
            })
            // console.log('👉 ~ response:', response)
            // const dbRecord = await fetch('/api/insert-dialog', {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json'
            //   },
            //   body: JSON.stringify({
            //     text,
            //     user: user?.id,
            //     speaker: SpeakerType.USER
            //   })
            // })
            // if (!res.ok) throw new Error('Talk Error')
            const newDialogPart = JSON.parse(await res.json())

            if (newDialogPart.is_question) {
              const answer = await fetch(` /api/ask?user=${user.id}`, {
                headers: {
                  'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                  question: newDialogPart.text,
                  embedding: newDialogPart.embedding
                })
              })
              const answerJson = JSON.parse(await answer.json())
              addDialog({
                speaker: SpeakerType.AI,
                text: answerJson.answer
              })
            }
          }
        } catch (error) {
          toast.error('Something went wrong')
        }
        setRecorderState((prevState: Recorder) => {
          if (prevState.mediaRecorder)
            return {
              ...initialState,
              audio: window.URL.createObjectURL(blob)
            }
          else return initialState
        })
      }
    }

    return () => {
      if (recorder)
        recorder.stream
          .getAudioTracks()
          .forEach((track: AudioTrack) => track.stop())
    }
  }, [recorderState.mediaRecorder, addDialog, user?.id])

  return {
    recorderState,
    startRecording: () => startRecording(setRecorderState),
    cancelRecording: () => setRecorderState(initialState),
    saveRecording: () => saveRecording(recorderState.mediaRecorder)
  }
}

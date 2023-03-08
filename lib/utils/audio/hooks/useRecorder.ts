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
import { getSetDialogAtom, SpeakerType } from 'lib/jotai/text'

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
  const [, setDialog] = useAtom(getSetDialogAtom)
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
          console.log('👉 ~ text:', text)
          setDialog({ speaker: SpeakerType.USER, text })
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
  }, [recorderState.mediaRecorder, setDialog])

  return {
    recorderState,
    startRecording: () => startRecording(setRecorderState),
    cancelRecording: () => setRecorderState(initialState),
    saveRecording: () => saveRecording(recorderState.mediaRecorder)
  }
}

import { SetRecorder } from 'lib/types/recorder'
import { toast } from 'react-hot-toast'

export async function startRecording(setRecorderState: SetRecorder) {
  try {
    const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    })

    setRecorderState((prevState) => {
      return {
        ...prevState,
        initRecording: true,
        mediaStream: stream
      }
    })
  } catch (err) {
    console.log('👉 ~ err:', err)
    setRecorderState((prevState) => {
      return {
        ...prevState,
        initRecording: false,
        mediaStream: null
      }
    })
    toast.error('Failed to start recording')
  }
}

export function saveRecording(recorder: any) {
  if (recorder.state !== 'inactive') recorder.stop()
}

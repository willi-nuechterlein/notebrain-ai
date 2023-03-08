import { useAtom } from 'jotai'
import useSWR from 'swr'

import { Box } from 'components/atoms/Box'
import RecorderControls from 'components/atoms/RecorderControls'
import { Typography } from 'components/atoms/Typography'
import Footer from 'components/molecules/Footer'

import { dialogAtom, getSetDialogAtom } from 'lib/jotai/text'
import { UseRecorder } from 'lib/types/recorder'
import useRecorder from 'lib/utils/audio/hooks/useRecorder'
import { userAtom } from 'lib/jotai/user'
import { Chat } from 'components/organismns/Chat'

export default function Home() {
  const { recorderState, ...handlers }: UseRecorder = useRecorder()
  const [dialog, setDialog] = useAtom(getSetDialogAtom)
  const [user] = useAtom(userAtom)

  // const { data } = useSWR(
  //   () => (user?.id ? `/api/get-dialog?user=${user.id}` : null),
  //   {
  //     revalidateIfStale: false,
  //     revalidateOnFocus: false,
  //     revalidateOnReconnect: false
  //   }
  // )
  // if (data) {
  //   const parsedData = JSON.parse(data)
  //   if (parsedData.length && dialog?.length !== parsedData.length) {
  //     setDialog(parsedData)
  //   }
  // }

  return (
    <Box
      css={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      {/* <Nav /> */}
      <Box
        css={{
          // marginTop: '10vh',
          height: '100vh',
          width: '100%',
          maxWidth: '50rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Chat messages={dialog} />
        <RecorderControls recorderState={recorderState} handlers={handlers} />
      </Box>
      <Footer />
    </Box>
  )
}

import { Box } from 'components/atoms/Box'
import Footer from 'components/molecules/Footer'

import Nav from 'components/molecules/Nav'

export default function Home() {
  return (
    <Box
      css={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <Nav />

      <Footer />
    </Box>
  )
}

import Image from 'next/image'

const Logo = () => {
  return (
    // <Box
    //   css={{
    //     display: 'flex',
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //     marginTop: '1vh'
    //   }}
    // >
    <Image src="/logo.svg" alt="logo" width={60} height={60} />
    // </Box>
  )
}

export default Logo

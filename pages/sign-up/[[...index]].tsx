import { SignUp } from '@clerk/nextjs'
import { Box } from 'components/atoms/Box'

const SignUpPage = () => (
  <Box
    css={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}
  >
    <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
  </Box>
)

export default SignUpPage

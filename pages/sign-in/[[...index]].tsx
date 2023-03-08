import { SignIn } from '@clerk/nextjs'
import { Box } from 'components/atoms/Box'

const SignInPage = () => (
  <Box
    css={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}
  >
    <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
  </Box>
)

export default SignInPage

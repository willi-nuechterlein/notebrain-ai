import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Box } from 'components/atoms/Box'
import Button from 'components/atoms/Button'
import { Typography } from 'components/atoms/Typography'

const Nav = () => (
  <Box
    css={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      maxWidth: '60rem',
      padding: '$3',
      position: 'fixed',
      backdropFilter: 'blur(12px)',
      zIndex: 1,
      height: '4rem'
    }}
  >
    <Typography
      css={{
        fontSize: '$6',
        fontWeight: 'bolder',
        color: '$secondary1'
      }}
    >
      muu.cool
    </Typography>

    <Box>
      <SignedIn>
        {/* Mount the UserButton component */}

        <UserButton afterSignOutUrl="/" />
      </SignedIn>

      <SignedOut>
        {/* Signed out users get sign in button */}
        <SignInButton afterSignInUrl="/app">
          <Button size="small">Sign In</Button>
        </SignInButton>
      </SignedOut>

      {/* <Link href={`#examples`}>
        <Button as="span" size="small" color="secondary" plain>
        Examples
        </Button>
        </Link>
        <Link href={`#pricing`}>
        <Button as="span" size="small" color="secondary" plain>
        Pricing
        </Button>
      </Link> */}
      {/* <Link href={`#${FOURTH_SECTION}`}>
        <Button as="span" size="small" outlined>
        Login
        </Button>
      </Link> */}
    </Box>
  </Box>
)
export default Nav

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser
} from '@clerk/nextjs'
import { Box } from 'components/atoms/Box'
import Button from 'components/atoms/Button'
import Logo from 'components/atoms/Logo'
import { Typography } from 'components/atoms/Typography'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Nav = () => {
  const { user } = useUser()
  const router = useRouter()
  const path = router.pathname
  const isApp = path === '/app'
  const isAccount = path === '/account'
  return (
    <Box
      css={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        position: 'fixed',
        backdropFilter: 'blur(12px)',
        zIndex: 10,
        height: '4rem'
      }}
    >
      <Box
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          maxWidth: '60rem',
          padding: '$3'
        }}
      >
        <Box
          css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Logo size={33} />
          {isApp || isAccount ? null : (
            <Typography
              css={{
                marginLeft: '$2',
                fontSize: '$7',
                fontWeight: 600,
                color: '$primary8'
              }}
            >
              notebr
              <Box
                as="span"
                css={{
                  fontWeight: 400
                }}
              >
                ai
              </Box>
              n
            </Typography>
          )}
          <Box
            css={{
              marginLeft: '$2',
              fontSize: '0.65rem',
              fontWeight: 600,
              color: '$primary8',
              padding: '$1',
              paddingX: '$2',
              border: '1px solid $primary8',
              borderRadius: '$smallRadius'
            }}
          >
            beta
          </Box>
        </Box>

        <Box
          css={{
            display: 'flex',
            alignItems: 'center',
            gap: '$3'
          }}
        >
          {!isApp && user ? (
            <Link href={'/app'}>
              <Button
                as="span"
                size="small"
                plain
                css={{
                  color: '$secondary2'
                }}
              >
                App
              </Button>
            </Link>
          ) : null}

          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              userProfileUrl="/account"
              userProfileMode="navigation"
            />
          </SignedIn>

          <SignedOut>
            <SignInButton afterSignInUrl="/app">
              <Button size="small" outlined>
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
        </Box>
      </Box>
    </Box>
  )
}
export default Nav

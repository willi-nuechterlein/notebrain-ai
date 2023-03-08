import { Box } from 'components/atoms/Box'
import Button from 'components/atoms/Button'
import Logo from 'components/atoms/Logo'
import { FOURTH_SECTION } from 'lib/consts/sections'
import Link from 'next/link'

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
      backdropFilter: 'blur(12px)'
    }}
  >
    <Logo />
    <Box>
      <Link href={`#examples`}>
        <Button as="span" size="small" color="secondary" plain>
          Examples
        </Button>
      </Link>
      <Link href={`#pricing`}>
        <Button as="span" size="small" color="secondary" plain>
          Pricing
        </Button>
      </Link>
      <Link href={`#${FOURTH_SECTION}`}>
        <Button as="span" size="small" outlined>
          Speech
        </Button>
      </Link>
    </Box>
  </Box>
)
export default Nav

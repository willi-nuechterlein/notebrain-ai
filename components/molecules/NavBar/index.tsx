import { Box } from 'components/atoms/Box'
import Menu from 'components/atoms/Menu'
import { ReactNode } from 'react'
import { styled } from 'stitches.config'

const StyledNavBar = styled('nav', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'top',
  paddingY: '1rem',
  width: '100%',
  marginBottom: '1rem',
  position: 'sticky',
  top: 0,
  zIndex: 1,
  backgroundColor: '$background',
  overflow: 'visible'
})

interface NavBarProps {
  children?: ReactNode
}

const NavBar = ({ children }: NavBarProps) => {
  return (
    <StyledNavBar>
      {children}
      <Menu />
      <Box
        css={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '120%',
          height: '100%',
          marginX: '-10%',
          backgroundColor: '$background',
          zIndex: -1
        }}
      />
    </StyledNavBar>
  )
}

export default NavBar

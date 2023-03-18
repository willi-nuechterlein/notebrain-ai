import { styled } from 'stitches.config'

export const IconButton = styled('button', {
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '100%',
  height: 25,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$primary8',
  position: 'absolute',
  top: 10,
  right: 10,
  cursor: 'pointer',
  backgroundColor: '$secondary10',

  '&:hover': { backgroundColor: '$primary7', color: '$white' },
  '&:focus': { boxShadow: `0 0 2px $primary7` }
})

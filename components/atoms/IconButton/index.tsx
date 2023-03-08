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
  color: '$secondary9',
  position: 'absolute',
  top: 10,
  right: 10,
  cursor: 'pointer',
  backgroundColor: '$background',

  '&:hover': { backgroundColor: '$gray7' },
  '&:focus': { boxShadow: `0 0 2px $secondary7` }
})

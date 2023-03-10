import React from 'react'
import { keyframes, styled } from 'stitches.config'

const SpinnerContainer = styled('div', {
  display: 'inline-block',
  position: 'relative',
  width: '64px',
  height: '64px'
})

const SpinnerKeyframes = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' }
})

const SpinnerCircle = styled('div', {
  boxSizing: 'border-box',
  display: 'block',
  position: 'absolute',
  width: '51px',
  height: '51px',
  border: '6px solid $primary9',
  borderRadius: '50%',
  animation: `${SpinnerKeyframes} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
  borderColor: '$primary9 transparent transparent transparent',
  '&:nth-child(1)': {
    animationDelay: '-0.45s'
  },
  '&:nth-child(2)': {
    animationDelay: '-0.3s'
  },
  '&:nth-child(3)': {
    animationDelay: '-0.15s'
  }
})

type Props = {
  size?: number
  color?: string
}

const LoadingSpinner: React.FC<Props> = ({
  size = 64,
  color = '$primary9'
}) => {
  return (
    <SpinnerContainer style={{ width: `${size}px`, height: `${size}px` }}>
      <SpinnerCircle
        style={{ borderColor: `${color} transparent transparent transparent` }}
      />
      <SpinnerCircle
        style={{
          borderColor: `${color} transparent transparent transparent`,
          animationDelay: '-0.3s'
        }}
      />
      <SpinnerCircle
        style={{
          borderColor: `${color} transparent transparent transparent`,
          animationDelay: '-0.15s'
        }}
      />
    </SpinnerContainer>
  )
}

export default LoadingSpinner

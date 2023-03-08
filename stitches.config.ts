import {
  blackA,
  gray,
  green,
  red,
  violet,
  blue,
  teal,
  purple,
  mauveDark,
  mauve
} from '@radix-ui/colors'

import { createStitches } from '@stitches/react'

export const primaryColor = purple
export const secondaryColor = mauveDark
const primary = {}
Object.assign(primary, {
  primary1: primaryColor.purple1,
  primary2: primaryColor.purple2,
  primary3: primaryColor.purple3,
  primary4: primaryColor.purple4,
  primary5: primaryColor.purple5,
  primary6: primaryColor.purple6,
  primary7: primaryColor.purple7,
  primary8: primaryColor.purple8,
  primary9: primaryColor.purple9,
  primary10: primaryColor.purple10,
  primary11: primaryColor.purple11,
  primary12: primaryColor.purple12
})

const secondary = {}
Object.assign(secondary, {
  secondary1: secondaryColor.mauve12,
  secondary2: secondaryColor.mauve11,
  secondary3: secondaryColor.mauve10,
  secondary4: secondaryColor.mauve9,
  secondary5: secondaryColor.mauve8,
  secondary6: secondaryColor.mauve7,
  secondary8: secondaryColor.mauve6,
  secondary7: secondaryColor.mauve5,
  secondary9: secondaryColor.mauve4,
  secondary10: secondaryColor.mauve3,
  secondary11: secondaryColor.mauve2,
  secondary12: secondaryColor.mauve1
})

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config
} = createStitches({
  theme: {
    colors: {
      ...gray,
      ...blackA,
      ...primary,
      ...secondary,
      ...red,
      ...violet,
      ...blue,
      ...green,
      ...teal,
      white: '#fff',
      background: mauve.mauve1,
      text: '$gray12',
      error: red.red9,
      success: green.green9
    },
    radii: {
      largeRadius: '2.5rem',
      mainRadius: '1.375rem',
      mediumRadius: '0.875rem',
      smallRadius: '0.4rem',
      tinyRadius: '0.3rem'
    },
    fontSizes: {
      1: '0.25rem',
      2: '0.375rem',
      3: '0.5rem',
      4: '0.75rem',
      5: '0.875rem',
      6: '1rem',
      7: '1.25rem',
      8: '1.5rem',
      9: '1.75rem',
      10: '2rem',
      11: '2.25rem',
      12: '2.5rem',
      13: '3rem',
      14: '3.5rem',
      15: '4rem',
      16: '4.5rem',
      17: '5rem'
    },
    sizes: {
      1: '4px',
      2: '8px',
      3: '16px',
      4: '24px',
      5: '32px',
      6: '64px',
      7: '128px'
    },
    space: {
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.5rem',
      10: '3rem',
      11: '3.5rem',
      12: '4rem'
    },
    shadows: {
      tileShadow:
        '0px 0px 20px 0 rgba(0,0,0,0.02),0px 2px 10px 0 rgba(0,0,0,0.05)',
      sectionShadow:
        '0px -10px 20px 0 rgba(0,0,0,0.02),0px -2px 10px 0 rgba(0,0,0,0.05),0px 10px 20px 0 rgba(0,0,0,0.02),0px 2px 10px 0 rgba(0,0,0,0.05)',
      sectionShadowBottom:
        '0px 10px 20px 0 rgba(0,0,0,0.02),0px 2px 10px 0 rgba(0,0,0,0.05)'
    }
  },
  media: {
    sm: '(min-width: 375px)',
    md: '(min-width: 600px)',
    lg: '(min-width: 900px)',
    xl: '(min-width: 1200px)'
  },
  utils: {
    marginX: (value: any) => ({ marginLeft: value, marginRight: value }),
    marginY: (value: any) => ({ marginTop: value, marginBottom: value }),
    paddingX: (value: any) => ({ paddingLeft: value, paddingRight: value }),
    paddingY: (value: any) => ({ paddingTop: value, paddingBottom: value })
  }
})

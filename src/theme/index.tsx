import React, { useMemo } from 'react'
import styled, {
  ThemeProvider as StyledComponentsThemeProvider,
  createGlobalStyle,
  css,
  DefaultTheme
} from 'styled-components'
import { useIsDarkMode } from '../state/user/hooks'
import { Text, TextProps } from 'rebass'
import { Colors } from './styled'

export * from './components'

const MEDIA_WIDTHS = {
  upToMobileSmall: 380,
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLaptop: 1085,
  upToLarge: 1280
}

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    ;(accumulator as any)[size] = (a: any, b: any, c: any) => css`
      @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `
    return accumulator
  },
  {}
) as any

const white = '#FFFFFF'
const black = '#000000'

export function colors(darkMode: boolean): Colors {
  return {
    // base
    white,
    black,

    // text
    text1: darkMode ? '#FFFFFF' : '#fff',
    text2: darkMode ? '#bbbbbb' : '#bbbbbb',
    text3: darkMode ? '#888D9B' : '#888D9B',
    text4: darkMode ? '#C3C5CB' : '#C3C5CB',
    text5: darkMode ? '#EDEEF2' : '#EDEEF2',
  
    text6: darkMode ? '#8e8e8e' : '#8e8e8e',
    text7: darkMode ? '#f5434c' : '#f5434c',
    text8: darkMode ? '#ffcc48' : '#ffcc48',
    text9: darkMode ? '#00d870' : '#00d870',
    text10: darkMode ? '#18e77f' : '#18e77f',
    text11: darkMode ? '#3dd598' : '#3dd598',
    text12: darkMode ? '#00B35D' : '#00B35D',

    // backgrounds / greys
    bg1: darkMode ? 'rgba(47, 47, 47, 1)' : 'rgba(47, 47, 47, 1)',
    bg2: darkMode ? 'rgba(37,37,37,1)' : 'rgba(37,37,37,1)',
    bg3: darkMode ? 'rgba(97, 97, 97, 1)' : 'rgba(97, 97, 97, 1)',
    bg4: darkMode ? '#CED0D9' : '#CED0D9',
    bg5: darkMode ? '#888D9B' : '#888D9B',

    bg6: darkMode ? '#616161' : '#616161',
    bg7: darkMode ? '#3e3e3e' : '#3e3e3e',
    bg8: darkMode ? 'rgba(40, 40, 40, 0.8)' : 'rgba(40, 40, 40, 0.8)',
    bg9: darkMode ? '#c4c9d247' : '#c4c9d247',
    bg10: darkMode ? '#2D2D2D' : '#2D2D2D',
    bg11: darkMode ? '#00d870' : '#00d870',
    bg12: darkMode ? '#1e1e1e' : '#1e1e1e',
    bg13: darkMode ? '#212121' : '#212121',


    //specialty colors
    modalBG: darkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.3)',
    advancedBG: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.1)',

    //primary colors
    primary1: darkMode ? '#E44B05' : '#E44B05',
    primary2: darkMode ? '#FF8CC3' : 'FF8CC3',
    primary3: darkMode ? 'rgba(228, 75, 5, 1)' : 'rgba(228, 75, 5, 1)',
    primary4: darkMode ? '#F6DDE8' : '#F6DDE8',
    primary5: darkMode ? 'rgba(228, 75, 5, 1)' : 'rgba(228, 75, 5, 1)',

    //grey colors
    grey1: darkMode ? '#616161' : '#616161',
    grey2: darkMode ? '#E3E6EC' : '#E3E6EC',
    grey3: darkMode ? '#343434' : '#343434',
    grey4: darkMode ? '#11142D' : '#11142D',

    // color text
    primaryText1: darkMode ? '#FFFFFF' : '#FFFFFF',

    // secondary colors
    secondary1: darkMode ? 'rgba(97, 97, 97, 1)' : 'rgba(97, 97, 97, 1)',
    secondary2: darkMode ? '#F6DDE8' : '#F6DDE8',
    secondary3: darkMode ? '#FDEAF1' : '#FDEAF1',

    // other
    red1: '#FF6871',
    red2: '#F82D3A',
    green1: 'rgba(61, 213, 152, 1)',
    yellow1: '#FFE270',
    yellow2: '#F3841E',
    blue1: 'rgba(97, 97, 97, 1)'

    // dont wanna forget these blue yet
    // blue4: darkMode ? '#153d6f70' : '#C4D9F8',
    // blue5: darkMode ? '#153d6f70' : '#EBF4FF',
  }
}

export function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),

    grids: {
      sm: 8,
      md: 12,
      lg: 24
    },

    //shadows
    shadow1: darkMode ? '#000' : '#2F80ED',

    // media queries
    mediaWidth: mediaWidthTemplates,

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useIsDarkMode()

  const themeObject = useMemo(() => theme(darkMode), [darkMode])

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
  color: ${({ color, theme }) => (theme as any)[color]};
`

export const TYPE = {
  main(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text2'} {...props} />
  },
  link(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />
  },
  black(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text1'} {...props} />
  },
  white(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'white'} {...props} />
  },
  body(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={16} color={'text1'} {...props} />
  },
  extraLargeHeader(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={32} {...props} />
  },
  largeHeader(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={24} {...props} />
  },
  mediumHeader(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={20} {...props} />
  },
  subHeader(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={14} {...props} />
  },
  small(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={11} {...props} />
  },
  blue(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />
  },
  yellow(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'yellow1'} {...props} />
  },
  darkGray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text3'} {...props} />
  },
  gray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'bg3'} {...props} />
  },
  italic(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={12} fontStyle={'italic'} color={'text2'} {...props} />
  },
  error({ error, ...props }: { error: boolean } & TextProps) {
    return <TextWrapper fontWeight={500} color={error ? 'red1' : 'text2'} {...props} />
  },
  subHeaderWFS(props: TextProps) {
    return <TextWrapper fontWeight={400} {...props} />
  }
}

export const FixedGlobalStyle = createGlobalStyle`
html, input, textarea, button {
  font-family: 'IBM Plex Sans', sans-serif;
  font-display: fallback;
}
@supports (font-variation-settings: normal) {
  html, input, textarea, button {
    font-family: 'IBM Plex Sans', sans-serif;
  }
}

html,
body {
  margin: 0;
  padding: 0;
}

 a {
   color: ${colors(false).blue1}; 
 }

* {
  box-sizing: border-box;
}

button {
  user-select: none;
}

html {
  font-size: 16px;
  font-variant: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-feature-settings: 'ss01' on, 'ss02' on, 'cv01' on, 'cv03' on;
  
}
`

export const ThemedGlobalStyle = createGlobalStyle`
html {
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.bg2};
}

body {
  width:100%;
  height: 100vh;
  /* background-position: 0 -30vh;
  background-repeat: no-repeat;
  background-color: #282828; */
}
`

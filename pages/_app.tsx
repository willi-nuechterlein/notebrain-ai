import type { AppProps } from 'next/app'
import { Provider as JotaiProvider } from 'jotai'
import { globalCss } from 'stitches.config'
import { Inter } from '@next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from 'react-hot-toast'
import { SWRConfig } from 'swr'
import { ClerkProvider } from '@clerk/nextjs'

import Nav from 'components/molecules/Nav'
import { Box } from 'components/atoms/Box'
import Footer from 'components/molecules/Footer'

const inter = Inter({ subsets: ['latin'] })

const globalStyles = globalCss({
  '*': { boxSizing: 'border-box' },
  'html, body': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    backgroundColor: '$background',
    color: '$text',
    scrollBehavior: 'smooth !important',
    width: '100vw',
    overflowX: 'hidden'
  },
  'a': {
    unset: 'all',
    textDecoration: 'none'
  }
})

export default function App({ Component, pageProps }: AppProps) {
  globalStyles()
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <ClerkProvider {...pageProps}>
        <SWRConfig
          value={{
            fetcher: (resource, init) =>
              fetch(resource, init).then((res) => res.json())
          }}
        >
          <JotaiProvider>
            <Toaster
              toastOptions={{
                success: {
                  iconTheme: {
                    primary: '#30a46c',
                    secondary: '#f2fcf6'
                  }
                }
              }}
            />
            <Box
              css={{
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                flexDirection: 'column'
              }}
            >
              <Nav />

              <Component {...pageProps} />
              <Footer />
            </Box>
            <Analytics />
          </JotaiProvider>
        </SWRConfig>
      </ClerkProvider>
    </>
  )
}

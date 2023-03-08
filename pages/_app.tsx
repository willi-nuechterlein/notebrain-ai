import type { AppProps } from 'next/app'
import { Provider as JotaiProvider } from 'jotai'
import { globalCss } from 'stitches.config'
import { Inter } from '@next/font/google'
import { Toaster } from 'react-hot-toast'
import { SWRConfig } from 'swr'
import { ClerkProvider } from '@clerk/nextjs'

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
    overflowX: 'auto'
  },
  'a': {
    unset: 'all'
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
            <Component {...pageProps} />
          </JotaiProvider>
        </SWRConfig>
      </ClerkProvider>
    </>
  )
}

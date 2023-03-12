import { Box } from 'components/atoms/Box'
import Button from 'components/atoms/Button'
import NoteInput from 'components/atoms/NoteInput'
import { Paragraph } from 'components/atoms/Paragraph'
import { Title } from 'components/atoms/Title'
import Pricing from 'components/molecules/Pricing'
import FeaturesSection from 'components/organismns/FeaturesSection'
import Link from 'next/link'

export default function Home() {
  return (
    <Box
      css={{
        width: '100%',
        height: '100%',
        minHeight: '80vh',
        paddingTop: '20vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '-1rem',
        '@md': {
          paddingTop: '15vh',
          minHeight: '62vh'
        }
      }}
    >
      <Title
        css={{
          fontSize: '$11',
          marginY: '$4',
          marginX: '$1',
          '& span': {
            display: 'block'
          },
          textAlign: 'center',
          '@md': {
            fontSize: '$13'
          },
          fontWeight: 800
        }}
      >
        <span>Search Your Mind</span>
      </Title>
      <Paragraph
        css={{
          '& span': {
            display: 'block'
          },
          marginBottom: '$10',
          marginX: '$5',
          textAlign: 'center',
          fontSize: '$5',
          '@md': {
            fontSize: '$6'
          }
        }}
      >
        <span>
          Searching for specific information in your notes can be tedious and
          frustrating.
        </span>
        <span>
          <Box
            as="span"
            css={{
              fontWeight: 700,
              display: 'inline !important'
            }}
          >
            notebrain
          </Box>{' '}
          eliminates the hassle by providing an intuitive AI-powered search.
        </span>
        <span>Find what you need by simply asking a question.</span>
      </Paragraph>
      <Link href={`/app`}>
        <Button
          css={{
            zIndex: 10
          }}
        >
          Start for free
        </Button>
      </Link>
      <Box
        css={{
          width: '100%',
          maxWidth: '40rem',
          paddingX: '$2',
          marginTop: '7rem',
          marginBottom: '-8rem',
          position: 'relative'
        }}
      >
        <Box
          css={{
            width: '39rem',
            height: '38rem',
            borderRadius: '100%',
            backgroundColor: '$primary8',
            position: 'absolute',
            filter: 'blur(180px)',
            opacity: 0.4,
            marginTop: '-5rem',
            zindex: -10
          }}
        />
        <Box
          css={{
            width: '100vw',
            height: '40vh',
            backgroundColor: '$background',
            position: 'absolute',
            left: '-50%',
            top: '7.5rem',
            zindex: -10
          }}
        />
        <NoteInput isDemo />
      </Box>
      <FeaturesSection />
      <Pricing />
    </Box>
  )
}

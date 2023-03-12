import { Box } from 'components/atoms/Box'
import Button from 'components/atoms/Button'
import { Paragraph } from 'components/atoms/Paragraph'
import { Title } from 'components/atoms/Title'
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
          Our app eliminates the hassle by providing an intuitive AI-powered
          search.
        </span>
        <span>Find what you need by simply asking a question.</span>
      </Paragraph>
      <Link href={`/app`}>
        <Button>Start for free</Button>
      </Link>
    </Box>
  )
}

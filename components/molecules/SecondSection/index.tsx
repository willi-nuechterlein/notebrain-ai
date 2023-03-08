import Image from 'next/image'

import { Box } from 'components/atoms/Box'
import { Paragraph } from 'components/atoms/Paragraph'
import { TileContainer } from 'components/atoms/TileContainer'
import TileTextContainer from 'components/atoms/TileTextContainer'
import { Title } from 'components/atoms/Title'
import SectionTitle from 'components/atoms/SectionTitle'

import { SECOND_SECTION } from 'lib/consts/sections'

const SecondSection = () => (
  <Box
    id={`${SECOND_SECTION}`}
    css={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '$white',
      borderRadius: '$mainRadius',
      boxShadow: '$sectionShadow',
      paddingY: 60
    }}
  >
    <SectionTitle>{SECOND_SECTION}</SectionTitle>
    <Paragraph
      css={{
        textAlign: 'center',
        marginX: '$5',
        maxWidth: '35rem'
      }}
    >
      Take a look at some of my recent work!
    </Paragraph>
    <Box
      css={{
        width: '100%',
        padding: '$5',
        display: 'grid',
        columnCount: 2,
        gridTemplateColumns: 'repeat(1, 1fr)',
        gridGap: '$5',
        marginY: '$5',
        '@md': {
          gridTemplateColumns: 'repeat(2, 1fr)'
        },
        '@lg': {
          width: '70%',
          maxWidth: '70rem'
        },
        '@xl': {
          gridTemplateColumns: 'repeat(3, 1fr)'
        }
      }}
    >
      <TileContainer>
        <Box
          css={{
            height: '10rem',
            width: '100%',
            position: 'relative'
          }}
        >
          <Image
            // TODO: make style image component
            style={{
              borderRadius: '1.375rem 1.375rem 0 0',
              objectFit: 'cover'
            }}
            fill
            src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            alt="Link cover image"
          />
        </Box>

        <TileTextContainer>
          <Title as="h2" variant="secondary">
            UI Engineering
            <Box
              as="span"
              css={{
                paddingX: '$2',
                paddingY: '$1',
                fontSize: '$4',
                fontWeight: 400,
                color: '$primary2',
                backgroundColor: '$primary10',
                borderRadius: '$mainRadius',
                marginLeft: '$2'
              }}
            >
              active
            </Box>
          </Title>
          <Paragraph>
            As an experienced web developer, I offer a range of services to help
            you build a strong online presence. From creating custom websites to
            developing user-friendly interfaces and optimizing your site for
          </Paragraph>
        </TileTextContainer>
      </TileContainer>
      <TileContainer>
        <Box
          css={{
            height: '10rem',
            width: '100%',
            position: 'relative'
          }}
        >
          <Image
            // TODO: make style image component
            style={{
              borderRadius: '1.375rem 1.375rem 0 0',
              objectFit: 'cover'
            }}
            fill
            src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            alt="Link cover image"
          />
        </Box>
        <TileTextContainer>
          <Title as="h2" variant="secondary">
            Design
            <Box
              as="span"
              css={{
                paddingX: '$2',
                paddingY: '$1',
                fontSize: '$4',
                fontWeight: 400,
                color: '$primary2',
                backgroundColor: '$primary10',
                borderRadius: '$mainRadius',
                marginLeft: '$2'
              }}
            >
              active
            </Box>
          </Title>
          <Paragraph>
            Im excited that you&apos;ve found your way here. I offer
          </Paragraph>
        </TileTextContainer>
      </TileContainer>
      <TileContainer>
        <Box
          css={{
            height: '10rem',
            width: '100%',
            position: 'relative'
          }}
        >
          <Image
            // TODO: make style image component
            style={{
              borderRadius: '1.375rem 1.375rem 0 0',
              objectFit: 'cover'
            }}
            fill
            src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            alt="Link cover image"
          />
        </Box>
        <TileTextContainer>
          <Title as="h2" variant="secondary">
            AI prompt engineering
            <Box
              as="span"
              css={{
                paddingX: '$2',
                paddingY: '$1',
                fontSize: '$4',
                fontWeight: 400,
                color: '$gray12',
                backgroundColor: '$gray6',
                borderRadius: '$mainRadius',
                marginLeft: '$2'
              }}
            >
              inactive
            </Box>
          </Title>
          <Paragraph>
            Im excited that you&apos;ve found your way here. I offer
          </Paragraph>
        </TileTextContainer>
      </TileContainer>
      <TileContainer>
        <Box
          css={{
            height: '10rem',
            width: '100%',
            position: 'relative'
          }}
        >
          <Image
            // TODO: make style image component
            style={{
              borderRadius: '1.375rem 1.375rem 0 0',
              objectFit: 'cover'
            }}
            fill
            src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            alt="Link cover image"
          />
        </Box>
        <TileTextContainer>
          <Title as="h2" variant="secondary">
            Others
            <Box
              as="span"
              css={{
                paddingX: '$2',
                paddingY: '$1',
                fontSize: '$4',
                fontWeight: 400,
                color: '$gray12',
                backgroundColor: '$gray6',
                borderRadius: '$mainRadius',
                marginLeft: '$2'
              }}
            >
              inactive
            </Box>
          </Title>
          <Paragraph>
            Im excited that you&apos;ve found your way here. I offer
          </Paragraph>
        </TileTextContainer>
      </TileContainer>
      <TileContainer>
        <Box
          css={{
            height: '10rem',
            width: '100%',
            position: 'relative'
          }}
        >
          <Image
            // TODO: make style image component
            style={{
              borderRadius: '1.375rem 1.375rem 0 0',
              objectFit: 'cover'
            }}
            fill
            src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            alt="Link cover image"
          />
        </Box>

        <TileTextContainer>
          <Title as="h2" variant="secondary">
            UI Engineering
            <Box
              as="span"
              css={{
                paddingX: '$2',
                paddingY: '$1',
                fontSize: '$4',
                fontWeight: 400,
                color: '$gray12',
                backgroundColor: '$gray6',
                borderRadius: '$mainRadius',
                marginLeft: '$2'
              }}
            >
              inactive
            </Box>
          </Title>
          <Paragraph>
            As an experienced web developer, I offer a range of services to help
            you build a strong online presence. From creating custom websites to
            developing user-friendly interfaces and optimizing your site for
          </Paragraph>
        </TileTextContainer>
      </TileContainer>
      <TileContainer>
        <Box
          css={{
            height: '10rem',
            width: '100%',
            position: 'relative'
          }}
        >
          <Image
            // TODO: make style image component
            style={{
              borderRadius: '1.375rem 1.375rem 0 0',
              objectFit: 'cover'
            }}
            fill
            src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            alt="Link cover image"
          />
        </Box>
        <TileTextContainer>
          <Title as="h2" variant="secondary">
            Design
            <Box
              as="span"
              css={{
                paddingX: '$2',
                paddingY: '$1',
                fontSize: '$4',
                fontWeight: 400,
                color: '$gray12',
                backgroundColor: '$gray6',
                borderRadius: '$mainRadius',
                marginLeft: '$2'
              }}
            >
              inactive
            </Box>
          </Title>
          <Paragraph>
            Im excited that you&apos;ve found your way here. I offer
          </Paragraph>
        </TileTextContainer>
      </TileContainer>
    </Box>
  </Box>
)

export default SecondSection

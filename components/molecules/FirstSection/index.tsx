import { Box } from 'components/atoms/Box'
import List from 'components/atoms/List'
import { Paragraph } from 'components/atoms/Paragraph'
import SectionTitle from 'components/atoms/SectionTitle'
import { TileContainer } from 'components/atoms/TileContainer'
import TileTextContainer from 'components/atoms/TileTextContainer'
import { Title } from 'components/atoms/Title'

import { FIRST_SECTION } from 'lib/consts/sections'

const FirstSection = () => (
  <Box
    id={`${FIRST_SECTION}`}
    css={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingY: 60,
      marginX: 'auto'
    }}
  >
    <SectionTitle>{FIRST_SECTION}</SectionTitle>
    <Paragraph
      css={{
        textAlign: 'center',
        marginX: '$5',
        maxWidth: '35rem'
      }}
    >
      Im excited that you&apos;ve found your way here. I offer customised
      solutions that cater to your unique needs. Working with a freelancer can
      sometimes feel daunting, but rest assured that I&apos;ll do my best to
      make the process as seamless and stress-free as possible. Whether
      you&apos;re looking to build a beautiful website, optimise your workflow
      or product with AI, I&apos;m here to help. So, let&apos;s create something
      amazing together!
    </Paragraph>
    <Box
      css={{
        padding: '$5',
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        gridGap: '$5',
        marginY: '$5',
        '@xl': {
          gridTemplateColumns: 'repeat(2, 1fr)'
        },
        '@lg': {
          width: '70%',
          maxWidth: '70rem'
        }
      }}
    >
      <TileContainer>
        <TileTextContainer
          css={{
            padding: '$8'
          }}
        >
          <Title as="h2" variant="secondary">
            UI Engineering
          </Title>
          <Paragraph
            css={{
              marginY: '$6'
            }}
          >
            As an experienced web developer, I offer a range of services to help
            you build a strong online presence. From creating custom websites to
            developing user-friendly interfaces and optimizing your site for
            search engines, I have the skills and expertise to bring your vision
            to life. Here are some of the services I offer:
          </Paragraph>
          <List>
            <li>Custom website design and development</li>
            <li>E-commerce solutions</li>
            <li>Responsive design for mobile devices</li>
            <li>Content management system (CMS) implementation</li>
            <li>Search engine optimization (SEO)</li>
            <li>Website maintenance and support</li>
          </List>
        </TileTextContainer>
      </TileContainer>
      <TileContainer>
        <TileTextContainer
          css={{
            padding: '$8'
          }}
        >
          <Title as="h2" variant="secondary">
            Design
          </Title>
          <Paragraph
            css={{
              marginY: '$6'
            }}
          >
            As an experienced web developer, I offer a range of services to help
            you build a strong online presence. From creating custom websites to
            developing user-friendly interfaces and optimizing your site for
            search engines, I have the skills and expertise to bring your vision
            to life. Here are some of the services I offer:
          </Paragraph>
          <List>
            <li>Custom website design and development</li>
            <li>E-commerce solutions</li>
            <li>Responsive design for mobile devices</li>
            <li>Content management system (CMS) implementation</li>
            <li>Search engine optimization (SEO)</li>
            <li>Website maintenance and support</li>
          </List>
        </TileTextContainer>
      </TileContainer>
      <TileContainer>
        <TileTextContainer
          css={{
            padding: '$8'
          }}
        >
          <Title as="h2" variant="secondary">
            AI prompt engineering
          </Title>
          <Paragraph
            css={{
              marginY: '$6'
            }}
          >
            As an experienced web developer, I offer a range of services to help
            you build a strong online presence. From creating custom websites to
            developing user-friendly interfaces and optimizing your site for
            search engines, I have the skills and expertise to bring your vision
            to life. Here are some of the services I offer:
          </Paragraph>
          <List>
            <li>Custom website design and development</li>
            <li>E-commerce solutions</li>
            <li>Responsive design for mobile devices</li>
            <li>Content management system (CMS) implementation</li>
            <li>Search engine optimization (SEO)</li>
            <li>Website maintenance and support</li>
          </List>
        </TileTextContainer>
      </TileContainer>
      <TileContainer>
        <TileTextContainer
          css={{
            padding: '$8'
          }}
        >
          <Title as="h2" variant="secondary">
            Others
          </Title>
          <Paragraph
            css={{
              marginY: '$6'
            }}
          >
            As an experienced web developer, I offer a range of services to help
            you build a strong online presence. From creating custom websites to
            developing user-friendly interfaces and optimizing your site for
            search engines, I have the skills and expertise to bring your vision
            to life. Here are some of the services I offer:
          </Paragraph>
          <List>
            <li>Custom website design and development</li>
            <li>E-commerce solutions</li>
            <li>Responsive design for mobile devices</li>
            <li>Content management system (CMS) implementation</li>
            <li>Search engine optimization (SEO)</li>
            <li>Website maintenance and support</li>
          </List>
        </TileTextContainer>
      </TileContainer>
    </Box>
  </Box>
)

export default FirstSection

import { Box } from 'components/atoms/Box'
import { Paragraph } from 'components/atoms/Paragraph'
import { TileContainer } from 'components/atoms/TileContainer'
import TileTextContainer from 'components/atoms/TileTextContainer'
import { Title } from 'components/atoms/Title'

interface FeaturesTileProps {
  title: string
  text: string
}
const FeaturesTile = ({ title, text }: FeaturesTileProps) => {
  return (
    <TileContainer>
      <Box
        css={{
          width: '100%',
          position: 'relative'
        }}
      >
        <Box
          css={{
            width: '4rem',
            height: '4rem',
            border: '1px solid $primary7',
            borderRadius: '$smallRadius',
            margin: '1rem',
            boxShadow: '$sectionShadowBottom'
          }}
        />
      </Box>

      <TileTextContainer>
        <Title as="h2" variant="secondary">
          {title}
        </Title>
        <Paragraph>{text}</Paragraph>
      </TileTextContainer>
    </TileContainer>
  )
}

export default FeaturesTile

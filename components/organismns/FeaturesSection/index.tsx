import { Box } from 'components/atoms/Box'
import SectionTitle from 'components/atoms/SectionTitle'

import { FEATURES_SECTION } from 'lib/consts/sections'
import FeaturesTile from 'components/molecules/FeaturesTile'

const FeaturesSection = () => (
  <Box
    id={`${FEATURES_SECTION}`}
    css={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '$white',
      borderRadius: '$mainRadius',
      boxShadow: '$sectionShadow',
      paddingY: 60,
      paddingTop: '10rem',
      zIndex: 1
    }}
  >
    <SectionTitle>{FEATURES_SECTION}</SectionTitle>
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
      <FeaturesTile
        title=" Intelligent Search"
        text="Find what you need quickly and easily with our intelligent search
        feature. Our app's AI technology ensures that you locate the
        information you're looking for fast, whether you're
        searching for keywords, phrases, or specific topics"
      />
      <FeaturesTile
        title="Automatic Organization"
        text="No more time wasted organizing and categorizing your notes. With our smart note-taking app, notes are automatically organized and can be easily searched using our powerful AI technology. Spend less time organizing and more time creating with our app."
      />
      <FeaturesTile
        title="Follow-up Questions"
        text="Get more out of your notes with our app's follow-up question feature. Easily gain additional context and details on any topic within your notes, improving your understanding of the information captured."
      />
      <FeaturesTile
        title="Voice Notes"
        text="Notebrain offer voice-to-text capabilities, allowing you to capture your thoughts and ideas quickly and easily. No more typing or writing notes by hand - just speak into your device and let our app do the rest"
      />
    </Box>
  </Box>
)

export default FeaturesSection

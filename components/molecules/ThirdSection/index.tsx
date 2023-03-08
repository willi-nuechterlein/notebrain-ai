import { Box } from 'components/atoms/Box'
import { Paragraph } from 'components/atoms/Paragraph'
import SectionTitle from 'components/atoms/SectionTitle'

import { THIRD_SECTION } from 'lib/consts/sections'

const ThirdSection = () => {
  return (
    <Box
      id={`${THIRD_SECTION}`}
      css={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '$9',
        paddingY: 60
      }}
    >
      <SectionTitle>{THIRD_SECTION}</SectionTitle>
      <Paragraph
        css={{
          textAlign: 'left',
          marginX: '$5',
          maxWidth: '35rem'
        }}
      >
        I don&apos;t offer blanket pricing because I believe that each project
        is unique and requires a tailored approach. I understand that everyone
        has different budgets and requirements, which is why I work with each
        client to determine a fair and reasonable price point that everyone is
        happy with.
        <span style={{ display: 'inline-block', marginTop: 15 }}>
          My pricing is transparent, and I&apos;ll always provide a detailed
          breakdown of costs so you can see exactly what you&apos;re paying for.
          Whether you&apos;re looking for a one-time project or ongoing support,
          I&apos;ll work with you to find a pricing solution that fits your
          needs and your budget.
        </span>
        <span style={{ display: 'inline-block', marginTop: 15 }}>
          So, if you&apos;re interested in my services, please don&apos;t
          hesitate to reach out. I&apos;m confident that we can find a pricing
          structure that works for you and delivers the results you need.
        </span>
      </Paragraph>
    </Box>
  )
}

export default ThirdSection

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { Box } from 'components/atoms/Box'

import { FOURTH_SECTION } from 'lib/consts/sections'
import { InputField } from 'components/atoms/InputField'
import Button from 'components/atoms/Button'
import SectionTitle from 'components/atoms/SectionTitle'
import { Paragraph } from 'components/atoms/Paragraph'
import { useState } from 'react'
import OccasionPicker from 'components/molecules/OccassionPicker'
import EditorAccordion, {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from 'components/organismns/Accordion'
import AccordionButtonTitle from 'components/atoms/AccordionButtonTitle'

export interface SpeechFormProps {
  audience: string
  tone: string
  purpose: string
  anecdote: string
  reference: string
  keyMessage: string
}

const OCCASION_OPTIONS = [
  'Corporate',
  'Graduation',
  'Retirement',
  'Birthday',
  'Commencement'
]

const Editor = () => {
  const [speech, setSpeech] = useState('')
  const [loading, setLoading] = useState(false)
  const [occasion, setOccasion] = useState(OCCASION_OPTIONS[0])
  const formik = useFormik<SpeechFormProps>({
    initialValues: {
      audience: '',
      tone: '',
      purpose: '',
      anecdote: '',
      reference: '',
      keyMessage: ''
    },
    validationSchema: Yup.object({
      audience: Yup.string().required('Required'),
      tone: Yup.string().required('Required'),
      purpose: Yup.string().required('Required'),
      keyMessage: Yup.string().required('Required'),
      anecdote: Yup.string(),
      reference: Yup.string()
    }),
    onSubmit: async (values) => {
      setLoading(true)
      try {
        const response = await fetch('/api/speech', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ occasion, ...values })
        })
        if (!response.ok) {
          throw new Error('Error')
        }
        const data = await response.json()
        setSpeech(data)
      } catch (error) {
        console.error(error)
        setSpeech('Error')
      }
      setLoading(false)
    }
  })
  return (
    <>
      <Box
        css={{
          marginBottom: '4vh'
        }}
        id={`${FOURTH_SECTION}`}
      />
      <Box
        css={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '$white',
          borderRadius: '$mainRadius',
          boxShadow: '$sectionShadow',
          marginX: '$3',
          top: '100',
          marginTop: '8vh',
          paddingX: '$4',

          width: '100%',
          maxWidth: '45rem',
          '@md': {
            paddingX: '$8'
          }
        }}
      >
        <SectionTitle>Speech Details</SectionTitle>
        <Paragraph
          css={{
            textAlign: 'left',
            marginBottom: '$8'
          }}
        >
          Provide information about your occasion, audience, tone, purpose, and
          key messages. This information is crucial to creating a speech that
          resonates with your audience and conveys your message effectively.
        </Paragraph>
        <Paragraph
          css={{
            width: '100%',
            textAlign: 'left',
            marginBottom: '$3',
            fontWeight: 500
          }}
        >
          Configure your speech:
        </Paragraph>
        <Box
          css={{
            marginX: '$3',
            width: '100%'
          }}
        >
          <form>
            <EditorAccordion>
              <AccordionItem value="item-1">
                {/* @ts-ignore */}
                <AccordionTrigger>
                  <AccordionButtonTitle title="Occasion" value={occasion} />
                </AccordionTrigger>
                {/* @ts-ignore */}
                <AccordionContent>
                  <OccasionPicker
                    options={OCCASION_OPTIONS}
                    value={occasion}
                    onChange={setOccasion}
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                {/* @ts-ignore */}
                <AccordionTrigger>
                  <AccordionButtonTitle
                    title="Audience"
                    value={formik.values.audience}
                  />
                </AccordionTrigger>
                {/* @ts-ignore */}
                <AccordionContent>
                  <InputField
                    type="text"
                    id="audience"
                    formik={formik}
                    helperText="Tell us about your audience to help us create a speech that resonates with them."
                    placeholder="age range, education level, and interests"
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                {/* @ts-ignore */}
                <AccordionTrigger>
                  <AccordionButtonTitle
                    title="Tone"
                    value={formik.values.tone}
                  />
                </AccordionTrigger>
                {/* @ts-ignore */}
                <AccordionContent>
                  <InputField
                    type="text"
                    id="tone"
                    formik={formik}
                    helperText="What tone do you want to set for your speech?"
                    placeholder="humorous, serious, or informative"
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                {/* @ts-ignore */}
                <AccordionTrigger>
                  <AccordionButtonTitle
                    title="Purpose"
                    value={formik.values.purpose}
                  />
                </AccordionTrigger>
                {/* @ts-ignore */}
                <AccordionContent>
                  <InputField
                    type="text"
                    id="purpose"
                    formik={formik}
                    helperText="What is the desired outcome you want to achieve with your speech?"
                    placeholder="entertain, persuade, motivate"
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                {/* @ts-ignore */}
                <AccordionTrigger>
                  <AccordionButtonTitle
                    title="Your Message"
                    value={formik.values.keyMessage}
                  />
                </AccordionTrigger>
                {/* @ts-ignore */}
                <AccordionContent>
                  <InputField
                    textarea
                    id="keyMessage"
                    formik={formik}
                    helperText="What are the key messages you want to leave with your audience?"
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                {/* @ts-ignore */}
                <AccordionTrigger>
                  <AccordionButtonTitle
                    title="Personal Anecdote"
                    value={formik.values.anecdote}
                  />
                </AccordionTrigger>
                {/* @ts-ignore */}
                <AccordionContent>
                  <InputField
                    textarea
                    type="text"
                    id="anecdote"
                    formik={formik}
                    helperText="Tell us about any personal stories or experiences you want to share with your audience."
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                {/* @ts-ignore */}
                <AccordionTrigger>
                  <AccordionButtonTitle
                    title="Reference"
                    value={formik.values.reference}
                  />
                </AccordionTrigger>
                {/* @ts-ignore */}
                <AccordionContent>
                  <InputField
                    textarea
                    type="text"
                    id="reference"
                    formik={formik}
                    helperText="Include any quotes or references that support your message."
                  />
                </AccordionContent>
              </AccordionItem>
            </EditorAccordion>
          </form>
          <Button
            css={{
              width: '100%',
              marginY: '$12'
            }}
            type="submit"
            onClick={() => formik.handleSubmit()}
          >
            Generate Speech{' '}
            <Box
              as="span"
              css={{
                marginLeft: '$2',
                fontWeight: 400,
                fontSize: '$5',
                color: '$primary6'
              }}
            >
              15 €
            </Box>
          </Button>
          <Paragraph
            css={{
              fontSize: '$4',
              marginTop: '-$11',
              marginBottom: '$12',
              color: '$secondary3'
            }}
          >
            * Your can not change Occasion, Audience, and Tone after purchase.
          </Paragraph>
        </Box>
      </Box>

      <Box
        css={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '$white',
          borderRadius: '$mainRadius',
          boxShadow: '$sectionShadow',
          paddingX: '$12',
          paddingBottom: '$12',
          maxWidth: '45rem',
          width: '100%',
          marginTop: '$12',
          minHeight: '20rem'
        }}
      >
        {!speech ? (
          <SectionTitle
            css={{
              marginTop: '$12',
              filter: loading ? '' : 'blur(5px)'
            }}
          >
            Writing speech...
          </SectionTitle>
        ) : null}
        {!loading && !speech ? (
          <Box
            css={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '$6'
            }}
          >
            <Box
              css={{
                width: '92%',
                height: '1.5rem',
                backgroundColor: '$gray7',
                borderRadius: '$smallRadius',
                filter: 'blur(5px)'
              }}
            />
            <Box
              css={{
                width: '80%',
                height: '1.5rem',
                backgroundColor: '$gray7',
                borderRadius: '$smallRadius',
                filter: 'blur(5px)'
              }}
            />
            <Box
              css={{
                width: '77%',
                height: '1.5rem',
                backgroundColor: '$gray7',
                borderRadius: '$smallRadius',
                filter: 'blur(5px)'
              }}
            />
            <Box
              css={{
                width: '100%',
                height: '1.5rem',
                backgroundColor: '$gray7',
                borderRadius: '$smallRadius',
                filter: 'blur(5px)'
              }}
            />
            <Box
              css={{
                width: '87%',
                height: '1.5rem',
                backgroundColor: '$gray7',
                borderRadius: '$smallRadius',
                filter: 'blur(5px)'
              }}
            />
          </Box>
        ) : null}

        {!loading && speech ? (
          <>
            <SectionTitle>Your Speech</SectionTitle>
            <Paragraph
              css={{
                whiteSpace: 'pre-wrap'
              }}
            >
              {speech}
            </Paragraph>
          </>
        ) : null}
      </Box>
    </>
  )
}

export default Editor

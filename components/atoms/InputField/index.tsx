import { Fieldset, Input, Label, TextArea } from 'components/atoms/Input'
import { InputError } from 'components/atoms/InputError'
import { Paragraph } from 'components/atoms/Paragraph'

export const InputField = ({
  formik,
  id,
  label,
  helperText,
  textarea,
  placeholder,
  type
}: {
  formik: any
  id: string
  label?: string
  helperText?: string
  textarea?: boolean
  placeholder?: string
  type?: string
}) => {
  return (
    <Fieldset>
      {label && <Label htmlFor={id}>{label}</Label>}
      {textarea ? (
        <TextArea
          placeholder={placeholder}
          rows={10}
          id={id}
          onChange={formik.handleChange}
          value={formik.values[id]}
        />
      ) : (
        <Input
          type={type}
          placeholder={placeholder}
          id={id}
          onChange={formik.handleChange}
          value={formik.values[id]}
        />
      )}
      {formik.errors[id] && formik.touched[id] ? (
        <InputError>{formik.errors[id]}</InputError>
      ) : null}
      {helperText && <Paragraph>{helperText}</Paragraph>}
    </Fieldset>
  )
}

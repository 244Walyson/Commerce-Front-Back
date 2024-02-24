import React from 'react'

const FormTextArea = (textAreaProps: any) => {

    const { invalid="false", onTurnDirty ,dirty="false", validation,  ...inputProps } = textAreaProps;

    const handleBlur = () => {
      onTurnDirty(textAreaProps.name)
    }
  return (
    <textarea onBlur={handleBlur} { ...inputProps } data-dirty={dirty} data-invalid={invalid}></textarea>
  )
}

export default FormTextArea
import Select from 'react-select'

const FormSelect = (props: any) => {

  const {className, invalid = "false", onTurnDirty, dirty = "false", validation, ...selectProps } = props;

  const handleBlur = () => {
    onTurnDirty(props.name)
  }
  return (
    <div className={className} data-dirty={dirty} data-invalid={invalid}>
      <Select {...selectProps} onBlur={handleBlur} ></Select>
    </div>
  )
}

export default FormSelect
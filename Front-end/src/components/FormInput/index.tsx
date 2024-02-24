const FormImput = (props: any) => {

    const { invalid="false", onTurnDirty ,dirty="false", validation,  ...inputProps } = props;

    const handleBlur = () => {
      onTurnDirty(props.name)
    }
  return (
    <input onBlur={handleBlur} { ...inputProps } data-dirty={dirty} data-invalid={invalid}></input>
  )
}

export default FormImput
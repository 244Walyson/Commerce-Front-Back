
type props = {
  text: string;
}
const ButtonPrimary = ({ text }: props) => {
  return (
    <div className="dsc-btn dsc-btn-blue">{text}</div>
  )
}

export default ButtonPrimary
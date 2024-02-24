
type props = {
  text: string;
}
const ButtonInverse = ({ text }: props) => {
  return (
    <div className="dsc-btn dsc-btn-white">{text}</div>
  )
}

export default ButtonInverse
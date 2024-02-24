import { Link } from "react-router-dom"
import ButtonPrimary from "../ButtonPrimary"
import "./styles.css"

const NotFound = () => {
  return (
    <div className="notFound">
        <h1>404</h1>
        <h2>Pagina não encontrada</h2>
        <Link to={"/"}><ButtonPrimary text="Início"></ButtonPrimary></Link>
    </div>
  )
}

export default NotFound
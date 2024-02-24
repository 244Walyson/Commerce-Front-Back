import { Outlet } from "react-router-dom"
import HeaderAdmin from "../../components/HeaderAdmin"

const Admin = () => {
  return (
    <>
    <HeaderAdmin></HeaderAdmin>
    <Outlet></Outlet>
    </>
  )
}

export default Admin
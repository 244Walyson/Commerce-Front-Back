import React, { useContext } from 'react'
import { isAuthenticated, logout } from '../../services/auth-service'
import { Link } from 'react-router-dom'
import { ContextToken } from '../../utils/context-token'

const LoggedUser = () => {
    const {contextTokenPayload, setContextTokenPayload} = useContext(ContextToken)

    const handleLogout = () => {
        logout()
        setContextTokenPayload(undefined)
    }

    return (

        isAuthenticated() && contextTokenPayload
            ? <div className="dsc-logged-user">
                <p>{contextTokenPayload?.username}</p>
                <span onClick={handleLogout}>Sair</span>
            </div>
            : <Link to={"/login"}>Entrar</Link>

    )
}

export default LoggedUser
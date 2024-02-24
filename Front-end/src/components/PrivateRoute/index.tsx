import { RoleEnum } from '../../models/auth';
import { hasAnyRoles, isAuthenticated } from '../../services/auth-service';
import { Navigate } from 'react-router-dom';

type props = {
    children: JSX.Element;
    roles?: RoleEnum[];
}

const PrivateRoute = ({children, roles = []}: props) => {
  
    if(!isAuthenticated()){
        return <Navigate to={"/login"}></Navigate>
    }
    if(!hasAnyRoles(roles)){
        return <Navigate to={"/catalog"}></Navigate>
    }
    return children
}



export default PrivateRoute
import { Navigate } from "react-router-dom";
import { useAuth } from '../contexts/auth-context';

function PrivateRoute ({ children }) {
    
    const { user } = useAuth();

    if (!user) return ( <Navigate to='/login' /> )
    else return children;
}

export default PrivateRoute;
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

function RoleRoute ({ children }) {

    const { user } = useAuth();
    
    if (user?.role !== 'admin') return <Navigate to='/dashboard' />;

    return children
}

export default RoleRoute;
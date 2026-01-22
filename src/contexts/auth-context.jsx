import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
const USER_CURRENT_KEY = 'userCurrent-db';

function AuthContextProvider ({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(localStorage.getItem(USER_CURRENT_KEY) 
        && JSON.parse(localStorage.getItem(USER_CURRENT_KEY)));

    const login = (user) => {
        localStorage.setItem(USER_CURRENT_KEY, JSON.stringify(user));
        setUser(user);
    }

    const logout = () => {
        localStorage.removeItem(USER_CURRENT_KEY);
        setUser(undefined);
        navigate('/');
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
export const useAuth = () => useContext(AuthContext);
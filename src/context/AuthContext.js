import { createContext, useContext } from 'react';
import { useAuthentication } from '../hooks/useAuthentication';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const { authenticated } = useAuthentication();
    return (
        <AuthContext.Provider value={ authenticated }>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthProvider; 

const AuthConsumer = () => {
    return useContext(AuthContext);
}
  
export default AuthConsumer;
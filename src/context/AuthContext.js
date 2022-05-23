import { createContext, useContext, useEffect } from 'react';
import { useAuthentication } from '../hooks/useAuthentication';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const { authenticatedUser, setAndVerifyAuthenticatedUser } = useAuthentication();

    useEffect(() => {
        setAndVerifyAuthenticatedUser();
    }, [setAndVerifyAuthenticatedUser]);

    return (
        <AuthContext.Provider value={ authenticatedUser }>
            { children }
        </AuthContext.Provider>
    );
}

export const AuthConsumer = () => {
    return useContext(AuthContext);
}
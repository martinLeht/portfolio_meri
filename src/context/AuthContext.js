import { createContext, useContext, useEffect } from 'react';
import { useKeycloak } from "@react-keycloak/web";
import { useAuthentication } from '../hooks/useAuthentication';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const { authenticatedUser, setAndVerifyAuthenticatedUser } = useAuthentication();
    const { keycloak } = useKeycloak();

    useEffect(() => {
        setAndVerifyAuthenticatedUser();
    }, [keycloak.authenticated]);

    return (
        <AuthContext.Provider value={ authenticatedUser }>
            { children }
        </AuthContext.Provider>
    );
}

export const AuthConsumer = () => {
    return useContext(AuthContext);
}
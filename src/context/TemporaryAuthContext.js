import { createContext, useContext, useEffect } from 'react';
import { useTemporaryAuthentication } from '../hooks/useTemporaryAuthentication';

export const TemporaryAuthContext = createContext(null);

export const TemporaryAuthProvider = ({ children }) => {
    const { temporaryUser, setAndVerifyTemporaryUser } = useTemporaryAuthentication();

    useEffect(() => {
        setAndVerifyTemporaryUser();
    }, [setAndVerifyTemporaryUser]);

    return (
        <TemporaryAuthContext.Provider value={ temporaryUser }>
            { children }
        </TemporaryAuthContext.Provider>
    );
}

export const TemporaryAuthConsumer = () => {
    return useContext(TemporaryAuthContext);
}
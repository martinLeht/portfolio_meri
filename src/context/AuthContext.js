import { useAuthentication } from '../hooks/useAuthentication';

const AuthProvider = ({ children }) => {
    const auth = useAuthentication();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

export default AuthProvider; 

const authContext = React.createContext();

const AuthConsumer = () => {
    return React.useContext(authContext);
}
  
export default AuthConsumer;
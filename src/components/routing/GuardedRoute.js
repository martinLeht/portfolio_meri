import { useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";
import Loader from '../../components/general/Loader';

const GuardedRoute = (props) => { 
    const { path } = props; 
    const { keycloak, initialized } = useKeycloak();

    const { children } = props;

    useEffect(() => {
        if (keycloak && initialized) {
            keycloak.onTokenExpired = () => keycloak.updateToken(30);
        }
        return () => {
            if (keycloak) keycloak.onTokenExpired = () => {};
        };
    }, [initialized, keycloak]);

    /*
    useEffect(() => {
        setAndVerifyAuthenticatedUser();
    }, [setAndVerifyAuthenticatedUser]);

    
    if (!loading) {
        if (authenticatedUser && isLoggedIn) {
            return children;
        } else {
            return <Link to={{ 
                        pathname: "/login", 
                        state: { destinationRoute: path } 
                    }}/>;
        }
    } else {
        return <Loader pulse/>;
    }
    */
    if (initialized) {
        if (keycloak.authenticated) {
            return children;
        } else {
            keycloak.login({
                redirectUri: window.location.href
            });
        }
    } else {
        return <Loader pulse/>;
    }
}

export default GuardedRoute;
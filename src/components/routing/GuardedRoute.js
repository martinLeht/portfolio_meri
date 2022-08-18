

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../general/Loader';
import { useAuthentication } from '../../hooks/useAuthentication';


const GuardedRoute = (props) => { 
    const { path } = props;  
    const { authenticatedUser, loading, setAndVerifyAuthenticatedUser } = useAuthentication();

    const { children } = props;

    useEffect(() => {
        setAndVerifyAuthenticatedUser();
    }, [setAndVerifyAuthenticatedUser]);

    
    if (!loading) {
        if (authenticatedUser) {
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
    
}

export default GuardedRoute;
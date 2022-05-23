

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../general/LoadingSpinner';
import { useAuthentication } from '../../hooks/useAuthentication';


const GuardedRoute = (props) => { 
    const { path } = props;  
    const { authenticatedUser, loading, setAndVerifyAuthenticatedUser } = useAuthentication();

    const { 
        children,
        ...rest 
    } = props;

    useEffect(() => {
        console.log("Suojattu ROUTE");
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
        return <LoadingSpinner />;
    }
    
}

export default GuardedRoute;
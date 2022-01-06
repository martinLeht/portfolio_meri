

import { Navigate } from 'react-router-dom';
import LoadingSpinner from '../../components/general/LoadingSpinner';
import { useAuthentication } from './../../hooks/useAuthentication';


const GuardedRoute = (props) => {   
    const { authenticatedUser, loading } = useAuthentication();

    const { 
        children,
        ...rest 
    } = props;
    
    if (!loading) {
        if (authenticatedUser) {
            return children;
        } else {
            return <Navigate to ="/login" />
        }
    } else {
        return <LoadingSpinner />;
    }
    
}

export default GuardedRoute;
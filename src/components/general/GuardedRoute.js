import { Route, Redirect } from 'react-router-dom';
import LoadingSpinner from '../../components/general/LoadingSpinner';
import { useAuthentication } from './../../hooks/useAuthentication';


const GuardedRoute = (props) => {   
    const { authenticatedUser, loading } = useAuthentication();

    const { 
        component: Component,
        ...rest 
    } = props;

    console.log("In Guarded route");
    console.log(authenticatedUser);
    if (!loading) {
        if (authenticatedUser) {
            return <Route {...rest} render={ (props) => <Component {...props}/> }/>
        } else {
            return <Redirect to='/login'/> 
        }
    } else {
        return <LoadingSpinner />;
    }
    
}

export default GuardedRoute;
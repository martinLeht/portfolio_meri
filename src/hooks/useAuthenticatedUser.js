import { useState, useEffect } from 'react'; 

const useAuthenticatedUser = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() =>{
        setCurrentUser(authenticationService.getCurrentUser());
        console.log(authenticationService.getCurrentUser());
        setLoading(false);
    }, []);
    
    return {
        currentUser,
        setCurrentUser,
        isLoading
    }
}

export default useAuthenticatedUser;
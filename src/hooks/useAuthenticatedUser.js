import { useState, useEffect } from 'react'; 
import AuthenticationService from "../services/AuthenticationService";

export function useAuthenticatedUser() {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const authenticationService = new AuthenticationService();

    useEffect(() =>{
        const getAuthenticatedUser = async() => {
            console.log("Setting CUrrent user");
            setCurrentUser(authenticationService.getCurrentUser());
            console.log(authenticationService.getCurrentUser());
            setLoading(false);
        }
        
        getAuthenticatedUser();  
    }, []);
    
    return {
        currentUser,
        setCurrentUser,
        isLoading
    }
}
import { useState, useEffect } from "react";
import AuthenticationService from "../services/AuthenticationService";

export const useAuthentication = () => {
    const [authenticatedUser, setAuthenticatedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const authenticationService = new AuthenticationService();

    useEffect(() =>{
        setLoading(true);
        const getAuthenticatedUser = async () => {
            console.log("Setting Current user");
            setAuthenticatedUser(authenticationService.getCurrentUser());
            console.log(authenticationService.getCurrentUser());
            setLoading(false);
        }
        getAuthenticatedUser();  
    }, []);

    const login = async (userData) => {
        const authRes = await authenticationService.loginUser(userData);
        if (authRes === undefined) {
            return {
                error: "Something went wrong on login attempt!"
            };
        }

        setAuthenticatedUser(authRes);
        return authRes;
    }

    const logout = () => {
        return new Promise((resolve) => {
            authenticationService.logoutUser();
            setAuthenticatedUser(null);
            resolve();
        });
    }

    return {
        authenticatedUser,
        loading,
        login,
        logout
    };
}
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import moment from "moment";
import AuthenticationService from "../services/AuthenticationService";
import UserCachingService from '../services/UserCachingService';

export const useAuthentication = () => {
    const [authenticatedUser, setAuthenticatedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const authenticationService = new AuthenticationService();
    const userCachingService = new UserCachingService();

    useEffect(() =>{
        setLoading(true);
        const getAuthenticatedUser = () => {
            setAuthenticatedUser(authenticationService.getCurrentUser());
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

    const logout = async () => {
        authenticationService.logoutUser();
        setAuthenticatedUser(null);
        window.location.reload();
    }

    const setAndVerifyAuthenticatedUser = async () => {
        if (userCachingService.hasAuthTokens()) {
            const { accessToken } = userCachingService.getAuthTokens();
            const hasTokenExpired = hasAuthTokenExpired(accessToken);
            if (hasTokenExpired) {
                const refreshedAuthTokens = await authenticationService.refreshAuthTokens();
                if (refreshedAuthTokens) setAuthenticatedUser(authenticationService.getCurrentUser());
            }
            console.log("User is verified!");
        } else {
            console.log("Not logged in and verified!");
        }
    }

    const hasAuthTokenExpired = (accessToken) => {
        const decodedToken = jwt_decode(accessToken);
        const expiresEpochs = decodedToken.exp;
        const expiratationDateTime = moment.unix(expiresEpochs);
        const currentDateTime = moment();
        return expiratationDateTime.isBefore(currentDateTime);
    }

    return {
        authenticatedUser,
        loading,
        login,
        logout,
        setAndVerifyAuthenticatedUser
    };
}
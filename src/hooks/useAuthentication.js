import { useState, useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";
import moment from "moment";
import { useTemporaryAccessApi } from '../api/useTemporaryAccessApi';
import UserCachingService from '../services/UserCachingService';

export const useAuthentication = () => {
    const [authenticatedUser, setAuthenticatedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { keycloak } = useKeycloak();
    const { getCurrentTemporaryAccessGrant, logoutTemporaryUser } = useTemporaryAccessApi();
    const userCachingService = new UserCachingService();

    useEffect(() =>{
        setLoading(true);
        const getAuthenticatedUser = () => {
            if (keycloak.authenticated) {
                setAuthenticatedUser({
                    user: {
                        username: keycloak.tokenParsed.preferred_username,
                        userId: keycloak.subject
                    }
                });
            } else {
                setAuthenticatedUser(null);
            }
            setLoading(false);
        }
        getAuthenticatedUser();  
    }, []);


    const login = (userData) => {
        userCachingService.signOut();
        keycloak.login({
            redirectUri: process.env.REACT_APP_BASE_URL
        });
    }

    const logout = () => {
        userCachingService.signOut();
        keycloak.logout({
            redirectUri: process.env.REACT_APP_BASE_URL
        });
    }

    const setAndVerifyAuthenticatedUser = async () => {
        if (keycloak.authenticated) {
            if (hasAuthTokenExpired(keycloak.tokenParsed)) {
                try {
                    await keycloak.updateToken(30);
                } catch (err) {
                    console.log("Error occurred when trying to refresh access token...");
                }
            } else {
                userCachingService.setAccessToken(keycloak.token);
                setAuthenticatedUser({
                    user: {
                        username: keycloak.tokenParsed.preferred_username,
                        userId: keycloak.subject
                    }
                })
            }
        } else {
            console.log("Not logged in and verified!");
        }
    }

    const hasAuthTokenExpired = (decodedToken) => {
        const expiresEpochs = decodedToken.exp;
        const expiratationDateTime = moment.unix(expiresEpochs);
        const currentDateTime = moment();
        return expiratationDateTime.isBefore(currentDateTime);
    }

    return {
        authenticatedUser,
        loading,
        isAuthenticated: keycloak.authenticated,
        login,
        logout,
        setAndVerifyAuthenticatedUser
    };
}
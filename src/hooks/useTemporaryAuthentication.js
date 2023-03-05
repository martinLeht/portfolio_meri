import { useState, useEffect } from "react";
import { useTemporaryAccessApi } from '../api/useTemporaryAccessApi';
import UserCachingService from '../services/UserCachingService';

export const useTemporaryAuthentication = () => {
    const [temporaryUser, setTemporaryUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { getCurrentTemporaryAccessGrant, requestTemporaryUserAccess, authenticateTemporaryUserAccess, logoutTemporaryUser } = useTemporaryAccessApi();
    const userCachingService = new UserCachingService();

    useEffect(() =>{
        setLoading(true);
        const getTemporaryUser = () => {
            console.log("Setting temp user in hook");
            setTemporaryUser(getCurrentTemporaryAccessGrant());
            setLoading(false);
        }
        getTemporaryUser();  
    }, []);


    const requestTemporaryAccess = async (userData) => {
        const tempAccessGrant = await requestTemporaryUserAccess(userData);
        if (tempAccessGrant.error) {
            logoutTemporaryUserWithoutReload();
            if (tempAccessGrant.error.status && tempAccessGrant.error.status === 401) {
                return {
                    error: "Temporary access requested. Check email for access verification link!"
                };
            } else {
                throw Error("Something went wrong");
            }
        } else {
            setTemporaryUser(tempAccessGrant);
            return tempAccessGrant;
        }
    }

    const authenticateTemporaryAccess = async (userData) => {
        const tempAccessGrant = await authenticateTemporaryUserAccess(userData);
        if (tempAccessGrant.error) {
            logoutTemporaryUserWithoutReload();
            if (tempAccessGrant.error.status && tempAccessGrant.error.status === 401) {
                return {
                    error: "Temporary access requested. Check email for access verification link!"
                };
            } else {
                throw Error("Something went wrong");
            }
        } else {
            setTemporaryUser(tempAccessGrant);
            return tempAccessGrant;
        }
    }

    const logoutTemporaryUserWithoutReload = async () => {
        const {tempUserId, tempUsername } = getCurrentTemporaryAccessGrant();
        await logoutTemporaryUser(tempUserId, tempUsername);
        setTemporaryUser(null);
    }

    const logoutTemporaryUserWithReload = async () => {
        const {tempUserId, tempUsername } = getCurrentTemporaryAccessGrant();
        await logoutTemporaryUser(tempUserId, tempUsername);
        setTemporaryUser(null);
        window.location.reload();
    }

    const setAndVerifyTemporaryUser = () => {
        if (userCachingService.hasTemporaryAccessGrant()) {
            console.log("User is verified and has temporary access!");
        } else {
            console.log("Not logged in and verified!");
        }
    }

    return {
        temporaryUser,
        loading,
        requestTemporaryAccess,
        authenticateTemporaryAccess,
        logoutTemporaryUserWithReload,
        logoutTemporaryUserWithoutReload,
        setAndVerifyTemporaryUser
    };
}
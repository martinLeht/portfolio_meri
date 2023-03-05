import axios from 'axios';
import axiosRetry from 'axios-retry';
import UserCachingService from '../services/UserCachingService';

export const useTemporaryAccessApi = () => {

    const client = axios.create({
        baseURL: process.env.REACT_APP_TEMP_ACCESS_API_ENDPOINT,
        timeout: 7000,
        headers: {'Access-Control-Allow-Origin': '*'},
        withCredentials: true
    });

    const userCachingService = new UserCachingService();

    client.interceptors.request.use(async (config) => {
        const tempAccessGrant = getCurrentTemporaryAccessGrant();
        if (tempAccessGrant) {
            config.headers['Authorization']  = `Bearer ${tempAccessGrant.tempAccessToken}`;
        }
        return config;
    }, err => Promise.reject(err)/*, { runWhen: requestRequiresAuth }*/);

    client.interceptors.response.use(response => response, async (err) => {
        if (err && err.response) {
            // Check if it is a 401 Unauthorized error
            return Promise.reject({
                status: err.response.status,
                messsage: err.response.data && err.response.data.message ? err.response.data.message : "Something went wrong"
            })
        }
        return Promise.reject(err);
    });

    const retryDelay = (retryNumber = 0) => {
        const seconds = Math.pow(2, retryNumber) * 1000;
        const randomMs = 1000 * Math.random();
        return seconds + randomMs;
    };
    
    axiosRetry(client, {
        retries: 2,
        retryDelay,
        // retry on Network Error & 5xx responses
        retryCondition: axiosRetry.isRetryableError,
    });

    const authenticateTemporaryUserAccess = async (userData) => {
        try {
            const res = await client.post('/temp/authenticate', userData);
            if(!res || !res.data) return null;
            
            return saveTemporaryAccessGrantToCache(userData.email, res.data);
        } catch(err) {
            console.error(err);
            return {
                error: err
            }
        }
    }

    const requestTemporaryUserAccess = async (userData) => {
        try {
            const res = await client.post('/temp/request', userData);            
            return saveTemporaryAccessGrantToCache(userData.email, res.data);
        } catch(err) {
            console.error(err);
            return {
                error: err
            }
        }
    }

    const logoutTemporaryUser = async (userId, username) => {
        try {
            await client.post('/temp/logout', { userId, username });
            userCachingService.signOut();
        } catch(err) {
            console.error(err);
            userCachingService.signOut();
        }
    }

    const saveTemporaryAccessGrantToCache = (tempUserEmail, accessGrant) => {
        const tempAccessToken = accessGrant.accessToken;
        const tempUserId = accessGrant.userId;
        const tempUsername = accessGrant.username;
        userCachingService.setTemporaryAccessGrant(tempAccessToken, tempUserId, tempUsername, tempUserEmail);
        return {
            tempAccessToken,
            tempUserId,
            tempUsername,
            tempUserEmail
        };
    }

    const getCurrentTemporaryAccessGrant = () => {
        return userCachingService.getTemporaryAccessGrant();
    }

    return {
        authenticateTemporaryUserAccess,
        requestTemporaryUserAccess,
        logoutTemporaryUser,
        saveTemporaryAccessGrantToCache,
        getCurrentTemporaryAccessGrant
    };
}
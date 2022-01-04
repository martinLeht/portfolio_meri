import axios from 'axios';
import history from '../../history';
import AuthenticationService from '../AuthenticationService';
import UserCachingService from '../UserCachingService';
const userCachingService = new UserCachingService();
const authService = new AuthenticationService();

export const jwtAuthRequestInterceptor = async (config) => {
    console.log(config);
    if (requestRequiresAuth(config)) {
        const authTokens = userCachingService.getAuthTokens();
        if (authTokens === undefined) {
            throw new Error('No authentication tokens available! Login to make requests that require authentication.');
        }
        config.headers['Authorization']  = `Bearer ${authTokens.accessToken}`;        
    }
    return config;
}

export const jwtAuthResponseInterceptor = async (error) => {
    console.log(error);
    if (error && error.response) {
        switch(error.response.status) {
            /**
             * Indicates that access token is expired, use refresh token to refresh both auth tokens.
             * - Unauthorized error (401 unauthorized)
             */
            case 401:
                if (error.config) {
                    const origRequest = error.config;
                    if (!origRequest._retry) {
                        const authTokens = await authService.refreshAuthTokens();
                        if (authTokens !== undefined) {
                            origRequest.headers['Authorization'] = `Bearer ${authTokens.accessToken}`;
                            return axios.request(origRequest);
                        }
                    } else {
                        userCachingService.signOut();
                        history.push("/login");
                    }
                }
                
                break;           
                
            default:
                break;
        }
    }
    return Promise.reject(error);
}

export const requestRequiresAuth = (config) => {
    const method = config.method;
    return method === 'POST' || method === 'PUT' || method === 'DELETE'
        || method === 'post' || method === 'put' || method === 'delete';
}
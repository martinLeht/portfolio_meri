import axios from 'axios';
import History from '../../routing/History';
import AuthenticationService from '../AuthenticationService';
import UserCachingService from '../UserCachingService';
const userCachingService = new UserCachingService();
const authService = new AuthenticationService();

export const jwtAuthRequestInterceptor = async (config, ignoreEndpoints = [], methods = ['POST', 'PUT', 'DELETE', 'post','put','delete']) => {
    if (requestRequiresAuth(config, ignoreEndpoints, methods)) {
        const authTokens = userCachingService.getAuthTokens();
        if (authTokens === undefined) {
            userCachingService.signOut();
            History.push("/login");
            throw new Error('No authentication tokens available! Login to make requests that require authentication.');
        }
        config.headers['Authorization']  = `Bearer ${authTokens.accessToken}`;        
    }
    return config;
}

export const jwtAuthResponseInterceptor = async (error) => {
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
                        History.push("/login");
                    }
                }
                
                break;           
                
            default:
                break;
        }
    }
    return Promise.reject(error);
}

export const requestRequiresAuth = (config, ignoreEndpoints = [], methods = ['POST', 'PUT', 'DELETE', 'post','put','delete']) => {
    const method = config.method;

    if (ignoreEndpoints.length > 0 && ignoreEndpoints.includes(config.url)) {
        return false;
    } else { 
        return methods.includes(method);
    }
    
}
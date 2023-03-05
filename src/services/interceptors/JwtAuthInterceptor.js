import axios from 'axios';
import History from '../../routing/History';
import AuthenticationService from '../AuthenticationService';
import UserCachingService from '../UserCachingService';
const userCachingService = new UserCachingService();
const authService = new AuthenticationService();

export const DEFAULT_CONFIG = {
    ignoreEndpoints: [], 
    methods: ['POST', 'PUT', 'DELETE', 'post','put','delete'],
    temporaryAccessPaths: []
}

export const jwtAuthRequestInterceptor = async (config, interceptorConfig) => {
    if (requestRequiresAuth(config, interceptorConfig)) {
        // Perform JWT auth
        const authTokens = userCachingService.getAuthTokens();
        if (!authTokens) {
            userCachingService.signOut();
            throw new Error('No authentication tokens available! Login to make requests that require authentication.');
        }
        config.headers['Authorization']  = `Bearer ${authTokens.accessToken}`;        
    }
    return config;
}

export const jwtAuthResponseInterceptor = async (error, interceptorConfig) => {
    if (error && error.response) {
        switch(error.response.status) {
            /**
             * Indicates that access token is expired, use refresh token to refresh both auth tokens.
             * - Unauthorized error (401 unauthorized)
             */
            case 401:
                const origRequest = error.config;
                
                if (origRequest) {
                    if (!origRequest._retry && origRequest.headers && origRequest.headers.hasOwnProperty('Authorization')) {
                        const authTokens = await authService.refreshAuthTokens();
                        if (authTokens) {
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

export const requestRequiresAuth = (config, interceptorConfig) => {
    const method = config.method;
    const ignoreEndpoints = interceptorConfig?.ignoreEndpoints ? interceptorConfig.ignoreEndpoints : DEFAULT_CONFIG.ignoreEndpoints;
    const methods = interceptorConfig?.methods ? interceptorConfig.methods : DEFAULT_CONFIG.methods;

    if (ignoreEndpoints.length > 0 && ignoreEndpoints.includes(config.url)) {
        return false;
    } else { 
        return methods.includes(method);
    }
    
}
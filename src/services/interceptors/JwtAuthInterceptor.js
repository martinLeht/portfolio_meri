import axios from 'axios';
import AuthenticationService from '../AuthenticationService';
import UserCachingService from '../UserCachingService';
const userCachingService = new UserCachingService();
const authService = new AuthenticationService();

export const jwtAuthRequestInterceptor = async (request) => {
    if (requestRequiresAuth(request)) {
        const authTokens = userCachingService.getAuthTokens();
        if (authTokens === undefined) {
            throw new Error('No authentication tokens available! Login to make requests that require authentication.');
        }
        request.config.headers['Authorization'] = `Bearer ${authTokens.accessToken}`;

        
    }
    return request;
}

export const jwtAuthResponseErrorInterceptor = async (error) => {
    const origRequest = error.config;
    switch(error.response.status) {
        /**
         * Redirect to login page when attempting to access secure resource and following status codes are returned:
         * - Token missing or malformed error (400 bad request)
         * - Access and refresh token is expired error, use valid refreshtoken to refresh auth tokens (403 forbidden)
         */
        case 400:
        case 403:
            this.userCachingService.signOut();
            break;
        
        /**
         * Indicates that access token is expired, use refresh token to refresh both auth tokens.
         * - Unauthorized error (401 unauthorized)
         */
        case 401:
            if (!origRequest._retry) {
                const authTokens = await authService.refreshAuthTokens();
                if (authTokens !== undefined) {
                    origRequest.headers['Authorization'] = `Bearer ${authTokens.accessToken}`;
                    return axios.request(origRequest);
                }
            }
            break;           
            
        default:
            break;
    }
    return Promise.reject(error);
}

const requestRequiresAuth = (request) => {
    const method = request.method;
    return method === 'POST' || method === 'PUT' || method === 'DELETE'
    || method === 'post' || method === 'put' || method === 'delete';
}
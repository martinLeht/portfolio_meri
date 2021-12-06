import axios from 'axios';
import UserCachingService from './UserCachingService';
import { jwtAuthTokenRefreshResponseInterceptor } from './interceptors/JwtRefreshInterseptor';

class AuthenticationService {

    constructor() {
        this.client = axios.create({
            baseURL: process.env.REACT_APP_AUTHENTICATION_API_ENDPOINT,
            timeout: 31000,
            headers: { 'Access-Control-Allow-Origin': '*' }
        });
        this.userCachingService = new UserCachingService();
        this.client.interceptors.response.use(response => response, err => jwtAuthTokenRefreshResponseInterceptor(err));
    }

    async registerUser() {
        try {
            const res = await this.client.post('/register');
            return res.data;
        } catch(err) {
            console.error(err);
        }
        return undefined;
    }

    async loginUser(userData) {
        try {
            const res = await this.client.post('/login', userData);
            if(!res || !res.data) return undefined;
            
            return this.saveAuthTokensToCache(res.data);
        } catch(err) {
            console.error(err);
        }
        return undefined;
    }

    logoutUser() {
        try {
            this.userCachingService.signOut();
        } catch(err) {
            console.error(err);
        }
    }

    async refreshAuthTokens() {
        try {
            const authTokens = this.userCachingService.getAuthTokens();
            if (authTokens === undefined) {
                throw new Error('No authentication tokens available! Login to make requests that require authentication.');
            }

            const res = await this.client.post('/token/refresh', authTokens);

            if(!res || !res.data) return undefined;

            return this.saveAuthTokensToCache(res.data);
        } catch(err) {
            console.error(err);
        }
        return undefined;
    }

    saveAuthTokensToCache(tokenData) {
        const accessToken = tokenData.accessToken;
        const refreshToken = tokenData.refreshToken;
        this.userCachingService.setAuthTokens(accessToken, refreshToken);
        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        };
    }

    getCurrentUser() {
        const currentUser = this.userCachingService.getUser();
        const tokens = this.userCachingService.getAuthTokens();

        if (!currentUser && !tokens) return undefined; 

        return {
            user: currentUser,
            authTokens: tokens
        }
    }
}

export default AuthenticationService;
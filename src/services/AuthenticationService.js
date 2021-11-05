import axios from 'axios';
import UserCachingService from './UserCachingService';

class AuthenticationService {

    constructor() {
        this.client = axios.create({
            baseURL: process.env.REACT_APP_API_GATEWAY_URL + process.env.REACT_APP_AUTHENTICATION_API_ENDPOINT,
            timeout: 31000,
            headers: { 'Access-Control-Allow-Origin': '*' }
        });
        this.userCachingService = new UserCachingService();
    }

    async registerUser() {
        try {
            const res = await this.client.post('/auth/register');
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    async loginUser() {
        try {
            const res = await this.client.post('/auth/login');
            if(!res || !res.data) return undefined;

            return this.saveAuthTokensToCache(res.data);
        } catch(err) {
            console.error(err);
        }
    }

    async logoutUser() {
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

            const res = await this.client.post('/auth/token/refresh', authTokens);

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
}

export default AuthenticationService;
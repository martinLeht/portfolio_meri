import axios from 'axios';
import axiosRetry from 'axios-retry';
import UserCachingService from './UserCachingService';
import AuthenticationService from './AuthenticationService';
import { jwtAuthRequestInterceptor, jwtAuthResponseInterceptor, requestRequiresAuth } from './interceptors/JwtAuthInterceptor';

class PortfolioDataService {

    constructor() {
        this.client = axios.create({
            baseURL: process.env.REACT_APP_PORTFOLIO_DATA_API_ENDPOINT,
            timeout: 7000,
            headers: {'Access-Control-Allow-Origin': '*'}
        });
        this.userCachingService = new UserCachingService();
        this.authenticationService = new AuthenticationService();
        this.client.interceptors.request.use(jwtAuthRequestInterceptor, err => {
            return Promise.reject(err);
        }, { runWhen: requestRequiresAuth });
        this.client.interceptors.response.use(response => response, jwtAuthResponseInterceptor);

        const retryDelay = (retryNumber = 0) => {
            const seconds = Math.pow(2, retryNumber) * 1000;
            const randomMs = 1000 * Math.random();
            return seconds + randomMs;
        };
        
        axiosRetry(this.client, {
            retries: 2,
            retryDelay,
            // retry on Network Error & 5xx responses
            retryCondition: axiosRetry.isRetryableError,
        });
    }

    async getExperiences() {
        try {
            const res = await this.client.get('/experience');
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    async getExperienceById(id) {
        try {
            const res = await this.client.get(`/experience/${id}`);
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    async createExperience(experienceData) {
        try {
            const res = await this.client.post('/experience', experienceData);
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    async updateExperience(id, experienceData) {
        try {
            const res = await this.client.put(`/experience/${id}`, experienceData);
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    async deleteExperienceById(id) {
        try {
            const res = await this.client.delete(`/experience/${id}`);
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

}

export default PortfolioDataService;
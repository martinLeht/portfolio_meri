import axios from 'axios';
import axiosRetry from 'axios-retry';
import { jwtAuthRequestInterceptor, jwtAuthResponseInterceptor, requestRequiresAuth } from './interceptors/JwtAuthInterceptor';

class StorageService {

    constructor() {

        this.client = axios.create({
            baseURL: process.env.REACT_APP_IMAGE_STORAGE_API_ENDPOINT,
            timeout: 10000,
            headers: { 
                'Access-Control-Allow-Origin': '*',
            }
        });

        this.jsonContentType = {
            'content-type': 'application/json' 
        }

        this.multipartContentType = {
            'content-type': 'multipard/form-data' 
        }

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

    async getBlogMedia(fileName) {
        try {
            const res = await this.client.post('/get', {
                fileName: fileName,
                mediaCategory: 'BLOG'
            },{
                headers: this.jsonContentType
            });
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    async getExperienceMedia(fileName) {
        try {
            const res = await this.client.post('/get', {
                fileName: fileName,
                mediaCategory: 'EXPERIENCE'
            },{
                headers: this.jsonContentType
            });
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    async uploadBlogMedia(fileData) {
        try {
            const formData = new FormData();
            formData.append("file", fileData);

            const json = JSON.stringify("BLOG");
            const blob = new Blob([json], {
                type: 'application/json'
            });
            formData.append("mediaCategory", blob);

            const res = await this.client.post('/upload', formData, {
                headers: this.multipartContentType
            });
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    async uploadExperienceMedia(fileData) {
        try {
            const formData = new FormData();
            formData.append("file", fileData);
        
            const json = JSON.stringify("EXPERIENCE");
            const blob = new Blob([json], {
                type: 'application/json'
            });
            formData.append("mediaCategory", blob);

            const res = await this.client.post('/upload', formData, {
                headers: this.multipartContentType
            });
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    async deleteBlogMedia(fileName) {
        try {
            const res = await this.client.post(`/delete`, {
                fileName: fileName,
                mediaCategory: 'BLOG'
            },{
                headers: this.jsonContentType
            });
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    async deleteExperienceMedia(fileName) {
        try {
            const res = await this.client.post('/delete', {
                fileName: fileName,
                mediaCategory: 'EXPERIENCE'
            },{
                headers: this.jsonContentType
            });
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

}

export default StorageService;
import axios from 'axios';
import { useKeycloak } from "@react-keycloak/web";

export const useStorageApi = () => {

    const { keycloak } = useKeycloak();

    const jsonContentType = {
        'content-type': 'application/json' 
    }

    const multipartContentType = {
        'content-type': 'multipart/form-data' 
    }

    const client = axios.create({
        baseURL: process.env.REACT_APP_IMAGE_STORAGE_API_ENDPOINT,
        timeout: 10000,
        headers: {'Access-Control-Allow-Origin': '*'},
        withCredentials: true
    });

    client.interceptors.request.use(async (config) => {
        if (keycloak && keycloak.authenticated && keycloak.token) {
            config.headers['Authorization']  = `Bearer ${keycloak.token}`;
        }
        return config;
    }, err => Promise.reject(err)/*, { runWhen: requestRequiresAuth }*/);
    
    client.interceptors.response.use(response => response, async (err) => {
        if (err && err.response) {
            // Check if it is a 401 Unauthorized error
            if (err.response.status === 401) {
                try {
                    const refreshed = await keycloak.updateToken(10);
                    if (refreshed) {
                        return axios.request(err.config);
                    } else {
                        throw new Error("Unauthorized");
                    }
                } catch (error) {
                    keycloak.logout({
                        redirectUri: process.env.REACT_APP_BASE_URL
                    });
                }
            }
        }
        return Promise.reject(err);
    });
    

    /*
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
    */

    const getBlogMedia = async (fileName) => {
        try {
            const res = await client.post('/get', {
                fileName: fileName,
                mediaCategory: 'BLOG'
            },{
                headers: jsonContentType
            });
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    const getExperienceMedia = async (fileName) => {
        try {
            const res = await client.post('/get', {
                fileName: fileName,
                mediaCategory: 'EXPERIENCE'
            },{
                headers: jsonContentType
            });
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    const uploadBlogMedia = async (fileData) => {
        try {
            const formData = new FormData();
            formData.append("file", fileData);

            const json = JSON.stringify("BLOG");
            const blob = new Blob([json], {
                type: 'application/json'
            });
            formData.append("mediaCategory", blob);

            const res = await client.post('/upload', formData, {
                headers: multipartContentType
            });
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    const uploadExperienceMedia = async (fileData) => {
        try {
            const formData = new FormData();
            formData.append("file", fileData);
        
            const json = JSON.stringify("EXPERIENCE");
            const blob = new Blob([json], {
                type: 'application/json'
            });
            formData.append("mediaCategory", blob);

            const res = await client.post('/upload', formData, {
                headers: multipartContentType
            });
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    const deleteBlogMedia = async (fileName) => {
        try {
            const res = await client.post(`/delete`, {
                fileName: fileName,
                mediaCategory: 'BLOG'
            },{
                headers: jsonContentType
            });
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    const deleteExperienceMedia = async (fileName) => {
        try {
            const res = await client.post('/delete', {
                fileName: fileName,
                mediaCategory: 'EXPERIENCE'
            },{
                headers: jsonContentType
            });
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    return {
        getBlogMedia,
        getExperienceMedia,
        uploadBlogMedia,
        uploadExperienceMedia,
        deleteBlogMedia,
        deleteExperienceMedia
    }

}
import axios from 'axios';
import { useKeycloak } from "@react-keycloak/web";

export const usePortfolioDataApi = () => {

    const { keycloak } = useKeycloak();

    const client = axios.create({
        baseURL: process.env.REACT_APP_PORTFOLIO_DATA_API_ENDPOINT,
        timeout: 7000,
        headers: {'Access-Control-Allow-Origin': '*'},
        withCredentials: true
    });

    client.interceptors.request.use(async (config) => {
        if (keycloak && keycloak.authenticated && keycloak.token) {
            config.headers['Authorization']  = `Bearer ${keycloak.token}`;
        }
        return config;
    }, err => err/*, { runWhen: requestRequiresAuth }*/);
    
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

    const getPaginatedExperiences = async ({ pageParam = 0 }) => {
        try {
            if (keycloak && keycloak.authenticated && keycloak.token) {
                const res = await client.get('/experience', {
                    params: {
                        page: pageParam,
                        size: 2
                    }
                });
                return res.data;
            } else {
                const res = await client.get('/experience/public', {
                    params: {
                        page: pageParam,
                        size: 2
                    }
                });
                return res.data;
            }          
        } catch(err) {
            console.error(err);
            return null;
        }
    }

    const getPaginatedPublicExperiences = async ({ pageParam = 0 }) => {
        try {
            const res = await client.get('/experience/public', {
                params: {
                    page: pageParam,
                    size: 2
                }
            });
            return res.data;
        } catch(err) {
            console.error(err);
            return null;
        }
    }

    const getExperienceById = async (id) => {
        try {
            const res = await client.get(`/experience/${id}`);
            return res.data;
        } catch(err) {
            console.error(err);
            return null;
        }
    }

    const createExperience = async (experienceData) => {
        try {
            const res = await client.post('/experience', experienceData);
            return res.data;
        } catch(err) {
            console.error(err);
            return null;
        }
    }

    const updateExperience = async (id, experienceData) => {
        try {
            const res = await client.put(`/experience/${id}`, experienceData);
            return res.data;
        } catch(err) {
            console.error(err);
            return null;
        }
    }

    const deleteExperienceById = async (id) => {
        try {
            const res = await client.delete(`/experience/${id}`);
            return res.data;
        } catch(err) {
            console.error(err);
            return null;
        }
    }

    return {
        getPaginatedExperiences,
        getPaginatedPublicExperiences,
        getExperienceById,
        createExperience,
        updateExperience,
        deleteExperienceById
    };
}
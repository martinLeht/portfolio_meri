import axios from 'axios';
import { useKeycloak } from "@react-keycloak/web";

export const useBlogApi = () => {

    const { keycloak } = useKeycloak();

    const client = axios.create({
        baseURL: process.env.REACT_APP_BLOG_API_ENDPOINT,
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
        console.log(err);
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

    const getPosts = async () => {
        try {
            const res = await client.get('/');
            return res.data;
        } catch(err) {
            console.error(err);
            return null;
        }
    }

    const getPostById = async (id) => {
        try {
            const res = await client.get(`/${id}`);
            return res.data;
        } catch(err) {
            console.error(err);
            return null;
        }
    }

    const getPaginatedTags = async ({ pageParam = 0 }) => {
        try {
            const res = await client.get('/tag', {
                params: {
                    page: pageParam,
                    size: 10
                }
            });
            return res.data;
        } catch(err) {
            console.error(err);
            return null;
        }
    }

    const searchPaginatedTags = async (searchTerm, { pageParam = 0 }) => {
        try {
            const res = await client.get('/tag/search', {
                params: {
                    searchTerm: searchTerm,
                    page: pageParam,
                    size: 10
                }
            });
            return res.data;
        } catch(err) {
            console.error(err);
            return null;
        }
    }

    const getLatestTags = async () => {
        try {
            const res = await client.get('/tag/latest');
            return res.data;
        } catch(err) {
            console.error(err);
            return null;
        }
    }

    const createPost = async (post) => {
        try {
            const res = await client.post('/', post);
            return res.data;
        } catch(err) {
            console.error(err);
            return null;
        }
    }

    const updatePost = async (id, postData) => {
        try {
            const res = await client.put(`/${id}`, postData);
            return res.data;
        } catch(err) {
            console.error(err);
            return null;
        }
    }

    const deletePostById = async (id) => {
        try {
            const res = await client.delete(`/${id}`);
            return res.data;
        } catch(err) {
            console.error(err);
            return null;
        }
    }

    return {
        getPosts,
        getPostById,
        getPaginatedTags,
        searchPaginatedTags,
        getLatestTags,
        createPost,
        updatePost,
        deletePostById
    };
}
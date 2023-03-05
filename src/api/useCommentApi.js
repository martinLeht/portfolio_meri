import axios from 'axios';
import { useKeycloak } from "@react-keycloak/web";
import { useTemporaryAccessApi } from './useTemporaryAccessApi';

export const useCommentApi = () => {

    const { keycloak } = useKeycloak();
    const { getCurrentTemporaryAccessGrant, logoutTemporaryUser } = useTemporaryAccessApi();

    const client = axios.create({
        baseURL: process.env.REACT_APP_COMMENT_API_ENDPOINT,
        timeout: 7000,
        headers: {'Access-Control-Allow-Origin': '*'},
        withCredentials: true
    });

    client.interceptors.request.use(async (config) => {
        const tempAccessGrant = getCurrentTemporaryAccessGrant();
        if (tempAccessGrant) {
            config.headers['Authorization']  = `Bearer ${tempAccessGrant.tempAccessToken}`;
        }
        if (keycloak && keycloak.authenticated && keycloak.token) {
            config.headers['Authorization']  = `Bearer ${keycloak.token}`;
        }
        return config;
    }, err => Promise.reject(err)/*, { runWhen: requestRequiresAuth }*/);
    
    client.interceptors.response.use(response => response, async (err) => {
        if (err && err.response) {
            // Check if it is a 401 Unauthorized error
            if (err.response.status === 401) {
                if (getCurrentTemporaryAccessGrant()) {
                    await logoutTemporaryUser();
                } else {
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
        }
        return Promise.reject(err);
    });

    const getCommentById = async (id) => {
        try {
            const res = await client.get(`/${id}`);
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    const getPaginatedCommentsByPostId = async (postId, { pageParam = 0 }) => {
        try {
            const res = await client.get(`/post/${postId}`, {
                params: {
                    page: pageParam,
                    size: 10
                }
            });
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    const getThreadCommentsByParentId = async (parentId, { pageParam = 0 }) => {
        try {
            const res = await client.get(`${parentId}/thread`, {
                params: {
                    page: pageParam,
                    size: 10
                }
            });
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    const createComment = async (commentData) => {
        try {
            const res = await client.post('/', commentData);
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    const updateComment = async (id, commentData) => {
        try {
            const res = await client.put(`/${id}`, commentData);
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    const deleteCommentById = async (id) => {
        try {
            const res = await client.delete(`/${id}`);
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    return {
        getCommentById,
        getPaginatedCommentsByPostId,
        getThreadCommentsByParentId,
        createComment,
        updateComment,
        deleteCommentById
    };
}
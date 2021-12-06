import axios from 'axios';
import UserCachingService from './UserCachingService';
import AuthenticationService from './AuthenticationService';
import { jwtAuthRequestInterceptor, jwtAuthResponseInterceptor } from './interceptors/JwtAuthInterceptor';

class BlogPostService {

    constructor() {
        this.client = axios.create({
            baseURL: process.env.REACT_APP_BLOG_API_ENDPOINT,
            timeout: 31000,
            headers: {'Access-Control-Allow-Origin': '*'}
        });
        this.userCachingService = new UserCachingService();
        this.authenticationService = new AuthenticationService();
        this.client.interceptors.request.use(jwtAuthRequestInterceptor, err => {
            Promise.reject(err);
        }, { synchronous: true });
        this.client.interceptors.response.use(response => response, err => jwtAuthResponseInterceptor(err));
    }

    async getPosts() {
        try {
            const res = await this.client.get('/');
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    async getPostById(id) {
        try {
            const res = await this.client.get(`/${id}`);
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    async getTags() {
        try {
            const res = await this.client.get('/tag');
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    async getLatestTags() {
        try {
            const res = await this.client.get('/tag/latest');
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    async getTagById(id) {
        try {
            const res = await this.client.get(`/${id}/tag`);
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    async createPost(post) {
        try {
            const res = await this.client.post('/', post);
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    async updatePost(id, postData) {
        try {
            const res = await this.client.put(`/${id}`, postData);
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    async deletePostById(id) {
        try {
            const res = await this.client.delete(`/${id}`);
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

}

export default BlogPostService;
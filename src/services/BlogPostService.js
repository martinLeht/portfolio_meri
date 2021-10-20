import axios from 'axios';

class BlogPostService {

    constructor() {
        this.client = axios.create({
            baseURL: process.env.REACT_APP_API_GATEWAY_URL + process.env.REACT_APP_BLOG_API_ENDPOINT,
            timeout: 31000,
            headers: {'Access-Control-Allow-Origin': '*'}
        });
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
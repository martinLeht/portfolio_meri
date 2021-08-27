import axios from 'axios';

class BlogPostService {

    constructor() {
        this.client = axios.create({
            baseURL: process.env.REACT_APP_BLOG_API_URL,
            timeout: 31000,
            headers: {'Access-Control-Allow-Origin': '*'}
        });
    }

    async getPosts() {
        try {
            const res = await this.client.get('/blog');
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    async getPostById(id) {
        try {
            const res = await this.client.get(`/blog/${id}`);
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    async getTags() {
        try {
            const res = await this.client.get('/blog/tag');
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    async getTagById(id) {
        try {
            const res = await this.client.get(`/blog/${id}/tag`);
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    async createPost(post) {
        try {
            const res = await this.client.post('/blog/', post);
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    async updatePost(id, postData) {
        try {
            const res = await this.client.put(`/blog/${id}`, postData);
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    async deletePostById(id) {
        try {
            const res = await this.client.delete(`/blog/${id}`);
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

}

export default BlogPostService;
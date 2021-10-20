import axios from 'axios';

class AuthenticationService {

    constructor() {
        this.client = axios.create({
            baseURL: process.env.REACT_APP_API_GATEWAY_URL + REACT_APP_AUTHENTICATION_API_ENDPOINT,
            timeout: 31000,
            headers: { 'Access-Control-Allow-Origin': '*' }
        });
    }

    async registerUser() {
        try {
            const res = await this.client.post('/');
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    async loginUser(id) {
        try {
            const res = await this.client.post(`/${id}`);
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }

    async refreshToken() {
        try {
            const res = await this.client.post('/tag');
            return res.data;
        } catch(err) {
            console.error(err);
        }
    }
}

export default BlogPostService;
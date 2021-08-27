import axios from 'axios';

class InstagramService {
    
    constructor() {
        this.api_endpoint = process.env.REACT_APP_INSTA_API_URL + `&access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
    }

    async fetchInstaPosts() {
        try {
            const res = await axios.get(this.api_endpoint);
            const posts = res.data.data;
            return posts;
        } catch (err) {
            console.error(err);
        }
    }
}

export default InstagramService;
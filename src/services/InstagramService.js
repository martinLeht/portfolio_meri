import axios from 'axios';

class InstagramService {
    
    async fetchInstaPosts(amount) {
        let fetchAll = false;
        if (amount === undefined || amount === -1) {
            fetchAll = true;
        }
        let insta_api = 'https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption,permalink';
        if (fetchAll) {
            insta_api += `&access_token=${process.env.REACT_APP_ACCESS_TOKEN}`;
        } else {
            insta_api += `&limit=${amount}&access_token=${process.env.REACT_APP_ACCESS_TOKEN}`;
        }
        
        try {
            const res = await axios.get(insta_api);
            console.log(res);
            //const posts = await this.getPostsFromResponse(res);
            const posts = res.data.data;
            return posts;
          } catch (err) {
            console.error(err);
        }
    }

    /*
    async getPostsFromResponse(res) {
        const data = res.data.data;
        const posts = data.map((post) => this.instaNodeToPostData(node))
        return posts;
    }

    instaNodeToPostData(response) {
        const data = res.data.data;
        const { id } = instaNode;
        const likes = instaNode.edge_media_preview_like.count;
        const caption = instaNode.edge_media_to_caption.edges[0].node.text;
        const thumbnail = instaNode.thumbnail_resources.find(
            thumbnail => thumbnail.config_width === this.#THUMBNAIL_WIDTH
        )
        const { src, config_width: width, config_height: height } = thumbnail;
        const url = `https://www.instagram.com/p/${instaNode.shortcode}`;
        return {
            id,
            caption,
            src,
            width,
            height,
            url,
            likes
        };
    }
    */


}

export default InstagramService;
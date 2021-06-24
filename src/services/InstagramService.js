class InstagramService {

    #INSTAGRAM_ID = "1112682650";
    #THUMBNAIL_WIDTH = 640;
    #ALL_POSTS = 491;

    
    async getInstaPosts(amount) {
        if (amount === -1) {
            amount = this.#ALL_POSTS;
        }
        const insta_api = `https://www.instagram.com/graphql/query?query_id=17888483320059182&variables={"id":"${this.#INSTAGRAM_ID}","first":${amount},"after":null}`;
        try {
            const res = await fetch(insta_api);
            const posts = await this.getPostsFromResponse(res);
            return posts;
          } catch (err) {
            console.error(err);
          }
    }

    async getPostsFromResponse(res) {
        const { data } = await res.json()
        const posts = data.user.edge_owner_to_timeline_media.edges.map(
            ({ node }) => this.instaNodeToPostData(node))
        return posts;
    }

    instaNodeToPostData(instaNode) {
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


}

export default InstagramService;
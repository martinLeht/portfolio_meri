import BlogPostService from '../services/BlogPostService';

const blogService = new BlogPostService();

export const fetchPosts = async () => {
    return blogService.getPosts();
}

export const fetchPostById = async (id) => {
    return blogService.getPostById(id);
}

export const fetchTags = async () => {
    return blogService.getTags();
}

export const fetchLatestTags = async () => {
    return blogService.getLatestTags();
}

export const fetchTagById = (id) => {
    return blogService.getTagById();
}

export const createPost = async  (post) => {
    return blogService.createPost(post);
}

export const updatePost = async  (id, postData) => {
    return blogService.updatePost(id, postData);
}

export const deletePostById = async  (id) => {
    return blogService.deletePostById(id);
}
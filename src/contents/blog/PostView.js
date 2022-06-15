
import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import BlogPostService from '../../services/BlogPostService';
import Loader from "../../components/general/Loader";
import PostContent from "./PostContent";

const PostView = (props) => {
    const { deletePostHandler } = props;

    const [post, setPost] = useState({});
    const [isLoading, setLoading] = useState(true);
    
    const { postId } = useParams();
    
    useEffect(() => {
        window.scrollTo(0, 0);
        const blogPostService = new BlogPostService();
        setLoading(true);
        blogPostService.getPostById(postId).then(post => {
            if (post) {
                setLoading(false);
                setPost(post);
            }
        }).catch(err => {
            console.log(err);
            setLoading(false);
        });
    }, [postId]);


    const handleDeletePost = () => {
        deletePostHandler(parseInt(postId));
    }

    return (
        <>
            {
                isLoading 
                ? <Loader />
                : (
                    post !== undefined
                    ? <PostContent post={ post } onDeletePostAction={handleDeletePost}/>
                    : <Navigate to="/blog" />
                )
            }
        </>
    );
}

export default PostView;
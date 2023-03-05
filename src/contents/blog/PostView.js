
import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useBlogApi } from '../../api/useBlogApi';
import Loader from "../../components/general/Loader";
import PostContent from "./PostContent";

const PostView = () => {
    const [post, setPost] = useState({});
    const [isLoading, setLoading] = useState(true);

    const { getPostById } = useBlogApi();
    
    const { postId } = useParams();
    
    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);
        getPostById(postId).then(post => {
            setLoading(false);
            setPost(post);
        }).catch(err => {
            console.log(err);
            setLoading(false);
        });
    }, [postId]);

    return (
        <>
            {
                isLoading 
                ? <Loader pulse/>
                : (
                    !!post ? <PostContent post={ post }/> : <Navigate to="/blog" />
                )
            }
        </>
    );
}

export default PostView;
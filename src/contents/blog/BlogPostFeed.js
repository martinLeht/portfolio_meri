import { MDBRow, MDBCol } from 'mdbreact';
import BlogPostCard from './BlogPostCard';
import LoadingSpinner from '../../components/general/LoadingSpinner';


const BlogPostFeed = (props) => {

    const { isLoading, postTags } = props;

    const renderFeed = () => {

        let content;
        const hasPosts = (postTags !== undefined && postTags.length > 0);
        if (isLoading) {
            content = <LoadingSpinner />;
        } else if (hasPosts) {
            content = postTags.map((tag) => {
                return (
                    <MDBCol md="3" key={ tag.id } className="blog-feed-col">                
                        <BlogPostCard 
                            img={tag.thumbnail}
                            title={ tag.postTitle }
                            postIntro={ tag.postIntro }
                            createdAt={ tag.createdAt }
                            id={ tag.id }
                        />
                    </MDBCol>
                );
            })
        } else {
            content = (
                <MDBCol middle className="text-center p-4">
                    <h4>Ei löytynyt julkaisuja</h4>
                </MDBCol>
            );
        }

        return (
            <MDBRow center middle className={ hasPosts ? "d-flex" : "dashed-border-3"}>
                { content }
            </MDBRow>
        );
    }
    
    return (
        <>
            { renderFeed() }
        </>  
    );
}

BlogPostFeed.defaultProps = {
    isLoading: false
}

export default BlogPostFeed;
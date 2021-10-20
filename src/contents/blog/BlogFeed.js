import { Suspense } from 'react';
import { MDBRow, MDBCol } from 'mdbreact';
import useWindowDimensions from '../../hooks/window-dimensions';
import BlogCard from './BlogCard';
import BlogSearchBar from './BlogSearchBar';
import LoadingSpinner from '../../components/general/LoadingSpinner';


const BlogFeed = (props) => {

    const { isLoading, postTags } = props;
    const { height, width } = useWindowDimensions();
    const isSearchBarCollapsed = width < 785;

    const renderFeed = () => {

        let content;
        const hasPosts = (postTags !== undefined && postTags.length > 0);
        if (isLoading) {
            content = <LoadingSpinner />;
        } else if (hasPosts) {
            content = postTags.map((tag) => {
                return (
                    <MDBCol md="3" key={ tag.id } className="blog-feed-col">                
                        <BlogCard 
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
                    <h4>Ei julkaisuja saatavilla</h4>
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
            <MDBRow center className="text-white">
                <BlogSearchBar collapsed={ isSearchBarCollapsed } />
            </MDBRow>
            { renderFeed() }
        </>  
    );
}

BlogFeed.defaultProps = {
    isLoading: false
}

export default BlogFeed;
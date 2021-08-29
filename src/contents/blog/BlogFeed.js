import { Suspense } from 'react';
import { MDBRow, MDBCol } from 'mdbreact';
import useWindowDimensions from '../../hooks/window-dimensions';
import BlogCard from './BlogCard';
import BlogSearchBar from './BlogSearchBar';
import LoadingSpinner from '../../components/general/LoadingSpinner';


const BlogFeed = (props) => {

    const { postTags } = props;
    const { height, width } = useWindowDimensions();
    const isSearchBarCollapsed = width < 785;

    console.log(postTags);

    const renderFeed = () => {

        let content;
        const hasPosts = (postTags !== undefined && postTags.length > 0);
        if (hasPosts) {
            content = postTags.map((tag) => {
                return (
                    <MDBCol md="3" key={ tag.id } className="blog-feed-col">                
                        <BlogCard 
                            img="https://mdbootstrap.com/img/Photos/Slides/img%20(137).jpg"
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
            <MDBRow center className={ hasPosts ? "d-flex" : "dashed-border-3"}>
                { content }
            </MDBRow>
        );
    }
    
    return (
        <>
            <MDBRow center className="text-white">
                <BlogSearchBar collapsed={ isSearchBarCollapsed } />
            </MDBRow>
            <Suspense fallback={ <LoadingSpinner /> } >
                { renderFeed() }
            </Suspense>
        </>  
    );
}

export default BlogFeed;
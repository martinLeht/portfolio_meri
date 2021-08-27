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

    const renderRows = () => {

        let blogCardRows = [];

        blogCardRows = postTags.map((tag) => {
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
        return (
            <MDBRow center className="d-flex">
                { blogCardRows }
            </MDBRow>
        );
    }
    
    return (
        <>
            <MDBRow center className="text-white">
                <BlogSearchBar collapsed={ isSearchBarCollapsed } />
            </MDBRow>
            <Suspense fallback={ <LoadingSpinner /> } >
                { renderRows() }
            </Suspense>
        </>  
    );
}

export default BlogFeed;
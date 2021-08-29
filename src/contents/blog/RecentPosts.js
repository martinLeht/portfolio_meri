import { Suspense, useContext } from "react";
import { MDBRow, MDBCol, MDBIcon } from 'mdbreact';
import { NavLink } from "react-router-dom";
import LoadingSpinner from '../../components/general/LoadingSpinner';
import BlogCard from './BlogCard';
import { PostsProvider } from './context/PostsContext';

const RecentPosts = () => {
    
    const postTags = useContext(PostsProvider);

    const renderPosts = () => {

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

    return(
        <>
            <MDBRow between className="text-white">
                    <MDBCol>
                        <h4>Viimeisimmät julkaisut</h4>
                    </MDBCol>
                    <MDBCol>
                        <NavLink
                            className="text-white mt-1 d-flex justify-content-end align-items-center nav-link"
                            to={ `/blog` }
                        >
                            <h6>
                                Katso kaikki{' '}
                                <MDBIcon icon='chevron-right' size='sm'/>
                            </h6>
                        </NavLink>
                    </MDBCol>
            </MDBRow>
            <Suspense fallback={ <LoadingSpinner /> } >
                { renderPosts() }
            </Suspense>
        </>
    );
}

export default RecentPosts;
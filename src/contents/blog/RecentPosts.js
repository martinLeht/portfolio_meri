import { Suspense, useEffect, useState } from "react";
import { MDBRow, MDBCol, MDBIcon } from 'mdbreact';
import { NavLink } from "react-router-dom";
import LoadingSpinner from '../../components/general/LoadingSpinner';
import BlogPostService from '../../services/BlogPostService';
import BlogCard from './BlogCard';

const RecentPosts = () => {

    const [latestPosts, setLatestPosts] = useState([]);
    const blogPostService = new BlogPostService();

    useEffect(() => {
        blogPostService.getLatestTags().then(postTags => {
            setLatestPosts(postTags.slice(0, 3));
        }).catch(e => console.error(e.message));
    }, []);

    const renderPosts = () => {

        let content;
        const hasPosts = (latestPosts !== undefined && latestPosts.length > 0);
        if (hasPosts) {
            content = latestPosts.map((tag) => {
                return (
                    <MDBCol className="d-flex justify-content-center" md="4" >           
                        <BlogCard 
                            className="recent-posts"
                            img={ tag.thumbnail }
                            title={ tag.postTitle }
                            postIntro={ tag.postIntro }
                            createdAt={ tag.createdAt }
                            id={ tag.id }
                            key={ tag.id }
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
            <MDBRow center className={ hasPosts ? "" : "dashed-border-3"}>
                { content }
            </MDBRow>
        );
    }

    return(
        <>
            <MDBRow between className="border border-white p-3 bg-dark-beige">
                <MDBCol size="5">
                    <h5>Viimeisimmät julkaisut</h5>
                </MDBCol>
                <MDBCol size="5">
                    <NavLink
                        className="d-flex justify-content-end text-white mt-1 align-items-center nav-link"
                        to={ `/blog` }
                    >
                        <h6>
                            Katso kaikki{' '}
                            <MDBIcon icon='chevron-right' size='sm'/>
                        </h6>
                    </NavLink>
                </MDBCol>
                <Suspense fallback={ <LoadingSpinner /> } >
                    { renderPosts() }
                </Suspense>
            </MDBRow>
            
        </>
    );
}

export default RecentPosts;
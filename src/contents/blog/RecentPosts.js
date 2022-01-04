
import { Suspense, useEffect, useState } from "react";
import { MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { NavLink } from "react-router-dom";
import LoadingSpinner from '../../components/general/LoadingSpinner';
import BlogPostService from '../../services/BlogPostService';
import BlogPostCard from './BlogPostCard';
import useWindowDimensions from '../../hooks/window-dimensions';

const RecentPosts = () => {

    const [latestPosts, setLatestPosts] = useState([]);

    const { isMobileSize } = useWindowDimensions();

    useEffect(() => {
        const blogPostService = new BlogPostService();
        blogPostService.getLatestTags().then(postTags => {
            setLatestPosts(postTags.slice(0, 3));
        }).catch(e => console.error(e.message));
    }, [setLatestPosts]);

    const renderPosts = () => {

        let content;
        const hasPosts = (latestPosts !== undefined && latestPosts.length > 0);
        if (hasPosts) {
            content = latestPosts.map((tag) => {
                return (
                    <MDBCol className="d-flex justify-content-center" size="auto" >           
                        <BlogPostCard 
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

    return (
        <>
            <MDBRow center>
                <MDBCol size="9" className="border-bottom border-dark border-3 mb-2">
                    <MDBRow between>
                        <MDBCol className="d-flex align-items-end" size="auto">
                            <h5>Viimeisimmät julkaisut</h5>
                        </MDBCol>
                        <MDBCol className="d-flex align-items-end" size="auto">
                            <NavLink
                                className="d-flex justify-content-end text-dark mt-1 align-items-center nav-link"
                                to={ `/blog` }
                            >
                                <h6>
                                    Katso kaikki{' '}
                                    <MDBIcon icon='chevron-right' size='sm'/>
                                </h6>
                            </NavLink>
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
            </MDBRow>
            
            <Suspense fallback={ <LoadingSpinner /> } >
                { renderPosts() }
            </Suspense>
        </>
    );
}

export default RecentPosts;
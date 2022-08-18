
import { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { NavLink } from "react-router-dom";
import useWindowDimensions from '../../hooks/window-dimensions';
import Loader from '../../components/general/Loader';
import BlogPostService from '../../services/BlogPostService';
import BlogPostCard from './BlogPostCard';

const RecentPosts = () => {

    const [latestPosts, setLatestPosts] = useState([]);
    const { isMobileSize } = useWindowDimensions();
    const { t } = useTranslation();

    useEffect(() => {
        const blogPostService = new BlogPostService();
        blogPostService.getTags().then(postTags => {
            setLatestPosts(postTags.data.slice(0, 3));
        }).catch(e => console.error(e.message));
    }, [setLatestPosts]);

    const renderPosts = () => {

        let content;
        const hasPosts = (latestPosts !== undefined && latestPosts.length > 0);
        if (hasPosts) {
            content = latestPosts.map((tag) => {
                return (
                    <MDBCol className="d-flex justify-content-center my-2" size="auto" key={ tag.postId }>           
                        <BlogPostCard 
                            className="recent-posts"
                            img={ tag.thumbnail.link }
                            title={ tag.postTitle }
                            postIntro={ tag.postIntro }
                            createdAt={ tag.createdAt }
                            id={ tag.postId }
                        />
                    </MDBCol>   
                );
            })
        } else {
            content = (
                <MDBCol className="text-center p-4">
                    <h4>{t('blog.feed.no_posts')}</h4>
                </MDBCol>
            );
        }
        

        return (
            <MDBRow center>
                { content }
            </MDBRow>
        );
    }

    return (
        <>
            <MDBRow center>
                <MDBCol size="9" className="border-bottom border-dark border-3 mb-3">
                    <MDBRow between={!isMobileSize} className={ isMobileSize ? 'd-flex justify-content-center text-center' : ''}>
                        <MDBCol center className="d-flex align-items-end" size="auto">
                            <h5>{t('blog.recent_posts.title')}</h5>
                        </MDBCol>
                        <MDBCol center className="d-flex align-items-end" size="auto">
                            <NavLink
                                className="d-flex justify-content-end text-dark mt-1 align-items-center nav-link"
                                to={ `/blog` }
                            >
                                <h6>
                                    {t('blog.recent_posts.view_all')}{' '}
                                    <MDBIcon icon='chevron-right' size='sm'/>
                                </h6>
                            </NavLink>
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
            </MDBRow>
            
            <Suspense fallback={ <Loader pulse /> } >
                { renderPosts() }
            </Suspense>
        </>
    );
}

export default RecentPosts;
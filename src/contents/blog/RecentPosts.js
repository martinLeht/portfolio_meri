
import { Suspense, useState, useEffect } from "react";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";
import { MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { NavLink } from "react-router-dom";
import useWindowDimensions from '../../hooks/window-dimensions';
import Loader from '../../components/general/Loader';
import { useBlogApi } from '../../api/useBlogApi';
import BlogPostCard from './BlogPostCard';


const RecentPosts = () => {

    const [latestPosts, setLatestPosts] = useState([]);
    const { isMobileSize } = useWindowDimensions();
    const { t } = useTranslation();
    const { getPaginatedTags } = useBlogApi();

    const {
        data: postTagsData, 
        isLoading, 
        isError, 
        error,
        hasNextPage,
        fetchNextPage,
        isFetching,
        isFetchingNextPage
    } = useInfiniteQuery(['posts'], (pageConfig) => getPaginatedTags(pageConfig), {
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.page === Math.floor(lastPage.totalSize / lastPage.pageSize)) return undefined;
            else return lastPage.page + 1;
        }
    })

    const postTags = isLoading ? [] : postTagsData ? postTagsData.pages : [];

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
            { 
                isLoading
                ? <Loader pulse />
                : (
                    postTags.length > 0 && postTags[0].data.length > 0 
                    ? (
                        postTags[0].data.slice(0, 3).map((tag) => {
                            return (
                                <MDBCol className="d-flex justify-content-center my-2" size="auto" key={ tag.id }>           
                                    <BlogPostCard 
                                        className="recent-posts"
                                        img={ tag.thumbnail.link }
                                        title={ tag.postTitle }
                                        postIntro={ tag.postIntro }
                                        createdAt={ tag.createdAt }
                                        id={ tag.id }
                                    />
                                </MDBCol>   
                            );
                        })
                    )
                    : (
                        <MDBRow center>
                            <MDBCol className="text-center p-4">
                                <h4>{t('blog.feed.no_posts')}</h4>
                            </MDBCol>
                        </MDBRow>
                    )
                )
            }
        </>
    );
}

export default RecentPosts;
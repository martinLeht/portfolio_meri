import  { useState, Suspense, lazy, useEffect, useMemo } from 'react';
import { useMutation, useInfiniteQuery, useQueryClient } from "react-query";
import debounce from 'lodash.debounce';
import { useTranslation } from "react-i18next";
import { useKeycloak } from "@react-keycloak/web";
import { Route, Routes, Link } from "react-router-dom";
import { MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import BlogPostCard from './BlogPostCard';
import RecentPosts from "./RecentPosts";
import SearchField from "../../components/general/SearchField";
import HelmetMetaData from '../../components/general/HelmetMetaData';
import Loader from '../../components/general/Loader';
import GuardedRoute from '../../components/routing/GuardedRoute';
import { useBlogApi } from '../../api/useBlogApi';

const SectionSeparator = lazy(() => import('../../components/general/SectionSeparator'));
const WritePost = lazy(() => import('./WritePost'));
const PostView = lazy(() => import('./PostView'));

const Blog = () => {

    const [searchTerm, setSearchTerm] = useState();
    const [isSearching, setIsSearching] = useState(false);
    const [latestPostTag, setLatestPostTag] = useState();
    const { t } = useTranslation();
    const { keycloak, initialized } = useKeycloak();
    const queryClient = useQueryClient();

    const { getPaginatedTags, searchPaginatedTags, deletePostById } = useBlogApi();
    
    const changeSearchTermHandler = (event) => {
        const searchValue = event.target.value;
        if (searchValue && searchValue.trim() !== '') {
            if (!isSearching) setIsSearching(true);
            setSearchTerm(searchValue);
            queryClient.invalidateQueries(['posts-search']);
        } else {
            setSearchTerm();
            setIsSearching(false);
            queryClient.invalidateQueries(['posts-search']);
        }
    }

    const searchChangeHandler = useMemo(
        () => debounce(changeSearchTermHandler, 300)
    , []);


    const {
        data: postTagsData, 
        isLoading: isTagsLoading, 
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

    const {
        data: postTagsSearchData, 
        isLoading: isTagsSearchLoading, 
        isError: isSearchError, 
        error: searchError,
        hasNextPage: hasNextSearchPage,
        fetchNextPage: fetchNextSearchPage,
        isFetching: isFetchingSearch,
        isFetchingNextPage: isFetchingNextSearchPage
    } = useInfiniteQuery(['posts-search', searchTerm], (pageConfig) => searchPaginatedTags(searchTerm, pageConfig), {
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.page === Math.floor(lastPage.totalSize / lastPage.pageSize)) return undefined;
            else return lastPage.page + 1;
        },
    })

    const postTags = isTagsLoading ? [] : postTagsData ? postTagsData.pages : [];
    const postTagsSearch = isTagsSearchLoading ? [] : postTagsSearchData ? postTagsSearchData.pages : [];

    useEffect(() => {
        if (!latestPostTag && postTags.length > 0 && postTags[0].data.length > 0) {
            setLatestPostTag(postTags[0].data[0]);
        }
    }, [postTags]);

    
    const handleInfiniteScroll = (event) => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (Math.ceil(windowBottom) >= docHeight) {
            fetchNextPage();
        }
    };

    const feedFetchScrollHandler = useMemo(
        () => debounce(handleInfiniteScroll, 200)
    , []);

    const handleSearchInfiniteScroll = (event) => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (Math.ceil(windowBottom) >= docHeight) {
            fetchNextSearchPage();
        }
    };

    const searchFetchScrollHandler = useMemo(
        () => debounce(handleSearchInfiniteScroll, 200)
    , []);

    useEffect(() => {
        if (!isSearching && hasNextPage) {
            window.addEventListener("scroll", feedFetchScrollHandler);
            return () => {
                window.removeEventListener("scroll", feedFetchScrollHandler);
            };
        }
    }, [isSearching, hasNextPage]);

    useEffect(() => {
        if (isSearching && hasNextSearchPage) {
            window.addEventListener("scroll", searchFetchScrollHandler);
            return () => {
                window.removeEventListener("scroll", searchFetchScrollHandler);
            };
        }
    }, [isSearching, hasNextSearchPage]);

    const newPostHandler = (postTag) => {
        queryClient.invalidateQueries(['posts']);
    }

    const renderTopSection = () => {
        if (postTags !== undefined && postTags.length > 0) {
            return (
                <MDBRow className="mx-0 p-5 blog-top-section" center middle>
                    <MDBCol className="m-4" size="10" md="3" lg="4">
                        <MDBRow center middle>
                            <MDBCol>
                                <h1>
                                    <b>{t('blog.top_section.title')}</b>
                                </h1>
                                <p>{t('blog.top_section.caption')}</p>
                            </MDBCol>
                        </MDBRow>
                        {
                            keycloak.authenticated && (
                                <MDBRow center middle>
                                    <MDBCol center className="p-3 blog-post-add-link dashed-border-5">
                                        <Link to="/blog/posts/new" className="text-dark">
                                            <h3 className="d-flex justify-content-center align-items-center flex-column">
                                                <b>{t('blog.top_section.add_post')}</b>
                                                <MDBIcon icon="plus" />
                                            </h3>
                                        </Link>
                                    </MDBCol>
                                </MDBRow>
                            )
                        }
                        
                    </MDBCol>
                    { renderLatestPost() }
                </MDBRow>
            );
        } else {
            return (
                <MDBRow className="" center middle>
                    <MDBCol className="m-4" size="10" lg="7">
                        <h1>
                            <b>{t('blog.top_section.title')}</b>
                        </h1>
                        <p>{t('blog.top_section.caption')}</p>
                    </MDBCol>
                    {
                        keycloak.authenticated && (
                            <MDBCol size="8" md="3" center className="p-3 blog-post-add-link dashed-border-5">
                                <Link to="/blog/posts/new" className="text-dark">
                                    <h3 className="d-flex justify-content-center align-items-center flex-column">
                                        <b>{t('blog.top_section.add_post')}</b>
                                        <MDBIcon icon="plus" />
                                    </h3>
                                </Link>
                            </MDBCol>
                        )
                    }                  
                    
                </MDBRow>
            ); 
        }
    }

    const renderLatestPost = () => {
        if (isTagsLoading) {
            return (
                <MDBCol center size="auto">
                    <Loader pulse/>
                </MDBCol>
            );
        } else if (latestPostTag !== undefined) {
            return (
                <MDBCol className="d-flex justify-content-center p-0 blog-latest" size="12" md="6" lg="5">
                    <BlogPostCard 
                        img={ latestPostTag.thumbnail.link }
                        title={ latestPostTag.postTitle }
                        postIntro={ latestPostTag.postIntro } 
                        createdAt={ latestPostTag.createdAt } 
                        id={ latestPostTag.postId } />
                </MDBCol>
            );
        } else {
            return undefined;
        }
    }

    return (
        <>
            <Suspense fallback={ <Loader pulse /> }>
                <Routes>
                    <Route path="/" element={
                        <>
                            <HelmetMetaData title={t('blog.title')}/>
                            { renderTopSection() }
                            <SectionSeparator title={t('blog.feed.title')} className="bg-white-shade">
                                <SearchField disabled={postTags.length < 1 || postTags[0].data.length > 0} onChange={ searchChangeHandler } />
                            </SectionSeparator>
                            { 
                                isTagsLoading || isTagsSearchLoading
                                ? <Loader pulse className="bg-white-shade"/>
                                : (
                                    isSearching
                                    ? (
                                        postTagsSearch.length > 0 && postTagsSearch[0].data.length > 0
                                        ? (
                                            <MDBRow className="mx-0 p-4 blog-feed" center middle>
                                                {
                                                    postTagsSearch.map(tagsPage => 
                                                        tagsPage.data.map(tag => {
                                                            return (
                                                                <MDBCol md="4" key={ tag.postId } className="blog-feed-col py-2">                
                                                                    <BlogPostCard 
                                                                        img={tag.thumbnail.link}
                                                                        title={ tag.postTitle }
                                                                        postIntro={ tag.postIntro }
                                                                        createdAt={ tag.createdAt }
                                                                        id={ tag.postId }
                                                                    />
                                                                </MDBCol>
                                                            );
                                                        })
                                                    )
                                                }
                                            </MDBRow>
                                        ): (
                                            <MDBRow className="mx-0 p-4 blog-feed" center middle>
                                                <MDBCol className="text-center p-4">
                                                        <h4>{t('blog.feed.no_posts')}</h4>
                                                    </MDBCol>
                                            </MDBRow>
                                        )
                                    ): (
                                        postTags.length > 0 && postTags[0].data.length > 0
                                        ? (
                                            <MDBRow className="mx-0 p-4 blog-feed" center middle>
                                                {
                                                    postTags.map(tagsPage => 
                                                        tagsPage.data.map(tag => {
                                                            return (
                                                                <MDBCol md="12" key={ tag.postId } className="blog-feed-col py-2">                
                                                                    <BlogPostCard 
                                                                        img={tag.thumbnail.link}
                                                                        title={ tag.postTitle }
                                                                        postIntro={ tag.postIntro }
                                                                        createdAt={ tag.createdAt }
                                                                        id={ tag.postId }
                                                                    />
                                                                </MDBCol>
                                                            );
                                                        })
                                                    )
                                                }
                                            </MDBRow>
                                        )
                                        : (
                                            <MDBRow className="mx-0 p-4 blog-feed" center middle>
                                                <MDBCol className="text-center p-4">
                                                        <h4>{t('blog.feed.no_posts')}</h4>
                                                    </MDBCol>
                                            </MDBRow>
                                        )
                                    )
                                )
                            }
                            
                        </>
                    }/>
                    <Route path="/posts/new" element={
                        <GuardedRoute path="/posts/new">
                            <>
                                <HelmetMetaData title={t('blog.post.create')}/>
                                <SectionSeparator title={t('blog.post.create')} />
                                <Suspense fallback={ <Loader pulse /> }>
                                    <WritePost/>
                                </Suspense>
                            </>
                        </GuardedRoute>
                    }/>
                    <Route path="/posts/:postId/edit" element={
                        <GuardedRoute path="/posts/:postId/edit">
                            <>
                                <HelmetMetaData title={t('blog.post.edit_post')}/>
                                <SectionSeparator title={t('blog.post.edit_post')} />
                                <Suspense fallback={ <Loader pulse /> }>
                                    <WritePost />
                                </Suspense>
                            </>
                        </GuardedRoute>
                    }/>
                    <Route path="/posts/:postId" element={
                        <>
                            <PostView />
                            <MDBRow center className="mx-0 p-4 mt-4">
                                <RecentPosts />
                            </MDBRow>
                        </>
                    }/>                           
                </Routes>
            </Suspense>
        </>
    )    
}

export default Blog;
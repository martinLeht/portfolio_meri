import  { useState, Suspense, lazy, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { Route, Routes, Link } from "react-router-dom";
import { MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { useAuthentication } from './../../hooks/useAuthentication';
import BlogPostCard from './BlogPostCard';
import RecentPosts from "./RecentPosts";
import SearchField from "../../components/general/SearchField";
import HelmetMetaData from '../../components/general/HelmetMetaData';
import Loader from '../../components/general/Loader';
import BlogPostService from '../../services/BlogPostService';
import GuardedRoute from '../../components/routing/GuardedRoute';

const SectionSeparator = lazy(() => import('../../components/general/SectionSeparator'));
const WritePost = lazy(() => import('./WritePost'));
const PostView = lazy(() => import('./PostView'));

const Blog = () => {

    const [postTags, setPostTags] = useState([]);
    const [filteredPostTags, setFilteredPostTags] = useState([]);
    const [latestPostTag, setLatestPostTag] = useState({});
    const [isLoading, setLoading] = useState(false);
    const { t } = useTranslation();
    const { authenticatedUser } = useAuthentication();
    const blogPostService = new BlogPostService();

    useEffect(() => {
        const blogPostService = new BlogPostService();
        setLoading(true);
        blogPostService.getTags().then(postTags => {
            if (!postTags.data) {
                setPostTags([]);
                setFilteredPostTags([]);
                setLatestPostTag([]);
            } else {
                setPostTags(postTags.data);
                setFilteredPostTags(postTags.data);
                setLatestPostTag(postTags.data[0]);
            }
            setLoading(false);
        }).catch(err => {
            console.error(err.message);
            setLoading(false);
        });
    }, [setLoading]);


    const newPostHandler = (postTag) => {
        if (postTags === undefined) {
            setPostTags([postTag]);
            setFilteredPostTags([postTag]);
            setLatestPostTag(postTag);
        } else {
            let tagsCopy = postTags;
            const i = postTags.findIndex(tag => tag.postId === postTag.postId);
            if (i === -1) {
                tagsCopy.unshift(postTag);
                setLatestPostTag(postTag);
            } else if (i === 0) {
                setLatestPostTag(postTag);
            } else {
                tagsCopy[i] = postTag;
            }
            setPostTags(tagsCopy);
            setFilteredPostTags(tagsCopy);
        }
    }

    const deletePostHandler = (postId) => {
        if (postTags === undefined) {
            setPostTags([]);
            setFilteredPostTags([])
            setLoading(false);
        } else {
            setLoading(true);
            blogPostService.deletePostById(postId).then(data => {
                const postTagsCleaned = postTags.filter(tag => tag.postId !== postId);
                setPostTags(postTagsCleaned);
                setFilteredPostTags(postTagsCleaned)
                setLatestPostTag(postTagsCleaned[0]);
                setLoading(false);
            });
        }
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
                            authenticatedUser && (
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
                        authenticatedUser && (
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

    const renderPostFeed = () => {

        let content;
        if (filteredPostTags.length > 0) {
            content = filteredPostTags.map((tag) => {
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
        } else {
            content = (
                <MDBCol className="text-center p-4">
                    <h4>{t('blog.feed.no_posts')}</h4>
                </MDBCol>
            );
        }

        return (
            <MDBRow className="mx-0 p-4 blog-feed" center middle>
                { content }
            </MDBRow>
        );
    }

    const renderLatestPost = () => {
        if (isLoading) {
            return (
                <MDBCol center size="auto">
                    <Loader />
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

    const searchChangeHandler = (event) => {
        const searchTerm = event.target.value;
        if (searchTerm && searchTerm.trim() !== '') {
            const searchTermLower = searchTerm.toLowerCase();
            const filteredPosts = postTags.filter(postTag => {
                const postTitleLower = postTag.postTitle.toLowerCase();
                const postIntroLower = postTag.postIntro.toLowerCase();
                if (postTitleLower.includes(searchTermLower) || postIntroLower.includes(searchTermLower)) {
                    return true;
                }
                return false;
            });
            setFilteredPostTags(filteredPosts);
        } else {
            setFilteredPostTags(postTags);
        }
    }

    return (
        <>
            <Suspense fallback={ <Loader /> }>
                <Routes>
                    <Route path="/" element={
                        <>
                            <HelmetMetaData title={t('blog.title')}/>
                            { renderTopSection() }
                            <SectionSeparator title={t('blog.feed.title')} className="bg-white-shade">
                                <SearchField onChange={ searchChangeHandler } />
                            </SectionSeparator>
                            { 
                                isLoading 
                                ? <Loader className="bg-white-shade"/>
                                : renderPostFeed()
                            }
                            
                        </>
                    }/>
                    <Route path="/posts/new" element={
                        <GuardedRoute path="/posts/new">
                            <>
                                <HelmetMetaData title={t('blog.post.create')}/>
                                <SectionSeparator title={t('blog.post.create')} />
                                <WritePost newPostHandler={ newPostHandler }/>
                            </>
                        </GuardedRoute>
                    }/>
                    <Route path="/posts/:postId/edit" element={
                        <GuardedRoute path="/posts/:postId/edit">
                            <>
                                <HelmetMetaData title={t('blog.post.edit_post')}/>
                                <SectionSeparator title={t('blog.post.edit_post')} />
                                <WritePost newPostHandler={ newPostHandler } />
                            </>
                        </GuardedRoute>
                    }/>
                    <Route path="/posts/:postId" element={
                        <>
                            <PostView deletePostHandler={ deletePostHandler } />
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
import  { useState, Suspense, lazy, useEffect } from 'react';
import { Route, Routes, Link } from "react-router-dom";
import { MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { useAuthentication } from './../../hooks/useAuthentication';
import BlogPostCard from './BlogPostCard';
import SearchField from "../../components/general/SearchField";
import LoadingSpinner from '../../components/general/LoadingSpinner';
import BlogPostService from '../../services/BlogPostService';
import GuardedRoute from '../../components/general/GuardedRoute';



const BlogPostFeed = lazy(() => import('./BlogPostFeed'));
const SectionSeparator = lazy(() => import('../../components/general/SectionSeparator'));
const WritePost = lazy(() => import('./WritePost'));
const PostView = lazy(() => import('./PostView'));

const Blog = () => {

    const [postTags, setPostTags] = useState([]);
    const [filteredPostTags, setFilteredPostTags] = useState([]);
    const [latestPostTag, setLatestPostTag] = useState({});
    const [isLoading, setLoading] = useState(true);
    const { authenticatedUser } = useAuthentication();

    const blogPostService = new BlogPostService();

    useEffect(() => {
        const blogPostService = new BlogPostService();
        setLoading(true);
        blogPostService.getTags().then(postTags => {
            setPostTags(postTags);
            setFilteredPostTags(postTags);
            setLatestPostTag(postTags[0]);
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
            const i = postTags.findIndex(tag => tag.id === postTag.id);
            if (i === -1) {
                postTags.unshift(postTag);
                setLatestPostTag(postTag);
            } else if (i === 0) {
                setLatestPostTag(postTag);
            } else {
                postTags[i] = postTag;
            }
            setPostTags(postTags);
            setFilteredPostTags(postTags);
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
                const postTagsCleaned = postTags.filter(tag => tag.id !== postId);
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
                <MDBRow className="p-3" center middle>
                    <MDBCol className="m-4" size="10" md="3" lg="4">
                        <MDBRow center middle>
                            <MDBCol>
                                <h1>
                                    <b>Tervetuloa!</b>
                                    <br/>
                                    <b>Welcome!</b>
                                </h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor </p>
                            </MDBCol>
                        </MDBRow>
                        {
                            authenticatedUser && (
                                <MDBRow center middle>
                                    <MDBCol className="p-3 blog-post-add-link dashed-border-5">
                                        <Link to="/blog/write" className="text-dark">
                                            <h3 className="d-flex justify-content-center align-items-center flex-column">
                                                <b>Lisää Julkaisu</b>
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
                <MDBRow className="p-3" center middle>
                    <MDBCol className="m-4" size="10" md="3" lg="4">
                        <h1>
                            <b>Tervetuloa!</b>
                            <br/>
                            <b>Welcome!</b>
                        </h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor </p>
                    </MDBCol>
                    {
                        authenticatedUser && (
                            <MDBCol size="8" md="3" middle className="p-3 blog-post-add-link dashed-border-5">
                                <Link to="/blog/write" className="text-dark">
                                    <h3 className="d-flex justify-content-center align-items-center flex-column">
                                        <b>Lisää Julkaisu</b>
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
        if (isLoading) {
            return <LoadingSpinner />;
        } else if (latestPostTag !== undefined) {
            return (
                <MDBCol className="d-flex justify-content-center p-0 blog-latest" size="12" md="6" lg="7">
                    <BlogPostCard img={ latestPostTag.thumbnail }
                            title={ latestPostTag.postTitle }
                            postIntro={ latestPostTag.postIntro } 
                            createdAt={ latestPostTag.createdAt } 
                            id={ latestPostTag.id } />
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
        <div className="blog-container p-4">
                <Suspense fallback={ <LoadingSpinner /> }>
                    <Routes>
                        <Route exact path="/blog" element={
                            <>
                                { renderTopSection() }
                                <SectionSeparator title="Kaikki julkaisut">
                                    <SearchField onChange={ searchChangeHandler } />
                                </SectionSeparator>
                                <BlogPostFeed isLoading={ isLoading } postTags={ filteredPostTags } />
                            </>
                        }/>
                        <Route exact path="/blog/write" element={
                            <>
                                <SectionSeparator title="Kirjoita Julkaisu" />
                                <WritePost newPostHandler={ newPostHandler }/>
                            </>
                        }/>
                        <GuardedRoute exact path="/blog/write/:postId" element={
                            <>
                                <SectionSeparator title="Muokkaa Julkaisua" />
                                <WritePost newPostHandler={ newPostHandler } />
                            </>
                        }/>
                        <Route exact path="/blog/:postId" element={ <PostView deletePostHandler={ deletePostHandler } />}/>                           
                    </Routes>
                </Suspense>
        </div>
    )    
}

export default Blog;
import React, { useState, Suspense, lazy, useEffect } from 'react';
import { Route, Switch } from "react-router-dom";
import BlogTopSection from './BlogTopSection';
import LoadingSpinner from '../../components/general/LoadingSpinner';
import BlogPostService from '../../services/BlogPostService';
import { PostsProvider } from './context/PostsContext';


const BlogFeed = lazy(() => import('./BlogFeed'));
const SectionSeparator = lazy(() => import('../../components/general/SectionSeparator'));
const WriteBlogPost = lazy(() => import('./WriteBlogPost'));
const BlogPost = lazy(() => import('./BlogPost'));

const Blog = () => {

    const [postTags, setPostTags] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const blogPostService = new BlogPostService();

    useEffect(() => {
        setLoading(true);
        blogPostService.getTags().then(postTags => {
            setPostTags(postTags);
            setLoading(false);
        }).catch(e => {
            console.error(e.message);
            setLoading(false);
        });
    }, []);


    const newPostHandler = (postTag) => {
        if (postTags === undefined) {
            setPostTags([]);
        }
        postTags.push(postTag);
        setPostTags(postTags);
    }

    const deletePostHandler = (postId) => {
        if (postTags === undefined) {
            setPostTags([]);
            setLoading(false);
        } else {
            setLoading(true);

            blogPostService.deletePostById(postId).then(data => {
                console.log(data);
                console.log("Post delete handler");
                console.log(postId);
                const postTagsCleaned = this.state.postTags.filter(tag => tag.id !== postId);
                console.log(postTagsCleaned);
                setPostTags(postTagsCleaned);
                setLoading(false);
            });
        }
    }

    const renderTopSection = () => {
        if (postTags !== undefined && postTags.length > 0) {
            return (
                <BlogTopSection isLoading={ isLoading } latestPostTag={ postTags[0] } />
            );
        } else {
            return (
                <BlogTopSection />
            ); 
        }
    }

 /*
    constructor() {
        super();
        this.blogPostService = new BlogPostService();
        this.state = {
            postTags: [],
            isLoading: true
        }; 
    }
    

    async componentDidMount() {
        this.setState({
            isLoading: true
        });
        this.blogPostService.getTags().then(tags => {
            this.setState({
                postTags: tags,
                isLoading: false
            })
        }).catch(e => {
            this.setState({
                isLoading: false
            });
            console.error(e.message);
        });
    }

    newPostHandler = (postTag) => {
        if (this.state.postTags === undefined) {
            this.setState({
                postTags: []
            });
        }
        this.state.postTags.push(postTag);
        this.setState({
            postTags: this.state.postTags
        });
        

    }

    deletePostHandler = (postId) => {
        if (this.state.postTags === undefined) {
            this.setState({
                postTags: [],
                isLoading: false
            });
        } else {
            this.setState({
                isLoading: true
            });
            this.blogPostService.deletePostById(postId).then(data => {
                console.log(data);
                console.log("Post delete handler");
                console.log(postId);
                const postTagsCleaned = this.state.postTags.filter(tag => tag.id !== postId);
                console.log(postTagsCleaned);
                this.setState({
                    postTags: postTagsCleaned,
                    isLoading: false
                });
            });
        }
        
        
        

    }

    renderTopSection = () => {
        const { isLoading, postTags } = this.state;

        if (postTags !== undefined && postTags.length > 0) {
            return (
                <BlogTopSection isLoading={ isLoading } latestPostTag={ postTags[0] } />
            );
        } else {
            return (
                <BlogTopSection />
            ); 
        }
    }
    */

    return (
        <div className="blog-container p-4">

            <Route exact path={["/blog", "/blog/write"]}>
                { renderTopSection() }
            </Route>
            <Suspense fallback={ <LoadingSpinner /> }>
                <Switch>
                    <Route exact path="/blog" >
                        <SectionSeparator title="Kaikki julkaisut" />
                        <BlogFeed isLoading={ isLoading } postTags={ postTags } />
                    </Route>
                    <Route exact path="/blog/write">
                        <SectionSeparator title="Kirjoita Julkaisu" />
                        <WriteBlogPost newPostHandler={ newPostHandler }/>
                    </Route>
                    <Route exact path="/blog/write/:postId">
                        <SectionSeparator title="Muokkaa Julkaisua" />
                        <WriteBlogPost />
                    </Route>
                    <Route exact path="/blog/post/:postId">
                        <PostsProvider value={ postTags }>
                            <BlogPost deletePostHandler={ deletePostHandler } />
                        </PostsProvider>
                    </Route>                             
                </Switch>
            </Suspense>
            
        </div>
    )    
}

export default Blog;
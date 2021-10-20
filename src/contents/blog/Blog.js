import React, { Component, Suspense, lazy } from 'react';
import { Route, Switch } from "react-router-dom";
import BlogTopSection from './BlogTopSection';
import LoadingSpinner from '../../components/general/LoadingSpinner';
import BlogPostService from '../../services/BlogPostService';
import { PostsProvider } from './context/PostsContext';


const BlogFeed = lazy(() => import('./BlogFeed'));
const SectionSeparator = lazy(() => import('../../components/general/SectionSeparator'));
const WriteBlogPost = lazy(() => import('./WriteBlogPost'));
const BlogPost = lazy(() => import('./BlogPost'));

class Blog extends Component {

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
            console.error(e.message)
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


    render() {
        const { isLoading, postTags } = this.state;
        return (
            <div className="blog-container p-4">

                <Route exact path={["/blog", "/blog/write"]}>
                    { this.renderTopSection() }
                </Route>
                <Suspense fallback={ <LoadingSpinner /> }>
                    <Switch>
                        <Route exact path="/blog" >
                            <SectionSeparator title="Kaikki julkaisut" />
                            <BlogFeed isLoading={ isLoading } postTags={ postTags } />
                        </Route>
                        <Route exact path="/blog/write">
                            <SectionSeparator title="Kirjoita Julkaisu" />
                            <WriteBlogPost newPostHandler={ this.newPostHandler }/>
                        </Route>
                        <Route exact path="/blog/write/:postId">
                            <SectionSeparator title="Muokkaa Julkaisua" />
                            <WriteBlogPost />
                        </Route>
                        <Route exact path="/blog/post/:postId">
                            <PostsProvider value={ postTags }>
                                <BlogPost deletePostHandler={ this.deletePostHandler } />
                            </PostsProvider>
                        </Route>                             
                    </Switch>
                </Suspense>
                
            </div>
        )
    }
    
}

export default Blog;
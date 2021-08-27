import React, { Component, Suspense, lazy } from 'react';
import { Route, Switch } from "react-router-dom";
import BlogTopSection from './BlogTopSection';
import LoadingSpinner from '../../components/general/LoadingSpinner';
import BlogPostService from '../../services/BlogPostService';


const BlogFeed = lazy(() => import('./BlogFeed'));
const SectionSeparator = lazy(() => import('./SectionSeparator'));
const WriteBlogPost = lazy(() => import('./WriteBlogPost'));
const BlogPost = lazy(() => import('./BlogPost'));

class Blog extends Component {

    constructor() {
        super();
        this.blogPostService = new BlogPostService();
        this.state = {
            postTags: []
        }; 
    }
    

    async componentDidMount() {
        this.blogPostService.getTags().then(tags => {
            this.setState({
                postTags: tags
            })
        }).catch(e => console.error(e.message));
    }

    sortPostsByCreationTime = () => {

    }

    renderTopSection = () => {
        const { postTags } = this.state;

        if (postTags !== undefined && postTags.length > 0) {
            return (
                <BlogTopSection latestPostTag={ postTags[0] } />
            );
        } else {
            return (
                <BlogTopSection />
            ); 
        }
    }


    render() {
        const { postTags } = this.state;
        return (
            <div className="blog-container p-4">

                <Route exact path={["/blog", "/blog/add"]}>
                    { this.renderTopSection() }
                </Route>
                <Suspense fallback={ <LoadingSpinner /> }>
                    <Switch>
                        <Route exact path="/blog" >
                            <SectionSeparator title="Kaikki julkaisut" />
                            <BlogFeed postTags={ postTags } />
                        </Route>
                        <Route exact path="/blog/add">
                            <SectionSeparator title="Lisää Julkaisu" />
                            <WriteBlogPost />
                        </Route>
                        <Route exact path="/blog/post/:postId">
                            <BlogPost />
                        </Route>                             
                    </Switch>
                </Suspense>
                
            </div>
        )
    }
    
}

export default Blog;
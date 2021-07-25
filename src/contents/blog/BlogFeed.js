import React, { Component } from 'react';
import BlogToolBar from './BlogToolBar';
import BlogPostsView from './BlogPostsView';
import BlogIntro from './BlogIntro';

class BlogFeed extends Component {

    render() {

        return (
            <div className="blog-container">
                <div className="p-4">
                    <BlogIntro />

                    <BlogToolBar />

                    <BlogPostsView />
                    
                </div>
            </div>
        )
    }
}

export default BlogFeed;
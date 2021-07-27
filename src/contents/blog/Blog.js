import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import BlogSearchBar from './BlogSearchBar';
import BlogFeed from './BlogFeed';
import useWindowDimensions from '../../hooks/window-dimensions';
import BlogTopSection from './BlogTopSection';
import BlogAddPost from './BlogAddPost';
import SectionSeparator from './SectionSeparator';

const Blog = () => {

    return (
        <div className="blog-container">
            <div className="p-4">

                <BlogTopSection />

                <Switch>
                    <Route exact path="/blog">
                        <BlogSearchBar title="Kaikki Julkaisut" />
                        <BlogFeed />
                    </Route>
                    <Route exact path="/blog/add">
                        <SectionSeparator title="Lisää Julkaisu" />
                        <BlogAddPost />
                    </Route>                    
                </Switch>
                
            </div>
        </div>
    )
}

export default Blog;
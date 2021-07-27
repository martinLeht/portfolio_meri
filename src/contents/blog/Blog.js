import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import BlogBar from './BlogBar';
import BlogFeed from './BlogFeed';
import useWindowDimensions from '../../hooks/window-dimensions';
import BlogTopSection from './BlogTopSection';
import BlogAddPost from './BlogAddPost';

const Blog = () => {

    const { height, width } = useWindowDimensions();

    const sideBarMode = width < 785;

    return (
        <div className="blog-container">
            <div className="p-4">
                <BlogTopSection />

                <Switch>
                    <Route exact path="/blog/feed">
                        <BlogBar title="Kaikki Julkaisut" searchBar={ true } />
                        <BlogFeed />
                    </Route>
                    <Route exact path="/blog/add">
                        <BlogBar title="Lisää Julkaisu" searchBar={ false }/>
                        <BlogAddPost />
                    </Route>                    
                </Switch>
                
            </div>
        </div>
    )
}

export default Blog;
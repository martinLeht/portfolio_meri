import React from 'react';
import { Route, Switch } from "react-router-dom";
import FrontPage from '../contents/front-page/FrontPage';
import Blog from '../contents/blog/Blog';
import InstaFeed from '../contents/insta/InstaFeed';
import { MDBContainer } from 'mdbreact';

const MainContent = () => {
    
    require('dotenv').config();

    return (
        <MDBContainer fluid className="main-content">
            <Switch>
                <Route exact path="/">
                    <FrontPage />
                </Route>
                <Route path="/blog">
                    <Blog />
                </Route>
                <Route exact path="/insta">
                    <InstaFeed />
                </Route>
            </Switch>
        </MDBContainer>
    )
    
}

export default MainContent;
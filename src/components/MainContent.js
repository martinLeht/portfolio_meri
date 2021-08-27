import React, { lazy, Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import { MDBContainer } from 'mdbreact';
import LoadingSpinner from './general/LoadingSpinner';

/* Lazy loaded components */
const FrontPage = lazy(() => import('../contents/front-page/FrontPage'));
const Blog = lazy(() => import('../contents/blog/Blog'));
const InstaFeed = lazy(() => import('../contents/insta/InstaFeed'));

const MainContent = () => {
    
    require('dotenv').config();

    return (
        <MDBContainer fluid className="main-content">
            <Suspense fallback={ <LoadingSpinner /> }>
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
            </Suspense>
        </MDBContainer>
    )
    
}

export default MainContent;
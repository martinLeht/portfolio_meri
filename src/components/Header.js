import { MDBIcon } from 'mdbreact';
import React from 'react';
import { Route } from "react-router-dom";
import ImageCarouselHeader from '../contents/front-page/ImageCarouselHeader';
import HeaderMedium from './HeaderMedium';

const Header = () => {

    return (
        <header>
            <Route exact path="/">
                <ImageCarouselHeader />
            </Route>
            <Route exact path="/insta">
                <HeaderMedium heading="Instagram Feed" img={ process.env.PUBLIC_URL + "/images/mertsa_ig_header.jpg" }/>
            </Route>
            <Route exact path="/blog">
                <HeaderMedium heading="Blog" img={ process.env.PUBLIC_URL + "/images/mertsa_ig_header.jpg" } />
            </Route>
        </header>
    )
}

export default Header;
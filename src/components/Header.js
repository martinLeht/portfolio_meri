import React from 'react';
import { Route } from "react-router-dom";
import ImageCarouselHeader from '../contents/header/ImageCarouselHeader';
import HeaderPanel from '../contents/header/HeaderPanel';

const Header = () => {

    return (
        <header>
            <Route exact path="/">
                <ImageCarouselHeader />
            </Route>
            <Route exact path="/insta">
                <HeaderPanel heading="Instagram Feed" img="../images/mertsa_ig_header.jpg" icon="fab fa-instagram"/>
            </Route>
            <Route path="/blog">
                <HeaderPanel heading="Blog" img="../images/mertsa_ig_header.jpg" />
            </Route>
        </header>
    )
}

export default Header;
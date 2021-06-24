import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import SectionBgColors from '../resources/SectionBgColors';
import Experience from '../contents/Experience';
import About from '../contents/About';
import Blog from '../contents/Blog';
import InstaFeed from '../contents/InstaFeed';
import ImageGallery from '../contents/ImageGallery';
import Contact from '../contents/Contact';
import { MDBContainer } from 'mdbreact';

class MainContent extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.addEventListener("scroll", this.onScrollBackgroundColorHandler);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScrollBackgroundColorHandler);
    }

    onScrollBackgroundColorHandler () {
        let mainContent = document.getElementsByClassName('main-content')[0];
        if(window.location.pathname === '/') {
            const aboutSection = document.getElementById("section-about");
            const gallerySection = document.getElementById("section-gallery");
            const experienceSection = document.getElementById("section-experience");
            const contactSection = document.getElementById("section-contact");
            const navHeight = document.getElementsByTagName("nav")[0].offsetHeight + 200;
            const clientOffsetTop = window.pageYOffset + navHeight;
            let bgColor = SectionBgColors.DEFAULT_BG;
            if (clientOffsetTop >= aboutSection.offsetTop) {
                bgColor = SectionBgColors.ABOUT_BG;
            }
            if (clientOffsetTop >= experienceSection.offsetTop) {
                bgColor = SectionBgColors.CAREER_BG;
            }
            if (clientOffsetTop >= gallerySection.offsetTop) {
                bgColor = SectionBgColors.GALLERY_BG;
            }
            if (clientOffsetTop >= contactSection.offsetTop) {
                bgColor = SectionBgColors.CONTACT_BG;
            }
            mainContent.style.background = bgColor;
        } else {
            mainContent.style.background = SectionBgColors.DEFAULT_BG;
        }
        
    }

    render() {
        return (
            <MDBContainer fluid className="main-content">
                <Switch>
                    <Route exact path="/">
                        <About navId="section-about" />
                        <Experience navId="section-experience" />
                        <ImageGallery navId="section-gallery" />
                        <Contact navId="section-contact" email="joku.sposti@gmail.com" />
                    </Route>
                    <Route exact path="/blog">
                        <Blog />
                    </Route>
                    <Route exact path="/insta">
                        <InstaFeed />
                    </Route>
                </Switch>
            </MDBContainer>
        )
    }
    
}

export default MainContent;
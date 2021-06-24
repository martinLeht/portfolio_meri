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

        this.sectionBackgroundsMap = new Map([
            ['section-about', SectionBgColors.ABOUT_BG],
            ['section-experience', SectionBgColors.CAREER_BG],
            ['section-gallery', SectionBgColors.GALLERY_BG],
            ['section-contact', SectionBgColors.CONTACT_BG]
        ]);
    }

    componentDidMount() {
        window.addEventListener("scroll", () => this.onScrollBackgroundColorHandler(this.sectionBackgroundsMap, this.sectionBreakCheckCallback));
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", () => this.onScrollBackgroundColorHandler(this.sectionBackgroundsMap, this.sectionBreakCheckCallback));
    }

    /* Scroll handler to change backround color for sections */
    onScrollBackgroundColorHandler (sectionBackgroundsMap, sectionBreakCheckCallback) {
        let mainContent = document.getElementsByClassName('main-content')[0];
        if(window.location.pathname === '/') {
            let color = SectionBgColors.DEFAULT_BG;
            sectionBackgroundsMap.forEach((bgColor, sectionId) => {
                if (sectionBreakCheckCallback(sectionId)) {
                    color = bgColor;
                }
            });
            /* If page is scrolled to bottom, use white background */
            if (window.innerHeight + window.pageYOffset >= document.body.clientHeight) {
                color = SectionBgColors.DEFAULT_BG;
            }
            mainContent.style.background = color;
        } else {
            mainContent.style.background = SectionBgColors.DEFAULT_BG;
        }

        
    }

    /* Section break check (relative to navbar height + extra 180 pixels) */
    sectionBreakCheckCallback = (sectionId) => {
        const section = document.getElementById(sectionId)
        const navHeight = document.getElementsByTagName("nav")[0].offsetHeight + 180;
        const clientOffsetTop = window.pageYOffset + navHeight;
        if (clientOffsetTop >= section.offsetTop) {
            return true;
        }
        return false;
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
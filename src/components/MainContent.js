import React, { Component } from 'react';
import Themes from '../contents/Themes';
import About from '../contents/About';
import ImageGallery from '../contents/ImageGallery';
import Contact from '../contents/Contact';
import { MDBContainer } from 'mdbreact';

class MainContent extends Component {


    render() {
        return (
            <MDBContainer fluid className="main-content">
                <Themes id="section-themes" />
                <ImageGallery />
                <About id="section-about" />
                <Contact id="section-contact" />
            </MDBContainer>
        )
    }

}

export default MainContent;
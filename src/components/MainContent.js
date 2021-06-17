import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Themes from '../contents/Themes';
import About from '../contents/About';
import ImageGallery from '../contents/ImageGallery';
import Contact from '../contents/Contact';
import { MDBContainer } from 'mdbreact';

class MainContent extends Component {


    render() {
        return (
            <Router>
                <MDBContainer fluid className="main-content">
                    <Route exact path="/">
                        <div>
                            <h1>Main Page here.</h1>
                        </div>
                    </Route>
                    <Route exact path="/kuntavaalit">
                        <Themes id="section-themes" />
                        <ImageGallery />
                        <About id="section-about" />
                        <Contact id="section-contact" />
                    </Route>
                    
                </MDBContainer>
            </Router>
        )
    }

}

export default MainContent;
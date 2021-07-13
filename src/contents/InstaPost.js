import React, { Component } from 'react';
import { MDBView, MDBMask } from 'mdbreact';
  

class InstaPost extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { id, imgSrc, instaLink, caption, openAction } = this.props;
        return (
                <MDBView hover className="m-1 ig-post">
                    <img
                        src={ imgSrc }
                        className="img-fluid"
                        alt=""
                    />
                    <MDBMask 
                        className="flex-center p-2" 
                        overlay="red-light" 
                        onClick={ openAction }>
                        <a className="white-text" href={ instaLink } key={id}>{caption}</a>
                    </MDBMask>
                </MDBView>
        )
    }
}

export default InstaPost;
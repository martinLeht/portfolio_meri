import React, { Component } from 'react';
import { MDBView, MDBMask } from 'mdbreact';
  

class InstaPost extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { id, imgSrc, instaLink, caption, likes, openAction } = this.props;
        return (
            <div>
                <MDBView hover>
                    <img
                        src={ imgSrc }
                        className="img-fluid"
                        alt=""
                    />
                    <MDBMask 
                        className="flex-center" 
                        overlay="red-light" 
                        onClick={ openAction }>
                        <a className="white-text" href={ instaLink } key={id}>Meri linkki ig</a>
                        <p className="white-text">({likes} likes) { caption }</p>
                    </MDBMask>
                </MDBView>
            </div>
        )
    }
}

export default InstaPost;
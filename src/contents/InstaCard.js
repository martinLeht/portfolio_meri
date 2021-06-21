import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBView, MDBMask } from 'mdbreact';
import Lightbox from "react-image-lightbox";

const images = [
    "https://mdbootstrap.com/img/Others/documentation/img%20(145)-mini.jpg",
    "https://mdbootstrap.com/img/Others/documentation/img%20(150)-mini.jpg",
    "https://mdbootstrap.com/img/Others/documentation/img%20(152)-mini.jpg",
    "https://mdbootstrap.com/img/Others/documentation/img%20(42)-mini.jpg",
    "https://mdbootstrap.com/img/Others/documentation/img%20(151)-mini.jpg",
    "https://mdbootstrap.com/img/Others/documentation/img%20(40)-mini.jpg",
    "https://mdbootstrap.com/img/Others/documentation/img%20(148)-mini.jpg",
    "https://mdbootstrap.com/img/Others/documentation/img%20(147)-mini.jpg",
    "https://mdbootstrap.com/img/Others/documentation/img%20(149)-mini.jpg"
  ];
  
  const smallImages = [
    "https://mdbootstrap.com/img/Others/documentation/img%20(145)-mini.jpg",
    "https://mdbootstrap.com/img/Others/documentation/img%20(150)-mini.jpg",
    "https://mdbootstrap.com/img/Others/documentation/img%20(152)-mini.jpg",
    "https://mdbootstrap.com/img/Others/documentation/img%20(42)-mini.jpg",
    "https://mdbootstrap.com/img/Others/documentation/img%20(151)-mini.jpg",
    "https://mdbootstrap.com/img/Others/documentation/img%20(40)-mini.jpg",
    "https://mdbootstrap.com/img/Others/documentation/img%20(148)-mini.jpg",
    "https://mdbootstrap.com/img/Others/documentation/img%20(147)-mini.jpg",
    "https://mdbootstrap.com/img/Others/documentation/img%20(149)-mini.jpg"
  ];
  

class InstaCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { imgSrc, instaLink, openAction } = this.props;
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
                        <a href={ instaLink } className="white-text">Meri linkki ig</a>
                    </MDBMask>
                </MDBView>
            </div>
        )
    }
}

export default InstaCard;
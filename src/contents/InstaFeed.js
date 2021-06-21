import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBView, MDBMask } from 'mdbreact';
import Lightbox from "react-image-lightbox";
import InstaCard from './InstaCard';

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
  

class InstaFeed extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            photoIndex: 0,
            isOpen: false
        };
    }

    openAction = (i) => {
        this.setState({ photoIndex: i, isOpen: true })
    }

    closeAction = () => {
        this.setState({ isOpen: false })
    }

    movePrevAction = (i) => {
        this.setState({
            photoIndex: (i + images.length - 1) % images.length
        })
    }

    moveNextAction = (i) => {
        this.setState({
            photoIndex: (i + 1) % images.length
        })
    }

    render() {
        const { photoIndex, isOpen } = this.state;
        return (
            <div className="mt-5">
                <MDBContainer>
                    <div className="mdb-lightbox no-margin">
                        <MDBRow>
                            {
                                smallImages.map((imgSrc, i) => {
                                    return (
                                        <MDBCol md="4">
                                            <InstaCard 
                                                imgSrc={ imgSrc } 
                                                instaLink={ "https://www.instagram.com/meriniemi_/?hl=fi" }
                                                openAction={ () => this.openAction(i) }
                                            />
                                        </MDBCol>
                                    );
                                })
                            }
                        </MDBRow>
                    </div>
                    { isOpen && (
                        <Lightbox
                            mainSrc={images[photoIndex]}
                            nextSrc={images[(photoIndex + 1) % images.length]}
                            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                            imageTitle={photoIndex + 1 + "/" + images.length}
                            onCloseRequest={ this.closeAction }
                            onMovePrevRequest={ () => this.movePrevAction(photoIndex) }
                            onMoveNextRequest={ () => this.moveNextAction(photoIndex) }
                        />
                    )}
                </MDBContainer>
            </div>
        )
    }
}

export default InstaFeed;
import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBView, MDBMask } from 'mdbreact';
import Lightbox from "react-image-lightbox";
import InstaCard from './InstaPost';
import InstagramService from '../services/InstagramService';

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
        this.instagramService = new InstagramService();
        this.state = {
            posts: [],
            isLoading: false, 
            photoIndex: 0,
            isOpen: false
        }; 
    }

    /*
    async componentDidMount() {
        this.setState({ isLoading: true });
        this.instagramService.getInstaPosts(21).then(posts => {
            console.log(posts);
            this.setState({
                posts: posts,
                isLoading: false
            });
        });
        
    }
    */

    openAction = (i) => {
        this.setState({ photoIndex: i, isOpen: true });
    }

    closeAction = () => {
        this.setState({ isOpen: false });
    }

    movePrevAction = (i) => {
        this.setState({
            photoIndex: (i + images.length - 1) % images.length
        });
    }

    moveNextAction = (i) => {
        this.setState({
            photoIndex: (i + 1) % images.length
        });
    }

    render() {
        const { photoIndex, isLoading, posts, isOpen, } = this.state;
        return (
            <div className="mt-5">
                <MDBContainer>
                    <div className="mdb-lightbox no-margin">
                        <MDBRow>
                            {
                                /*
                                posts != undefined && posts.length > 0 
                                && (
                                    posts.map(({
                                        id,
                                        caption,
                                        src,
                                        width,
                                        height,
                                        url,
                                        likes}, i) => {
                                        return (
                                            <MDBCol md="4">
                                                <InstaPost
                                                    id={ id } 
                                                    imgSrc={ src } 
                                                    instaLink={ url }
                                                    caption={ caption }
                                                    likes={ likes }
                                                    openAction={ () => this.openAction(i) }
                                                />
                                            </MDBCol>
                                        );
                                    })
                                    */
                                smallImages.map((src, i) => {
                                    return (
                                        <MDBCol md="4">
                                            <div>
                                                <MDBView hover>
                                                    <img
                                                        src={ src }
                                                        className="img-fluid"
                                                        alt=""
                                                    />
                                                    <MDBMask 
                                                        className="flex-center" 
                                                        overlay="red-light" 
                                                        onClick={ () =>  this.openAction(i) }>
                                                        <a className="white-text" href="https://www.instagram.com/meriniemi_/?hl=fi" >Meri linkki ig</a>
                                                    </MDBMask>
                                                </MDBView>
                                                </div>
                                        </MDBCol>
                                    );
                                })
                            }
                        </MDBRow>
                    </div>
                    { !isLoading && isOpen && (
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
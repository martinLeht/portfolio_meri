import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBView, MDBMask } from 'mdbreact';
import Lightbox from "react-image-lightbox";
import InstaPost from './InstaPost';
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

    async componentDidMount() {
        this.setState({ isLoading: true });
        this.instagramService.fetchInstaPosts(21).then(posts => {
            console.log(posts);
            this.setState({
                posts: posts,
                isLoading: false
            });
        });
        
    }

    openAction = (i) => {
        this.setState({ photoIndex: i, isOpen: true });
    }

    closeAction = () => {
        this.setState({ isOpen: false });
    }

    movePrevAction = (i) => {
        this.setState({
            photoIndex: (i + this.state.posts.length - 1) % this.state.posts.length
        });
    }

    moveNextAction = (i) => {
        this.setState({
            photoIndex: (i + 1) % this.state.posts.length
        });
    }

    render() {
        const { photoIndex, isLoading, posts, isOpen, } = this.state;
        return (
            <div className="mt-5">
                <MDBContainer>
                    <div className="mdb-lightbox no-margin posts">
                        <MDBRow>
                            {
                                posts != undefined && posts.length > 0 
                                && (
                                    posts.map(({
                                        id,
                                        caption,
                                        media_url,
                                        permalink}, i) => {
                                        return (
                                            <MDBCol md="4">
                                                <InstaPost
                                                    id={ id } 
                                                    imgSrc={ media_url } 
                                                    instaLink={ permalink }
                                                    caption={ caption }
                                                    openAction={ () => this.openAction(i) }
                                                />
                                            </MDBCol>
                                        );
                                    }))
                                /*
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
                                */
                            }
                        </MDBRow>
          <MDBRow>
            <MDBCol md="4">
              <figure>
                <img
                  src={smallImages[0]}
                  alt="Gallery"
                  className="img-fluid"
                  onClick={() =>
                    this.setState({ photoIndex: 0, isOpen: true })
                  }
                />
              </figure>
            </MDBCol>
            <MDBCol md="4">
              <figure>
                <img
                  src={smallImages[1]}
                  alt="Gallery"
                  className="img-fluid"
                  onClick={() =>
                    this.setState({ photoIndex: 1, isOpen: true })
                  }
                />
              </figure>
            </MDBCol>
            <MDBCol md="4">
              <figure>
                <img
                  src={smallImages[2]}
                  alt="Gallery"
                  className="img-fluid"
                  onClick={() =>
                    this.setState({ photoIndex: 2, isOpen: true })
                  }
                />
              </figure>
            </MDBCol>
            <MDBCol md="4">
              <figure>
                <img
                  src={smallImages[3]}
                  alt="Gallery"
                  className="img-fluid"
                  onClick={() =>
                    this.setState({ photoIndex: 3, isOpen: true })
                  }
                />
              </figure>
            </MDBCol>
            <MDBCol md="4">
              <figure>
                <img
                  src={smallImages[4]}
                  alt="Gallery"
                  className="img-fluid"
                  onClick={() =>
                    this.setState({ photoIndex: 4, isOpen: true })
                  }
                />
              </figure>
            </MDBCol>
            <MDBCol md="4">
              <figure>
                <img
                  src={smallImages[5]}
                  alt="Gallery"
                  className="img-fluid"
                  onClick={() =>
                    this.setState({ photoIndex: 5, isOpen: true })
                  }
                />
              </figure>
            </MDBCol>
            <MDBCol md="4">
              <figure>
                <img
                  src={smallImages[6]}
                  alt="Gallery"
                  className="img-fluid"
                  onClick={() =>
                    this.setState({ photoIndex: 6, isOpen: true })
                  }
                />
              </figure>
            </MDBCol>
            <MDBCol md="4">
              <figure>
                <img
                  src={smallImages[7]}
                  alt="Gallery"
                  className="img-fluid"
                  onClick={() =>
                    this.setState({ photoIndex: 7, isOpen: true })
                  }
                />
              </figure>
            </MDBCol>
            <MDBCol md="4">
              <figure>
                <img
                  src={smallImages[8]}
                  alt="Gallery"
                  className="img-fluid"
                  onClick={() =>
                    this.setState({ photoIndex: 8, isOpen: true })
                  }
                />
              </figure>
            </MDBCol>
          </MDBRow>
                    </div>
                    { !isLoading && isOpen && (
                        <Lightbox
                            mainSrc={posts[photoIndex].media_url}
                            nextSrc={posts[(photoIndex + 1) % posts.length].media_url}
                            prevSrc={posts[(photoIndex + posts.length - 1) % posts.length].media_url}
                            imageTitle={photoIndex + 1 + "/" + posts.length}
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
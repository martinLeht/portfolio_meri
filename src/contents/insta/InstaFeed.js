import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Lightbox from "react-image-lightbox";
import InstaPost from './InstaPost';
import InstagramService from '../../services/InstagramService';
import LoadingSpinner from '../../components/general/LoadingSpinner';

class InstaFeed extends Component {

    constructor(props) {
        super(props);
        this.instagramService = new InstagramService();
        this.loader = React.createRef();
        this.state = {
            posts: [],
            isLoading: false, 
            page: 1,
            photoIndex: 0,
            isOpen: false,
            pageOffsetY: 0
        }; 
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        this.instagramService.fetchInstaPosts().then(posts => {
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
        const { photoIndex, isLoading, posts, isOpen } = this.state;

        return (
            <div className="d-flex align-items-center justify-content-center ig-container">
                <div className="mdb-lightbox no-margin p-1 ig-posts">
                    <MDBRow center>
                        { isLoading && <LoadingSpinner/> }
                        {
                            posts != undefined && posts.length > 0 
                            && (
                                posts.map(({
                                    id,
                                    media_type,
                                    caption,
                                    media_url,
                                    permalink}, i) => {
                                    return (
                                        <MDBCol md="4">
                                            <InstaPost
                                                id={ id } 
                                                src={ media_url } 
                                                instaLink={ permalink }
                                                caption={ caption }
                                                mediaType={ media_type }
                                                openAction={ () => this.openAction(i) }
                                            />
                                        </MDBCol>
                                    );
                                }))
                        }
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
            </div>
        )
    }
}

export default InstaFeed;
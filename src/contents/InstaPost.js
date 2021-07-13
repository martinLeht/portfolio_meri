import React, { Component } from 'react';
import { MDBCard, MDBView, MDBMask, MDBCardBody, MDBCardText, MDBIcon } from 'mdbreact';
  

class InstaPost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isCaptionHidden: true
        }
    }


    isCaptionTooLong = (caption) => {
        return caption.length > 80;
    }

    toggleOpenCaption = () => {
        this.setState({
            isCaptionHidden: !this.state.isCaptionHidden
        });
    }

    render() {
        const { id, imgSrc, instaLink, caption, openAction } = this.props;
        const { isCaptionHidden } = this.state;
        return (
            <MDBCard>
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
                        <a className="white-text" href={ instaLink } key={id}>{ (this.isCaptionTooLong(caption) ? caption.slice(0, 80) + ' ...' : caption) }</a>
                        {
                            this.isCaptionTooLong(caption) &&
                            <h4 className='white-text'>
                                <MDBIcon icon='angle-double-down' className='ml-2' onClick={ () => this.toggleOpenCaption() } />
                            </h4>
                        }
                    </MDBMask>
                </MDBView>
                {
                    !isCaptionHidden &&
                    <MDBCardBody>
                        <MDBCardText>
                            {caption}
                        </MDBCardText>
                        <a href='#!' className='black-text d-flex justify-content-end'>
                            <h5 className='black-text'>
                                <MDBIcon icon='angle-double-up' className='ml-2' onClick={ () => this.toggleOpenCaption() } />
                            </h5>
                        </a>
                    </MDBCardBody>
                }
                
            </MDBCard>
        )
    }
}

export default InstaPost;
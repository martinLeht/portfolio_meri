import React, { Component } from 'react';
import { MDBCard, MDBView, MDBMask, MDBCardBody, MDBCardText, MDBIcon, MDBTooltip } from 'mdbreact';
  

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
                        overlay="red-light">
                        <a className="white-text" href={ instaLink } key={id}>{ (this.isCaptionTooLong(caption) ? caption.slice(0, 80) + ' ...' : caption) }</a>
                        
                        <h4 className='white-text text-center'>
                        <MDBTooltip
                            domElement
                            tag="span"
                            material
                            placement="left"
                        >
                            <span><MDBIcon icon='book-open' className='m-1' onClick={ openAction } /></span>
                            <span>Selaa kuvia / Browse images</span>
                        </MDBTooltip>
                            {
                                this.isCaptionTooLong(caption) && isCaptionHidden ? (
                                    <MDBTooltip
                                        domElement
                                        tag="span"
                                        material
                                        placement="left"
                                    >
                                        <span><MDBIcon icon='angle-double-down' className='m-1' onClick={ () => this.toggleOpenCaption() } /></span>
                                        <span>Laajenna kuvateksti / Open caption</span>
                                    </MDBTooltip>
                                ) : (
                                    <MDBTooltip
                                        domElement
                                        tag="span"
                                        material
                                        placement="left"
                                    >
                                        <span><MDBIcon icon='angle-double-up' className='m-1' onClick={ () => this.toggleOpenCaption() } /></span>
                                        <span>Pienennä kuvateksti / Minimize caption</span>
                                    </MDBTooltip>
                                )
                            }
                        </h4>
                       
                    </MDBMask>
                </MDBView>
                {
                    !isCaptionHidden &&
                    <MDBCardBody>
                        <MDBCardText>
                            {caption}
                        </MDBCardText>
                    </MDBCardBody>
                }
                
            </MDBCard>
        )
    }
}

export default InstaPost;
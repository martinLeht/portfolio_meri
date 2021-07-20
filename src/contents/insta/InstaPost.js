import React, { Component } from 'react';
import { MDBCard, MDBView, MDBMask, MDBCardBody, MDBCardText, MDBIcon, MDBTooltip } from 'mdbreact';
import IconButton from '../../components/IconButton';
  

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
            <MDBCard className="m-2">
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
                            <IconButton icon='book-open' tooltip='Selaa kuvia / Browse images' action={ openAction }/>
                            {
                                this.isCaptionTooLong(caption) && (
                                    isCaptionHidden 
                                    ? <IconButton icon='angle-double-down' tooltip='Laajenna kuvateksti / Open caption' action={ this.toggleOpenCaption }/>
                                    : <IconButton icon='angle-double-up' tooltip='Pienennä kuvateksti / Minimize caption' action={ this.toggleOpenCaption }/>
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
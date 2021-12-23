import  { Component } from 'react';
import { MDBCard, MDBCardBody, MDBCardText } from 'mdb-react-ui-kit';
import IconButton from '../../components/general/IconButton';
  

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

    resolveMediaType = (mediaType, src) => {
        if (mediaType === "VIDEO") {
            return (
                <video autoplay muted loop playsinline>
                    <source src={src} type="video/mp4" />
                </video>
            );
        } else if (mediaType === "IMAGE" || mediaType === "CAROUSEL_ALBUM") {
            return (
                <img
                    src={ src }
                    className="img-fluid"
                    alt="Instagram post"
                />
            );
        }
        return undefined;
    }

    render() {
        const { id, src, instaLink, caption, mediaType, openAction } = this.props;
        const { isCaptionHidden } = this.state;

        const mediaContent = this.resolveMediaType(mediaType, src);

        return (
            <MDBCard className="m-2">
                <div className="bg-image hover-overlay ig-post">
                    {mediaContent}
                    <div 
                        className="mask flex-center p-2 overlay-red-light">
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
                       
                    </div>
                </div>
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
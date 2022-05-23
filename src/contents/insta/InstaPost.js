import  { useState } from 'react';
import { useTranslation } from "react-i18next";
import { MDBCard, MDBCardBody, MDBCardText, MDBCollapse } from 'mdb-react-ui-kit';
import IconButton from '../../components/general/IconButton';
  

const InstaPost = (props) => {

    const { id, src, instaLink, caption, mediaType, openAction } = props;
    const [captionHidden, setCaptionHidden] = useState(true);
    const { t } = useTranslation();

    const isCaptionTooLong = (caption) => {
        return caption.length > 80;
    }

    const toggleOpenCaption = () => {
        setCaptionHidden(!captionHidden);
    }

    const resolveMediaType = (mediaType, src) => {
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
    

    return (
        <MDBCard className="m-2">
            <div className="bg-image hover-overlay ig-post">
                {resolveMediaType(mediaType, src)}
                <div 
                    className="d-flex justify-content-center align-items-center mask flex-center p-2 overlay-red-light">
                    <a className="white-text" href={ instaLink } key={id}>{ (isCaptionTooLong(caption) ? caption.slice(0, 80) + ' ...' : caption) }</a>
                    
                    <h4 className='white-text text-center'>
                        <IconButton icon='book-open' tooltip={t('insta.post.view_posts')} action={ openAction }/>
                        {
                            isCaptionTooLong(caption) && (
                                captionHidden 
                                ? <IconButton icon='angle-double-down' tooltip={t('insta.post.open_caption')} action={ toggleOpenCaption }/>
                                : <IconButton icon='times' tooltip={t('insta.post.close_caption')} action={ toggleOpenCaption }/>
                            )
                        }
                    </h4>
                    
                </div>
            </div>
            <MDBCollapse show={!captionHidden}>
                <MDBCardBody>
                    <MDBCardText className="text-dark">
                        {caption}
                    </MDBCardText>
                </MDBCardBody>
            </MDBCollapse>
            
        </MDBCard>
    )
}

export default InstaPost;
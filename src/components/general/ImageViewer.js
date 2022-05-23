import { useEffect, useState } from 'react';
import Lightbox from "react-image-lightbox";

const ImageViewer = (props) => {

    const { images, openAtIndex, onCloseAction } = props;
    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        setImageIndex(openAtIndex);
    }, [openAtIndex]);


    const movePrevAction = (i) => {
        setImageIndex((i + images.length - 1) % images.length);
    }

    const moveNextAction = (i) => {
        setImageIndex((i + 1) % images.length);
    }


    return (
        <Lightbox
            mainSrc={images[imageIndex].mediaUrl}
            nextSrc={images[(imageIndex + 1) % images.length].mediaUrl}
            prevSrc={images[(imageIndex + images.length - 1) % images.length].mediaUrl}
            imageTitle={imageIndex + 1 + "/" + images.length}
            onCloseRequest={ onCloseAction }
            onMovePrevRequest={ () => movePrevAction(imageIndex) }
            onMoveNextRequest={ () => moveNextAction(imageIndex) }
        />
    );
}

export default ImageViewer;

import {
    MDBCarousel,
    MDBCarouselInner,
    MDBCarouselItem,
    MDBCarouselElement
} from "mdb-react-ui-kit";
import useWindowDimensions from '../../hooks/window-dimensions';


const ImageCarouselHeader = () => {

    const { isMobileSize } = useWindowDimensions();

    const images = [
        process.env.PUBLIC_URL + "/images/aura-river-carousel.jpg",
        process.env.PUBLIC_URL + "/images/flowers-aura-carousel.jpg",
        process.env.PUBLIC_URL + "/images/MeriNiemi-flama-carousel.jpg"
    ]

    const mobileImages = [
        process.env.PUBLIC_URL + "/images/aura-river-mobile-carousel.jpg",
        process.env.PUBLIC_URL + "/images/flowers-aura-mobile-carousel.jpg",
        process.env.PUBLIC_URL + "/images/MeriNiemi-flama-mobile-carousel.jpg"
    ];

    const renderImageItems = () => {

        let imageItems = [];

        if (isMobileSize) {
            mobileImages.forEach((img, i) => {
                if (i === 0) {
                    imageItems.push(
                        <MDBCarouselItem className='active' key={"carousel-" + i.toString()}>
                            <MDBCarouselElement src={ img } alt="Header image"/>
                        </MDBCarouselItem>
                    )
                } else {
                    imageItems.push(
                        <MDBCarouselItem key={"carousel-" + i.toString()}>
                            <MDBCarouselElement src={ img } alt="Header image"/>
                        </MDBCarouselItem>
                    )
                }
            });
        } else {
            images.forEach((img, i) => {
                if (i === 0) {
                    imageItems.push(
                        <MDBCarouselItem className='active' key={"carousel-" + i.toString()}>
                            <MDBCarouselElement src={ img } alt="Header image"/>
                        </MDBCarouselItem>
                    )
                } else {
                    imageItems.push(
                        <MDBCarouselItem key={"carousel-" + i.toString()}>
                            <MDBCarouselElement src={ img } alt="Header image"/>
                        </MDBCarouselItem>
                    )
                }
            });
        }

        

        return imageItems;        
    }

    return (
        <MDBCarousel
            className="h-100"
            showControls
            showIndicators
            fade
        >
            <MDBCarouselInner>
                { renderImageItems() }
            </MDBCarouselInner>
        </MDBCarousel>
    );
}

export default ImageCarouselHeader;
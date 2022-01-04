
import {
    MDBCarousel,
    MDBCarouselInner,
    MDBCarouselItem,
    MDBCarouselElement
  } from "mdb-react-ui-kit";


const ImageCarouselHeader = () => {

    const images = [
        process.env.PUBLIC_URL + "/images/aura-river-carousel.jpg",
        process.env.PUBLIC_URL + "/images/flowers-aura-carousel.jpg",
        process.env.PUBLIC_URL + "/images/MeriNiemi-flama-carousel.jpg"
    ]

    const renderImageItems = () => {

        let imageItems = [];

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

        return imageItems;        
    }

    return (
        <MDBCarousel
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
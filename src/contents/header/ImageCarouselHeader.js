
import {
    MDBCarousel,
    MDBCarouselInner,
    MDBCarouselItem,
    MDBCarouselElement
  } from "mdb-react-ui-kit";


const ImageCarouselHeader = () => {

    const images = [
        process.env.PUBLIC_URL + "/images/aura-river.jpg",
        process.env.PUBLIC_URL + "/images/flowers-aura.jpg",
        process.env.PUBLIC_URL + "/images/MeriNiemi-flama.jpg"
    ]

    const renderImageItems = () => {

        let imageItems = [];

        images.forEach((img, i) => {
            imageItems.push(
                <MDBCarouselItem key={"carousel-" + i.toString()}>
                    <MDBCarouselElement src={ img } alt="Header image"/>
                </MDBCarouselItem>
            )
        });

        return imageItems;
            /*
        <MDBCarouselItem itemId="2">
            <MDBView src={}>
                <MDBMask overlay="black-light" />
            </MDBView>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="3">
            <MDBView src={}>
                <MDBMask overlay="black-slight" />
            </MDBView>
        </MDBCarouselItem>
        */
        
    }

    return (
        <MDBCarousel
            length={ images.length }
            showControls
            showIndicators
            className="z-depth-1"
        >
            <MDBCarouselInner>
                { renderImageItems() }
            </MDBCarouselInner>
        </MDBCarousel>
    );
}

export default ImageCarouselHeader;
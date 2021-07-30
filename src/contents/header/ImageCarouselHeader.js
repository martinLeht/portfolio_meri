import React from 'react';
import {
    MDBCarousel,
    MDBCarouselInner,
    MDBCarouselItem,
    MDBView,
    MDBMask
  } from "mdbreact";


const ImageCarouselHeader = () => {

    return (
        <MDBCarousel
            activeItem={1}
            length={3}
            showControls={true}
            showIndicators={true}
            className="z-depth-1"
        >
            <MDBCarouselInner>
                <MDBCarouselItem itemId="1">
                    <MDBView src={process.env.PUBLIC_URL + "/images/aura-river.jpg"}>
                        <MDBMask overlay="black-light" />
                    </MDBView>
                </MDBCarouselItem>
                <MDBCarouselItem itemId="2">
                    <MDBView src={process.env.PUBLIC_URL + "/images/flowers-aura.jpg"}>
                        <MDBMask overlay="black-light" />
                    </MDBView>
                </MDBCarouselItem>
                <MDBCarouselItem itemId="3">
                    <MDBView src={process.env.PUBLIC_URL + "/images/MeriNiemi-flama.jpg"}>
                        <MDBMask overlay="black-slight" />
                    </MDBView>
                </MDBCarouselItem>
            </MDBCarouselInner>
        </MDBCarousel>
    );
}

export default ImageCarouselHeader;
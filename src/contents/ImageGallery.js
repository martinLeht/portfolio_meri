import React from 'react';
import { MDBContainer, MDBRow, MDBCol} from "mdbreact";

const ImageGallery = (props) => {
    
    const { navId } = props;

    return (
        <div  className="gallery" id={ navId }>
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <img src="https://mdbootstrap.com/img/Photos/Slides/img%20(137).jpg" className="img-fluid z-depth-1" alt="" />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol lg="4" md="12" className="mb-3">
                        <img src="https://mdbootstrap.com/img/Others/documentation/img(115)-mini.jpg" className="img-fluid z-depth-1" alt="" />
                    </MDBCol>
                    <MDBCol lg="4" md="6" className="mb-3">
                        <img src="https://mdbootstrap.com/img/Others/documentation/img(116)-mini.jpg" className="img-fluid z-depth-1" alt="" />
                    </MDBCol>
                    <MDBCol lg="4" md="6" className="mb-3">
                        <img src="https://mdbootstrap.com/img/Others/documentation/img(117)-mini.jpg" className="img-fluid z-depth-1" alt="" />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="6" className="mb-3">
                        <img src="https://mdbootstrap.com/img/Others/documentation/img(118)-mini.jpg" className="img-fluid z-depth-1" alt="" />
                    </MDBCol>
                    <MDBCol md="6" className="mb-3">
                        <img src="https://mdbootstrap.com/img/Others/documentation/img(129)-mini.jpg" className="img-fluid z-depth-1" alt="" / >
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}

export default ImageGallery;
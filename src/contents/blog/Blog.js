import React, { Component } from 'react';
import { MDBRow, MDBCol } from 'mdbreact';

class Blog extends Component {

    render() {
        return (
            <div className="blog-container">
                <MDBRow className="d-flex justify-content-center" >
                    <MDBCol className="d-flex justify-content-center flex-column" middle={true} size="8"  md="6" lg="8">
                        <h5><b>Blogi</b></h5>
                        <p>Tässä uutta tavaraaj dakfhjöaj slk</p>
                    </MDBCol>
                </MDBRow>
            </div>
        )
    }
}

export default Blog;
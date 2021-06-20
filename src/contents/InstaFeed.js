import React, { Component } from 'react';
import { MDBRow, MDBCol } from 'mdbreact';

class InstaFeed extends Component {

    render() {
        return (
            <div>
                <MDBRow className="d-flex justify-content-center" >
                    <MDBCol className="d-flex justify-content-center flex-column" middle={true} size="8"  md="6" lg="8">
                        <h5><b>Instagram</b></h5>
                        <p>Tässä uutta tavaraaj dakfhjöaj slk</p>
                    </MDBCol>
                </MDBRow>
            </div>
        )
    }
}

export default InstaFeed;
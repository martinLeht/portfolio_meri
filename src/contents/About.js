import React, { Component } from 'react';
import { MDBRow, MDBCol } from 'mdbreact';

class About extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sectionId: props.id
        }
    }

    render() {
        return (
            <div className="about" id={ this.state.sectionId }>
                <MDBRow className="justify-content-center" >
                    <MDBCol className="d-flex justify-content-center" middle={ true } size="6" lg="4">
                        <img
                            className="d-block w-100"
                            src={process.env.PUBLIC_URL + "/images/mara_header_banner.png"}
                            alt="Kuntavaalit vihreät"
                        />
                    </MDBCol>
                    <MDBCol middle={ true } size="10" sm="6" lg="6">
                        <h2><b>Ehdolla, koska...</b></h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </MDBCol>
                </MDBRow>
            </div>
        )
    }
}

export default About;
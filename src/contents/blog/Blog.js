import React, { Component } from 'react';
import { MDBRow, MDBCol, MDBView, MDBMask } from 'mdbreact';

class Blog extends Component {

    render() {

        const date = new Date().toLocaleString();

        return (
            <div className="blog-container">
                <MDBView hover className="m-1 ig-post">
                    <MDBRow className="d-flex justify-content-center" >
                        <MDBCol className="d-flex justify-content-end flex-column" size="6"  md="5" lg="5">
                            <img
                                src={ process.env.PUBLIC_URL + "/images/gandalf-ak.jpg" }
                                className="img-fluid"
                                alt=""
                                width="500"
                                heighth="500"
                            />
                        </MDBCol>
                        <MDBCol className="d-flex justify-content-center flex-column" size="4"  md="3" lg="4">
                            <h5><b>Blogi</b></h5>
                            { date }
                            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                        </MDBCol>
                    </MDBRow>
                    <MDBMask 
                        className="flex-center p-2" 
                        overlay="red-light">
                    </MDBMask>
                </MDBView>
                <MDBView hover className="m-1 ig-post">
                    <MDBRow className="d-flex justify-content-end" >
                        <MDBCol className="d-flex justify-content-center flex-column text-white" size="4" md="3" lg="4">
                            <h5><b>Blogi</b></h5>
                            { date }
                            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                        </MDBCol>
                        <MDBCol className="d-flex justify-content-center flex-column" size="6"  md="5" lg="6">
                            <img
                                src={ process.env.PUBLIC_URL + "/images/gandalf-ak.jpg" }
                                className="img-fluid"
                                alt=""
                                width="500"
                                heighth="500"
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBMask 
                        className="flex-center" 
                        overlay="red-light">
                    </MDBMask>
                </MDBView>
            </div>
        )
    }
}

export default Blog;
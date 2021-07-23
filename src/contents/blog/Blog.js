import React, { Component } from 'react';
import { MDBRow, MDBCol, MDBIcon, MDBView, MDBMask } from 'mdbreact';
import BlogCard from './BlogCard';

class Blog extends Component {

    render() {

        return (
            <div className="blog-container">
                <MDBRow className="d-flex justify-content-center" >
                    <MDBCol className="p-3" md="3">
                        <BlogCard/>
                    </MDBCol>
                    <MDBCol className="p-3" md="3">
                        <BlogCard/>
                    </MDBCol>
                </MDBRow>
                <MDBRow className="d-flex justify-content-center" >
                    <MDBCol className="p-3" md="3">
                        <BlogCard/>
                    </MDBCol>
                    <MDBCol className="p-3" md="3">
                        <BlogCard/>
                    </MDBCol>
                </MDBRow>
            </div>
        )
    }
}

export default Blog;
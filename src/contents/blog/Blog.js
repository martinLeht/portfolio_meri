import React, { Component } from 'react';
import { MDBCardGroup, MDBRow, MDBCol } from 'mdbreact';
import BlogCard from './BlogCard';

class Blog extends Component {

    render() {

        return (
            <div className="blog-container">
                <div className="p-4">
                    <MDBRow className="p-3" center middle>
                        <MDBCol className="d-flex justify-content-center p-0" size="8" md="6" lg="8">
                            <BlogCard img="https://mdbootstrap.com/img/Others/documentation/img(117)-mini.jpg" />
                        </MDBCol>
                        <MDBCol size="4" lg="4">
                            <h2><b>Täällä Blogi</b></h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor </p>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow center>
                        <MDBCardGroup>
                            <BlogCard img="https://mdbootstrap.com/img/Photos/Slides/img%20(137).jpg" />
                            <BlogCard img="https://mdbootstrap.com/img/Others/documentation/img(115)-mini.jpg" />
                            <BlogCard img="https://mdbootstrap.com/img/Others/documentation/img(116)-mini.jpg"/>
                        </MDBCardGroup>
                    </MDBRow>
                    <MDBRow center>
                        <MDBCardGroup>
                            <BlogCard img="https://mdbootstrap.com/img/Photos/Slides/img%20(137).jpg" />
                            <BlogCard img="https://mdbootstrap.com/img/Others/documentation/img(115)-mini.jpg" />
                            <BlogCard img="https://mdbootstrap.com/img/Others/documentation/img(116)-mini.jpg"/>
                        </MDBCardGroup>
                    </MDBRow>      
                </div>
            </div>
        )
    }
}

export default Blog;
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { MDBRow, MDBCol, MDBIcon } from 'mdbreact';
import BlogCard from './BlogCard';

const BlogTopSection = () => {

    return (
        <MDBRow className="p-3" center middle>
            <MDBCol className="m-4" size="7" md="3" lg="4">
                <MDBRow center middle>
                    <MDBCol>
                        <h2>
                            <b>Tervetuloa!</b>
                            <br/>
                            <b>Welcome!</b>
                        </h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor </p>
                    </MDBCol>
                </MDBRow>
                <MDBRow center middle>
                    <MDBCol className="p-3 blog-post-add-link" middle>
                        <div>
                            <Link to="/blog/add" className="text-white">
                                <h3 className="d-flex justify-content-center align-items-center flex-column">
                                    <b>Lisää Julkaisu</b>
                                    <MDBIcon icon="plus" />
                                </h3>
                            </Link>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBCol>
            <MDBCol className="d-flex justify-content-end p-0 blog-latest" size="7" md="6" lg="7">
                <BlogCard img="https://mdbootstrap.com/img/Others/documentation/img(117)-mini.jpg" />
            </MDBCol>
        </MDBRow>
    );
}

export default BlogTopSection;
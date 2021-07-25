import { MDBRow, MDBCol } from 'mdbreact';
import BlogCard from './BlogCard';

const BlogIntro = () => {

    return (
        <MDBRow className="p-3" center middle>
            <MDBCol size="4" lg="4">
                <h2>
                    <b>Tervetuloa!</b>
                    <br/>
                    <b>Welcome!</b>
                </h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor </p>
            </MDBCol>
            <MDBCol className="d-flex justify-content-end p-0 blog-latest" size="8" md="6" lg="8">
                <BlogCard img="https://mdbootstrap.com/img/Others/documentation/img(117)-mini.jpg" />
            </MDBCol>
        </MDBRow>
    );
}

export default BlogIntro;
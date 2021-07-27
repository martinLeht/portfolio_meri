import { MDBCardGroup, MDBRow } from 'mdbreact';
import BlogCard from './BlogCard';


const BlogFeed = (props) => {

    return (
        <div>
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
    );
}

export default BlogFeed;
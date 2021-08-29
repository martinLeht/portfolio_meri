import {
    Link
} from "react-router-dom";
import { MDBRow, MDBCol, MDBIcon } from 'mdbreact';
import BlogCard from './BlogCard';

const BlogTopSection = (props) => {

    const { latestPostTag } = props;

    const renderLatestPost = () => {

        if (latestPostTag !== undefined) {
            return (
                <MDBCol className="d-flex justify-content-center p-0 blog-latest" size="12" md="6" lg="7">
                    <BlogCard img="https://mdbootstrap.com/img/Others/documentation/img(117)-mini.jpg"
                            title={ latestPostTag.postTitle }
                            postIntro={ latestPostTag.postIntro } 
                            createdAt={ latestPostTag.createdAt } 
                            id={ latestPostTag.id } />
                </MDBCol>
            );
        } else {
            return undefined;
        }
    }

    return (
        <MDBRow className="p-3" center middle>
            <MDBCol className="m-4" size="10" md="3" lg="4">
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
                    <MDBCol className="p-3 blog-post-add-link dashed-border-5">
                        <Link to="/blog/add" className="text-white">
                            <h3 className="d-flex justify-content-center align-items-center flex-column">
                                <b>Lisää Julkaisu</b>
                                <MDBIcon icon="plus" />
                            </h3>
                        </Link>
                    </MDBCol>
                </MDBRow>
            </MDBCol>
            { renderLatestPost() }                    
            
        </MDBRow>
    );
}

export default BlogTopSection;
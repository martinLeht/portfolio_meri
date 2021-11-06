import { Link } from "react-router-dom";
import { MDBRow, MDBCol, MDBIcon } from 'mdbreact';
import BlogCard from './BlogCard';
import LoadingSpinner from '../../components/general/LoadingSpinner';
import { useAuthentication } from './../../hooks/useAuthentication';

const BlogTopSection = (props) => {

    const { isLoading, latestPostTag } = props;
    const { authenticated } = useAuthentication();

    const renderLatestPost = () => {

        if (isLoading) {
            return <LoadingSpinner />;
        } else if (latestPostTag !== undefined) {
            return (
                <MDBCol className="d-flex justify-content-center p-0 blog-latest" size="12" md="6" lg="7">
                    <BlogCard img={ latestPostTag.thumbnail }
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
                {
                    authenticated && (
                        <MDBRow center middle>
                            <MDBCol className="p-3 blog-post-add-link dashed-border-5">
                                <Link to="/blog/write" className="text-white">
                                    <h3 className="d-flex justify-content-center align-items-center flex-column">
                                        <b>Lisää Julkaisu</b>
                                        <MDBIcon icon="plus" />
                                    </h3>
                                </Link>
                            </MDBCol>
                        </MDBRow>
                    )
                }
                
            </MDBCol>
            { renderLatestPost() }                    
            
        </MDBRow>
    );
}

BlogTopSection.defaltProps = {
    isLoading: false
}

export default BlogTopSection;
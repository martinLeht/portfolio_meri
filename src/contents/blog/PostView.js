
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BlogPostService from '../../services/BlogPostService';
import { MDBRow, MDBCol, MDBIcon } from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";
import RecentPosts from "./RecentPosts";
import { useAuthentication } from './../../hooks/useAuthentication';
import useWindowDimensions from '../../hooks/window-dimensions';

const PostView = (props) => {

    const [post, setPost] = useState({});
    const { postId } = useParams();
    const { isMobileSize } = useWindowDimensions();
    const { deletePostHandler } = props;
    const { authenticatedUser, loading } = useAuthentication();
    
    useEffect(() => {
        const blogPostService = new BlogPostService();
        blogPostService.getPostById(postId).then(post => {
            console.log(post);
            setPost(post);
        });
    }, [postId]);

    const renderContent = () => {
        const { content } = post;
        if (content !== undefined) {
            const contentBlocks = post.content.map(block => {
                return resolveContentBlock(block);
            });
            return (
                <MDBRow className="blog-post-content">
                    { contentBlocks }
                </MDBRow>
            );
        }

        return undefined;
    }

    const resolveContentBlock = (block) => {
        let contentBlock;
        switch(block.type) {
            case "paragraph":
                contentBlock = <p>{ convertTextFragmentsToTextElement(block.blockItems[0].textFragments) }</p>;
                break;
            case "heading-one":
                contentBlock = <h1>{ convertTextFragmentsToTextElement(block.blockItems[0].textFragments) }</h1>;
                break;
            case "heading-two":
                contentBlock = <h2>{ convertTextFragmentsToTextElement(block.blockItems[0].textFragments) }</h2>;
                break;
            case "block-quote":
                contentBlock = <blockquote>{ convertTextFragmentsToTextElement(block.blockItems[0].textFragments) }</blockquote>
                break;
            case "numbered-list":
                contentBlock = <ol>{ convertListItemsToListElement(block.blockItems) }</ol>;
                break;
            case "bulleted-list":
                contentBlock = <ul>{ convertListItemsToListElement(block.blockItems) }</ul>;
                break;
            case "image":
                contentBlock = (
                    <MDBRow middle center>
                        <img className="post-img" src={ block.blockItems[0].urlLink } alt="Not found..." />
                    </MDBRow>
                );
                break;
            case "link":
                contentBlock = <a href={ block.blockItems[0].urlLink }>{ convertTextFragmentsToTextElement(block.blockItems[0].textFragments) }</a>;
                break;
            default:
                break;
        }
        return contentBlock;
    }

    const convertTextFragmentsToTextElement = (textFragments) => {
        let text = [];
        textFragments.forEach(fragment => {
            text.push(fragment.text);
            if (fragment.bold) {
                text[text.length - 1] = (<b>{ text[text.length - 1] }</b>);
            }
            if (fragment.italic) {
                text[text.length - 1] = (<i>{ text[text.length - 1] }</i>);
            }
            if (fragment.underline) {
                text[text.length - 1] = (<u>{ text[text.length - 1] }</u>);
            }
        });
        
        return text;
    }

    const convertListItemsToListElement = (items) => {
        const listContent = items.map((listItem, i)=> {
            return <li key={ i } >{ convertTextFragmentsToTextElement(listItem.textFragments) }</li>
        });
        return listContent;
    }

    const handleDeletePost = () => {
        deletePostHandler(parseInt(postId));
    }

    return (
        <>
            <MDBRow center>
                <MDBCol size="9" className="border-bottom border-dark border-3 blog-post-title">
                    <MDBRow className={ isMobileSize ? 'd-flex justify-content-center text-center' : 'd-flex justify-content-between text-start'}>
                        <MDBCol size="7" md="5">
                            <h1>{ post.title }</h1>
                            <p>{ post.createdAt }</p>
                        </MDBCol>
                        { 
                            authenticatedUser && !loading && (
                                <MDBCol size="7" md="4" middle className="d-flex justify-content-center">
                                    <NavLink
                                        className="text-dark nav-link"
                                        to={ `/blog/write/${postId}` }
                                    >
                                        <h6>
                                            Muokkaa{' '}
                                            <MDBIcon icon='edit' size='sm'/>
                                        </h6>
                                    </NavLink>
                                    <NavLink
                                        className="text-dark nav-link"
                                        onClick={ handleDeletePost }
                                        to={ `/blog` }
                                    >
                                        <h6>
                                            Poista{' '}
                                            <MDBIcon icon='trash-alt' size='sm'/>
                                        </h6>
                                    </NavLink> 
                                </MDBCol>
                            )

                        }
                    </MDBRow>
                </MDBCol>
            </MDBRow>
            <MDBRow center>
                <MDBCol size="10" lg="8" className="d-flex py-4 justify-content-center">
                    <div className="blog-post">
                        { renderContent() }
                    </div>
                </MDBCol>
            </MDBRow>
            <MDBRow className="mt-4">
                <RecentPosts />
            </MDBRow>
            
            
        </>
    );
}

export default PostView;
import { Suspense, useState, useEffect } from "react";
import {
    useParams
} from "react-router-dom";
import SectionSeparator from "./SectionSeparator";
import BlogPostService from '../../services/BlogPostService';
import { MDBRow, MDBCol } from "mdbreact";

const BlogPost = (props) => {

    const [post, setPost] = useState({});
    const { postId } = useParams();

    const blogPostService = new BlogPostService();
    
    useEffect(() => {
        blogPostService.getPostById(postId).then(post => {
            console.log("GOT the post!!!");
            console.log(post);
            setPost(post);
        });
    }, []);

    const renderContent = () => {
        const { content } = post;
        if (content !== undefined) {
            const contentBlocks = post.content.map(block => {
                return resolveContentBlock(block);
            });
            return (
                <div className="blog-post-content">
                    { contentBlocks }
                </div>
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

    return (
        <>
            <MDBRow center>
                <MDBRow center className="p-2 mb-2 border-bottom border-white border-4 blog-post-title">
                    <MDBCol className="d-inline text-center text-white">
                        <h1>{ post.title }</h1>
                        <p>{ post.createdAt }</p>
                    </MDBCol>
                </MDBRow>
                <MDBRow center>
                    <MDBCol size="10" lg="8" className="d-flex justify-content-center">
                        <div className="blog-post">
                            <div className="blog-post-content">
                                { renderContent() }
                            </div>
                        </div>
                    </MDBCol>
                    <MDBCol size="2" lg="2"className="d-flex justify-content-center border border-white border-4 recent-posts">
                        <div className=" ">
                            <h1>Tähän viimesimmät julkaisut</h1>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBRow>
        </>
    );
}

export default BlogPost;
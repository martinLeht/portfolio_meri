import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MDBRow, MDBCol, MDBIcon } from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";
import { useAuthentication } from './../../hooks/useAuthentication';
import useWindowDimensions from '../../hooks/window-dimensions';
import ImageViewer from '../../components/general/ImageViewer';

const PostContent = (props) => {
    const { previewMode, post, onDeletePostAction } = props;
    
    const { t } = useTranslation();
    const { isMobileSize } = useWindowDimensions();
    const { authenticatedUser, loading } = useAuthentication();
    const [viewerOpen, setViewerOpen] = useState(false);
    const [imageViewerIndex, setImageViewerIndex] = useState(0);
    const [ images, setImages ] = useState([]);


    useEffect(() => {
        if (!previewMode && post !== undefined && post.attachments) initImagesForViewer();
    }, [post]);


    const initImagesForViewer = () => {
        const postImages = post.attachments.map(attachment => {
                                return {
                                    mediaUrl: attachment.link,
                                    mediaName: attachment.name
                                }
                            });
        setImages(postImages);
    }
    

    const renderContent = () => {
        if (post && post.content) {
            const contentBlocks = post.content.map(block => {
                let imgIndex;
                if (block.type === "image") {
                    const matchIndex = post.attachments.findIndex(attachment => attachment.name === block.attachment.name);
                    if (matchIndex > -1) imgIndex = matchIndex;
                }
                const contentBlock = resolveContentBlock(block, imgIndex);
                
                return contentBlock;
            });
            return (
                <MDBRow>
                    { contentBlocks }
                </MDBRow>
            );
        }

        return undefined;
    }

    const resolveContentBlock = (block, imgIndex) => {
        let contentBlock;
        switch(block.type) {
            case "paragraph":
                contentBlock = <p>{ convertTextContentToTextElement(block.textContent) }</p>;
                break;
            case "heading-one":
                contentBlock = <h1>{ convertTextContentToTextElement(block.textContent) }</h1>;
                break;
            case "heading-two":
                contentBlock = <h2>{ convertTextContentToTextElement(block.textContent) }</h2>;
                break;
            case "block-quote":
                contentBlock = <blockquote>{ convertTextContentToTextElement(block.textContent) }</blockquote>
                break;
            case "numbered-list":
                contentBlock = <ol>{ convertListItemsToListElement(block.childNodes) }</ol>;
                break;
            case "bulleted-list":
                contentBlock = <ul>{ convertListItemsToListElement(block.childNodes) }</ul>;
                break;
            case "image":
                contentBlock = (
                    <MDBRow middle center>
                        <img 
                            className="post-img hover-shadow rounded" 
                            src={ block.attachment.link } 
                            alt="Not found..."
                            onClick={() => openImageViewerAction(imgIndex) } />
                    </MDBRow>
                );
                break;
            case "link":
                contentBlock = <a href={ block.attachment.link }>{ convertTextContentToTextElement(block.textContent) }</a>;
                break;
            default:
                break;
        }
        return contentBlock;
    }

    const convertTextContentToTextElement = (textContent) => {
        let text = [];
        textContent.forEach((fragment, i) => {
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
            return <li key={ i } >{ convertTextContentToTextElement(listItem.textContent) }</li>
        });
        return listContent;
    }

    const handleDeletePost = () => {
        onDeletePostAction();
    }

    const openImageViewerAction = (imgIndex) => {
        setViewerOpen(true);
        setImageViewerIndex(imgIndex);
    }

    const closeImageViewer = () => {
        setViewerOpen(false);
    }

    return (
        <>
            {
                post && (
                    <>
                        <MDBRow center className="p-4">
                            <MDBCol size="9" className="border-bottom border-dark border-3 blog-post-title">
                                <MDBRow className={ isMobileSize ? 'd-flex justify-content-center text-center' : 'd-flex justify-content-between text-start'}>
                                    <MDBCol size="8" md="5">
                                        <h1>{ post.title }</h1>
                                        <p>{ post.createdAt }</p>
                                    </MDBCol>
                                    { 
                                        authenticatedUser && !previewMode && !loading && (
                                            <MDBCol center size="7" md="4" className="d-flex justify-content-center">
                                                <NavLink
                                                    className="text-dark nav-link"
                                                    to={ `/blog/posts/${post.id}/edit` }
                                                >
                                                    <h6>
                                                        {t('blog.post.edit')}{' '}<MDBIcon icon='edit' size='sm'/>
                                                    </h6>
                                                </NavLink>
                                                <NavLink
                                                    className="text-dark nav-link"
                                                    onClick={ handleDeletePost }
                                                    to={ `/blog` }
                                                >
                                                    <h6>
                                                        {t('blog.post.delete')}{' '}<MDBIcon icon='trash-alt' size='sm'/>
                                                    </h6>
                                                </NavLink> 
                                            </MDBCol>
                                        )

                                    }
                                </MDBRow>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow center className="p-4">
                            <MDBCol size="10" lg="8" className="d-flex py-4 blog-post justify-content-center">
                                <div className="blog-post-content">
                                    { renderContent() }
                                </div>
                            </MDBCol>
                        </MDBRow>
                        {
                            !previewMode && viewerOpen && images.length > 0 && (
                                <ImageViewer images={ images } 
                                            openAtIndex={ imageViewerIndex } 
                                            onCloseAction={ closeImageViewer } />
                            )
                        }
                    </>
                )
            }
            
        </>

    );
}

PostContent.defaultProps = {
    previewMode: false
}

export default PostContent;
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";
import { useKeycloak } from "@react-keycloak/web";
import { MDBBtn, MDBRow, MDBCol, MDBIcon } from "mdb-react-ui-kit";
import { NavLink, useNavigate } from "react-router-dom";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import useWindowDimensions from '../../hooks/window-dimensions';
import HelmetMetaData from '../../components/general/HelmetMetaData';
import SimpleDialog from "../../components/modal/dialog/SimpleDialog";
import ImageViewer from '../../components/general/ImageViewer';
import CommentSection from './comment/CommentSection';
import { useBlogApi } from '../../api/useBlogApi';

const PostContent = (props) => {
    const { previewMode, post } = props;

    const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
    const [viewerOpen, setViewerOpen] = useState(false);
    const [imageViewerIndex, setImageViewerIndex] = useState(0);
    const [socialShareQuote, setSocialShareQuote] = useState(""); 
    const [ images, setImages ] = useState([]);

        
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { isMobileSize } = useWindowDimensions();
    const { keycloak } = useKeycloak();
    const queryClient = useQueryClient();
    const { deletePostById } = useBlogApi();


    const deletePostHandler = useMutation(postId => deletePostById(postId), {
        onSuccess: data => {
          console.log("DATA SUCCESFULLY DELETED");
        },
        onError: () => {
          alert("there was an error");
        },
        onSettled: () => {
          queryClient.invalidateQueries(['posts']);
        }
    });


    useEffect(() => {
        if (!previewMode && !!post) {
            generateQuoteForSocialShare();
            if (post.attachments) initImagesForViewer();
        } 
    }, [post]);


    const generateQuoteForSocialShare = () => {
        if (post.content) {
            let quote = "";
            post.content.every(block => {
                if (quote.length >= 100) return false;
                if (block.type === "paragraph") {
                    block.textContent.forEach(fragment => {
                        quote = quote.concat(" " + fragment.text);
                    });
                }
                return true;
            });
            const trimmedQuote = quote.substring(0, 100) + "...";
            setSocialShareQuote(trimmedQuote);
        }
    }

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

    const openImageViewerAction = (imgIndex) => {
        setViewerOpen(true);
        setImageViewerIndex(imgIndex);
    }

    const closeImageViewer = () => {
        setViewerOpen(false);
    }

    const initHelmetData = () => {
        return (
            <HelmetMetaData
                title={post.title}
                description={post.title + " - Meri Niemi"}
                image={post.attachments && post.attachments.length > 0 ? post.attachments[0].link : ""}
                quote={socialShareQuote}
            />
        );
    }

    const onDeletePostHandler = () => {
        setConfirmDeleteDialogOpen(true);
    }

    const handleConfirmDeleteDialogYesAction = () => {
        setConfirmDeleteDialogOpen(false);
        if (post && post.id) {
            deletePostHandler.mutate(post.id);
            navigate("/blog");
        }
        
    };

    const handleConfirmDeleteDialogCancelAction = () => {
        setConfirmDeleteDialogOpen(false);
    };

    return (
        <>
            {
                !!post && (
                    <>
                        { initHelmetData() }
                        <MDBRow center className="mx-0 pt-4">
                            <MDBCol size="9" className="blog-post-title border-bottom border-dark border-2">
                                <MDBRow className={ isMobileSize ? 'd-flex justify-content-center text-center' : 'd-flex justify-content-between text-start'}>
                                    <MDBCol size="8" md="5">
                                        <h1>{ post.title }</h1>
                                        <p>{ post.createdAt }</p>
                                    </MDBCol>
                                    <MDBCol size="7" md="4" center>
                                        <MDBRow center middle>
                                            { 
                                                keycloak.authenticated && !previewMode && (
                                                    <MDBCol center size="auto" className="d-flex justify-content-center p-2">
                                                        <NavLink
                                                            className="text-dark nav-link p-1 me-2"
                                                            to={ `/blog/posts/${post.id}/edit` }
                                                        >
                                                            <h6 className="mb-0">
                                                                {t('blog.post.edit')}{' '}<MDBIcon icon='edit' size='sm'/>
                                                            </h6>
                                                        </NavLink>
                                                        <MDBBtn
                                                            outline 
                                                            color="dark" 
                                                            size="sm"
                                                            onClick={ onDeletePostHandler }
                                                        >
                                                            {t('blog.post.delete')}{' '}<MDBIcon icon='trash-alt' size='sm' color="danger"/>
                                                        </MDBBtn>
                                                    </MDBCol>
                                                )

                                            }
                                        </MDBRow>
                                        <MDBRow center>
                                            <MDBCol size="auto">Share:</MDBCol>
                                            <MDBCol size="auto" className="d-flex align-items-center">
                                                    <FacebookShareButton 
                                                        url={"https://www.merijohanna.com/blog/posts/" + post.id}
                                                        quote={post.title + " - Meri Niemi"}
                                                        className="socialMediaButton"
                                                    >
                                                        <MDBIcon size="lg" fab icon="facebook-square" color="primary" />
                                                    </FacebookShareButton>
                                            </MDBCol>
                                            <MDBCol size="auto">
                                                <TwitterShareButton
                                                    url={"https://www.merijohanna.com/blog/posts/" + post.id}
                                                    title={post.title + " - Meri Niemi"}
                                                    className="socialMediaButton"
                                                >
                                                    <MDBIcon size="lg" fab icon="twitter-square" color="info" />
                                                </TwitterShareButton>
                                            </MDBCol>
                                            <MDBCol size="auto">
                                                <WhatsappShareButton
                                                    url={"https://www.merijohanna.com/blog/posts/" + post.id}
                                                    title={post.title + " - Meri Niemi"}
                                                    separator=":: "
                                                    className="socialMediaButton"
                                                >
                                                    <MDBIcon size="lg" fab icon="whatsapp-square" color="success" />
                                                </WhatsappShareButton>
                                            </MDBCol>
                                        </MDBRow>
                                        
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow center className="mx-0">
                            <MDBCol size="10" lg="8" className="d-flex py-4 blog-post justify-content-center">
                                <div className="blog-post-content">
                                    { renderContent() }
                                </div>
                            </MDBCol>
                        </MDBRow>
                        {
                            !previewMode && post && <CommentSection postId={post.uuid} authorId={post.userId}/>
                        }
                        {
                            !previewMode && viewerOpen && images.length > 0 && (
                                <ImageViewer images={ images } 
                                            openAtIndex={ imageViewerIndex } 
                                            onCloseAction={ closeImageViewer } />
                            )
                        }
                        <SimpleDialog 
                            title={t('dialog.confirm_delete')}
                            icon={<MDBIcon fas icon="trash-alt" size="lg" color="danger" />} 
                            body={t('dialog.want_to_delete_post')} 
                            open={confirmDeleteDialogOpen} 
                            onYes={handleConfirmDeleteDialogYesAction}
                            onCancel={handleConfirmDeleteDialogCancelAction}
                        />
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
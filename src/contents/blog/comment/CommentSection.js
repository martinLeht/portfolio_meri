import { useState } from 'react';
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBCheckbox, MDBTextArea, MDBTooltip, MDBIcon } from 'mdb-react-ui-kit';
import { useMutation, useQueryClient, useInfiniteQuery } from "react-query";
import { useKeycloak } from "@react-keycloak/web";
import { useTranslation } from "react-i18next";
import AlertMsg from '../../../components/general/AlertMsg';
import SimpleDialog from "../../../components/modal/dialog/SimpleDialog";
import Loader from '../../../components/general/Loader';
import CommentEntry from '../../../components/general/CommentEntry';
import { useCommentApi } from '../../../api/useCommentApi';
import useWindowDimensions from '../../../hooks/window-dimensions';
import { useAuthentication } from '../../../hooks/useAuthentication';
import { useTemporaryAuthentication } from '../../../hooks/useTemporaryAuthentication';
import LoadingSpinner from '../../../components/general/LoadingSpinner';

const CommentSection = (props) => {

    const { postId, authorId } = props;

    const [email, setEmail] = useState();
    const [requireVerificationEverytime, setRequireVerificationEverytime] = useState(true);
    const [username, setUsername] = useState();
    const [commentContent, setCommentContent] = useState();
    const [validEmail, setIsValidEmail] = useState(false);
    const [sendVerificationDialogOpen, setSendVerificationDialogOpen] = useState(false);
    const [commentSendLoading, setIsCommentSendLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const emailValidationRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const { getPaginatedCommentsByPostId, createComment, updateComment, deleteCommentById } = useCommentApi();

    const queryClient = useQueryClient();

    const { t } = useTranslation();
    const { isMobileSize } = useWindowDimensions();
    const { keycloak, initialized } = useKeycloak();
    const { authenticatedUser } = useAuthentication();
    const { temporaryUser, requestTemporaryAccess, authenticateTemporaryAccess, logoutTemporaryUserWithoutReload } = useTemporaryAuthentication();

    
    const {
        data: commentsData, 
        isLoading: isCommentsLoading, 
        isError, 
        error,
        hasNextPage,
        fetchNextPage,
        isFetching,
        isFetchingNextPage
    } = useInfiniteQuery([`comments-${postId}`], (pageConfig) => getPaginatedCommentsByPostId(postId, pageConfig), {
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.page === Math.floor(lastPage.totalSize / lastPage.pageSize)) return undefined;
            else return lastPage.page + 1;
        }
    })

    const comments = isCommentsLoading ? [] : commentsData ? commentsData.pages : [];

    const createCommentHandler = useMutation(data => createComment(data), {
        onSuccess: data => {
          console.log("Comment SUCCESFULLY CREATED");
          setCommentContent('');
        },
        onError: () => {
          alert("there was an error")
        },
        onSettled: () => {
            setIsCommentSendLoading(false);
            queryClient.invalidateQueries([`comments-${postId}`]);
        }
    });

    const updateCommentHandler = useMutation(data => updateComment(data.uuid, data), {
        onSuccess: data => {
            console.log(data);
            console.log("Comment SUCCESFULLY UPDATED");
        },
        onError: () => {
            alert("there was an error")
        },
        onSettled: () => {
            setIsCommentSendLoading(false);
            queryClient.invalidateQueries([`comments-${postId}`]);
        }
    });
    

    const deleteCommentHandler = useMutation(id => deleteCommentById(id), {
        onSuccess: data => {
            console.log("Comment SUCCESFULLY DELETED");
        },
        onError: () => {
            alert("there was an error");
        },
        onSettled: () => {
            setIsCommentSendLoading(false);
            queryClient.invalidateQueries([`comments-${postId}`]);
        }
    });

    const handleCommentListOnScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom && hasNextPage) {
            fetchNextPage();
        }
    }

    const renderComments = () => {
        if (comments.length > 0) {
            return (
                <MDBRow className="comment-entry-list" onScroll={handleCommentListOnScroll}>
                    {
                        comments.map(commentPage => 
                            commentPage.data.map(comment => {
                                return (
                                    <MDBCol size="12" key={comment.uuid}>
                                        {
                                            authorId === comment.userId
                                            ? <CommentEntry 
                                                right
                                                commentId={comment.uuid}
                                                username={comment.username} 
                                                author 
                                                message={comment.content} 
                                                createdAt={comment.createdAt} 
                                                updatedAt={comment.updatedAt} 
                                                onDelete={handleDeleteComment}/>
                                            : <CommentEntry left username={comment.username} message={comment.content} createdAt={comment.createdAt} updatedAt={comment.updatedAt} />
                                        }
                                    </MDBCol>
                                )
                            })
                        )
                        
                    }
                    {
                        hasNextPage && (
                            <MDBCol size="12">
                                {isFetching && !isFetchingNextPage ? <LoadingSpinner pulse color="white" /> : null}
                            </MDBCol>
                        )
                    }
                </MDBRow>
            )
        } else {
            return (
                <MDBRow className="text-center p-4">
                    <MDBCol>
                        <h5>No comments yet</h5>
                    </MDBCol>
                </MDBRow>
            );
        }
    }

    const handleEmailChange = (e) => {
        const value = e.target.value;
        const isValidEmail = !!(value && value.match(emailValidationRegexp));
        setIsValidEmail(isValidEmail);
        setEmail(value);
        if (isValidEmail && !username) {
            const usernameFromEmail = value.split("@")[0];
            setUsername(usernameFromEmail);
        }
        if (isValidEmail && temporaryUser) {
            logoutTemporaryUserWithoutReload().then(() => {
                setUsername();
            });
        }
        
    }

    const handleChangeTemporaryUser = () => {
        logoutTemporaryUserWithoutReload().then(() => {
            setEmail();
            setIsValidEmail(false);
            setUsername();
        });
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handleRequireVerificationEverytimeCheckbox = (e) => {
        setRequireVerificationEverytime(!requireVerificationEverytime);
    }

    const handleCommentContentChange = (e) => {
        setCommentContent(e.target.value);
    }

    const validateEmailForTemporaryUser = (e) => {
        validateEmail(e.target.value);
    }

    const validateEmail = (value) => {
        const isValidEmail = !!(value && value.match(emailValidationRegexp));
        setIsValidEmail(isValidEmail);
        setEmail(value);
    }

    const handleDeleteComment = (commentId) => {
        deleteCommentHandler.mutate(commentId);
    }

    const handleSendComment = () => {
        setErrors([]);
        setIsCommentSendLoading(true);
        if (keycloak.authenticated) {
            if (!!commentContent && !!commentContent.trim()) {
                const commentDto = {
                    userId: authenticatedUser.user.userId,
                    username: authenticatedUser.user.username,
                    postId: postId,
                    content: commentContent
                }
                createCommentHandler.mutate(commentDto);
            } else {
                setErrors(['Comment has to have content']);
            }
            setIsCommentSendLoading(false);            
        } else {
            const emailToValidate = temporaryUser ? temporaryUser.tempUserEmail : email;
            validateEmail(emailToValidate);
            if (!emailToValidate && !validEmail) {
                setIsCommentSendLoading(false);
                setErrors(["You have to provide a valid email to send a comment!"]);
            } else {
                const tempUserAccessRequest = {
                    email: emailToValidate,
                    username: temporaryUser ? temporaryUser.tempUsername : username,
                    requireVerificationOnEveryAccess: !!requireVerificationEverytime,
                    callbackUrl: window.location.href
                }

                authenticateTemporaryAccess(tempUserAccessRequest).then((tempAccessGrant) => {
                    setErrors([]);
                    if (tempAccessGrant.error) {
                        setSendVerificationDialogOpen(true);
                    } else {
                        if (!!commentContent && !!commentContent.trim()) {
                            setErrors([]);
                            const commentDto = {
                                userId: tempAccessGrant.tempUserId,
                                username: tempAccessGrant.tempUsername,
                                postId: postId,
                                content: commentContent
                            }
                            createCommentHandler.mutate(commentDto);
                        } else {
                            setErrors(['Comment has to have content']);
                        }
                    }
                }, err => {
                    if (err.message) {
                        setErrors([err.message]);
                    }
                }).finally(() => setIsCommentSendLoading(false));
            }
        }
    }

    const handleSendVerificationDialogYesAction = () => {
        setSendVerificationDialogOpen(false);
        setIsCommentSendLoading(true)

        const emailToValidate = temporaryUser ? temporaryUser.tempUserEmail : email;
        validateEmail(emailToValidate);
        if (!emailToValidate && !validEmail) {
            setIsCommentSendLoading(false);
            setErrors(["You have to provide a valid email to send a comment!"]);
        } else {
            const tempUserAccessRequest = {
                email: emailToValidate,
                username: temporaryUser ? temporaryUser.tempUsername : username,
                requireVerificationOnEveryAccess: !!requireVerificationEverytime,
                callbackUrl: window.location.href
            }
            requestTemporaryAccess(tempUserAccessRequest).then((tempAccessGrant) => {
                if (tempAccessGrant.error) {
                    setErrors([tempAccessGrant.error]);
                } else {
                    if (!!commentContent && !!commentContent.trim()) {
                        setErrors([]);
                        const commentDto = {
                            userId: tempAccessGrant.tempUserId,
                            username: tempAccessGrant.tempUsername,
                            postId: postId,
                            content: commentContent
                        }
                        createCommentHandler.mutate(commentDto);
                    } else {
                        setErrors(['Comment has to have content']);
                    }
                }
            }, err => {
                if (err.message) {
                    setErrors([err.message]);
                }
            }).finally(() => setIsCommentSendLoading(false));
        }
    };

    const handleSendVerificationDialogNoAction = () => {
        setSendVerificationDialogOpen(false);
    };


    const renderCommentForm = () => {
        if (keycloak.authenticated) {
            return (
                <div className="comment-form form-group text-white rounded-4 m-1 p-3 primary-bg-color">
                    <h4>Leave a comment</h4>   
                    {
                        errors.length > 0 && (
                            errors.map(err => <AlertMsg text={err} />)
                        )
                    }

                    <h6 className="text-white p-2 border border-1 border-success rounded">
                        {keycloak.authenticated && authenticatedUser ? authenticatedUser.user.username : ""} 
                        <span><MDBIcon fas icon="check-circle text-success"/></span>
                    </h6>
                    <MDBTextArea 
                        className="text-white" 
                        wrapperClass='mb-4' 
                        id='comment-content' 
                        rows={3} 
                        label='Comment'
                        value={commentContent} 
                        onChange={handleCommentContentChange} />

                    {
                        commentSendLoading 
                        ? <MDBRow center><LoadingSpinner pulse color="white" /></MDBRow>
                        : (
                            <MDBBtn 
                                className='mb-3' 
                                rounded 
                                outline 
                                color="white" 
                                block
                                disabled={authenticatedUser && (!!commentContent && !!commentContent.trim()) ? false : true}
                                onClick={handleSendComment}>
                                Send comment
                            </MDBBtn>
                        )
                    }
                    
                </div>
            )
        } else if (temporaryUser) {
            
            return (
                <div className="comment-form form-group text-white rounded-4 m-1 p-3 primary-bg-color">
                    <h4>Leave a comment</h4>
                    {
                        errors.length > 0 && (
                            errors.map(err => <AlertMsg text={err} />)
                        )
                    }
                    
                    <MDBRow className="mb-3">
                        <MDBCol className="pe-0" center size="1">
                            <MDBIcon className="text-white" fas icon="edit" onClick={handleChangeTemporaryUser}/>
                        </MDBCol>
                        <MDBCol center size="11" className="text-truncate">
                            <h6 className="text-white text-truncate mb-0 p-2 border border-1 border-success rounded">
                                {temporaryUser.tempUserEmail}
                            </h6>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow className="mb-3">
                        <MDBCol center>
                            <h6 className="text-white mb-0 p-2 border border-1 border-success rounded">
                                {temporaryUser.tempUsername} 
                                <span><MDBIcon fas icon="check-circle text-success"/></span>
                            </h6>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow className="mb-3">
                        <MDBCol size='auto'>
                            <MDBTooltip tag='span' title={t('blog.comment.require_verification_checkbox.tip')}>
                                <MDBCheckbox
                                    name='require-verification-checkbox' 
                                    id='require-verification-checkbox'
                                    checked={requireVerificationEverytime}
                                    onChange={handleRequireVerificationEverytimeCheckbox} 
                                />
                            </MDBTooltip>
                        </MDBCol>
                        <MDBCol className="px-0">
                            <label>{t('blog.comment.require_verification_checkbox.title')}</label>
                        </MDBCol>
                    </MDBRow>

                    <MDBTextArea 
                        className="text-white" 
                        wrapperClass='mb-4' 
                        id='comment-content' 
                        rows={3} 
                        label='Comment'
                        value={commentContent} 
                        onChange={handleCommentContentChange} />
                    {
                        commentSendLoading 
                        ? <MDBRow center><LoadingSpinner pulse color="white" /></MDBRow>
                        : (
                            <MDBBtn 
                                className='mb-3' 
                                rounded
                                outline 
                                color="white" 
                                block 
                                disabled={(temporaryUser || validEmail) && (!!commentContent && !!commentContent.trim()) ? false : true}
                                onClick={handleSendComment}>
                                Send comment
                            </MDBBtn>
                        )
                    }
                </div>
            )
        } else {
            return (
                <div className="comment-form form-group text-white rounded-4 m-1 p-3 primary-bg-color">
                    <h4>Leave a comment</h4>
                    {
                        errors.length > 0 && (
                            errors.map(err => <AlertMsg text={err} />)
                        )
                    }
                    
                    <MDBInput 
                        className="comment-input text-white" 
                        color="white" 
                        type='email' 
                        id='comment-email' 
                        wrapperClass='mb-3' 
                        label='Email address'
                        value={email} 
                        onChange={handleEmailChange}
                        onBlur={validateEmailForTemporaryUser}/>  
                        
                    <MDBInput 
                        className="comment-input text-white" 
                        id='comment-username' 
                        wrapperClass='mb-3' 
                        label='Username'
                        value={username} 
                        onChange={handleUsernameChange} />

                    <MDBRow className="mb-3">
                        <MDBCol size='auto'>
                            <MDBTooltip tag='span' title={t('blog.comment.require_verification_checkbox.tip')}>
                                <MDBCheckbox
                                    name='require-verification-checkbox' 
                                    id='require-verification-checkbox'
                                    checked={requireVerificationEverytime}
                                    onChange={handleRequireVerificationEverytimeCheckbox} 
                                />
                            </MDBTooltip>
                        </MDBCol>
                        <MDBCol className="px-0">
                            <label>{t('blog.comment.require_verification_checkbox.title')}</label>
                        </MDBCol>
                    </MDBRow>

                    <MDBTextArea 
                        className="text-white" 
                        wrapperClass='mb-4' 
                        id='comment-content' 
                        rows={3} 
                        label='Comment' 
                        value={commentContent}
                        onChange={handleCommentContentChange} />
                    {
                        commentSendLoading 
                        ? <MDBRow center><LoadingSpinner pulse color="white" /></MDBRow>
                        : (
                            <MDBBtn 
                                className='mb-3'
                                rounded 
                                outline 
                                color="white" 
                                block 
                                disabled={(temporaryUser || validEmail) && (!!commentContent && !!commentContent.trim()) ? false : true}
                                onClick={handleSendComment}>
                                Send comment
                            </MDBBtn>
                        )
                    }
                    
                </div>
            )
        }
    }

    return (
            <>
                <MDBRow center className="bg-white-shade">
                    <MDBCol start size="11" className="py-4 comment-section">
                        <MDBRow center>
                            <MDBCol lg={isMobileSize ? "auto" : "10"}>
                                <h2>Comments{!isCommentsLoading && comments.length > 0 ? ` - ${comments[0].totalSize}`: ""}</h2>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className="d-flex justify-content-center">
                            <MDBCol md="8" lg="8" xl="9">
                                {
                                    isCommentsLoading 
                                        ? <Loader pulse />
                                        : renderComments()
                                }
                            </MDBCol>
                            <MDBCol  size={!isMobileSize ? "auto" : ""} md="4" lg="4" xl="3" className={"d-flex flex-column " + (!isMobileSize ? " px-3 rounded-end" : " py-3 mt-2 rounded-bottom")}>
                                {
                                    renderCommentForm()
                                }
                            </MDBCol>
                        </MDBRow>                    
                    </MDBCol>
                </MDBRow>

                <SimpleDialog 
                    title={t('dialog.send_email_verification.title')} 
                    icon={<MDBIcon fas icon="exclamation-triangle" size="lg" color="warning" />}
                    body={t('dialog.send_email_verification.body')} 
                    open={sendVerificationDialogOpen} 
                    onYes={handleSendVerificationDialogYesAction}
                    onNo={handleSendVerificationDialogNoAction}
                />
            </>
    )
    
};

export default CommentSection;
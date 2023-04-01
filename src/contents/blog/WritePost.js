
import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useMutation, useInfiniteQuery, useQueryClient } from "react-query";
import moment from 'moment'
import { useParams, useNavigate } from "react-router-dom";
import { MDBRow, MDBCol, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import useWindowDimensions from '../../hooks/window-dimensions';
import { useAuthentication } from './../../hooks/useAuthentication';
import BlogEditor from "./editor/BlogEditor";
import ModalWindow from "../../components/modal/ModalWindow";
import { useBlogApi } from '../../api/useBlogApi';
import { convertBlogDataToDto, formatPostContentForEditor } from '../../utils/BlogPostFormatter';
import PostContent from './PostContent';

const WritePost = (props) => {

    const { newPostHandler } = props;
    const [title, setTitle] = useState('');
    const [post, setPost] = useState();
    const [loading, setLoading] = useState(false);
    const [openPostPreview, setOpenPostPreview] = useState(false);
    const { postId } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { isMobileSize } = useWindowDimensions();    
    const { authenticatedUser } = useAuthentication();
    const queryClient = useQueryClient();

    const { getPostById, createPost, updatePost } = useBlogApi();

    useEffect(() => {
        setLoading(true);
        if (postId !== undefined) {
            getPostById(postId).then(post => {
                setTitle(post.title);
                setPost(post);
                setLoading(false);
            }).catch(e => {
                console.error(e.message);
                setLoading(false);
            });
        }
    }, [postId]);

    const handleTitle = (event) => {
        setTitle(event.target.value);
    }

    const isInEditMode = () => {
        return postId !== undefined && post !== undefined;
    }

    const initTitle = () => {
        if (isInEditMode() || title !== undefined) {
            return title;
        } else {
            return "";
        }
    }

    const renderTimestamps = () => {
        if (isInEditMode()) {
            return (
                <p>
                    <b>{t('blog.post.write_post.published_at')}:</b> { post.createdAt }
                    <br/>
                    <b>{t('blog.post.write_post.updated_at')}:</b> { post.updatedAt }
                </p>
            )
        }
    }

    const renderBlogEditor = () => {
        if (postId !== undefined) {
            if (post !== undefined) {
                const postContent = formatPostContentForEditor(post.content);
                localStorage.setItem('content', JSON.stringify(postContent));
                return <BlogEditor editorContent={ postContent } />
            }
        } else {
            return <BlogEditor />
        }
    }

    const togglePreviewPost = () => {
        const postContent = JSON.parse(localStorage.getItem('content'));

        let postDto;
        if (isInEditMode()) {
            postDto = convertBlogDataToDto(post.id, title ? title : '', postContent ? postContent : []);
            postDto.createdAt = post.createdAt;
        } else {
            postDto = convertBlogDataToDto(undefined, title ? title : '', postContent ? postContent : []);
            postDto.createdAt = moment().format('DD.MM.YYYY hh:mm');
        }
            
        setPost(postDto);
        setOpenPostPreview(!openPostPreview);
    }

    const savePost = () => {
        const postContent = JSON.parse(localStorage.getItem('content'));
        if (isInEditMode()) {
            const postDto = convertBlogDataToDto(post.id, title, postContent, authenticatedUser.user.userId);
            updatePost(postDto.id, postDto).then(newPost => {
                if (!newPost) return;
                queryClient.invalidateQueries(['posts']);
                navigate("/blog/posts/" + newPost.tag.id);
            });
        } else {
            const postDto = convertBlogDataToDto(undefined, title, postContent, authenticatedUser.user.userId);
            createPost(postDto).then(newPost => {
                if (!newPost) return;
                queryClient.invalidateQueries(['posts']);
                navigate("/blog");
            });
        }
    }

    return (
        <>
            <MDBRow middle center className="dark-text">
                <MDBCol size={ isMobileSize ? 'auto' : '8'} lg="3" className="d-inline justify-content-top m-1">
                    <div className="form-group text-white rounded-4 m-1 p-3 primary-bg-color">
                        <h2>{t('blog.post.write_post.title')}</h2>
                        <MDBInput className="text-white border-1 m-2" value={ initTitle() } size="lg" onChange={ handleTitle } />
                        { renderTimestamps() }
                        <MDBBtn className="m-2" outline color="white" type="submit" onClick={ togglePreviewPost }>
                            {t('blog.post.write_post.review')}
                        </MDBBtn>
                        <MDBBtn className="m-2" outline color="white" type="submit" onClick={ savePost }>
                            {t('blog.post.write_post.publish')}
                        </MDBBtn>
                    </div>
                </MDBCol>
                <MDBCol className="d-flex flex-column m-1 editor" size="10" lg="7">
                    { renderBlogEditor() }
                </MDBCol>
            </MDBRow>
            {
                !loading && (
                    <ModalWindow 
                        open={ openPostPreview }
                        onCloseAction={togglePreviewPost}
                        title={ title ? title : '' }
                        content={ <PostContent previewMode post={post} /> }
                    />
                )
            }
            
        </>
    )
}

export default WritePost;
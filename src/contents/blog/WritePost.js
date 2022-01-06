
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { MDBRow, MDBCol, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import BlogEditor from "./editor/BlogEditor";
import BlogPostService from '../../services/BlogPostService';
import { convertBlogDataToDto, convertDtoToBlogData } from '../../utils/BlogMappingUtils';

const WritePost = (props) => {

    const { newPostHandler } = props;
    const [title, setTitle] = useState('');
    const [post, setPost] = useState();
    const { postId } = useParams();
    const navigate = useNavigate();

    console.log("IN WRITE!");
    console.log(postId);

    const blogPostService = new BlogPostService();

    useEffect(() => {
        if (postId !== undefined) {
            const blogPostService = new BlogPostService();
            blogPostService.getPostById(postId).then(post => {
                console.log(post);
                setTitle(post.title);
                setPost(post);
            }).catch(e => console.error(e.message));;
        }
    }, [postId]);

    const printContent = () => {
        console.log(localStorage.getItem('content'));
    }

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
                    <b>Julkaistu:</b> { post.createdAt }
                    <br/>
                    <b>Viimeksi muokattu:</b> { post.updatedAt }
                </p>
            )
        }
    }

    const renderBlogEditor = () => {
        if (postId !== undefined) {
            if (post !== undefined) {
                return <BlogEditor editorContent={ convertDtoToBlogData(post) } />
            }
        } else {
            return <BlogEditor />
        }
    }

    const savePost = () => {
        const postContent = JSON.parse(localStorage.getItem('content'));
        console.log("Before Save POST:");
        if (isInEditMode()) {
            const postDto = convertBlogDataToDto(post.id, title, postContent);
            console.log(postDto);
            console.log(JSON.stringify(postDto));

            blogPostService.updatePost(Number(postDto.id), postDto).then(newPost => {
                if (!newPost) return;
                console.log("Updated POST:");
                console.log(JSON.stringify(newPost));
                newPostHandler(newPost.tag);
                navigate(`/blog/`);
            });
        } else {
            const postDto = convertBlogDataToDto(undefined, title, postContent);
            console.log(postDto);
            console.log(JSON.stringify(postDto));

            blogPostService.createPost(postDto).then(newPost => {
                if (!newPost) return;
                console.log("Created POST:");
                console.log(JSON.stringify(newPost));
                newPostHandler(newPost.tag);
                navigate("/blog");
            });
        }
    }
    

    return (
        <>
            <MDBRow middle center className="dark-text">
                <MDBCol size="8" lg="3" className="d-inline justify-content-top m-1">
                    <div className="form-group text-white rounded-4 m-1 p-3 editor-action-panel">
                        <h2>Otsikko</h2>
                        <MDBInput className="text-white border-1 m-2" value={ initTitle() } size="lg" onChange={ handleTitle } />
                        { renderTimestamps() }
                        <MDBBtn className="m-2" outline color="white" type="submit" onClick={ printContent }>
                            Esikatsele
                        </MDBBtn>
                        <MDBBtn className="m-2" outline color="white" type="submit" onClick={ savePost }>
                            Tallenna ja julkaise
                        </MDBBtn>
                    </div>
                </MDBCol>
                <MDBCol middle className="d-flex flex-column m-1 editor" size="10" lg="7">
                    { renderBlogEditor() }
                </MDBCol>
            </MDBRow>
        </>
    )
}

WritePost.defaltProps = {
    isEditMode: false,
    postToEdit: undefined
}

export default WritePost;
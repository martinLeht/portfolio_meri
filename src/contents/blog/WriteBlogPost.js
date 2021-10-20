import { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import BlogEditor from "./editor/BlogEditor";
import BlogPostService from '../../services/BlogPostService';
import { convertBlogDataToDto, convertDtoToBlogData } from '../../utils/BlogMappingUtils';

const WriteBlogPost = (props) => {

    const { newPostHandler } = props;
    const [title, setTitle] = useState('');
    const [post, setPost] = useState();
    const { postId } = useParams();
    const history = useHistory();

    const blogPostService = new BlogPostService();

    useEffect(() => {
        if (postId !== undefined) {
            blogPostService.getPostById(postId).then(post => {
                console.log(post);
                setTitle(post.title);
                setPost(post);
            }).catch(e => console.error(e.message));;
        }
    }, []);

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
        
        if (isInEditMode()) {
            const postDto = convertBlogDataToDto(post.id, title, postContent);
            console.log(postDto);
            console.log(JSON.stringify(postDto));

            blogPostService.updatePost(Number(postDto.id), postDto).then(newPost => {
                console.log("Updated POST:");
                console.log(JSON.stringify(newPost));
                history.push(`/blog/${newPost.id}`);
            });
        } else {
            const postDto = convertBlogDataToDto(undefined, title, postContent);
            console.log(postDto);
            console.log(JSON.stringify(postDto));

            blogPostService.createPost(postDto).then(newPost => {
                console.log("Created POST:");
                console.log(JSON.stringify(newPost));
                
                history.push("/blog");
                newPostHandler(newPost.tag);
            });
        }
    }
    

    return (
        <>
            <MDBRow middle center className="dark-text">
                <MDBCol size="8" lg="3" className="d-inline justify-content-top m-1">
                    <div className="form-group text-white rounded-4 m-1 p-3 editor-action-panel">
                        <h2>Otsikko</h2>
                        <MDBInput className="text-white border-1" value={ initTitle() } size="lg" onChange={ handleTitle } />
                        { renderTimestamps() }
                        <MDBBtn outline color="white" type="submit" onClick={ printContent }>
                            Esikatsele
                        </MDBBtn>
                        <MDBBtn outline color="white" type="submit" onClick={ savePost }>
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

WriteBlogPost.defaltProps = {
    isEditMode: false,
    postToEdit: undefined
}

export default WriteBlogPost;
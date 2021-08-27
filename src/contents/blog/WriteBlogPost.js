import { useState } from 'react';
import { MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import BlogEditor from "./editor/BlogEditor";
import BlogPostService from '../../services/BlogPostService';
import { convertBlogDataToDto, convertDtoToBlogData } from '../../utils/BlogMappingUtils';

const WriteBlogPost = (props) => {

    const { isEditMode, postToEdit } = props; 
    const [title, setTitle] = useState('');
    const blogPostService = new BlogPostService();

    const printContent = () => {
        console.log(localStorage.getItem('content'));
    }

    const handleTitle = (event) => {
        setTitle(event.target.value);
    }

    const initTitle = () => {
        if (isEditMode) {
            setTitle(postToEdit.title);
            return postToEdit.title;
        } else {
            return "";
        }
    }

    const renderTimestamps = () => {
        if (isEditMode && postToEdit !== undefined) {
            return (
                <p>
                    Julkaistu: { postToEdit.createdAt }
                    <br/>
                    Viimeksi muokattu: { postToEdit.updatedAt }
                </p>
            )
        }
    }

    const savePost = () => {
        const postContent = JSON.parse(localStorage.getItem('content'));
        const postDto = convertBlogDataToDto(title, postContent);

        console.log(postDto);
        console.log(JSON.stringify(postDto));
        if (isEditMode) {
            blogPostService.updatePost(postDto).then(post => {
                console.log("Updated POST:");
                console.log(JSON.stringify(post));
            });
        } else {
            blogPostService.createPost(postDto).then(post => {
                console.log("Created POST:");
                console.log(JSON.stringify(post));
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
                    <BlogEditor editorContent={ (isEditMode && postToEdit !== undefined) ? postToEdit.content : undefined } />
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
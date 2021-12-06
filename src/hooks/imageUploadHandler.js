import axios from 'axios';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Editor, Transforms, Element as SlateElement } from 'slate';
import AuthenticationService from "../services/AuthenticationService";
import { jwtAuthRequestInterceptor, jwtAuthResponseInterceptor } from '../services/interceptors/JwtAuthInterceptor';

const useImageUploadHandler = (editor, previousSelection) => {

    const { history } = useHistory();

    const authenticationService = new AuthenticationService();
    let client = axios.create({
        baseURL: process.env.REACT_APP_IMAGE_STORAGE_API_ENDPOINT,
        timeout: 31000,
        headers: { 
            'Access-Control-Allow-Origin': '*',
            'content-type': 'multipart/form-data' 
        }
    });

    client.interceptors.request.use(jwtAuthRequestInterceptor, err => {
        Promise.reject(err);
    }, { synchronous: true });
    client.interceptors.response.use(response => response, err => jwtAuthResponseInterceptor(err));

    const isFileSizeInLimits = (size) => {
        return size < 1048576;
    }

    const handleImageUpload = (formData) => {
        const authenticatedUser = authenticationService.getCurrentUser();
        if (authenticatedUser) {
            client.post("/upload", formData).then((res) => {
                const newImage = Editor.nodes(editor, {
                    match: (node) => node.fileName === res.data.name
                });
                console.log("Käsitellään tuloksia");
    
                if (newImage === null) return;
                console.log("Oli MATCH");
                console.log(newImage);
                console.log(res.data.name);
                console.log(res.data.url);
                Transforms.setNodes(
                    editor,
                    { 
                        isUploading: false,
                        fileName: res.data.name,
                        url: res.data.url,
                    },
                    { at: newImage[1] }
                );
                Transforms.insertNodes(
                    editor,
                    {
                        type: "paragraph",
                        children: [
                            {
                              text: '',
                            },
                        ]
                    }
                );
            }).catch((error) => {
                console.log(error);     
            });
        }
    }

    return useCallback((event) => {
        event.preventDefault();
        const files = event.target.files;
        if (files.length === 0) {
            return;
        }
        console.log(files.length);
        console.log(files);
        const file = files[0];

        if (!isFileSizeInLimits(file.size)) {
            console.log("Too big size");
            return;
        }

        const fileName = file.name;
        const formData = new FormData();
        formData.append("file", file);

        Transforms.insertNodes(
            editor,
            {
                type: "image",
                caption: fileName,
                fileName: fileName,
                url: "",
                isUploading: true,
                children: [
                    {
                      text: '',
                    },
                ]
            },{ at: previousSelection, select: true }
        );
        handleImageUpload(formData);
        console.log("Image uploaded (callback)");
    },[editor, previousSelection]);
}

export default useImageUploadHandler;
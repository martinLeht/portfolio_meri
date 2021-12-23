import axios from 'axios';
import { useCallback } from 'react';
import { Editor, Transforms } from 'slate';
import AuthenticationService from "../services/AuthenticationService";
import { jwtAuthRequestInterceptor, jwtAuthResponseInterceptor } from '../services/interceptors/JwtAuthInterceptor';

const handleImageUpload = (formData, editor) => {
    const authenticationService = new AuthenticationService();
    const authenticatedUser = authenticationService.getCurrentUser();
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
    
    if (authenticatedUser) {
        client.post("/upload", formData).then((res) => {
            const newImage = Editor.nodes(editor, {
                match: (node) => node.fileName === res.data.name
            });
            console.log("Käsitellään tuloksia");

            if (newImage === null) return;

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

const useImageUploadHandler = (editor, previousSelection) => {
    const isFileSizeInLimits = (size) => {
        return size < 1048576;
    }

    return useCallback((event) => {
        event.preventDefault();
        const files = event.target.files;
        if (files.length === 0) {
            return;
        }
        const file = files[0];

        if (!isFileSizeInLimits(file.size)) {
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
        handleImageUpload(formData, editor);
    },[editor, previousSelection]);
}

export default useImageUploadHandler;
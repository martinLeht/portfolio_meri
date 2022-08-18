import axios from 'axios';
import { useState, useCallback } from 'react';
import AuthenticationService from "../services/AuthenticationService";
import { jwtAuthRequestInterceptor, jwtAuthResponseInterceptor } from '../services/interceptors/JwtAuthInterceptor';

const useImageUploadHandler = () => {

    const [file, setFile] = useState();
    const [isUploading, setIsUploading] = useState(false);

    const authenticationService = new AuthenticationService();
    const authenticatedUser = authenticationService.getCurrentUser();
    const client = axios.create({
        baseURL: process.env.REACT_APP_IMAGE_STORAGE_API_ENDPOINT,
        timeout: 10000,
        headers: { 
            'Access-Control-Allow-Origin': '*',
            'content-type': 'multipart/form-data' 
        }
    });
    client.interceptors.request.use(jwtAuthRequestInterceptor, err => {
        Promise.reject(err);
    });
    client.interceptors.response.use(response => response, err => jwtAuthResponseInterceptor(err));

    const uploadImage = useCallback(async (event, callback) => {
        setIsUploading(true);
        event.preventDefault();
        const files = event.target.files;
        if (files.length === 0) {
            return;
        }
        const fileData = files[0];

        if (!isFileSizeInLimits(fileData.size)) {
            return;
        }

        const formData = new FormData();
        formData.append("file", fileData);
        const data = await handleImageUpload(formData);
        
        setFile(data);
        setIsUploading(false);
        if (callback) callback(data);
    });

    const handleImageUpload = async (formData) => {
        if (authenticatedUser) {
            try {
                const res = await client.post("/upload", formData);
                return {
                    name: res.data.name,
                    url: res.data.url,
                    type: 'IMAGE'
                };
            } catch(err) {
                console.error(err);
            }
        }
        return null;
    }

    const deleteImage = useCallback(async (fileName, callback) => {
        setIsUploading(true);
        
        const success = await handleImageDelete(fileName);
        console.log(success);
        
        if (success) setFile(null);
        setIsUploading(false);
        if (callback && success) callback(null);
    });

    const handleImageDelete = async (fileName) => {
        if (authenticatedUser) {
            try {
                const res = await client.delete(`/delete?fileName=${fileName}`);
                return !!res.data;
            } catch(err) {
                console.error(err);
            }
        }
        return false;
    }

    const getImage = useCallback(async (fileName, callback) => {
        setIsUploading(true);
        
        const data = await handleGetImage(fileName);
        console.log(data);

        setFile(data);
        setIsUploading(false);
        if (callback) callback(data);
    });

    const handleGetImage = async (fileName) => {
        if (authenticatedUser) {
            try {
                const res = await client.get(`/get?fileName=${fileName}`);
                if (res.data.name && res.data.url) {
                    return {
                        name: res.data.name,
                        url: res.data.url,
                        type: 'IMAGE'
                    };
                }
                return null;
                
            } catch(err) {
                console.error(err);
            }
        }
        return null;
    }

    const isFileSizeInLimits = (size) => {
        return size < 1048576;
    }

    return {
        file,
        isUploading,
        uploadImage,
        deleteImage,
        getImage
    }
}

export default useImageUploadHandler;
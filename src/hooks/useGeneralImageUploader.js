import { useState } from 'react';
import { useKeycloak } from "@react-keycloak/web";

import { useStorageApi } from '../api/useStorageApi';

const useImageUploadHandler = () => {

    const [file, setFile] = useState();
    const [error, setError] = useState();
    const [isUploading, setIsUploading] = useState(false);
    const { keycloak } = useKeycloak();
    
    const { uploadExperienceMedia, deleteExperienceMedia, getExperienceMedia } = useStorageApi();

    const uploadImage = async (event, callback) => {
        setIsUploading(true);
        event.preventDefault();
        const files = event.target.files;
        if (files.length === 0) {
            setError(null);
            return;
        }
        const fileData = files[0];

        if (!isFileSizeInLimits(fileData.size)) {
            setIsUploading(false);
            setError({ msg: "Too big file"});
            return;
        }

        const data = await handleImageUpload(fileData);

        setFile(data);
        setIsUploading(false);
        setError(null);
        if (callback) callback(data);
    }

    const handleImageUpload = async (fileData) => {
        if (keycloak.authenticated) {
            const data = await uploadExperienceMedia(fileData);
            if (data && data.name && data.src) {
                return {
                    name: data.name,
                    src: data.src,
                    type: data.type
                };
            }
        }
        return null;
    }

    const deleteImage = async (fileName, callback) => {
        setIsUploading(true);
        
        const success = await handleImageDelete(fileName);
        
        if (success) setFile(null);
        setIsUploading(false);
        setError(null);
        if (callback && success) callback(null);
    };

    const handleImageDelete = async (fileName) => {
        if (keycloak.authenticated) {
            const data = await deleteExperienceMedia(fileName);
            return !!data;
        }
        return false;
    }

    const getImage = async (fileName, callback) => {
        setIsUploading(true);
        
        const data = await handleGetImage(fileName);

        setFile(data);
        setIsUploading(false);
        setError(null);
        if (callback) callback(data);
    };

    const handleGetImage = async (fileName) => {
        if (keycloak.authenticated) {
            const data = await getExperienceMedia(fileName);
            if (data.name && data.src) {
                return {
                    name: data.name,
                    src: data.src,
                    type: data.type
                };
            }
        }
        return null;
    }

    const isFileSizeInLimits = (size) => {
        return size < 1048576;
    }

    return {
        file,
        error,
        isUploading,
        uploadImage,
        deleteImage,
        getImage
    }
}

export default useImageUploadHandler;
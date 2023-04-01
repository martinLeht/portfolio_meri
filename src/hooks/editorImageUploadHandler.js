import { useCallback } from 'react';
import { Editor, Transforms } from 'slate';
import { useKeycloak } from "@react-keycloak/web";
import { useStorageApi } from '../api/useStorageApi';

const useImageUpload = (fileData, editor) => {
    
    const { keycloak } = useKeycloak();
    const { uploadBlogMedia } = useStorageApi();

    const uploadImageFromEditor = (fileData, editor) => {
        if (keycloak.authenticated) {
            uploadBlogMedia(fileData).then((data) => {
                const newImage = Editor.nodes(editor, {
                    match: (node) => node.fileName === data.name
                });
    
                if (newImage === null) return;
    
                Transforms.setNodes(
                    editor,
                    { 
                        isUploading: false,
                        attachment: {
                            name: data.name,
                            link: data.src
                        }
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
        } else {
            console.log("Not authenticated for image uploading");
        }
    }

    return {
        uploadImageFromEditor
    }
}

const useImageUploadHandler = (editor, previousSelection) => {


    const { uploadImageFromEditor } = useImageUpload();

    const isFileSizeInLimits = (size) => {
        return size < 1048576;
    }

    return useCallback((event) => {
        event.preventDefault();
        const files = event.target.files;
        if (files.length === 0) {
            return;
        }
        const fileData = files[0];

        if (!isFileSizeInLimits(fileData.size)) {
            return;
        }

        const fileName = fileData.name;

        Transforms.insertNodes(
            editor,
            {
                type: "image",
                attachment: {
                    name: fileName,
                    link: ""
                },
                isUploading: true,
                children: [
                    {
                      text: '',
                    },
                ]
            },{ at: previousSelection, select: true }
        );
        uploadImageFromEditor(fileData, editor);

    },[editor, previousSelection]);
}

export default useImageUploadHandler;
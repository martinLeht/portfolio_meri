import { useCallback } from 'react';
import { Editor, Transforms } from 'slate';
import AuthenticationService from "../services/AuthenticationService";

const handleImageUpload = (fileData, editor) => {
    const authenticationService = new AuthenticationService();
    const authenticatedUser = authenticationService.getCurrentUser();
    const storageService = new StorageService();
    
    if (authenticatedUser) {
        storageService.uploadBlogMedia(fileData).then((data) => {
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
        const fileData = files[0];

        if (!isFileSizeInLimits(file.size)) {
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
        handleImageUpload(fileData, editor);

    },[editor, previousSelection]);
}

export default useImageUploadHandler;
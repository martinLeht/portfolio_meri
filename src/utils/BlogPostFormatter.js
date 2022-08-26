export const convertBlogDataToDto = (id, title, postContent, userId) => {

    const attachments = postContent.filter(block => block.type === 'image')
                                    .map(block => block.attachment);
    const postDto = {
        id: id,
        title: title,
        content: formatEditorContentToDto(postContent),
        attachments: attachments,
        userId: userId
    }
    return postDto;
}

const formatEditorContentToDto = (postContent) => {
    const postContentDto = postContent.map((block) => {
        
        let contentBlock;
        if (block.type === 'numbered-list' || block.type === 'bulleted-list') {
            contentBlock = {
                type: block.type,
                attachment: block.attachment,
                childNodes: block.children.map(node => handleListItemForDto(node))
            }
        } else {
            if (block.type === 'image') {
                contentBlock = {
                    type: block.type,
                    attachment: block.attachment,
                    textContent: block.children
                }
            } else if (block.type === 'link') {
                contentBlock = {
                    type: 'link-item',
                    urlLink: block.src,
                    textContent: block.children,
                    orderNumber: 0
                };
            } else {
                contentBlock = {
                    type: block.type,
                    textContent: block.children
                }
            }
            
        }
        
        return contentBlock;
    });
    return postContentDto;
}

const handleListItemForDto = (listItem) => {
    const contentBlock = {
        type: listItem.type,
        textContent: listItem.children
    }
    return contentBlock;
}

export const formatPostContentForEditor = (postDtoContent) => {
    const postContent = postDtoContent.map(block => {
        let children;
        if (block.type === 'numbered-list' || block.type === 'bulleted-list') {
            children = block.childNodes.map(node => handleListItemForEditor(node));
        } else {
            children = block.textContent;
        }
        const content = {
            attachment: {
                name: block.type === 'image' ? block.attachment.name : undefined,
                link: block.type === 'image' || block.type === 'link' ? block.attachment.link : undefined,
            },
            type: block.type,
            children: children
        };
        return content;
    });
    return postContent;
}

const handleListItemForEditor = (childNode) => {
    const listItem = {
        type: childNode.type,
        children: childNode.textContent
    };
    return listItem;
}
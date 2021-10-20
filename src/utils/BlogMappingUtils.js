export const convertBlogDataToDto = (id, title, postContent) => {
    const postDto = {
        id: id,
        title: title,
        content: formatPostContent(postContent)
    }
    return postDto;
}

const formatPostContent = (postContent) => {
    const postContentDto = postContent.map((block, i) => {
        
        let blockItems;
        if (block.type === 'numbered-list' || block.type === 'bulleted-list') {
            blockItems = block.children.map((listItem, i) => handleListItemForDto(listItem, i));
        } else {
            const textFragments = block.children.map((child, i) => constructTextFragmentFromChild(child, i));
            if (block.type === 'image') {
                blockItems = [{
                    id: block.id,
                    type: 'file-item',
                    fileName: block.fileName,
                    urlLink: block.url,
                    textFragments: textFragments,
                    orderNumber: 0
                }];
            } else if (block.type === 'link') {
                blockItems = [{
                    id: block.id,
                    type: 'link-item',
                    urlLink: block.url,
                    textFragments: textFragments,
                    orderNumber: 0
                }];
            } else {
                blockItems = [{
                    id: block.id,
                    type: 'text-item',
                    textFragments: textFragments,
                    orderNumber: 0
                }];
            }
            
        }
        const contentBlock = {
            id: block.id,
            type: block.type,
            blockItems: blockItems,
            orderNumber: i
        }
        return contentBlock;
    });
    return postContentDto;
}

const handleListItemForDto = (listItem, orderNum) => {
    const textFragments = listItem.children.map((child, i) => constructTextFragmentFromChild(child, i));
    const blockItem = {
        id: listItem.id,
        type: 'list-item',
        textFragments: textFragments,
        orderNumber: orderNum
    }
    return blockItem;
}

const constructTextFragmentFromChild = (child, orderNum) => {
    const fragment = {
        id: child.id,
        text: child.text,
        bold: child.bold !== undefined && child.bold,
        italic: child.italic !== undefined && child.italic,
        underline: child.underline !== undefined && child.underline,
        orderNumber: orderNum
    }
    return fragment;
}

export const convertDtoToBlogData = (postDto) => {
    const postContent = postDto.content.map(block => {
        let children;
        if (block.type === 'numbered-list' || block.type === 'bulleted-list') {
            children = block.blockItems.map(item => handleListItemForBlogData(item));
        } else {
            children = block.blockItems[0].textFragments.map(fragment => constructChildFromFragment(fragment));
        }
        const content = {
            id: block.id,
            fileName: block.type === 'image' ? block.blockItems[0].fileName : undefined,
            url: block.type === 'image' || block.type === 'link' ? block.blockItems[0].urlLink : undefined,
            type: block.type,
            children: children
        };
        return content;
    });
    return postContent;
}

const handleListItemForBlogData = (blockItem) => {
    const children = blockItem.textFragments.map(fragment => constructChildFromFragment(fragment));
    const listItem = {
        id: blockItem.id,
        type: blockItem.type,
        children: children
    };
    return listItem;
}

const constructChildFromFragment = (fragment) => {
    const child = {
        id: fragment.id,
        text: fragment.text,
        bold: fragment.bold,
        italic: fragment.italic,
        underline: fragment.underline
    };
    return child; 
}
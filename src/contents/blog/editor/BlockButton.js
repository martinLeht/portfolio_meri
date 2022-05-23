
import { useSlate } from 'slate-react';
import { Editor, Transforms, Element as SlateElement } from 'slate';

import useSelection from '../../../hooks/useSelection';

import Button from './Button';
import IconButton from '../../../components/general/IconButton';
import useImageUploadHandler from '../../../hooks/imageUploadHandler';

const BlockButton = (props) => {
    const { format, icon, tooltip, size } = props;

    const editor = useSlate();
    const [previousSelection, selection, setSelectionOptimized, setSelection] = useSelection(editor);
    const onImageSelected = useImageUploadHandler(editor, previousSelection);
    const LIST_TYPES = ['numbered-list', 'bulleted-list'];

    const toggleBlock = (editor, format) => {
        const isActive = isBlockActive(editor, format);
        const isList = LIST_TYPES.includes(format)        
      
        Transforms.unwrapNodes(editor, {
            match: node => 
                LIST_TYPES.includes(
                    !Editor.isEditor(node) && SlateElement.isElement(node) && node.type
            ),
            split: true
        });

        const newProperties = {
            type: isActive ? 'paragraph' : isList ? 'list-item' : format
        }

        Transforms.setNodes(editor, newProperties, { at: editor.selection });
      
        if (!isActive && isList) {
            const block = { 
                type: format, 
                children: [] 
            }
            Transforms.wrapNodes(editor, block);
        }
    }

    const isBlockActive = (editor, format) => {
        const [match] = Editor.nodes(editor, {
            match: node => matchNode(node, format)
        });
      
        return match;
    }
    
    const matchNode = (node, format) => {
        return !Editor.isEditor(node) && SlateElement.isElement(node) && node.type === format
    }

    const handleButtonPress = (event) => {
        if (format !== "image") {
            event.preventDefault();
            toggleBlock(editor, format);
        }
    }

    const renderIconButton = () => {
        if (format === 'image') {
            return(
                <>
                    <label htmlFor="image-upload">
                        <IconButton 
                            icon={ icon } 
                            tooltip={ tooltip ? tooltip : '' } 
                            tooltipPlacement = { tooltip ? 'top' : '' }
                            size={ size } 
                            active={ isBlockActive(editor, format) }
                        />
                    </label>
                    <input
                        type="file"
                        id="image-upload"
                        className="image-upload-input"
                        accept="image/png, image/jpeg"
                        onChange={ onImageSelected }
                    />
                </>
            );

        } else {
            return (
                <IconButton 
                    icon={ icon } 
                    tooltip={ tooltip ? tooltip : '' } 
                    tooltipPlacement = { tooltip ? 'top' : '' }
                    size={ size } 
                    active={ isBlockActive(editor, format) } 
                />
            );
        }
    }

    return (
        <Button onMouseDown={ handleButtonPress } >
            { renderIconButton() }
        </Button>
    )
}

export default BlockButton;
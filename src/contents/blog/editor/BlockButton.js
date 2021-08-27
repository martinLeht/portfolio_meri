import { useSlate } from 'slate-react';
import { Editor, Transforms, Element as SlateElement } from 'slate';
import Button from './Button';
import IconButton from '../../../components/general/IconButton';

const BlockButton = (props) => {
    const { format, icon, tooltip, size } = props;

    const editor = useSlate();
    const LIST_TYPES = ['numbered-list', 'bulleted-list']

    const toggleBlock = (editor, format) => {
        const isActive = isBlockActive(editor, format)
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

        Transforms.setNodes(editor, newProperties)
      
        if (!isActive && isList) {
            const block = { type: format, children: [], /*alignment: 'center'*/ }
            Transforms.wrapNodes(editor, block)
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

    return (
        <Button
            onMouseDown={ event => {
                event.preventDefault()
                toggleBlock(editor, format)
            }}
        >
            <IconButton 
                icon={ icon } 
                tooltip={ tooltip ? tooltip : '' } 
                tooltipPlacement = { tooltip ? 'top' : '' }
                size={ size } 
                active={ isBlockActive(editor, format) } 
            />
        </Button>
    )
}

export default BlockButton;
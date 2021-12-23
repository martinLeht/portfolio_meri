
import { useSlate } from 'slate-react';
import { Editor } from 'slate';
import Button from './Button';
import IconButton from '../../../components/general/IconButton';

const MarkButton = (props) => {
    const { format, icon, tooltip } = props;
    const editor = useSlate();

    const toggleMark = (editor, format) => {
        const isActive = isMarkActive(editor, format)
      
        if (isActive) {
            Editor.removeMark(editor, format)
        } else {
            Editor.addMark(editor, format, true)
        }
    }


    const isMarkActive = (editor, format) => {
        const marks = Editor.marks(editor);
        return marks ? marks[format] === true : false;
    }
    
    return (
        <Button
            onMouseDown={ event => {
                event.preventDefault();
                toggleMark(editor, format);
            }}
        >
            <IconButton 
                icon={ icon } 
                tooltip={ tooltip ? tooltip : '' } 
                tooltipPlacement = { tooltip ? 'top' : '' }
                active={ isMarkActive(editor, format) } 
            />
        </Button>
    )
}

export default MarkButton;
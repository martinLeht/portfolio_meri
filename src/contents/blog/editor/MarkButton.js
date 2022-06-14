
import { useSlate } from 'slate-react';
import { Editor } from 'slate';
import { MDBCol} from "mdb-react-ui-kit";
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
        <MDBCol size="auto">
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
        </MDBCol>
    )
}

export default MarkButton;
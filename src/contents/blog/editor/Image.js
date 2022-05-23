
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import LoadingSpinner from '../../../components/general/LoadingSpinner';

const Image = (props) => {
    const { attributes, children, element } = props;
  
    return (
        <div {...attributes} contentEditable={false}>
            {
                !element.isUploading 
                ? (
                    <MDBRow middle center className="editor-image-attachment">
                        <img src={element.attachment.link} alt={element.attachment.name} />
                    </MDBRow>
                )
                : (<LoadingSpinner />)
            }
            {children}
        </div>
    );
}

export default Image;

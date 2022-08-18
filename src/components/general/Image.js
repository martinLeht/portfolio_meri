
import { MDBBtn, MDBCol, MDBRow, MDBIcon } from "mdb-react-ui-kit";
import { useTranslation } from "react-i18next";
import LoadingSpinner from './LoadingSpinner';

const Image = (props) => {
    const { src, name, attributes, children, loading, onDelete } = props;
  
    const { t } = useTranslation();
    const handleDeleteImage = () => {
        onDelete(name);
    }

    return (
        <div {...attributes} contentEditable={false}>
            {
                !loading
                ? (
                    <MDBRow middle center>
                        <img src={src} alt={name} />
                        {
                            onDelete && (
                                <MDBCol size="auto mt-1">
                                    <MDBBtn
                                        outline 
                                        color="dark" 
                                        size="md" 
                                        onClick={handleDeleteImage}>
                                        { t("general.image.delete") }
                                        <MDBIcon
                                            className="ps-2"
                                            fas 
                                            icon="trash-alt" 
                                            color="danger" 
                                            size="lg"
                                            onClick={handleDeleteImage}
                                        />
                                    </MDBBtn>
                                    
                                </MDBCol>
                            )
                        }
                    </MDBRow>
                )
                : (<LoadingSpinner />)
            }
            {children}
        </div>
    );
}

export default Image;

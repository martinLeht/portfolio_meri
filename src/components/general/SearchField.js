
import { MDBInputGroup, MDBIcon, MDBInputGroupText, MDBInputGroupElement } from "mdb-react-ui-kit";

const SearchField = (props) => {
    const { onChange } = props;
    return (
        <MDBInputGroup>
            <MDBInputGroupText noBorder>
                <MDBIcon fas icon='search' />
            </MDBInputGroupText>
            <MDBInputGroupElement 
                className="search bg-shade rounded-pill"
                type='text' 
                placeholder='Search' 
                onChange={ onChange }
            />
        </MDBInputGroup>
    );
}

export default SearchField;
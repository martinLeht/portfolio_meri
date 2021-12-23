
import { MDBInputGroup, MDBIcon } from "mdb-react-ui-kit";

const SearchField = (props) => {
    const { onChange } = props;
    return (
        <MDBInputGroup className="md-form my-0">
            <MDBIcon icon="search" />
            <input className="form-control ml-3 w-75" 
                    type="text" 
                    placeholder="Search" 
                    aria-label="Search"
                    onChange={ onChange }
            />
        </MDBInputGroup>
    );
}

export default SearchField;
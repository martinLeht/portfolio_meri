
import { MDBInputGroup, MDBIcon, MDBInput } from "mdb-react-ui-kit";

const SearchField = (props) => {
    const { disabled, onChange } = props;
    return (
        <MDBInputGroup noBorder textBefore={<MDBIcon fas icon='search' />}>
            <input
                disabled={disabled} 
                className="form-control bg-shade rounded-pill p-2"
                type='text' 
                placeholder='Search' 
                onChange={ onChange }
            />
        </MDBInputGroup>
    );
}

SearchField.defaultProps={
    disabled: false
}

export default SearchField;
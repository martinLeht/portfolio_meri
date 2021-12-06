import { MDBInput, MDBBtn, MDBFormInline, MDBIcon } from "mdbreact";

const SearchField = (props) => {
    const { onChange } = props;
    return (
        <MDBFormInline className="md-form my-0">
            <MDBIcon icon="search" />
            <input className="form-control ml-3 w-75" 
                    type="text" 
                    placeholder="Search" 
                    aria-label="Search"
                    onChange={ onChange }
            />
        </MDBFormInline>
    );
}

export default SearchField;
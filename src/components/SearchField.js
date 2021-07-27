import { MDBInput, MDBBtn, MDBFormInline, MDBIcon } from "mdbreact";

const SearchField = () => {
    return (
        <MDBFormInline className="md-form my-0 search">
            <MDBInput className="m-0" label="Etsi / Search" />
            <MDBBtn outline color="white" size="sm" type="submit" className="border-0 my-0">
                <MDBIcon icon="search" size="2x" />
            </MDBBtn>
        </MDBFormInline>
    );
}

export default SearchField;
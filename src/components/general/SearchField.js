
import { MDBInputGroup, MDBIcon, MDBInput } from "mdb-react-ui-kit";

const SearchField = (props) => {
    const { onChange } = props;
    return (
        <MDBInputGroup noBorder textBefore={<MDBIcon fas icon='search' />}>
            <input
                className="search bg-shade rounded-pill p-2"
                type='text' 
                placeholder='Search' 
                onChange={ onChange }
            />
        </MDBInputGroup>
    );
}

export default SearchField;
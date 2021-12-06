import { MDBRow, MDBCol, MDBIcon } from "mdbreact";
import { useState } from 'react';
import SortSelect from "../../components/general/SortSelect";
import SearchField from "../../components/general/SearchField";


const BlogSearchBar = (props) => {

    const { collapsed } = props;
    const [isHidden, setHidden] = useState(true);

    const toggleHideSearch = () => {
        setHidden(!isHidden);
    }

    const renderSearchBar = () => {
        let searchBarComponent;
        if (collapsed) {
            searchBarComponent = (
                <>   
                    <MDBCol size="4" lg="4" className={"p-2 border-right border-dark border-4 search-col"  + (isHidden ? " hidden" : "") }>
                        <MDBRow center className="d-flex justify-content-center">
                            <MDBCol className="d-flex justify-content-center">
                                <SortSelect />
                            </MDBCol>
                            <MDBCol className="d-flex justify-content-center">
                                <SearchField />
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                    <MDBCol top className="d-flex rounded-4 mb-2" size="2" lg="2">
                        <div onClick={ toggleHideSearch }>
                            <MDBIcon icon={ isHidden ? "search" : "times" } size="2x" />
                        </div>
                    </MDBCol>
                </>
            );
        } else {
            searchBarComponent = (
                <MDBCol size="6" lg="6" className="p-2 border-bottom border-dark border-4 search-col">
                    <MDBRow>
                        <MDBCol className="d-flex justify-content-center">
                            <SortSelect />
                        </MDBCol>
                        <MDBCol className="d-flex justify-content-center">
                            <SearchField />
                        </MDBCol>
                    </MDBRow>
                </MDBCol> 
            );
        }
        return searchBarComponent;
    }

    return (        
        <MDBRow end>
            { renderSearchBar() }
        </MDBRow>
    );
}

BlogSearchBar.defaultProps = {
    collapsed: false
}

export default BlogSearchBar;
import { MDBRow, MDBCol, MDBIcon } from "mdbreact";
import useWindowDimensions from '../../hooks/window-dimensions';
import PropTypes from 'prop-types';
import { useState } from 'react';
import SortSelect from "../../components/general/SortSelect";
import SearchField from "../../components/general/SearchField";


const BlogBar = (props) => {

    const { title } = props;
    const [isHidden, setHidden] = useState(true);
    const { height, width } = useWindowDimensions();
    const collapse = width < 785;
    

    const toggleHideSearch = () => {
        setHidden(!isHidden);
    }


    return (        
        <MDBRow between className="rounded-4 text-white bg-dark p-1 mb-2">
            <MDBCol middle size="4" lg="6">
                <h3>{ title }</h3>
            </MDBCol>

            <MDBCol middle className="d-flex justify-content-end flex-column" size="7" lg="6">
                {
                    collapse
                    ? (
                        <div className="d-flex justify-content-end flex-row">
                            <div onClick={ toggleHideSearch }>
                                <MDBIcon icon={"angle-" + (isHidden ? "down" : "up")}/>
                                <MDBIcon className="ml-1" icon="bars" />
                            </div>
                            <div className={"border-right border-4 rounded-bottom pl-3 bg-dark blog-search" + (isHidden ? " hidden" : "")}>
                                <SortSelect />
                                <SearchField />
                            </div>
                        </div>
                    )
                    : (
                        <MDBRow middle>
                            <MDBCol>
                                <SortSelect />
                            </MDBCol>
                            <MDBCol>
                                <SearchField />
                            </MDBCol>
                        </MDBRow>
                    )
                }
                
            </MDBCol>

        </MDBRow>
    );
}

BlogBar.propTypes = {
    searchBar: PropTypes.bool
}

BlogBar.defaultProps = {
    searchBar: true
}

export default BlogBar;
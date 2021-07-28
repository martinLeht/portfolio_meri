import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBFormInline, MDBIcon } from "mdbreact";
import useWindowDimensions from '../../hooks/window-dimensions';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import SideBar from './SideBar';
import SortSelect from "../../components/SortSelect";
import SearchField from "../../components/SearchField";


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

        /*
        <MDBRow between className="rounded-4 text-white bg-dark px-2 mb-2">
            <MDBCol middle size="6" lg="5">
                <h3>Kaikki Julkaisut</h3>
            </MDBCol>
            
            <MDBCol middle className="d-flex justify-content-end" size="5" lg="4">
                <a className="align-self-center mr-4">
                    Lisää Julkaisu
                    <MDBIcon className="ml-2" icon="plus" />
                </a>
                
                <MDBFormInline className="md-form m-0">
                    <MDBInput className="m-0" label="Etsi / Search" />
                    <MDBBtn outline color="white" size="sm" type="submit" className="border-0 m-0">
                        <MDBIcon icon="search" size="2x" />
                    </MDBBtn>
                </MDBFormInline>
            </MDBCol>
        </MDBRow>
        */
    );
}

BlogBar.propTypes = {
    searchBar: PropTypes.bool
}

BlogBar.defaultProps = {
    searchBar: true
}

export default BlogBar;
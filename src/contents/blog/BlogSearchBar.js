import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBFormInline, MDBIcon } from "mdbreact";
import useWindowDimensions from '../../hooks/window-dimensions';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import SideBar from './SideBar';


const BlogBar = (props) => {
    
    const { height, width } = useWindowDimensions();

    const hidden = width < 785;

    const { title, searchBar } = props;

    return(        
        <MDBRow between className="rounded-4 text-white bg-dark p-1 mb-2">
            <MDBCol middle size="4" lg="6">
                <h3>{ title }</h3>
            </MDBCol>

            <MDBCol middle className="d-flex justify-content-end" size="7" lg="6">
                {
                    hidden
                    ? (
                        <div>
                            <MDBIcon icon="angle-down" />
                            <MDBIcon className="ml-1" icon="bars" />
                        </div>
                    )
                    : (
                        <MDBRow middle>
                            <MDBCol>
                                <div>
                                    <label htmlFor="sortOptions">
                                        Lajittele
                                        <MDBIcon className="ml-2" icon="sort-alpha-down" />
                                    </label>
                                    <select className="browser-default custom-select" id="sortOptions">
                                        <option disabled value="1">Uusin ensimmäisenä</option>
                                        <option value="1">Uusin ensimmäisenä</option>
                                        <option value="2">Vanhin ensimmäisenä</option>
                                        <option value="3">Otsikon mukaan (A-Z)</option>
                                        <option value="4">Otsikon mukaan (Z-A) </option>
                                    </select>
                                </div>
                            </MDBCol>
                            <MDBCol>
                                <MDBFormInline className="md-form my-0">
                                    <MDBInput className="m-0" label="Etsi / Search" />
                                    <MDBBtn outline color="white" size="sm" type="submit" className="border-0 my-0">
                                        <MDBIcon icon="search" size="2x" />
                                    </MDBBtn>
                                </MDBFormInline>
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
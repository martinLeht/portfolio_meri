import { BrowserRouter } from 'react-router-dom';
import { MDBNav, MDBNavItem, MDBNavLink, MDBInput, MDBBtn, MDBFormInline, MDBIcon } from "mdbreact";
import PropTypes from 'prop-types';


const SideBar = (props) => {

    const { hidden } = props;
    return (
        <div>
            {
                hidden 
                ? (
                    <div>
                        <MDBIcon icon="angle-left" />
                        <MDBIcon className="ml-1" icon="bars" />
                    </div>
                )
                : (
                    <BrowserRouter>
                        <MDBIcon className="ml-2" icon="angle-double-right" />
                        <MDBNav className="d-flex justify-content-end align-items-end flex-column bg-dark blog-side-bar">
                            <MDBNavItem>
                                <MDBNavLink className="text-white" to="#!">
                                    Lisää Julkaisu
                                    <MDBIcon className="ml-2" icon="plus" />
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBFormInline className="md-form my-0">
                                    <div className="md-form my-0">
                                        <input className="form-control mr-sm-2" type="text"     placeholder="Search" aria-label="Search" />
                                    </div>
                                    <MDBBtn outline color="white" size="sm" type="submit" className="border-0 my-0">
                                        <MDBIcon icon="search" size="2x" />
                                    </MDBBtn>
                                </MDBFormInline>
                            </MDBNavItem>
                        </MDBNav>
                    </BrowserRouter>
                )
            }
        </div>
    );
}

SideBar.propTypes = {
    hidden: PropTypes.bool
}

SideBar.defaultProps = {
    hidden: false
}

export default SideBar;
import { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink, MDBNavbarToggler, MDBCollapse, MDBContainer, MDBBtn, MDBIcon
} from "mdb-react-ui-kit";
import NavItem from './general/NavItem'
import useWindowDimensions from './../hooks/window-dimensions';
import { useAuthentication } from './../hooks/useAuthentication';

const NavBar = () => {

    const [isOpen, setOpen] = useState(false);
    const { authenticatedUser, logout } = useAuthentication();
    const { isMobileSize } = useWindowDimensions();
    let navigate = useNavigate();

    const toggleCollapse = () => {
        setOpen(!isOpen);
    }

    const handleLogout = () => {
        logout().then(() => {
            navigate("/");
        });
    };

    return (
        <MDBNavbar
            fixed="top"
            bgColor='dark'
            dark 
            expand="md">
            <MDBContainer fluid>
                <MDBNavbarBrand href="/">Meri Niemi</MDBNavbarBrand>
                <MDBNavbarToggler
                    aria-controls='navigation'
                    aria-label='Toggle navigation'
                    aria-expanded='false'
                    onClick={ toggleCollapse } 
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                <MDBCollapse navbar show={!isMobileSize || isMobileSize && isOpen}>
                    <MDBNavbarNav left>
                        <NavItem item="Meri" navId="section-about" />
                        <NavItem item="Kokemus" navId="section-experience" />
                        <NavItem item="Galleria" navId="section-gallery" />
                        <NavItem item="Ota Yhteyttä" navId="section-contact" />
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        <NavLink className="nav-link" to="/blog">Blogi</NavLink>
                        <NavLink className="nav-link" to="/insta">Insta feed</NavLink>
                        {
                            authenticatedUser && (
                                <MDBBtn 
                                    outline 
                                    color="white" 
                                    size="sm" 
                                    onClick={handleLogout}>
                                    Logout
                                </MDBBtn>
                            )
                        }
                    </MDBNavbarNav>
                </MDBCollapse> 
            </MDBContainer>
        </MDBNavbar>
    )
        
}

export default NavBar;
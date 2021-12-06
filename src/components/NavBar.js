import React, { useState } from 'react';
import { NavLink, useHistory } from "react-router-dom";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBContainer, MDBBtn
} from "mdbreact";
import NavItem from './general/NavItem'
import { useAuthentication } from './../hooks/useAuthentication';

const NavBar = () => {

    const [isOpen, setOpen] = useState(false);
    const { authenticatedUser, logout } = useAuthentication();
    let history = useHistory();

    const toggleCollapse = () => {
        setOpen(!isOpen );
    }

    const handleLogout = () => {
        logout().then(() => {
            history.push("/");
        });
    };

    return (
        <MDBNavbar 
            fixed="top" 
            scrolling 
            transparent
            color={'elegant-color-dark'} 
            dark 
            expand="md" >
            <MDBContainer fluid>
                <MDBNavbarBrand>
                    <a className="text-white" href="#">Meri Niemi</a>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={toggleCollapse} />
                <MDBCollapse 
                    className="justify-content-center" 
                    id="navigation" 
                    isOpen={ isOpen } 
                    navbar>
                    <MDBNavbarNav right>
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
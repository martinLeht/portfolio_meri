import React, { Component } from 'react';
import NavItem from './NavItem'
import { NavLink } from "react-router-dom";

import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBContainer
} from "mdbreact";

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        const { isOpen } = this.state;

        return (
            <MDBNavbar fixed="top" scrolling transparent
                    color={'elegant-color-dark'} 
                    dark expand="md" >
                <MDBContainer fluid>
                    <MDBNavbarBrand>
                        <a className="text-white" href="#">Meri Niemi</a>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse className="justify-content-center" id="navigation" isOpen={ isOpen } navbar>
                        <MDBNavbarNav right>
                            <NavItem item="Meri" navId="section-about" />
                            <NavItem item="Kokemus" navId="section-experience" />
                            <NavItem item="Galleria" navId="section-gallery" />
                            <NavItem item="Ota Yhteyttä" navId="section-contact" />
                        </MDBNavbarNav>
                        <MDBNavbarNav right>
                            <NavLink className="nav-link" to="/blog">Blogi</NavLink>
                            <NavLink className="nav-link" to="/insta">Instagram</NavLink>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        )
    }
}

export default NavBar;
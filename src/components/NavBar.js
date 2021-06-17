import React, { Component } from 'react';
import NavItem from './NavItem'

import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBContainer,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
    } from "mdbreact";

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isTransparent: true,
            isNavCollapsed: false,
            isOpen: false
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.removeTransparencyOnScroll);
        window.addEventListener('resize', this.removeTransparencyOnResize);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.removeTransparencyOnScroll);
        window.addEventListener('resize', this.removeTransparencyOnResize);
    }

    removeTransparencyOnScroll = () => {
        if (window.scrollY > 480) {
            this.setState({ isTransparent: false});
        } else {
            if (this.state.isNavCollapsed) {
                this.setState({ isTransparent: false});
            } else {
                this.setState({ isTransparent: true});
            }
            
        }
    }

    removeTransparencyOnResize = () => {
        if (window.outerWidth <= 779) {
            this.setState({ isNavCollapsed: true});
            this.setState({ isTransparent: false});
        } else {
            this.setState({ isNavCollapsed: false});
            if (window.scrollY > 480) {
                this.setState({ isTransparent: false});
            } else {
                this.setState({ isTransparent: true});
            }
            
        }
    }

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        return (
            <MDBNavbar className={"sticky-top header-nav"} 
                      color={(this.state.isTransparent ? '': 'white')} light expand="md" >
                <MDBContainer fluid>
                    <MDBNavbarBrand>
                        <a className="text-dark" href="#">Meri Niemi</a>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse className="justify-content-end" id="navigation" isOpen={this.state.isOpen} navbar>
                        <MDBNavbarNav right>
                            <NavItem item="Meri" navId="section-themes" />
                            <NavItem item="Ura" navId="section-about" />
                            <NavItem item="Instagram" navId="section-instagram" />
                            <NavItem item="Ota Yhteyttä" navId="section-contact" />
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        )
    }
}

export default NavBar;
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import {
    MDBRow, MDBCol, MDBCollapse, MDBNavbarBrand, MDBBtn, MDBIcon
} from "mdb-react-ui-kit";
import NavItem from './general/NavItem'
import useWindowDimensions from './../hooks/window-dimensions';
import { useAuthentication } from './../hooks/useAuthentication';

const NavBar = () => {

    const [isCollapsed, setCollapsed] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const [isTransparent, setTransparent] = useState(true);
    
    const { authenticatedUser, logout } = useAuthentication();
    const { isMobileSize } = useWindowDimensions();
    let navigate = useNavigate();


    useEffect(() => {
        window.addEventListener("scroll", changeTransparency);
        return () => {
            window.removeEventListener("scroll", changeTransparency);
        };
    })

    const changeTransparency = () => {
        if (window.scrollY > 80) {
            setTransparent(false);
        } else {
            setTransparent(true);
        }
    }

    const toggleCollapse = () => {
        setOpen(!isOpen);
    }

    const handleLogout = () => {
        logout().then(() => {
            navigate("/");
        });
    };

    const renderNavigation = () => {
        return (
            <>
                <MDBCol size="auto" className="d-flex justify-content-center nav-group">
                    <NavItem size="3" item="Meri" navId="section-about" />
                    <NavItem size="3" item="Kokemus" navId="section-experience" />
                    <NavItem size="3" item="Galleria" navId="section-gallery" />
                    <NavItem size="3" item="Ota Yhteyttä" navId="section-contact" />
                </MDBCol>

                <MDBCol size="auto" className="d-flex justify-content-center nav-group">
                    <NavLink className="nav-link text-white" to="/blog">Blogi</NavLink>
                    <NavLink className="nav-link text-white" to="/insta">Insta feed</NavLink>
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
                </MDBCol>
            </>
        )
    }

    const renderCollapsedNavigation = () => {
        return (
            <>
                <MDBCol size="auto" className="d-flex align-items-center" onClick={toggleCollapse}>
                    <MDBIcon fas icon="bars" size="lg"/>
                </MDBCol>
                <MDBCollapse show={isOpen}>
                    <MDBRow className={'nav-collapsed ' + (isOpen ? 'open' : '')}>
                        <MDBCol className="d-flex justify-content-center flex-column nav-group">
                            <NavItem size="3" item="Meri" navId="section-about" />
                            <NavItem size="3" item="Kokemus" navId="section-experience" />
                            <NavItem size="3" item="Galleria" navId="section-gallery" />
                            <NavItem size="3" item="Ota Yhteyttä" navId="section-contact" />
                        </MDBCol>

                        <MDBCol className="d-flex justify-content-center flex-column nav-group"> 
                            <NavLink className="nav-link text-white" to="/blog">Blogi</NavLink>
                            <NavLink className="nav-link text-white" to="/insta">Insta feed</NavLink>
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
                        </MDBCol>
                    </MDBRow>
                </MDBCollapse>
            </>
        )
    }


    return (
        <nav>
            <MDBRow between className={"p-2 text-white nav-bar " + (isTransparent ? 'transparent' : '')}>
                <MDBCol size="auto">
                    <MDBNavbarBrand className="text-white" href="/">Meri Niemi</MDBNavbarBrand>
                </MDBCol>
                {
                    isMobileSize
                    ? renderCollapsedNavigation()
                    : renderNavigation()
                }
                
            </MDBRow>
        </nav>
    )
        
}

export default NavBar;
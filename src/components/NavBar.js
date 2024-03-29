import { useEffect, useState } from 'react';
import { useKeycloak } from "@react-keycloak/web";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import {
    MDBRow, MDBCol, MDBCollapse, MDBNavbarBrand, MDBBtn, MDBIcon, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBDropdownLink
} from "mdb-react-ui-kit";
import NavItem from './general/NavItem'
import Emoji from './general/Emoji';
import useWindowDimensions from './../hooks/window-dimensions';
import { useAuthentication } from './../hooks/useAuthentication';
import { languageOptions } from './../translation/lang-options';

const NavBar = () => {
    const [isOpen, setOpen] = useState(false);
    const [isTransparent, setTransparent] = useState(true);
    const [language, setLanguage] = useState();
    const { keycloak, initialized } = useKeycloak();
    const { authenticatedUser, logout, login } = useAuthentication();
    const { isMobileSize } = useWindowDimensions();
    const { t, i18n } = useTranslation();
    let navigate = useNavigate();


    useEffect(() => {
        setLanguage(i18n.language);
        window.addEventListener("scroll", changeTransparency);
        return () => {
            window.removeEventListener("scroll", changeTransparency);
        };
    }, [i18n.language])

    const changeTransparency = () => {
        if (isMobileSize) {
            if (isOpen || window.scrollY > 80) {
                setTransparent(false);
            } else {
                setTransparent(true);
            }
            
        } else {
            if (window.scrollY > 80) {
                setTransparent(false);
            } else {
                setTransparent(true);
            }
        }
        
    }

    const toggleCollapse = () => {
        if (isMobileSize) {
            if (isOpen && window.scrollY < 80) {
                setTransparent(true);
            } else {
                setTransparent(false);
            }
        }
        setOpen(!isOpen);
    }

    const handleLogout = () => {
        /*
        logout().then(() => {
            navigate("/");
        });
        */
        logout();
    };

    const handleLogin = () => {
        /*
        logout().then(() => {
            navigate("/");
        });
        */
       login(null);
    };

    const changeLanguage = (langKey, langName) => {
        i18n.changeLanguage(langKey);
    }

    const renderNavigation = () => {
        return (
            <>
                <MDBCol size="auto" className="d-flex justify-content-center nav-group">
                    <NavItem size="3" item={ t("nav.about") } navId="section-about" />
                    <NavItem size="3" item={ t("nav.experience") } navId="section-experience" />
                    <NavItem size="3" item={ t("nav.gallery") } navId="section-gallery" />
                    <NavItem size="3" item={ t("nav.contact") } navId="section-contact" />
                </MDBCol>

                <MDBCol size="auto" className="d-flex justify-content-center nav-group">
                    <NavLink className="nav-link text-white" to="/blog">{ t("nav.blog") }</NavLink>
                    <NavLink className="nav-link text-white" to="/insta">{ t("nav.insta") }</NavLink>
                    <MDBDropdown group>
                        <MDBDropdownToggle
                            outline
                            color="light"
                            size='sm'>
                                { 
                                    language && (
                                        languageOptions.find(opt => opt.key.toLowerCase() === language.toLowerCase()).symbol + ` | ${language}`
                                    )
                                }
                        </MDBDropdownToggle>
                        <MDBDropdownMenu>
                            {
                                languageOptions.map((opt, i) => (
                                    <MDBDropdownItem key={ i }>
                                        <MDBDropdownLink tag='button' type='button' onClick={() => changeLanguage(opt.key, opt.name)}>
                                            { opt.name }
                                            <Emoji className="ms-2" label={ opt.key } symbol={ opt.symbol }/>
                                        </MDBDropdownLink>
                                    </MDBDropdownItem>
                                ))
                            }
                        </MDBDropdownMenu>
                    </MDBDropdown>
                    {
                        keycloak.authenticated
                        ? <MDBBtn className="ms-2" outline color="white" size="sm" onClick={handleLogout}>{ t("nav.logout") }</MDBBtn>
                        : <MDBBtn className="ms-2" outline color="white" size="sm" onClick={handleLogin}>{ t("nav.login") }</MDBBtn>
                    }
                </MDBCol>
            </>
        )
    }

    const renderCollapsedNavigation = () => {
        return (
            <>
                <MDBCol size="auto" className="d-flex align-items-center" onClick={toggleCollapse}>
                    {
                        isOpen 
                        ? <MDBIcon icon="times" size="lg"/>
                        : <MDBIcon fas icon="bars" size="lg"/>
                    }
                </MDBCol>
                <MDBCollapse show={isOpen}>
                    <MDBRow center className={'nav-collapsed ' + (isOpen ? 'open' : '')}>
                        <MDBCol size="auto" className="nav-group text-center py-2">
                            <NavItem size="3" item={ t("nav.about") } navId="section-about" />
                            <NavItem size="3" item={ t("nav.experience") } navId="section-experience" />
                            <NavItem size="3" item={ t("nav.gallery") } navId="section-gallery" />
                            <NavItem size="3" item={ t("nav.contact") } navId="section-contact" />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow center className="border-top border-2">
                        <MDBCol size="auto" className="nav-group text-center">
                            <NavLink className="nav-link text-white" to="/blog">{ t("nav.blog") }</NavLink>
                            <NavLink className="nav-link text-white" to="/insta">{ t("nav.insta") }</NavLink>
                            <div>
                                <MDBDropdown group>
                                    <MDBDropdownToggle
                                        outline 
                                        color="light" 
                                        size='sm'>
                                        { 
                                            language && (
                                                languageOptions.find(opt => opt.key.toLowerCase() === language.toLowerCase()).symbol + ` | ${language}`
                                            )
                                        }
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        {
                                            languageOptions.map((opt, i) => (
                                                <MDBDropdownItem key={ i }>
                                                    <MDBDropdownLink tag='button' type='button' onClick={() => changeLanguage(opt.key, opt.name)}>
                                                        { opt.name }
                                                        <Emoji className="ms-2" label={ opt.key } symbol={ opt.symbol }/>
                                                    </MDBDropdownLink>
                                                </MDBDropdownItem>
                                            ))
                                        }
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </div>
                            {
                                keycloak.authenticated
                                ? <MDBBtn className="mt-2" outline color="white" size="sm" onClick={handleLogout}>{ t("nav.logout") }</MDBBtn>
                                : <MDBBtn className="mt-2" outline color="white" size="sm" onClick={handleLogin}>{ t("nav.login") }</MDBBtn>
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
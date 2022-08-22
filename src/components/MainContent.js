import  { lazy, Suspense } from 'react';
import { Route, Routes } from "react-router-dom";
import { MDBContainer } from 'mdb-react-ui-kit';
import Loader from './general/Loader';

/* Lazy loaded components */
const NavBar = lazy(() => import('./NavBar'));
const Header = lazy(() => import('./Header'));
const Footer = lazy(() => import('./Footer'));
const FrontPage = lazy(() => import('../contents/front-page/FrontPage'));
const Blog = lazy(() => import('../contents/blog/Blog'));
const InstaFeed = lazy(() => import('../contents/insta/InstaFeed'));

const MainContent = () => {

    return (
        <>
            <Suspense fallback={ <Loader pulse /> }>
                <NavBar />
                <Header />
                <MDBContainer fluid className="main-content">
                        <Routes>
                            <Route exact path="/" element={ 
                                <Suspense fallback={ <Loader pulse/> }>
                                    <FrontPage /> 
                                </Suspense>
                            } />
                            <Route path="/blog/*" element={ 
                                <Suspense fallback={ <Loader pulse/> }>
                                    <Blog />
                                </Suspense>
                            }/>
                            <Route exact path="/insta" element={ 
                                <Suspense fallback={ <Loader pulse/> }>
                                    <InstaFeed />
                                </Suspense>
                            } />
                        </Routes>
                </MDBContainer>
                <Footer/>
            </Suspense>
        </>
    )
    
}

export default MainContent;
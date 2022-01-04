import  { lazy, Suspense } from 'react';
import { Route, Routes } from "react-router-dom";
import { MDBContainer } from 'mdb-react-ui-kit';
import NavBar from './NavBar';
import Footer from './Footer';
import Header from './Header';
import LoadingSpinner from './general/LoadingSpinner';

/* Lazy loaded components */
const FrontPage = lazy(() => import('../contents/front-page/FrontPage'));
const Blog = lazy(() => import('../contents/blog/Blog'));
const InstaFeed = lazy(() => import('../contents/insta/InstaFeed'));

const MainContent = () => {

    return (
        <>
            <NavBar />
            <Header />
            <MDBContainer fluid className="main-content">
                    <Routes>
                        <Route exact path="/" element={ 
                            <Suspense fallback={ <LoadingSpinner /> }>
                                <FrontPage /> 
                            </Suspense>
                        } />
                        <Route path="/blog/*" element={ 
                            <Suspense fallback={ <LoadingSpinner /> }>
                                <Blog />
                            </Suspense>
                        }/>
                        <Route exact path="/insta" element={ 
                            <Suspense fallback={ <LoadingSpinner /> }>
                                <InstaFeed />
                            </Suspense>
                        } />
                    </Routes>
            </MDBContainer>
            <Footer />
        </>
    )
    
}

export default MainContent;
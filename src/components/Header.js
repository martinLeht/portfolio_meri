import { Routes, Route } from "react-router-dom";
import NavBar from './NavBar';
import ImageCarouselHeader from '../contents/header/ImageCarouselHeader';
import HeaderPanel from '../contents/header/HeaderPanel';

const Header = () => {            

    return (
        <header>
            <NavBar />
            <Routes>
                <Route exact path="*" element={ <ImageCarouselHeader /> } />
                <Route exact path="/insta" element={ 
                    <HeaderPanel heading="Instagram Feed" img="../images/mertsa_ig_header.jpg" icon="fab fa-instagram"/> 
                }/>
                <Route path="/blog" element={ 
                    <HeaderPanel heading="Blog" img="../images/mertsa_ig_header.jpg" /> 
                }/>
            </Routes>
        </header>
    )
}

export default Header;
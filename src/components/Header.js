import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ImageCarouselHeader from '../contents/header/ImageCarouselHeader';
import HeaderPanel from '../contents/header/HeaderPanel';

const Header = () => {            

    const { t } = useTranslation();

    return (
        <header>
            <Routes>
                <Route exact path="*" element={ <ImageCarouselHeader /> } />
                <Route exact path="/insta" element={ 
                    <HeaderPanel heading={t('insta.title')} img="../images/mertsa_ig_header.jpg" icon="fab fa-instagram"/> 
                }/>
                <Route path="/blog" element={ 
                    <HeaderPanel heading={t('blog.title')} img="../images/mertsa_ig_header.jpg" /> 
                }/>
            </Routes>
        </header>
    )
}

export default Header;
import  { Component } from 'react';
import SectionBgColors from '../../resources/SectionBgColors';
import HelmetMetaData from '../../components/general/HelmetMetaData';
import Experience from './Experience';
import About from './About';
import ImageGallery from './ImageGallery';
import Contact from './Contact';


class FrontPage extends Component {

    constructor() {
        super();

        this.sectionBackgroundsMap = new Map([
            ['section-about', SectionBgColors.ABOUT_BG],
            ['section-experience', SectionBgColors.CAREER_BG],
            ['section-gallery', SectionBgColors.GALLERY_BG],
            ['section-contact', SectionBgColors.CONTACT_BG]
        ]);
    }

    componentDidMount() {
        window.addEventListener("scroll", () => this.onScrollBackgroundColorHandler(this.sectionBackgroundsMap, this.sectionBreakCheckCallback));
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", () => this.onScrollBackgroundColorHandler(this.sectionBackgroundsMap, this.sectionBreakCheckCallback));
    }

    /* Scroll handler to change backround color for sections */
    onScrollBackgroundColorHandler (sectionBackgroundsMap, sectionBreakCheckCallback) {
        let frontPage = document.getElementsByClassName('front-page')[0];
        if (frontPage !== undefined) {
            if (window.location.pathname === '/') {
                let color = SectionBgColors.DEFAULT_BG;
                sectionBackgroundsMap.forEach((bgColor, sectionId) => {
                    if (sectionBreakCheckCallback(sectionId)) {
                        color = bgColor;
                    }
                });
                /* If page is scrolled to bottom, use white background */
                if (window.innerHeight + window.pageYOffset >= document.body.clientHeight) {
                    color = SectionBgColors.DEFAULT_BG;
                }
                frontPage.style.background = color;
            } else {
                frontPage.style.background = SectionBgColors.DEFAULT_BG;
            }
        }
        
    }

    /* Section break check (relative to navbar height + extra 180 pixels) */
    sectionBreakCheckCallback = (sectionId) => {
        const section = document.getElementById(sectionId)
        const navHeight = document.getElementsByClassName("nav-bar")[0].offsetHeight + 350;
        const clientOffsetTop = window.pageYOffset + navHeight;
        if (clientOffsetTop >= section.offsetTop) {
            section.classList.add('fade-in');
            section.classList.remove('fade-out');
            return true;
        }
        section.classList.add('fade-out');
        section.classList.remove('fade-in')
        
        return false;
    }    

    render() {
        return (
            <>
                <HelmetMetaData
                    title="Meri Niemi"
                />
                <div className="front-page">
                    <About navId="section-about" />
                    <Experience navId="section-experience" />
                    <ImageGallery navId="section-gallery" />
                    <Contact navId="section-contact" email="joku.sposti@gmail.com" />
                </div>
            </>
        )
    }
    
}

export default FrontPage;
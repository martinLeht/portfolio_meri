import  { useEffect, createRef } from 'react';
import { throttle } from 'lodash';
import SectionBgColors from '../../resources/SectionBgColors';
import HelmetMetaData from '../../components/general/HelmetMetaData';
import Experience from './Experience';
import About from './About';
import ImageGallery from './ImageGallery';
import Contact from './Contact';


const FrontPage = () => {

    const frontPageRef = createRef();
    const aboutRef = createRef();
    const experienceRef = createRef();
    const galleryRef = createRef();
    const contactRef = createRef();

    const sectionBackgroundsMap = new Map([
        ['section-about', SectionBgColors.ABOUT_BG],
        ['section-experience', SectionBgColors.CAREER_BG],
        ['section-gallery', SectionBgColors.GALLERY_BG],
        ['section-contact', SectionBgColors.CONTACT_BG]
    ]);

    /* Scroll handler to change backround color for sections */
    const onScrollBackgroundColorHandler = () => {
        if (window.location.pathname === '/') {
            let color = SectionBgColors.DEFAULT_BG;
            const navHeight = document.getElementsByClassName("nav-bar")[0].offsetHeight + 300;
            const clientOffsetTop = window.pageYOffset + navHeight;
            sectionBackgroundsMap.forEach((bgColor, sectionId) => {
                if (sectionBreakCheckCallback(sectionId, clientOffsetTop)) {
                    color = bgColor;
                }
            });
            
            /* If page is scrolled to bottom, use white background and force fade in for bottom section */
            if (window.pageYOffset < 300) {
                color = SectionBgColors.ABOUT_BG;
            } else if (Math.ceil(window.innerHeight + window.pageYOffset) >= document.body.clientHeight) {
                color = SectionBgColors.DEFAULT_BG;
                contactRef.current.classList.add('fade-in');
                contactRef.current.classList.remove('fade-out');
            }
            frontPageRef.current.style.background = color;
        } else {
            if (frontPageRef.current) {
                frontPageRef.current.style.background = SectionBgColors.DEFAULT_BG;
            }
        }
        
    }

    /* Section break check (relative to navbar height + extra 180 pixels) */
    const sectionBreakCheckCallback = (sectionId, clientOffsetTop) => {
        if (sectionId === 'section-about') {
            return hasPassedSection(aboutRef, clientOffsetTop)
        } else if (sectionId === 'section-experience') {
            return hasPassedSection(experienceRef, clientOffsetTop)
        } else if (sectionId === 'section-gallery') {
            return hasPassedSection(galleryRef, clientOffsetTop)
        } else if (sectionId === 'section-contact') {
            return hasPassedSection(contactRef, clientOffsetTop)
        } else {
            return false;
        }
    }   

    const hasPassedSection = (sectionRef, clientOffsetTop) => {
        if (clientOffsetTop >= sectionRef.current.offsetTop) {
            sectionRef.current.classList.add('fade-in');
            sectionRef.current.classList.remove('fade-out');
            return true;
        }
        sectionRef.current.classList.add('fade-out');
        sectionRef.current.classList.remove('fade-in');
        return false
    };

    useEffect(() => {
        const throtteledScrollBackgroundColorHandler = throttle(onScrollBackgroundColorHandler, 200);
        window.addEventListener("scroll", throtteledScrollBackgroundColorHandler, { passive: true });

        return () => window.removeEventListener("scroll", throtteledScrollBackgroundColorHandler);

    }, []);

    return (
        <>
            <HelmetMetaData
                title="Meri Niemi"
            />
            <div ref={frontPageRef} className="front-page">
                <About ref={aboutRef} navId="section-about" />
                <Experience ref={experienceRef} navId="section-experience" />
                <ImageGallery ref={galleryRef} navId="section-gallery" />
                <Contact ref={contactRef} navId="section-contact" email="joku.sposti@gmail.com" />
            </div>
        </>
    );
    
}

export default FrontPage;
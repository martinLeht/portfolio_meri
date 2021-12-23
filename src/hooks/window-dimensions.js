import { useState, useEffect } from 'react';

const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    const isMobileSize = width < 992;
    return {
        width,
        height,
        isMobileSize
    };
}

const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        
        const handleResize = () => {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

export default useWindowDimensions;
    
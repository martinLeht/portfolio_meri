import { useRef, useCallback, useEffect } from 'react';

const useScrollListener = (element, handleScroll, throttle = 500) => {
    const scrollingTimer = useRef();

    const listenToScroll = useCallback((e) => {
        clearTimeout(scrollingTimer.current);
        scrollingTimer.current = setTimeout(
            () =>
                requestAnimationFrame(() => {
                    handleScroll(e);
                }),
            throttle // we have a new parameter for the hook. handleScroll will fire max every throttle (ms)
        );
    }, [scrollingTimer, throttle]);

    const removeScrollListener = useCallback(() => {
        if (element.current) {
            clearTimeout(scrollingTimer.current);
            element.current?.removeEventListener('scroll', listenToScroll);
        }
    }, [scrollingTimer, listenToScroll, element]);

    useEffect(() => {
        if (element.current) {
            element.current.addEventListener('scroll', listenToScroll);
        }
        return () => {
            removeScrollListener();
        };
    }, [listenToScroll, removeScrollListener, element]);
};

export default useScrollListener;
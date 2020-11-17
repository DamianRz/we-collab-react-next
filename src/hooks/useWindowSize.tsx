import { useState, useEffect } from 'react';

// Hook
export const useWindowSize = () => {
    const [size, setSize] = useState({
        width: -1,
        height: -1,
    });

    useEffect(() => {
        // Handler to call on window resize
        const handleResize = () => {
            // Set window width/height to state
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    const screenMode = () => {
        let width = Number(size.width)
        if (width < 600) {
            return 'xs';
        } else if (width > 600 && width < 960) {
            return 'sm'
        } else if (width > 960) {
            return 'md'
        }
    }

    return { size, screenMode };
}
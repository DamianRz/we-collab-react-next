import { useEffect } from 'react';

// Hook that include class of animation of the passed ref

export const useAnimation = (ref: any, showMenu: any) => {
    useEffect(() => {

        // const handleElement = (event:any) => {
        //     if (ref.current && !ref.current.contains(event.target)) {
        //         showMenu(false);
        //     }
        // }
        // // Bind the event listener
        // document.addEventListener("mousedown", handleClickOutside);
        // return () => {
        //     // Unbind the event listener on clean up
        //     document.removeEventListener("mousedown", handleClickOutside);
        // };
    }, [ref]);
}

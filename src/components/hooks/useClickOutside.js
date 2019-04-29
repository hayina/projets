import { useEffect } from 'react';



const useClickOutside = (nodeElement, f) => {

    
    function handleClickOutside(event) {
        if ( event.which === 1 && !nodeElement.current.contains(event.target)) {
            f();
        }
    }


    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () =>  document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
} 

export default useClickOutside;
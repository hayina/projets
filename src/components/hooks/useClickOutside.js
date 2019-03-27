import { useEffect } from 'react';


const useClickOutside = (nodeElement, f, deps=[]) => {

    
    function handleClickOutside(event) {
        
        if ( event.which === 1 && nodeElement.current && !nodeElement.current.contains(event.target)) {
            // console.log('Click Outside DETECTED !!!', event.target, event.which)
            f();
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () =>  document.removeEventListener('mousedown', handleClickOutside);
    }, deps);
    
} 

export default useClickOutside;
import { useEffect } from 'react';


const useClickOutside = (nodeElement, f) => {

    function handleClickOutside(event) {
        if (nodeElement && !nodeElement.contains(event.target)) {
            f();
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () =>  document.removeEventListener('mousedown', handleClickOutside);
    });
    
} 

export default useClickOutside;
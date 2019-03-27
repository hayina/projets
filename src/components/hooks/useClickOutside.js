import { useEffect } from 'react';


const useClickOutside = (nodeElement, f) => {

    console.log('useClickOutside ----------------------------->')
    function handleClickOutside(event) {
        // console.log('event.target -->', event.target)
        console.log('nodeElement -->', nodeElement)
        // console.log(nodeElement && !nodeElement.contains(event.target))
        if (nodeElement && !nodeElement.contains(event.target)) {

            // console.log(f)
            f();
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () =>  document.removeEventListener('mousedown', handleClickOutside);
    }, [nodeElement]);
    
} 

export default useClickOutside;
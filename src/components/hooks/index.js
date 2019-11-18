import { useEffect, useRef, useLayoutEffect } from 'react'
import useClickOutside from './useClickOutside';
import { hideModal } from '../../actions';

export const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export const useModalSetting = (modalRef, dispatch) => {

    useLayoutEffect(() => {
        document.body.classList.add('modal-on')
        return () => document.body.classList.remove('modal-on')
    }, [])

    useClickOutside(modalRef, () => dispatch(hideModal()));
}
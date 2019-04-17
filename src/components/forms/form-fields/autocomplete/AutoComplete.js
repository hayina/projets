import React, { useRef, useReducer, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { change } from 'redux-form';
import axios from 'axios';

import { reducer, initialState } from './acReducer';

import useClickOutside from '../../../hooks/useClickOutside';

// import { getLoadingStatus, getErrorsStatus } from '../../../reducers/autocomplete'

import './autocomplete.css'
import useApi from '../../../hooks/useApi';
import useAjaxFetch from '../../../hooks/useAjaxFetch';
import { ApiError } from '../../../helpers';


const AutoComplete = ({ onSelect, url, validateClass }) => {


    const [state, dispatch] = useReducer(reducer, initialState);

    const { showSuggestions, suggestions, activeSuggestion, term, loading, errors } = state;

    const autocompleteRef = useRef(null);

    //////// EVENT HANDLERS

    // custom hook
    useClickOutside(autocompleteRef, () => {
        // console.log('autoComplete useClickOutside !!!', url, state)
        if (showSuggestions) {
            dispatch({ type: 'TOGGLE_SUGGESTIONS', toggle: false });
        }
    }, [showSuggestions]);


    const lastTypedTerm = useRef('')
    const onChange = (e) => {

        const { value } = e.target;
        lastTypedTerm.current = value

        dispatch({ type: 'SET_AC_INPUT', term: value });

        if (value) {
            fetchSuggestions(value);
        }
        else {
            dispatch({ type: 'INIT_AC' });
        }
    }

    const onFocus = (e) => {
        // const { value } = e.target;
        if ( e.target.value && !errors ) {
            dispatch({ type: 'TOGGLE_SUGGESTIONS', toggle: true });
        }
    }

    const onKeyDown = (e) => {

        const keyCode = e.keyCode || e.which;
        //ENTER
        if (keyCode === 13) {
            selectSuggestion(suggestions[activeSuggestion]);
        }
        //UP
        else if (keyCode === 38) {
            if (activeSuggestion > 0) {
                handlingUpDownKeys(activeSuggestion - 1);
            }
        }
        //DOWN
        else if (keyCode === 40) {
            if (activeSuggestion < suggestions.length - 1) {
                handlingUpDownKeys(activeSuggestion + 1);
            }
        }
    }

    // click on suggestion
    const onClick = (e, suggestion) => selectSuggestion(suggestion);

    // hover on suggestion
    const onMouseEnter = (e, activeSuggestion) => dispatch({ type: 'SET_ACTIVE_SUGGESTION', activeSuggestion });

    // leaving suggestions list
    const onMouseLeave = (e) => {

        if ( suggestions.length > 0 ) {
            dispatch({ type: 'SET_ACTIVE_SUGGESTION', activeSuggestion: -1 });
        }
    }


    //////// HELPERS 

    const fetchSuggestions = (q) => {
        
        dispatch({ type: 'AC_API_CALL' });

        axios({
            // SETUP PARAMS
            // baseURL: '/PROJETS/ajax',
            baseURL: '/PROJET-API/api',
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            // PASSED PARAMS
            url,
            method: 'GET',
            params: { q }
        })
        .then((response) => {
            // if( q !== lastTypedTerm.current ) console.log(`Canceling for -----------------> "${q}"`)
            if ( q === lastTypedTerm.current ) { 
                dispatch({
                    type: 'AC_API_SUCCESS',
                    suggestions: response.data 
                    //.map((s) => ({ id: s.id, label: s.label }))
                });
            }
        })
        .catch((error) => {
            if ( q === lastTypedTerm.current ) { 
                console.log(error);
                dispatch({ type: 'AC_API_ERROR' });
            }
        })
    }


    const selectSuggestion = (suggestion) => {
        dispatch({ type: 'INIT_AC' });
        onSelect(suggestion);
    }

    const handlingUpDownKeys = (index) => {
        dispatch({ type: 'UP_DOWN_KEY_PRESSED',
            activeSuggestion: index, 
        });
    }



    //////// RENDER HELPERS

    function renderSuggestionsList() {

        let suggestionsList;

        if (showSuggestions) {
        // if (showSuggestions && !errors) {
            if (suggestions.length > 0) {
                suggestionsList = suggestions.map((suggestion, i) => (
                    <li
                        onClick={(e) => onClick(e, suggestion)}
                        onMouseEnter={(e) => onMouseEnter(e, i)}
                        className={`suggestions-item ${(i === activeSuggestion) ? 'active-suggestion' : ''}`}
                        key={suggestion.value}
                    >
                        {suggestion.label}
                        {/* - ({i}) ({activeSuggestion}) */}
                    </li>
                ))
            } else {
                suggestionsList = (<li className="no-suggestions">No results found</li>)
            }
            return (<ul className="suggestions-list" onMouseLeave={onMouseLeave}>{suggestionsList}</ul>)
        }

    }

    return (
        <div className="autocomplete-wrapper" ref={autocompleteRef}>
            <div className="oc-input-wr">
                <input type="text" className={`form-control autocomplete-input ${validateClass}`}
                    onChange={onChange}
                    onFocus={onFocus}
                    onKeyDown={onKeyDown}
                    value={term}
                // value={term}
                />
                { loading && 
                    <div className="spinner-wr">
                        <i className='fas fa-spinner ac-sppiner'></i>
                    </div>
                }
                {/* {loading && (<i className='fas fa-spinner ac-sppiner'></i>)} */}
                {/* <i className={`fas fa-spinner ac-sppiner ${ loading ? '' : 'hide' }`}></i> */}

            </div>

            {/* {renderSuggestionsList()} */}
            {   !errors ?  
                renderSuggestionsList() 
                : 
                <ApiError cssClass="ac-ap-error" />
            }
        </div>
    )
}

export default AutoComplete;
// export default connect()(AutoComplete);

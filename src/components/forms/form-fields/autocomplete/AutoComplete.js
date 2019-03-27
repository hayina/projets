import React, { useRef, useReducer } from 'react';
import { connect } from 'react-redux';
import { change } from 'redux-form';
import axios from 'axios';

import { reducer, initialState } from './acReducer';

import useClickOutside from '../../../hooks/useClickOutside';

// import { getLoadingStatus, getErrorsStatus } from '../../../reducers/autocomplete'

import './autocomplete.css'


const AutoComplete = ({ onSelect, url }) => {


    const [state, hooksDispatch] = useReducer(reducer, initialState);

    const { showSuggestions, suggestions, activeSuggestion, term, loading, errors } = state;

    const autocompleteRef = useRef(null);

    //////// EVENT HANDLERS

    // custom hook
    useClickOutside(autocompleteRef.current, () => {
        console.log('autoComplete Callback Function !!!', url)
        if (showSuggestions) {
            hooksDispatch({ type: 'TOGGLE_SUGGESTIONS', toggle: false });
        }
    });


    const onChange = (e) => {

        const { value } = e.target;

        hooksDispatch({ type: 'SET_AC_INPUT', term: value });

        // reduxFormHandler(value);

        if (value) {
            fetchSuggestions(value);
        }
        else {
            // setState({ ...state, loading: false, showSuggestions: false, suggestions: [] });
            hooksDispatch({ type: 'INIT_AC' });
        }
    }

    const onFocus = (e) => {
        const { value } = e.target;
        if (value && !errors) {
            hooksDispatch({ type: 'TOGGLE_SUGGESTIONS', toggle: true });
            //     fetchSuggestions(value);
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
    const onMouseEnter = (e, activeSuggestion) => hooksDispatch({ type: 'SET_ACTIVE_SUGGESTION', activeSuggestion });

    // leaving suggestions list
    const onMouseLeave = (e) => {

        if ( suggestions.length > 0 ) {
            hooksDispatch({ type: 'SET_ACTIVE_SUGGESTION', activeSuggestion: -1 });
        }
    }


    //////// HELPERS 

    const fetchSuggestions = (q) => {

        hooksDispatch({ type: 'AC_API_CALL' });

        axios({
            // SETUP PARAMS
            baseURL: '/PROJETS/ajax',
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            // PASSED PARAMS
            url,
            method: 'GET',
            params: { q }
        })
            .then((response) => {

                // if (state.term) { // it must be the current TERM and not the one been sent to the api server
                hooksDispatch({
                    type: 'AC_API_SUCCESS',
                    suggestions: response.data.map((s) => ({ id: s.id, label: s.label }))
                });
                // }
            })
            .catch((error) => {
                console.log(error);
                hooksDispatch({ type: 'AC_API_ERROR' });
            })

    }

    const selectSuggestion = (suggestion) => {

        hooksDispatch({ type: 'INIT_AC' });

        onSelect(suggestion);
        // reduxFormHandler(suggestion);
        
        // hooksDispatch({ type: 'SET_AC_INPUT', term: suggestion.label });
    }

    const handlingUpDownKeys = (index) => {

        hooksDispatch({ type: 'UP_DOWN_KEY_PRESSED',
            activeSuggestion: index, 
            // term: suggestions[index].label
        });
        // reduxFormHandler(suggestions[index].label);
    }



    //////// RENDER HELPERS

    function renderSuggestionsList() {

        let suggestionsList;

        if (showSuggestions && !errors) {
            if (suggestions.length > 0) {
                suggestionsList = suggestions.map((suggestion, i) => (
                    <li
                        onClick={(e) => onClick(e, suggestion)}
                        onMouseEnter={(e) => onMouseEnter(e, i)}
                        className={`suggestions-item ${(i === activeSuggestion) ? 'active-suggestion' : ''}`}
                        key={suggestion.id}
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
                <input type="text" className={`form-control autocomplete-input`}
                    onChange={onChange}
                    onFocus={onFocus}
                    onKeyDown={onKeyDown}
                    value={term}
                // value={term}
                />
                {loading && (<i className='fas fa-spinner ac-sppiner'></i>)}
                {/* <i className={`fas fa-spinner ac-sppiner ${ loading ? '' : 'hide' }`}></i> */}

            </div>

            {renderSuggestionsList()}
        </div>
    )
}

export default AutoComplete;
// export default connect()(AutoComplete);

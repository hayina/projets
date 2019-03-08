import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { change } from 'redux-form';
import axios from 'axios';

import useClickOutside from '../../hooks/useClickOutside';

// import { getLoadingStatus, getErrorsStatus } from '../../../reducers/autocomplete'

import './autocomplete.css'


const AutoComplete = ({ dispatch, reduxForm }) => {


    const [state, setState] = useState({
        term: '',
        suggestions: [],
        showSuggestions: false,
        activeSuggestion: -1,
        loading: false,
        errors: false
    });


    const { showSuggestions, suggestions, activeSuggestion, term, loading, errors } = state;

    const inputEl = useRef(null);


    //////// EVENT HANDLERS

    // custom hook
    useClickOutside(inputEl.current, () => {
        if (showSuggestions) {
            setState({ ...state, showSuggestions: false });
        }
    });


    const onChange = (e) => {

        const { value } = e.target;

        setState({ ...state, term: value });

        reduxFormHandler(value);

        if (value) {
            fetchSuggestions(value);
        }
        else {
            setState({ ...state, loading: false, showSuggestions: false, suggestions: [] });
        }
    }

    const onFocus = (e) => {
        const { value } = e.target;
        if (value && !errors) {
            setState({ ...state, showSuggestions: true });
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
    const onMouseEnter = (e, activeSuggestion) => setState({ ...state, activeSuggestion });

    // leaving suggestions list
    const onMouseLeave = (e) => setState({ ...state, activeSuggestion: -1 });


    //////// HELPERS 

    const fetchSuggestions = (q) => {

        console.log(q);

        setState({ ...state, loading: true, errors: false });

        axios({
            // SETUP PARAMS
            baseURL: '/PROJETS/ajax',
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            // PASSED PARAMS
            url: '/get_partners',
            method: 'GET',
            params: { q }
        })
            .then((response) => {

                // if (state.term) { // it must be the current TERM and not the one been sent to the api server
                setState({
                    ...state, loading: false, showSuggestions: true,
                    suggestions: response.data.map((s) => ({ id: s.id, label: s.label }))
                });
                // }
            })
            .catch((error) => {
                console.log(error);
                setState({ ...state, loading: false, errors: true });
            })

    }

    const selectSuggestion = (suggestion) => {

        setState({
            ...state,
            showSuggestions: false,
            activeSuggestion: -1,
            term: suggestion.label,
            suggestions: []
        });

        reduxFormHandler(suggestion.label);
    }

    const handlingUpDownKeys = (index) => {
        setState({ ...state, activeSuggestion: index, term: suggestions[index].label });
        reduxFormHandler(suggestions[index].label);
    }

    const reduxFormHandler = (value) => {

        if (reduxForm) {
            dispatch(change(reduxForm.form, reduxForm.field, value));
        }
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
        <div className="autocomplete-wrapper" ref={inputEl}>
            <div className="oc-input-wr">
                <input type="text" className="form-control autocomplete-input"
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

export default connect()(AutoComplete);

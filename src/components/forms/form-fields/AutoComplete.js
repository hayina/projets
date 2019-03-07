import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';

import useClickOutside from '../../hooks/useClickOutside';
import {
    selectSuggestion, initActiveSuggestion, outsideClick, setReduxForm, autoCompleteInit, autoCompleteDestroy,
    setActiveSuggestion, handleKeyPressed, inputChanged, inputFocused
} from '../../../actions/autocomplete'

// import { getLoadingStatus, getErrorsStatus } from '../../../reducers/autocomplete'

import './autocomplete.css'

const AutoComplete = ({ autocomplete, dispatch, reduxForm }) => {

    useEffect(() => {
        // ComponentDidMount
        dispatch(autoCompleteInit());
        // ComponentWillUnmount
        return () => {
            dispatch(autoCompleteDestroy());
        }
    }, [])

    useEffect(() => {
        if (reduxForm) dispatch(setReduxForm(reduxForm));
    }, []);

    const inputEl = useRef(null);

    // using the custom Hook
    useClickOutside(inputEl.current, () => dispatch(outsideClick()));

    const onChange = (e) => dispatch(inputChanged(e.target.value));

    const onFocus = (e) => dispatch(inputFocused(e.target.value));

    const onKeyDown = (e) => dispatch(handleKeyPressed(e.keyCode || e.which));

    // click on suggestion
    const onClick = (e, suggestion) => dispatch(selectSuggestion(suggestion));

    // hover on suggestion
    const onMouseEnter = (e, activeSuggestion) => dispatch(setActiveSuggestion(activeSuggestion));

    // leaving suggestions list
    const onMouseLeave = (e) => dispatch(initActiveSuggestion());


    const { showSuggestions, suggestions, activeSuggestion, term, loading, errors } = autocomplete;

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
                />
                {loading && (<i className='fas fa-spinner ac-sppiner'></i>)}
                {/* <i className={`fas fa-spinner ac-sppiner ${ loading ? '' : 'hide' }`}></i> */}

            </div>

            {renderSuggestionsList()}
        </div>
    )
}

export default connect(
    (state) => ({
        autocomplete: state.autocomplete,
        // loadingStatus: getLoadingStatus(state), // selector
        // errorsStatus: getErrorsStatus(state) // selector
    })
)(AutoComplete);

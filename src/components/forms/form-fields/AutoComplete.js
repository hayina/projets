import React, { useRef } from 'react';
import { connect } from 'react-redux';

import useClickOutside from '../../hooks/useClickOutside';
import {
    fetchSuggestions, toggleSuggestionsList, selectSuggestion, initActiveSuggestion,
    setActiveSuggestion, handleKeyPressed } from '../../../actions/autocomplete'

import { getLoadingStatus } from '../../../reducers/autocomplete'

import './autocomplete.css'

const AutoComplete = ({ autocomplete, dispatch }) => {

    const inputEl = useRef(null);

    // using the custom Hook
    useClickOutside(inputEl.current, () => dispatch(toggleSuggestionsList(false)));

    const onChange = (e) => dispatch(fetchSuggestions(e.target.value));

    const onFocus = (e) => onChange(e);

    const onKeyDown = (e) => dispatch(handleKeyPressed(e.keyCode || e.which));

    // click on suggestion
    const onClick = (e, suggestion) => dispatch(selectSuggestion(suggestion));

    // hover on suggestion
    const onMouseEnter = (e, activeSuggestion) => dispatch(setActiveSuggestion(activeSuggestion));

    // leaving suggestions list
    const onMouseLeave = (e) => dispatch(initActiveSuggestion());
 

    const { showSuggestions, suggestions, activeSuggestion, term, loading } = autocomplete;

    function renderSuggestionsList() {

        let suggestionsList;

        if (showSuggestions) {
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
                { loading && (<i className='fas fa-spinner ac-sppiner'></i>) }
                {/* <i className={`fas fa-spinner ac-sppiner ${ loading ? '' : 'hide' }`}></i> */}
                
            </div>

            {renderSuggestionsList()}
        </div>
    )
}

export default connect(
    (state) => ({
        autocomplete: state.autocomplete,
        loadingStatus: getLoadingStatus(state) // selector
    })
)(AutoComplete);

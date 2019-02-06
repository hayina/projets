import React, {  useRef } from 'react';
import { connect } from 'react-redux';

import useClickOutside from '../../hooks/useClickOutside';
import { 
    loadACSuggestion, toggleSuggestions, clickOnSuggestion, initActiveSuggestion,
    setActiveSuggestion, handleKeyDown 
} from '../../../actions/autocomplete'

import './autocomplete.css'

const AutoComplete = (props) => {

    const inputEl = useRef(null);

    // using the custom hook
    useClickOutside(inputEl.current, () => {
        props.toggleSuggestions(false);
    });

    // user interaction with input
    const onChange = (e) => {
        props.loadACSuggestion(e.target.value);
    }

    function onFocus(e) {
        onChange(e);
    }

    const onKeyDown = (e) => { 
        props.handleKeyDown(e.keyCode);
    }

    // click on suggestion
    function onClick(e, suggestion) {
        props.clickOnSuggestion(suggestion)
    }

    // hover  suggestion
    const onMouseEnter = (e, activeSuggestion) => {
        props.setActiveSuggestion(activeSuggestion);
    }

    // leaving suggestions list
    const onMouseLeave = (e) => {
        props.initActiveSuggestion();
    }
    
    const { showSuggestions, suggestions, activeSuggestion, term } = props.autocomplete;

    function renderSuggestionsList() {
        
        let suggestionsList;

        if (showSuggestions) {
            if (suggestions.length > 0) {
                suggestionsList = suggestions.map((suggestion, i) => (
                    <li 
                        onClick={(e) => onClick(e, suggestion)} 
                        onMouseEnter={(e) => onMouseEnter(e, i)}
                        className={`suggestions-item ${ (i === activeSuggestion) ? 'active-suggestion':'' }`}
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
            <input type="text" className="form-control autocomplete-input"
                onChange={onChange} 
                onFocus={onFocus}
                onKeyDown={onKeyDown}
                value={term} 
            />
            {renderSuggestionsList()}
        </div>
    )
}

export default connect(
    ({ autocomplete }) => ({ autocomplete }),
    { 
        loadACSuggestion, toggleSuggestions, setActiveSuggestion, handleKeyDown, 
        clickOnSuggestion, initActiveSuggestion 
    }
)(AutoComplete);
// export default outsideClick(AutoComplete);
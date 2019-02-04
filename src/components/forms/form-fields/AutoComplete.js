import React, { useState, useRef } from 'react';

import useClickOutside from '../../hooks/useClickOutside';

import './autocomplete.css'


const suggestions = [
    "Alligator",
    "Bask",
    "Crocodilian",
    "Death Roll",
    "Eggs",
    "Jaws",
    "Reptile",
    "Solitary",
    "Tail",
    "Wetlands"
]

const AutoComplete = (props) => {

    const [state, setState] = useState({
        filtredSuggestions: [],
        showSuggestions: false,
        term: ''
    })

    const inputEl = useRef(null);

    useClickOutside(inputEl.current, () => {
        setState({ ...state, showSuggestions: false });
    });

    //user hitting input
    function onChange(e) {

        const term = e.target.value;
        let filtredSuggestions = [], showSuggestions = false;

        if (term) {
            filtredSuggestions = suggestions.filter(
                (suggestion) => (suggestion.toLowerCase().indexOf(term.toLowerCase()) !== -1)
            )
            showSuggestions = true;
        }

        setState({ filtredSuggestions, showSuggestions, term });
    }

    function onFocus(e) {
        onChange(e);
    }


    // click on suggestion
    function onClick(e) {

        setState({
            filtredSuggestions: [],
            showSuggestions: false,
            term: e.target.innerText
        })
    }

    function renderSuggestionsList() {

        const { showSuggestions, filtredSuggestions } = state;
        let suggestionsList;

        if (showSuggestions) {
            if (filtredSuggestions.length > 0) {
                suggestionsList = filtredSuggestions.map((suggestion) => (
                    <li onClick={onClick} className="suggestions-item" key={suggestion}>{suggestion}</li>
                ))
            } else {
                suggestionsList = (<li className="no-suggestions">No results found</li>)
            }
            return (<ul className="suggestions-list">{suggestionsList}</ul>)
        }

    }



    return (
        <div className="autocomplete-wrapper" ref={inputEl}>
            <input type="text" className="autocomplete-input"
                onChange={onChange} 
                onFocus={onFocus}
                value={state.term} />
            {renderSuggestionsList()}
        </div>
    )


}


export default AutoComplete;
// export default outsideClick(AutoComplete);
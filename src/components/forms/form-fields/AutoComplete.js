import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';

import useClickOutside from '../../hooks/useClickOutside';
import { loadACSuggestion } from '../../../actions'

import './autocomplete.css'



const AutoComplete = (props) => {

    const [state, setState] = useState({
        filtredSuggestions: [],
        showSuggestions: false,
        activeSuggestion: -1,
        term: ''
    })

    const inputEl = useRef(null);

    //using the custom hook
    useClickOutside(inputEl.current, () => {
        setState({ ...state, showSuggestions: false });
    });

    //user interaction with input
    const onChange = (e) => {

        const term = e.target.value;
        let filtredSuggestions = [], showSuggestions = false;

        const { autocomplete: { suggestions }, loadACSuggestion, dispatch } = props;

   

        if (term) {



            loadACSuggestion(term);

            console.log(suggestions);

            filtredSuggestions = suggestions.filter((suggestion) => suggestion.label)
            showSuggestions = true;
        }

        setState({ ...state, filtredSuggestions, showSuggestions, term, activeSuggestion: -1 });
    }

    function onFocus(e) {
        onChange(e);
    }

    const onKeyDown = (e) => {

        const { filtredSuggestions, activeSuggestion, showSuggestions } = state;
         

        //ENTER
        if(e.keyCode === 13) {            
            setState({ ...state, showSuggestions: false, activeSuggestion: -1, term: filtredSuggestions[activeSuggestion] });
        }
        //UP
        else if(e.keyCode === 38) {  

            if(activeSuggestion > 0 )
                setState({ ...state, activeSuggestion: activeSuggestion-1, term: filtredSuggestions[activeSuggestion-1] });
        }
        //DOWN
        else if(e.keyCode === 40) {            

            if( activeSuggestion < filtredSuggestions.length-1 )
                setState({ ...state, activeSuggestion: activeSuggestion+1, term: filtredSuggestions[activeSuggestion+1] });
        }

    }

    // click on suggestion
    function onClick(e, suggestion) {

        setState({
            ...state,
            filtredSuggestions: [],
            showSuggestions: false,
            activeSuggestion: -1,
            term: suggestion
        })
    }

    // hover  suggestion
    const onMouseEnter = (e, activeSuggestion) => {
        setState({ ...state, activeSuggestion });
    }

    // leaving suggestions list
    const onMouseLeave = (e) => {
        setState({ ...state, activeSuggestion: -1 });
    }

    
    function renderSuggestionsList() {

        const { showSuggestions, filtredSuggestions, activeSuggestion } = state;
        let suggestionsList;

        if (showSuggestions) {
            if (filtredSuggestions.length > 0) {
                suggestionsList = filtredSuggestions.map((suggestion, i) => (
                    <li 
                        onClick={(e) => onClick(e, suggestion)} 
                        onMouseEnter={(e) => onMouseEnter(e, i)}
                        className={`suggestions-item ${ (i === activeSuggestion) ? 'active-suggestion':'' }`}
                        key={suggestion}
                    >
                        {suggestion}
                        {/* , i = {i}, activeSuggestion = {activeSuggestion} */}
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
                value={state.term} />
            {renderSuggestionsList()}
        </div>
    )


}


export default connect(
    ({autocomplete}) => ({
        autocomplete
    }),
    { loadACSuggestion }
)(AutoComplete);
// export default outsideClick(AutoComplete);
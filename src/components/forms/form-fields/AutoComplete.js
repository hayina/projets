import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import outsideClick from '../../../hoc/outsideClick';

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

class AutoComplete extends Component {


    state = {
        filtredSuggestions: [],
        showSuggestions: false,
        term: ''
    }

    //user hitting input
    onChange = (e) => {

        const term = e.target.value;
        let filtredSuggestions = [], showSuggestions=false ;

        if(term) {
            filtredSuggestions = suggestions.filter(
                (suggestion) => (suggestion.toLowerCase().indexOf(term.toLowerCase()) !== -1)
            )
            showSuggestions=true;
        }

        this.setState({ filtredSuggestions, showSuggestions, term });
    }

    // click on suggestion
    onClick = (e) => {

        this.setState({
            filtredSuggestions: [],
            showSuggestions: false,
            term: e.target.innerText
        })
    }

    renderSuggestionsList() {

        const { showSuggestions, filtredSuggestions } = this.state;
        let suggestionsList;

        if (showSuggestions) {
            if (filtredSuggestions.length > 0) {
                suggestionsList = filtredSuggestions.map((suggestion) => (
                    <li onClick={this.onClick} className="suggestions-item" key={suggestion}>{suggestion}</li>
                ))
            } else {
                suggestionsList = (<li className="no-suggestions">No results found</li>)
            }
            return (<ul className="suggestions-list">{suggestionsList}</ul>)
        } 

    }

    render() {

        return (
            <div className="autocomplete-wrapper">
                <input type="text" onChange={this.onChange} className="autocomplete-input"
                    value={this.state.term} />
                {this.renderSuggestionsList()}
            </div>
        )
    }

}


export default AutoComplete;
// export default outsideClick(AutoComplete);
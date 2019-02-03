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
    }

    //user hitting input
    onChange = (e) => {

        
        const term = e.currentTarget.value;

        if(!term) {
            this.setState({
                filtredSuggestions: [],
                showSuggestions: false,
            })
        }

        else {
            const filtredSuggestions = suggestions.filter(
                (suggestion) => (suggestion.toLowerCase().indexOf(term) !== -1)
            )
    
            this.setState({
                filtredSuggestions,
                showSuggestions: true,
            })
        }

        this.setState({ term })

    }

    // click on suggestion
    onClick = (e) => {

    }

    renderSuggestionsList() {

        const { showSuggestions, filtredSuggestions } = this.state;


        let suggestionsList;
        if (showSuggestions) {
            if (filtredSuggestions.length > 0) {
                suggestionsList = filtredSuggestions.map((suggestion) => (
                    <li className="suggestions-item" key={suggestion}>{suggestion}</li>
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
                <input onClick={this.onClick} onChange={this.onChange} className="autocomplete-input" />
                {this.renderSuggestionsList()}
            </div>
        )
    }

}


export default outsideClick(AutoComplete);
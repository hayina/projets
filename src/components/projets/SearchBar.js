import React from 'react';
import { CretereItem } from './components';
import { fieldType } from '../../types';


const SearchBar = ({}) => {


    return (

        <div className="search-bar box-sh box-br">

            <div className="cr-list">
                <div className="cr-line">   
                    <CretereItem label="Intitulé" />                 
                    <CretereItem label="Commune" fType={fieldType.SELECT} />                 
                </div>
                <div className="cr-line">   
                    <CretereItem label="Secteur" fType={fieldType.SELECT} />                 
                    <CretereItem label="Maitre d'ouvrage" fType={fieldType.SELECT} />    
                </div>
            </div>
        
        </div>
    )


}

export default SearchBar
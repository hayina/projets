import React, { useEffect, useState } from 'react';
import { CretereItem } from './components';
import { fieldType } from '../../types';
import useAjaxFetch from '../hooks/useAjaxFetch';


const SearchBar = ({}) => {

    const [communes, setCommunes] = useState([]);
    const [maitreOuvrages, setMaitreOuvrages] = useState([]);
    const [secteurs, setSecteurs] = useState([]);
    const [financements, setFinancements] = useState([]);

    useEffect(() => {

        useAjaxFetch({ url: 'communes', success: (data) => setCommunes(data), })
        useAjaxFetch({ url: 'secteurs', success: (data) => setSecteurs(data), })
        useAjaxFetch({ url: 'acheteurs', success: (data) => setMaitreOuvrages(data), })
        useAjaxFetch({ url: 'financements', success: (data) => setFinancements(data), })
        
    } ,[])

    return (

        <div className="search-bar box-sh box-br">

            <div className="cr-list">
                <div className="cr-line">   
                    <CretereItem label="Intitulé" />                 
                    <CretereItem label="Commune" fType={fieldType.SELECT} options={communes} />                 
                </div>
                <div className="cr-line">   
                    <CretereItem label="Secteur" fType={fieldType.SELECT} options={secteurs} />                 
                    <CretereItem label="Maitre d'ouvrage" fType={fieldType.SELECT} options={maitreOuvrages} />    
                </div>
            </div>
        
        </div>
    )


}

export default SearchBar
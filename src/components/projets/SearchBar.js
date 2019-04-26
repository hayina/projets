import React, { useEffect, useState, useContext } from 'react';
import { CretereItem, Select, Input, Radio } from './components';
import { fieldType } from '../../types';
import useAjaxFetch from '../hooks/useAjaxFetch';
import { FormProvider, FormContext, Field, reset } from '../yous-form/useForm';


const intialValues = {
    intitule: '',
    srcFinancement: 0,
    commune: '',
    secteur: '',
    acheteurType: 1,
    acheteur: '',
}


const SearchBar = ({ setFilters }) => {

    const [communes, setCommunes] = useState([]);
    const [maitreOuvrages, setMaitreOuvrages] = useState([]);
    const [secteurs, setSecteurs] = useState([]);
    const [srcFinancements, setSrcFinancements] = useState([]);
    const [partners, setPartners] = useState([]);

    const { state, dispatchForm, onSubmit } = useContext(FormContext);

    useEffect(() => {

        useAjaxFetch({ url: 'communes', success: (data) => setCommunes(data), })
        useAjaxFetch({ url: 'secteurs', success: (data) => setSecteurs(data), })
        useAjaxFetch({ url: 'acheteurs', success: (data) => setMaitreOuvrages(data), })
        useAjaxFetch({ url: 'srcFinancements', success: (data) => setSrcFinancements(data), })
        
    } ,[])

    useEffect(() => {

        console.log('changing .....')

        setFilters(state.values)
        
    } ,[state.values])

    return (

        <div className="search-bar box-sh box-br">

            <div className="cr-list">

                <div className="cr-line one-cr-line">   
                    <Field name="intitule">
                    { props => <Input placeholder="Intitulé"  {...props} /> } 
                    </Field>    
                </div>
                
                <div className="sep-line"></div>
                
                <div className="cr-line">   
                    <Field name="srcFinancement">
                        { props => <Radio options={srcFinancements} {...props} all /> } 
                    </Field>               
                </div>

                <div className="sep-line"></div>

                <div className="cr-line cr-line-2">   
                    <Field name="commune">
                        { props => <Select defaultOption="Choisir une commune ..." options={communes} {...props} /> } 
                    </Field>  
                    <Field name="secteur">
                        { props => <Select defaultOption="Choisir un secteur" options={secteurs} {...props} /> } 
                    </Field>                     
                </div>

                <div className="sep-line"></div>

                <div className="cr-line one-cr-line">   
                    <Field name="acheteurType">
                        { 
                            props => 
                            <Radio 
                                options={[ { value: 1, label: 'Maitre ouvrage' }, { value: 2, label: 'Partenaire' } ]} 
                                {...props} 
                            /> 
                        } 
                    </Field>   
                </div>
                <div className="cr-line one-cr-line">   
                    <Field name="acheteur">
                        { props => <Select defaultOption="Choisir ..." options={maitreOuvrages} {...props} /> } 
                    </Field>   
                </div>

        
                <span className="reset-from l_ho" onClick={ () => dispatchForm(reset(intialValues)) }>Initialiser</span>
                              
            </div>
        
        </div>
    )


}

export default ((props) => (
    <FormProvider intialValues={intialValues} rules={{}}>
        <SearchBar {...props} />
    </FormProvider> 
))

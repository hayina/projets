import React, { useEffect, useState, useContext } from 'react';
import { Select, Input, Radio } from './components';
import useAjaxFetch from '../hooks/useAjaxFetch';
import { FormProvider, FormContext, Field, reset } from '../yous-form/useForm';
import { SimpleListItem } from '../forms/SimpleList';


const intialValues = {
    intitule: '',
    srcFinancement: 0,
    commune: '',
    secteur: '',
    acheteurType: 1,
    acheteur: '',
    prSouffrance: 0,
}


const SearchBar = ({ setFilters }) => {

    const [communes, setCommunes] = useState([]);
    const [maitreOuvrages, setMaitreOuvrages] = useState([]);
    const [secteurs, setSecteurs] = useState([]);
    const [srcFinancements, setSrcFinancements] = useState([]);


    const { state, dispatchForm } = useContext(FormContext);

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

    const renderSelectInfo = ({renderProps , defaultOption, items }) => (

        renderProps.input.value ?
        <div className="mtem_ls">
            <SimpleListItem 
                item={ items.find(i => i.value === parseInt(renderProps.input.value)) } 
                onDelete= { () => renderProps.input.onChange('') } 
            />
        </div>
        :
        <Select defaultOption={defaultOption} options={items} {...renderProps} /> 
    )

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
                    {   
                        props => renderSelectInfo({ 
                            renderProps: props,
                            items: communes,
                            defaultOption: "Choisir une commune ..."
                        })
                    } 
                    </Field>  
                    <Field name="secteur">
                    {   
                        props => renderSelectInfo({ 
                            renderProps: props,
                            items: secteurs,
                            defaultOption: "Choisir une secteur ..."
                        })
                        
                    }
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
                    { 
                        props => renderSelectInfo({ 
                            renderProps: props,
                            items: maitreOuvrages,
                            defaultOption: "Choisir une secteur ..."
                        })
                    } 
                    </Field>   
                </div>

                <div className="sep-line"></div>
                
                <div className="cr-line">   
                    <Field name="prSouffrance">
                        { props => <Radio options={[
                            { value: 0, label: 'N/A'},
                            { value: 1, label: 'En arrêt'},
                            { value: 2, label: 'En retard'},
                            { value: 3, label: 'Délai exécution depassé'},
                        ]} {...props} /> } 
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

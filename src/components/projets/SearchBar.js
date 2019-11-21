import React, { useEffect, useState, useContext } from 'react';
import { Select, Input, InputWithInit, Radio } from './components';
import useAjaxFetch from '../hooks/useAjaxFetch';
import { FormProvider, FormContext, Field, reset, setValues } from '../yous-form/useForm';
import { SimpleListItem } from '../forms/SimpleList';
import { urlParamsTo } from '../../helpers';
import { usePrevious } from '../hooks';


const intialValues = {
    intitule: '',
    srcFinancement: 0,
    commune: '',
    secteur: '',
    acheteurType: 1,
    acheteur: '',
    projectStatus: 0,
}



const SearchBar = ({ setFilters }) => {

    const [communes, setCommunes] = useState([]);
    const [maitreOuvrages, setMaitreOuvrages] = useState([]);
    const [secteurs, setSecteurs] = useState([]);
    const [srcFinancements, setSrcFinancements] = useState([]);
    const [shouldUpdate, setShouldUpdate] = useState(true);


    const { state, dispatchForm } = useContext(FormContext);

    // console.log(">>>> SearchBar -> ", state.values)


    useEffect(() => {

        useAjaxFetch({ 
            url: 'projets/search/loading', 
            success: (data) => {
                setCommunes(data.communes) 
                setSecteurs(data.secteurs)
                setMaitreOuvrages(data.acheteurs)
                setSrcFinancements(data.srcFinancements)
            }
        })

        // useAjaxFetch({ url: 'communes', success: (data) => setCommunes(data), })
        // useAjaxFetch({ url: 'secteurs', success: (data) => setSecteurs(data), })
        // useAjaxFetch({ url: 'acheteurs', success: (data) => setMaitreOuvrages(data), })
        // useAjaxFetch({ url: 'srcFinancements', success: (data) => setSrcFinancements(data), })
        
    } ,[])


    // const prev = usePrevious({ filters: state.values, urlParams});
    
    useEffect(() => {

        // console.log('SearchBar -> useEffect .....', state.values)

        // les filtres ne sont pas changés
        // if( prev && prev.filters !== state.values) {
        //     console.log("===========> filters CHANGED")
        //     // dispatchForm(reset({ ...intialValues, ...urlParamsTo(urlParams) }))
        // }
        // if( prev && prev.urlParams !== urlParams) {
        //     console.log("===========> urlParams CHANGED")
        //     console.log(prev.urlParams )
        //     console.log(urlParams)
        //     // dispatchForm(reset({ ...intialValues, ...urlParamsTo(urlParams) }))
        // }
        // if( prev && prev.filters === state.values && prev.urlParams !== urlParams) {
        //     console.log("===========> JUST !!!! urlParams HAS CHANGED")
        //     // dispatchForm(reset({ ...intialValues, ...urlParamsTo(urlParams) }))
        // }
        // else {
            // console.log('SearchBar -> useEffect .....', state.values)
            if(shouldUpdate) {
                // console.log('-> filters are changing .....', state.values)
                setFilters(state.values)
            }
            else {
                setShouldUpdate(true)
            }
        // }

        
    }, [state.values])

    // useEffect(() => {
    //     console.log(">>>> useEffect -> params ...", urlParams)
    //     // state.values = { ...intialValues, ...urlParamsTo(urlParams) }
    //     // dispatchForm(reset({ ...intialValues, ...urlParamsTo(urlParams) }))
    // }, [urlParams])

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
                    { props => <InputWithInit placeholder="Intitulé" {...props} 
                                    initCallback={ () => dispatchForm(setValues("intitule", "")) } /> } 
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
                            defaultOption: "Choisir un secteur ..."
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
                                options={[{value: 1, label: 'Maitre ouvrage'}, {value: 2, label: 'Partenaire'}]} 
                                callback={ () => { 
                                    console.log("acheteurType => acheteur =>", state.values.acheteur, state.values.acheteur.length)
                                    if(state.values.acheteur.length === 0) {
                                        setShouldUpdate(false)
                                    }
                                }}
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
                            defaultOption: "Choisir ..."
                        })
                    } 
                    </Field>   
                </div>

                <div className="sep-line"></div>
                
                <div className="cr-line">   
                    <Field name="projectStatus">
                        { props => <Radio options={[
                            { value: 0, label: 'N/A'},
                            { value: 1, label: 'En arrêt'},
                            // { value: 2, label: 'En retard'},
                            { value: 3, label: 'Délai exécution depassé'},
                            { value: 4, label: 'En cours'},
                            { value: 5, label: 'Achevé'},
                            { value: 6, label: 'Résilié'},
                        ]} {...props} /> } 
                    </Field>               
                </div>

                <div className="footer-form">
                    <span className="reset-from l_ho" onClick={ () => dispatchForm(reset(intialValues)) }>Initialiser</span>
                </div>
                              
            </div>
        
        </div>
    )


}

export default ((props) => (
    <FormProvider intialValues={intialValues} >
        <SearchBar {...props} />
    </FormProvider> 
))

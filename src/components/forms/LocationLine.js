import React from 'react';
import { connect } from 'react-redux';
import { change} from 'redux-form';

import { SimpleField, LineRadio, LineRadio2 } from './form-fields/fields';
import { showModal } from '../../actions';
import { modalTypes } from '../modals/ModalRoot';
import { convertToSelectionByLeafs, nestedTree } from '../checkboxTree/helpers';
import { NestedTree } from '../checkboxTree/CheckTree';

import {formName as projetForm } from './ProjetForm'

const LocationLine = ({ localisationItems, dispatch, input, meta }) => {

    let localisations = input.value ? input.value:[]

    console.log('meta', meta)
    
    
    return (
        <React.Fragment>
            {/* <SimpleField label='Localisation'>
                <input type="button" className="btn btn-info show-modal" 
                    value={ localisations.length > 0 ? `Editer` : `Choisir`}
                    style={{ float: 'right' }}
                    onClick={
                        () => {
                            dispatch(showModal(modalTypes.ADD_LOCALISATION, 
                                { 
                                    items: localisationItems, 
                                    initialSelection: convertToSelectionByLeafs(localisations, localisationItems) 
                                }
                            ))
                        }
                    }
                />
            </SimpleField> */}

            <LineRadio2                 
                label="Localisation"
                btnText={ localisations.length > 0 ? `Editer` : `Choisir` }
                btnOnClick={
                    () => {
                        dispatch(showModal(modalTypes.ADD_LOCALISATION, 
                            { 
                                items: localisationItems, 
                                initialSelection: convertToSelectionByLeafs(localisations, localisationItems) 
                            }
                        ))
                    }
                }
            />


            { 
                localisations && localisations.length > 0 &&
                <div className="localisations-wr tree-wr">
                    <NestedTree 
                        items={ nestedTree(localisations, localisationItems) }
                        onDelete= { (path) => {
                            dispatch(change(projetForm, 'localisations', 
                                localisations.filter(sPath => !`${sPath}.`.startsWith(`${path}.`))
                            ))
                            // dispatch(arrayDeletingByPath('localisations', path)) 
                        }}
                    /> 
                </div>
            }

            { meta && meta.touched && meta.error && <div className="error-feedback">{ meta.error }</div> }

        </React.Fragment>
    )

}

export default connect()(LocationLine)
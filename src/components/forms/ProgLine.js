import React from 'react';
import { SliderCheckbox, ToggleField, SelectGrpField } from './form-fields/fields';
import { constants } from '../../types';
import { required } from './validator';


const ProgLine = ({ indh, prdts, indhProgramme, indhProgrammes, indhCallback }) => {


    return (

        <React.Fragment>

            <ToggleField label="I.N.D.H" callback={indhCallback} { ...indh } />
            <ToggleField label="P.R.D.T.S" input={ prdts.input } { ...prdts } />

            { 
                indh.input.value && indhProgrammes.length > 0 &&
                <SelectGrpField
                    name="indhProgramme"
                    // label="Programme"
                    optgroups={indhProgrammes}
                    gOptsLabel="Choisir un programme..."
                    { ...indhProgramme }
                />
            }

        </React.Fragment>
    )
}

export default ProgLine
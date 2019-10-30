import React, { useEffect, useState } from 'react';
import { SelectGrpField, SelectField } from './form-fields/fields';
import { SRC_FINANCEMENT } from '../../types';
import useAjaxFetch from '../hooks/useAjaxFetch';


const ProgLine = ({ financements=[], srcFinancement, indhProgramme, setErrors }) => {

    const [indhProgrammes, setIndhProgrammes] = useState([]);
    // const [financements, setFinancements] = useState([]);

    const srcFinancementVal = srcFinancement.input.value

    const showIndh = ( Number(srcFinancementVal) === SRC_FINANCEMENT.INDH )
    // ||  Number(srcFinancementVal) === SRC_FINANCEMENT.PRDTS_INDH

    useEffect(() => {

        if( indhProgrammes.length === 0 && showIndh ) {
            useAjaxFetch({
                url: `/parent/programmes`,
                // url: `/getProgrammesWithPhases`,
                success: (data) => { setIndhProgrammes(data) },
                error: () => setErrors(true)
            })
        }
        
        
    }, [srcFinancementVal])

    // useEffect(() => {
    //     useAjaxFetch({
    //         url: `/srcFinancements`,
    //         success: (data) => { setFinancements(data) },
    //         error: () => setErrors(true)
    //     })
    // }, [])

    return (

        <React.Fragment>

            {/* <ToggleField label="I.N.D.H" callback={indhCallback} { ...indh } />
            <ToggleField label="P.R.D.T.S" input={ prdts.input } { ...prdts } /> */}

            
            <SelectField
                // name="srcFinancement"
                label="Source de Financement"
                options={financements}
                { ...srcFinancement }
            />

            { showIndh && indhProgrammes.length > 0 &&
                <SelectGrpField
                    // name="indhProgramme"
                    // // label="Programme"
                    optgroups={indhProgrammes}
                    gOptsLabel="Choisir un programme..."
                    { ...indhProgramme }
                />
            }

        </React.Fragment>
    )
}

export default ProgLine
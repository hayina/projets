import { ATTACH_TYPE } from "../types";

export const asyncFunc = (f) => new Promise((resolve, reject) => {
    f();
    resolve();
})

let counter = 0;
export const uniqueID = () => counter++;

export const uniqueHtmlID = () => `uniq-${uniqueID()}`

export const formatDate = (m) => {

    // console.log(m)
    return     ("0" + m.getUTCDate()).slice(-2)  + "/" +
    ("0" + (m.getUTCMonth()+1)).slice(-2) + "/" +
    m.getUTCFullYear()
}

export const formatDateWithSep = (m, sep) => {

    // console.log(m)
    return  ("0" + m.getUTCDate()).slice(-2)  + `${sep}` +
            ("0" + (m.getUTCMonth()+1)).slice(-2) + `${sep}` +
            m.getUTCFullYear()
}

    // + " " +
    // ("0" + m.getUTCHours()).slice(-2) + ":" +
    // ("0" + m.getUTCMinutes()).slice(-2) + ":" +
    // ("0" + m.getUTCSeconds()).slice(-2);



export const getAttachLink = ({ attachType, idMarche, date, label }) => 
    `http://localhost:8080/PROJET-API/attachments/${idMarche}/${attachType}/download?n=${label}&d=${formatDateWithSep(date, '-')}`


export const getOsImgLink = (props) => getAttachLink({ ...props, attachType: ATTACH_TYPE.OS })
export const getDecImgLink = (props) => getAttachLink({ ...props, attachType: ATTACH_TYPE.DEC })






import { ATTACH_TYPE } from "../types";

export const asyncFunc = (f) => new Promise((resolve, reject) => {
    f();
    resolve();
})

let counter = 0;
export const uniqueID = () => counter++;

export const uniqueHtmlID = () => `uniq-${uniqueID()}`

export const formatDate = (m) => {
    return ("0" + m.getDate()).slice(-2)  + "/" + ("0" + (m.getMonth()+1)).slice(-2) + "/" + m.getFullYear()
}

    // + " " +
    // ("0" + m.getUTCHours()).slice(-2) + ":" +
    // ("0" + m.getUTCMinutes()).slice(-2) + ":" +
    // ("0" + m.getUTCSeconds()).slice(-2);


export const formatDateWithSep = (date, sep) => {
    return ("0" + date.getDate()).slice(-2)  + `${sep}` + ("0" + (date.getMonth()+1)).slice(-2) + `${sep}` + date.getFullYear()
}



export const isBefore = (date, before) => new Date(date).setHours(0,0,0,0) < new Date(before).setHours(0,0,0,0)
export const isAfter = (date, after) => new Date(date).setHours(0,0,0,0) > new Date(after).setHours(0,0,0,0)
export const isFuture = (date) => new Date(date).setHours(0,0,0,0) > new Date().setHours(0,0,0,0)
export const isPast = (date) => new Date(date).setHours(0,0,0,0) < new Date().setHours(0,0,0,0)



export const getAttachLink = ({ attachType, idMarche, date, label }) => 
    `http://localhost:8080/PROJET-API/attachments/${idMarche}/${attachType}/download?n=${label}&d=${formatDateWithSep(date, '-')}`


export const getOsImgLink = (props) => getAttachLink({ ...props, attachType: ATTACH_TYPE.OS })
export const getDecImgLink = (props) => getAttachLink({ ...props, attachType: ATTACH_TYPE.DEC })






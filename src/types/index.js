
// const SUGGESTIONS = '[Suggestions]';
const externalForms = '[external forms]';
const checkbox = '[checkbox]';
const users = '[users]';

const types = {

    SET_REDUX_FORM: '[redux-form] SET',
    AC_SELECT: '[ac] SELECT',
    AC_INIT: '[ac] INIT',

    TOGGLE_MODAL: 'TOGGLE_MODAL',
    SHOW_MODAL: 'SHOW_MODAL',
    HIDE_MODAL: 'HIDE_MODAL',
    SET_MODAL_PROPS: 'SET_MODAL_PROPS',


    ADD_ITEM_LOCALISATION: `${externalForms} ADD_ITEM_LOCALISATION`,
    INIT_LOCALISATION: `${externalForms} INIT_LOCALISATION`,

    ADD_ITEM: `${externalForms} ADD_ITEM`,
    DELETE_ITEM_BY_INDEX: `${externalForms} DELETE_ITEM_BY_INDEX`,
    DELETE_ITEM_BY_VALUE: `${externalForms} DELETE_ITEM_BY_VALUE`,
    DELETE_ITEM_BY_PATH: `${externalForms} DELETE_ITEM_BY_PATH`,
    UPDATE_ITEM: `${externalForms} UPDATE_ITEM`,
    SET_ARRAY: `${externalForms} SET_ARRAY`,

    EDIT_FORM_VALUES: `${externalForms} EDIT_FORM_VALUES`,



    SET_CHECKBOX_PROP: `${checkbox} SET_PROP`,


    ///// USERS
    
    ADD_USER: `${users} ADD`,


    SET_BREAD_CRUMB: `SET_BREAD_CRUMB`,

    LOGIN: `LOGIN`,
    LOGOUT: `LOGOUT`,
}


export default types;

export const constants = {
    PROVINCE_TAOURIRT: 8,
    INDH: 1,
    PRDTS: 2,
}

export const TYPE_OS = {
    ARRET: 1,
    REPRISE: 2,
    COMMENCEMENT: 3,
}

export const NATURE_OS = {
    ARRET_REPRISE: 1,
    COMMENCEMENT: 2,
}

export const USER_ROLES = {

    ADMIN: "ROLE_ADMIN",
    CHARGE_SUIVI: "ROLE_CHARGE_SUIVI",
    SUPERVISOR_DIV: "ROLE_SUPERVISOR_DIV",
    GUEST: "ROLE_GUEST",
    VIP_GUEST: "ROLE_VIP_GUEST",
    USER: "ROLE_USER",
}

export const USER_PERMISSIONS = {

    ADD_USER: "ADD_USER",
    VIEW_USERS: "VIEW_USERS",
    EDIT_USER: "EDIT_USER",
    DELETE_USER: "DELETE_USER",

    ADD_PROJECT: "ADD_PROJECT",
    EDIT_PROJECT: "EDIT_PROJECT",
    ASSIGN_PROJECT: "ASSIGN_PROJECT",
    CONTROLE_PROJECT: "CONTROLE_PROJECT",
    VALIDATE_PROJECT: "VALIDATE_PROJECT",
    DELETE_PROJECT: "DELETE_PROJECT",

    VIEW_CONVENTION: "VIEW_CONVENTION",

    VIEW_LOCATION: "VIEW_LOCATION",

}

export const SRC_FINANCEMENT = {
    BG: 1, BP: 2, INDH: 3, PRDTS_INDH: 4, PRDTS_FDRZM: 5, CT: 10
}

export const CONTRIBUTION_PARTNERS = {
    FINANCIERE: 1, AUTRES: 2
}

export const ATTACH_TYPE = {
    DEC: 'DEC', OS: 'OS'
}

export const fieldType = {
    TEXT: 'text',
    SELECT: 'select',
    RADIO: 'radio',
    CHECKBOX: 'checkbox',
}

export const APP_LINKS = {
    SEARCH_PROJECT : "/projets/search"
}

export const MONTH_DAYS = 30
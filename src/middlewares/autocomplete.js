


export const autoCompleteMiddleware = ({ dispatch, getState }) => next => action => {
    

    console.log(action.type);
    next(action);

}
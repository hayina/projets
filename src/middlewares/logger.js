
export const loggerMiddleware = () => next => action => {
    console.log(action.type);
    next(action);
}
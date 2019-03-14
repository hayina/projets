import types from '../types';



export const projetFormMiddleware = ({ dispatch }) => next => (action) => {

    next(action);

}
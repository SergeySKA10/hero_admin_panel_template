import { configureStore } from '@reduxjs/toolkit';
import heroes from '../components/heroesList/heroesSlice';
import filters from '../components/heroesAddForm/filtresSlice';

// middleware для обработки строки
const stringMiddleware = (store) => (dispatch) => (action) => {
    if (typeof action === 'string') {
        return dispatch({
            type: action
        })
    } else {
        return dispatch(action)
    }
}

const store = configureStore({
    reducer: {heroes, filters},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';

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

// создаем store и используем applyMiddleware
const store = createStore(
    combineReducers({heroes, filters}),
    compose (
        applyMiddleware(thunk, stringMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // работа devtools redux
    )
)

export default store;
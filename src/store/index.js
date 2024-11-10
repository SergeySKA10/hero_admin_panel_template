import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';

// middleware для обработки строки
const stringMiddleware = (store) => (dispatch) => (action) => {
    // в первой функции передается не весь store, a только методы dispatch && getState
    // то есть вместо store можно деструктуризировать {dispatch, getState} если нужно использовать 
    // в коде эти функции
    // dispatch в второй функциии это измененный dispatch который нам приходит из предыдущего middleware при композиции
    // т.е. когда ниже идет вызов dispatch, то вместо него вызывается следующий middleware в композиции, а точнее последняя 
    // функция (action) => из следующего middleware. Таким образом на итоге получается общий dispatch из композиции. поэтому в 
    // библиотеках обычно аргумент dispatch называют next 
    if (typeof action === 'string') {
        return dispatch({
            type: action
        })
    } else {
        return dispatch(action)
    }
}

// функция enhancers усиление store - позволяет передавать в action строки
// const enhancers = (createStore) => (...args) => {
//     // создаем store
//     const store = createStore(...args);

//     // создаем переменную и в нее помещаем оригинальный dispatch
//     const oldDispatch = store.dispatch;

//     // создаем новый dispatch
//     store.dispatch = (action) => {
//         // если action строка то передаем ее в старый dispatch в type
//         if (typeof action === 'string') {
//             return oldDispatch({
//                 type: action
//             })
//         } else {
//             //ecли нет, то запускаем старый dispatch
//             return oldDispatch(action)
//         }
//     }

//     return store;
// }

// создаем store и используем combineReducers для создание общего reducer
// const store = createStore(
//     combineReducers({heroes, filters}),
//     compose (
//         enhancers,
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // работа devtools redux
//     )    
// );

// создаем store и используем applyMiddleware
const store = createStore(
    combineReducers({heroes, filters}),
    compose (
        applyMiddleware(stringMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // работа devtools redux
    )
)

export default store;
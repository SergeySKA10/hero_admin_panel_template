import { createStore, combineReducers, compose } from 'redux';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';

// функция усиление store - позволяет передавать в action строки
const enhancers = (createStore) => (...args) => {
    // создаем store
    const store = createStore(...args);

    // создаем переменную и в нее помещаем оригинальный dispatch
    const oldDispatch = store.dispatch;

    // создаем новый dispatch
    store.dispatch = (action) => {
        // если action строка то передаем ее в старый dispatch в type
        if (typeof action === 'string') {
            return oldDispatch({
                type: action
            })
        } else {
            //ecли нет, то запускаем старый dispatch
            return oldDispatch(action)
        }
    }

    return store;
}

// создаем store и используем combineReducers для создание общего reducer
const store = createStore(
    combineReducers({heroes, filters}),
    compose (
        enhancers,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // работа devtools redux
    )    
);

export default store;
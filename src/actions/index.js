import { heroesFetching, heroesFetched, heroesFetchingError} from '../components/heroesList/heroesSlice';
import {
    filtersFetching, 
    filtersFetched, 
    filtersFetchingError 
} from '../components/heroesAddForm/filtresSlice';

// создадим общую функцию action по получению списка героев с бд с помощью redux-thunk
export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
}


// общая функция action по получению фильтров
export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))
}

import { createAction } from "@reduxjs/toolkit";
import { heroesFetching, heroesFetched, heroesFetchingError} from '../components/heroesList/heroesSlice';

// создадим общую функцию action по получению списка героев с бд с помощью redux-thunk
export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
}

// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

// с помощью createAction создадим action (базовое применение) 
// export const heroesFetching = createAction('HEROES_FETCHING');

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

// export const heroesFetched = createAction('HEROES_FETCHED');

// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }

// export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');

// общая функция action по получению фильтров
export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))
}

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const changeActiveFilter = (filter) => {
    return {
        type: 'FILTER_ACTIVE_CHANGE',
        payload: filter
    }
}

// export const createdHero = (data) => {
//     return {
//         type: 'HERO_CREATED',
//         payload: data
//     }
// }

// export const createdHero = createAction('HERO_CREATED');

// export const deleteHero = (id) => {
//     return {
//         type: 'HERO_DELETE',
//         payload: id
//     }
// }

// export const deleteHero = createAction('HERO_DELETE');
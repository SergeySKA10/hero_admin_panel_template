// создадим общую функцию по получению списка героев с бд с помощью redux-thunk
export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
}

export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

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

// используем redux-thunk чтобы сделать переключение активного фильтра с задержкой
// dispatch приходит автоматически при помощи redux-thunk
export const changeActiveFilter = (filter) => {
    return {
        type: 'FILTER_ACTIVE_CHANGE',
        payload: filter
    }
}

export const createdHero = (data) => {
    return {
        type: 'HERO_CREATED',
        payload: data
    }
}

export const deleteHero = (id) => {
    return {
        type: 'HERO_DELETE',
        payload: id
    }
}
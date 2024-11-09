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
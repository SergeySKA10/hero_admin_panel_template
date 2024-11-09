const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
    filteredHeroes: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle',
                filteredHeroes: state.activeFilter === 'all' ?
                                    action.payload :
                                    action.payload.filter(el => el.element === state.activeFilter)
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'FILTER_ACTIVE_CHANGE':
            return {
                ...state,
                activeFilter: action.payload,
                filteredHeroes: action.payload === 'all' ?
                                    state.heroes :
                                    state.heroes.filter(el => el.element === action.payload)
            }
        case 'HERO_CREATED':
            const addHeroes = [...state.heroes, action.payload];
            return {
                ...state,
                heroes: addHeroes,
                filteredHeroes: state.activeFilter === 'all' ?
                                    addHeroes :
                                    addHeroes.filter(el => el.element === state.activeFilter)
            }
        case 'HERO_DELETE':
            const deleteHeroes = state.heroes.filter(el => el.id !== action.payload);
            return {
                ...state,
                heroes: deleteHeroes,
                filteredHeroes: state.activeFilter === 'all' ?
                                    deleteHeroes :
                                    deleteHeroes.filter(el => el.element === state.activeFilter)
            }
        default: return state
    }
}

export default reducer;
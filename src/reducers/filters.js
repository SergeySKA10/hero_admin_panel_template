// изначальный state для фильтров
const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
}

// функция reducer 
const filters = (state = initialState, action) => {
    switch (action.type) {
        // загрузка 
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        // успешно загружены филтры
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        // ошибка 
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        // смена активного фильтра
        case 'FILTER_ACTIVE_CHANGE':
            return {
                ...state,
                activeFilter: action.payload
            }
        default: return state
    }
}

export default filters;
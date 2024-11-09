// изначальный state для героев
const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

// функция reducer 
const heroes = (state = initialState, action) => {
    switch (action.type) {
        //загрузка 
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        // успешная загрузка
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        // ошибка 
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        // создание нового героя
        case 'HERO_CREATED':
            return {
                ...state,
                heroes: [...state.heroes, action.payload]
            }
        // удаление героя
        case 'HERO_DELETE':
            return {
                ...state,
                heroes: state.heroes.filter(el => el.id !== action.payload)
            }
        default: return state
    }
}

export default heroes;
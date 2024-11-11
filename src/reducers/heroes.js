import { createReducer } from "@reduxjs/toolkit";

import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    createdHero,
    deleteHero
} from '../actions/index';

// изначальный state для героев
const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

// создадим reducer с помощью createReducer
const heroes = createReducer(initialState, builder => {
    builder
        .addCase(heroesFetching, state=> {
            state.heroesLoadingStatus = 'loading'
        }) 
        .addCase(heroesFetched, (state, action)=> {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
        })
        .addCase(heroesFetchingError, state=> {
            state.heroesLoadingStatus = 'error'
        })
        .addCase(createdHero, (state, action) => {
            state.heroes.push(action.payload);
        })
        .addCase(deleteHero, (state, action) => {
            state.heroes = state.heroes.filter(el => el.id !== action.payload);
        })
        .addDefaultCase(() => {})        
})

// // функция reducer 
// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         //загрузка 
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         // успешная загрузка
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle'
//             }
//         // ошибка 
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         // создание нового героя
//         case 'HERO_CREATED':
//             return {
//                 ...state,
//                 heroes: [...state.heroes, action.payload]
//             }
//         // удаление героя
//         case 'HERO_DELETE':
//             return {
//                 ...state,
//                 heroes: state.heroes.filter(el => el.id !== action.payload)
//             }
//         default: return state
//     }
// }

export default heroes;
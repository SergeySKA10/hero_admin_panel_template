import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

// используем createSlice для создания actions и reducer 
const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesFetching: state=> {
            state.heroesLoadingStatus = 'loading'
        }, 
        heroesFetched: (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
        },
        heroesFetchingError: state=> {
            state.heroesLoadingStatus = 'error'
        },
        createdHero: (state, action) => {
            state.heroes.push(action.payload);
        },
        deleteHero: (state, action) => {
            state.heroes = state.heroes.filter(el => el.id !== action.payload);
        }
    }
})

// Деструктуризируем и получаем actions и reducer
const {actions, reducer} = heroesSlice;
// экспортирем
export default reducer;
export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    createdHero,
    deleteHero
} = actions;
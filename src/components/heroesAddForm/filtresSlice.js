import { createSlice } from "@reduxjs/toolkit";

// изначальный state для фильтров
const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
}

// создание actions и reducer для filtres 
const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersFetching: state => {
            state.filtersLoadingStatus = 'loading';
        },
        filtersFetched: (state, action) => {
            state.filtersLoadingStatus = 'idle';
            state.filters = action.payload;
        },
        filtersFetchingError: state => {
            state.filtersLoadingStatus = 'error';
        },
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload
        }
    }
});

// получение actions && reducer
const {actions, reducer} = filtersSlice;

export default reducer;

export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    changeActiveFilter
} = actions;


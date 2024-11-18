import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

// создадим адаптер для фильтров
 export const filtersAdapter = createEntityAdapter();

// создадим actionCreator для получения фильтров из бд
export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    async () => {
        const { request } = useHttp();
        return await request("http://localhost:3001/filters")
    }
)

// создание actions и reducer для filtres 
const filtersSlice = createSlice({
    name: 'filters',
    initialState: filtersAdapter.getInitialState({
        filtersLoadingStatus: 'idle',
        activeFilter: 'all'
    }),
    reducers: {
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, state => {
                state.filtersLoadingStatus = 'loading';
            })
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filtersLoadingStatus = 'idle';
                filtersAdapter.setAll(state, action.payload)
            })
            .addCase(fetchFilters.rejected, state => {
                state.filtersLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
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

export const { selectAll } = filtersAdapter.getSelectors(state => state.filters);


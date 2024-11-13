import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

export const fetchHeroes = createAsyncThunk(
    //тип действия
    'heroes/fetchHeroes',
    // функция с асинхронным кодом, которая возвращает промис
    async () => {
        const { request } = useHttp();
        // возвращаем промис !!!
        return await request("http://localhost:3001/heroes")
    }
)

// используем createSlice для создания actions и reducer 
const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        createdHero: (state, action) => {
            state.heroes.push(action.payload);
        },
        deleteHero: (state, action) => {
            state.heroes = state.heroes.filter(el => el.id !== action.payload);
        }
    },
    // записываем сюда actionCreators которые мы ожидаем в качестве ответа на промис fetchHeroes
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {
                state.heroesLoadingStatus = 'loading';
            })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                state.heroes = action.payload;
            })
            .addCase(fetchHeroes.rejected, state=> {
                state.heroesLoadingStatus = 'error'
            })
            .addDefaultCase(() => {})
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
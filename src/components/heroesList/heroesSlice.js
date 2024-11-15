import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';

// создадим адаптер для CRUD операций с state
const heroesAdapter = createEntityAdapter();

// начальный state
// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle'
// }

const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle'
});

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
            // state.heroes.push(action.payload);
            heroesAdapter.addOne(state, action.payload);
        },
        deleteHero: (state, action) => {
            // state.heroes = state.heroes.filter(el => el.id !== action.payload);
            heroesAdapter.removeOne(state, action.payload)
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
                // state.heroes = action.payload; записываем полученные данные в state
                heroesAdapter.setAll(state, action.payload); // метод установки (или полной замены) 1 аргумент - куда помещаем 2 аогумент что поместить

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

// экспорт selectors
export const {selectAll} = heroesAdapter.getSelectors(state => state.heroes);
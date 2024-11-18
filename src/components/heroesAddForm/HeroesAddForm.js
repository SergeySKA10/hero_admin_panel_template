import { useHttp } from "../../hooks/http.hook";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilters } from "./filtresSlice";
import { createdHero } from '../heroesList/heroesSlice';
import { v4 as uuidv4} from 'uuid';
import { selectAll } from "./filtresSlice";
import store from '../../store/index';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

// компонент формы
const HeroesAddForm = () => {
    const {request} = useHttp();
    const dispatch = useDispatch();

    // формирование фильтров
    const filters = selectAll(store.getState());
    const { filtersLoadingStatus } = useSelector(state => state.filters);

    //локальные состояния для контроля формы
    const [heroName, setHeroName] = useState('');
    const [heroDescr, setHeroDescr] = useState('');
    const [heroElement, setHeroElement] = useState('');

    useEffect(() => {
        // получение данных для рендера фильтров 
        dispatch(fetchFilters());

        // eslint-disable-next-line
    }, []);

    //функция отправки данных на сервер
    const onSubmitHandler = (e) => {
        e.preventDefault();

        // формирование информации о новом герое
        const newHero = {
            id: uuidv4(),
            name: heroName,
            description: heroDescr,
            element: heroElement
        }
        // отправка данных
        request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero))
            .then(data => console.log(data, "Успешно"))
            .then(() => dispatch(createdHero(newHero)))
            .catch((e) => console.log(e))
            .finally(() => {
                // отчиска формы
                setHeroName('');
                setHeroDescr('');
                setHeroElement('');
            })
    }

    //функция для формирования фильтров и их рендера
    const renderFilters = (filters, status) => {
        if (status === 'loading') {
            return <option>Загрузка элементов</option>
        } else if (status === 'error') {
            return <option>Ошибка загрузки</option>
        }
        
        if (filters && filters.length > 0) {
           return filters.map(({name, label}) => {
                if (name === 'all') return;
                return (
                    <option key={name} value={name}>{label}</option>
                )
           })
        }
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={heroDescr}
                    onChange={(e) => setHeroDescr(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}>
                    <option value="">Я владею элементом...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;
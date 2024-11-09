import { useSelector, useDispatch } from "react-redux";
import { changeActiveFilter } from '../../actions/index';
import classNames from "classnames";

import Spinner from '../spinner/Spinner';
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state);
    const dispatch = useDispatch();

    if (filtersLoadingStatus === 'loading') {
        return <Spinner/>
    } else if (filtersLoadingStatus === 'erroe') {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderBtns = (filters) => {
        if (filters.length === 0) return <h5 className="text-center mt-5">Фильтры не найдены</h5>

        return filters.map(({name, className, label}) => {
            const classBtn = classNames('btn', className, {'active': name === activeFilter})
            return (
                <button key={name}
                        id={name} 
                        className={classBtn}
                        onClick={() => dispatch(changeActiveFilter(name))}
                >{label}</button>
            )
        })
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {renderBtns(filters)}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;
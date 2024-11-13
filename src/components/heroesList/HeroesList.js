import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { fetchHeroes } from './heroesSlice';
import { deleteHero } from './heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import './HeroesList.scss';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    // создадим функцию селектор
    const filteredHeroesSelector = createSelector(
        state => state.filters.activeFilter, // это первое состояние - активный фильтр который дальше назовем filter
        state => state.heroes.heroes, // второе состояние - список героев далее heroes 
        (filter, heroes) => {
            if (filter === 'all') {
                return heroes
            } else {
                return heroes.filter(el => el.element === filter)
            }
        }
    )

    // получаем отфильтрованный массив героев
    const filteredHeroes = useSelector(filteredHeroesSelector);
    // состояние загрузки фильтров
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    // отправляем запрос на получение списка героев
    useEffect(() => {
        dispatch(fetchHeroes())

        // eslint-disable-next-line
    }, []);

    // удаление персонажа по id 
    const onDelete = useCallback((id) => {
        console.log(id)
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
            .then(data => console.log(data), 'Delete')
            .then(() => dispatch(deleteHero(id)))
            .catch(e => console.log(e));
    }, [request])

    // оповещение о статусе загрузки
    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    // создание элементов на странице с героями
    const renderHeroesList = (arr) => {
        
        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition
                    key={id}
                    timeout={400}
                    classNames='heroes'>
                    <HeroesListItem key={id} {...props} onDelete={() => onDelete(id)}/>
                </CSSTransition>
            )
        });
        
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <TransitionGroup component='ul'>
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;
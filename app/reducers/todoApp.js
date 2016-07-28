/**
 * @fileOverview Редюсеры
 */

import { combineReducers } from 'redux';

// редюсер для одного элемента списка дел
const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};

// редюсер для массива элементов списка дел
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)  // у вновь добавленного элемента todo нет предыдущего состояния, поэтому undefined
      ];
    case 'TOGGLE_TODO':
      // вызываем редюсер todo для каждого элемента todo в массиве todos
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

// редюсер для фильтра отображения элементов списка дел
const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

// комбинированный редюсер
const todoApp = combineReducers({
  todos,
  visibilityFilter
});

export default todoApp;

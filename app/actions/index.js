/**
 * @fileOverview Генераторы действий
 */

let nextTodoId = 0;

// действие для добавления элемента списка дел
export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  };
};

// действие для переключения статуса элемента списка дел (выполнено / невыполнено)
export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  };
};

// действие для установки фильтра элементов списка дел
export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  };
};

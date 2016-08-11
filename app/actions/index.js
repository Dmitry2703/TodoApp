/**
 * @fileOverview Генераторы действий
 */

import { v4 } from 'node-uuid'; // утилита для создания уникальных идентификаторов

// действие для добавления элемента списка дел
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: v4(),
  text
});

// действие для переключения статуса элемента списка дел (выполнено / невыполнено)
export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
});

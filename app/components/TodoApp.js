/**
 * @fileOverview Компонент Приложение "Список дел"
 */

import React from 'react';
import AddTodo from './AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import Footer from './Footer';

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default TodoApp;

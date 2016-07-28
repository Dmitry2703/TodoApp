/**
 * @fileOverview Приложение "Список дел"
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import TodoApp from './components/TodoApp';
import todoApp from './reducers/todoApp';

ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp />
  </Provider>,
  document.getElementById('app')
);

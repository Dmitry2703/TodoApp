/**
 * @fileOverview Приложение "Список дел"
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import TodoApp from './components/TodoApp';
import todoApp from './reducers/todoApp';

const enhancers = compose(window.devToolsExtension ? window.devToolsExtension() : f => f);

const store = createStore(todoApp, enhancers);

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('app')
);

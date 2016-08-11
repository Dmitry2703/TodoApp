/**
 * @fileOverview Корневой компонент
 */

import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import TodoApp from './TodoApp';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/(:filter)" component={TodoApp} />
    </Router>
  </Provider>
);

export default Root;

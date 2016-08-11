/**
 * @fileOverview Контейнер для списка дел
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toggleTodo } from '../actions/index';
import { getVisibleTodos } from '../reducers';
import TodoList from '../components/TodoList';

const mapStateToProps = (state, { params }) => ({
  todos: getVisibleTodos(state, params.filter || 'all')
});

// при помощи withRouter компонент VisibleTodoList получает параметры роутера в кач-ве своих свойств
const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo }
  // сокращение для:
  // const mapDispatchToProps = (dispatch) => ({
  //   onTodoClick(id) {
  //     dispatch(toggleTodo(id));
  //   }
  // });
)(TodoList));

export default VisibleTodoList;

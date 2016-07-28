import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import todoApp from './reducers/todos';
// import AddTodo from './components/TodoList';

// console.log('Initial state:');
// console.log(store.getState());
// console.log('--------------');

// console.log('Dispatching ADD_TODO');
// store.dispatch({
//   type: 'ADD_TODO',
//   id: 0,
//   text: 'Learn Redux'
// });
// console.log('Current state:');
// console.log(store.getState());
// console.log('--------------');

// console.log('Dispatching ADD_TODO');
// store.dispatch({
//   type: 'ADD_TODO',
//   id: 1,
//   text: 'Go home'
// });
// console.log('Current state:');
// console.log(store.getState());
// console.log('--------------');

// console.log('Dispatching TOGGLE_TODO');
// store.dispatch({
//   type: 'TOGGLE_TODO',
//   id: 1
// });
// console.log('Current state:');
// console.log(store.getState());
// console.log('--------------');

// console.log('Dispatching SET_VISIBILITY_FILTER');
// store.dispatch({
//   type: 'SET_VISIBILITY_FILTER',
//   filter: 'SHOW_COMPLETED'
// });
// console.log('Current state:');
// console.log(store.getState());
// console.log('--------------');

// Action Creators

let nextTodoId = 0;
const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  };
};

const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  };
};

const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  };
};

// presentational component
const Link = ({
  active,
  children,
  onClick
}) => {
  if (active) {
    return <span>{children}</span>;
  }
  return (
    <a href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
};

const mapStateToLinkProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  };
};
const mapDispatchToLinkProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    }
  };
};
const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps
)(Link);

// // container component
// class FilterLink extends React.Component {
//   componentDidMount() {
//     const {store} = this.context;
//     this.unsubscribe = store.subscribe(() =>
//       this.forceUpdate()
//     );
//   }

//   componentWillUnmount() {
//     this.unsubscribe();
//   }

//   render() {
//     const props = this.props;
//     const {store} = this.context;
//     const state = store.getState();

//     return (
//       <Link
//         active={
//           props.filter === state.visibilityFilter
//         }
//         onClick={() =>
//           store.dispatch({
//             type: 'SET_VISIBILITY_FILTER',
//             filter: props.filter
//           })
//         }
//       >
//         {props.children}
//       </Link>
//     );
//   }
// }
// FilterLink.contextTypes = {
//   store: React.PropTypes.object
// };

const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li onClick={onClick}
      style={{
        textDecoration:
          completed
          ? 'line-through'
          : 'none'
      }}>
    {text}
  </li>
);

const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
);

// presentational and container component in the same time
// because it is difficult to separate them
let AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div>
      <input ref={node => {
        input = node;
      }} />
      <button
        onClick={() => {
          dispatch(addTodo(input.value));
          input.value = '';
        }}>
        Add Todo
      </button>
    </div>
  );
};
AddTodo = connect()(AddTodo);
// так как возвращаем в первом аргументе пустой объект, то нет смысла писать так, как ниже:
// AddTodo = connect(
//   // 1 argument: map state to props
//   state => {
//     return {};
//   },
//   2 argument: map dispatch to props
//   dispatch => {
//     return { dispatch };
//   }
// )(AddTodo);

const Footer = () => (
  <p>
    Show:
    {' '}
    <FilterLink
      filter="SHOW_ALL"
    >
      All
    </FilterLink>
    {' '}
    <FilterLink
      filter="SHOW_ACTIVE"
    >
      Active
    </FilterLink>
    {' '}
    <FilterLink
      filter="SHOW_COMPLETED"
    >
      Completed
    </FilterLink>
  </p>
);

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(
        t => t.completed
      );
    case 'SHOW_ACTIVE':
      return todos.filter(
        t => !t.completed
      );
  }
};

// когда будут отдельные файлы, то функцию можно назвать просто mapStateToProps
const mapStateToTodoListProps = (state) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  };
};
const mapDispatchToTodoListProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    }
  };
};
const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList);  // указываем презентационный компонент, который хотим обернуть в container component

// Этот container component теперь не нужен, вместо него - несколько строк выше,
// используя connect из react-redux
// class VisibleTodoList extends React.Component {
//   componentDidMount() {
//     const {store} = this.context;
//     this.unsubscribe = store.subscribe(() =>
//       this.forceUpdate()
//     );
//   }

//   componentWillUnmount() {
//     this.unsubscribe();
//   }

//   render() {
//     const props = this.props;
//     const {store} = this.context;
//     const state = store.getState();

//     return (
//       <TodoList
//         todos={
//           getVisibleTodos(
//             state.todos,
//             state.visibilityFilter
//           )
//         }
//         onTodoClick={id =>
//           store.dispatch({
//             type: 'TOGGLE_TODO',
//             id
//           })
//         }
//       />
//     );
//   }
// }
// VisibleTodoList.contextTypes = {
//   store: React.PropTypes.object
// };

// container component
const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

// Это все не нужно, так как подключаем Provider из react-redux
//
// class Provider extends React.Component {
//   // все потомки Provider и их потомки будут получать объект из getChildContext()
//   // с полем store
//   getChildContext() {
//     return {
//       store: this.props.store
//     };
//   }
//   render() {
//     // this.props.children означает то, что Provider рендерит то, что в него положат,
//     // в нашем случае - компонент TodoApp
//     return this.props.children;
//   }
// }
// Provider.childContextTypes = {
//   store: React.PropTypes.object
// };

ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp />
  </Provider>,
  document.getElementById('app')
);

import React from 'react';

import Filter from './todos-filter';
import AddTodo from '../containers/add-todos';
import VisibleTodoList from '../containers/visible-todo-list';

const Todos = () => (
  <div>
    <h1>Todos</h1>
    <AddTodo />
    <Filter />
    <VisibleTodoList />
  </div>
);

export default Todos;

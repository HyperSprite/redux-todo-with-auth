import React from 'react';

import Footer from './footer';
import AddTodo from '../containers/add-todos';
import VisibleTodoList from '../containers/visible-todo-list';

const Todos = () => (
  <div>
    <h1>Todos</h1>
    <AddTodo />
    <Footer />
    <VisibleTodoList />
  </div>
);

export default Todos;

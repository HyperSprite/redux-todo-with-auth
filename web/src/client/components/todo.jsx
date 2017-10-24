import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      color: completed ? '#bbb' : '#111',
    }}
  >
    {text}
  </li>
);

Todo.propTypes = propTypes;

export default Todo;

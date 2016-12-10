// @flow

import axios from 'axios';
import { Redirect } from 'react-router';

const ROOT_URL = '';
const getID = () => new Date().getTime();


// If any of these have a flow error about
// being incompatable with a string enum
// check the ActionStrings in the interface file.
export const TYPES: {[key: ActionStrings]: ActionStrings} = {
  ADD_TODO: 'ADD_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  SET_VISIBILITY_FILTER: 'SET_VISIBILITY_FILTER',
  AUTH_USER: 'AUTH_USER',
  UNAUTH_USER: 'UNAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
};

// handle error mesages
export function authError(error) {
  return {
    type: TYPES.AUTH_ERROR,
    payload: error,
  };
}

// Action creators
export function signinUser({ email, password }) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        dispatch({ type: TYPES.AUTH_USER });
      })
      .catch(error => dispatch(authError(error.response.data.error)));
  };
}

export function signupUser({ email, password }) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        dispatch({ type: TYPES.AUTH_USER });
      })
      .catch(error => dispatch(authError(error.response.data.error)));
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return ({ type: TYPES.UNAUTH_USER });
}

export function addTodo(text: string) {
  return {
    type: TYPES.ADD_TODO,
    payload: {
      id: getID(),
      text,
    },
  };
}

export function toggleTodo(id: number) {
  return {
    type: TYPES.TOGGLE_TODO,
    payload: {
      id,
    },
  };
}

export function setVisibilityFilter(filter: string) {
  return {
    type: TYPES.SET_VISIBILITY_FILTER,
    payload: {
      filter,
    },
  };
}

// @flow

import axios from 'axios';
import { Redirect } from 'react-router';
import { reset } from 'redux-form';
import { v4 } from 'uuid';

import config from '../../server/config';

const ROOT_URL = config.rootURL;


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
  FETCH_USER: 'FETCH_USER',
  FETCH_DATA: 'FETCH_DATA',
  FETCH_JSON: 'FETCH_JSON',
  POST_EVENT: 'POST_EVENT',
  CLEAR_EVENT: 'CLEAR_EVENT',
  DELET_EVENT: 'DELET_EVENT',
  FETCH_EVENT: 'FETCH_EVENT',
  FETCH_EVENTS: 'FETCH_EVENTS',
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
    axios.post(`${ROOT_URL}/auth/signin`, { email, password })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        dispatch({ type: TYPES.AUTH_USER });
      })
      .catch(error => dispatch(authError(error.response.data.error)));
  };
}

export function signupUser({ email, password }) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/auth/signup`, { email, password })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        dispatch({ type: TYPES.AUTH_USER });
      })
      .catch(error => dispatch(authError(error.response.data.error)));
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('state');
  return ({ type: TYPES.UNAUTH_USER });
}

export function ifToken() {
  const token = localStorage.getItem('token');
  if (token) {
    return (dispatch) => {
      dispatch({ type: TYPES.AUTH_USER });
    };
  }
}

// Events

// Gets a list of Events
export function fetchEvents(relURL) {
  const axiosConfig = {
    headers: { authorization: localStorage.getItem('token') },
  };
  return (dispatch) => {
    axios.get(`${ROOT_URL}/${relURL}`, axiosConfig)
      .then((response) => {
        dispatch({
          type: TYPES.FETCH_EVENTS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: TYPES.FETCH_DATA,
          payload: error.data,
        });
      });
  };
}

// Posts new Event to server
export function postForm(formProps, relURL) {
  const axiosConfig = {
    headers: { authorization: localStorage.getItem('token') },
  };
  const formData = formProps;
  formData.eventId = formData.eventID || v4();
  return (dispatch) => {
    axios.post(`${ROOT_URL}/${relURL}`, formData, axiosConfig)
      .then((response) => {
        dispatch({
          type: TYPES.POST_EVENT,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: TYPES.FETCH_DATA,
          payload: error.data,
        });
      });
  };
}

// Removes previous Event from store
export function clearEvent() {
  return (dispatch) => {
    dispatch({
      type: TYPES.CLEAR_EVENT,
    });
  };
}

export function cancelEdit() {
  return (dispatch) => {
    dispatch({
      type: TYPES.POST_EVENT,
      payload: { postSuccess: true },
    });
  };
}

// Posts a delete to the server and removes the item from the list
export function deleteEvent(eventId, relURL) {
  const axiosConfig = {
    headers: { authorization: localStorage.getItem('token') },
  };
  const formData = {};
  formData.eventId = eventId;
  return (dispatch) => {
    axios.post(`${ROOT_URL}/${relURL}`, formData, axiosConfig)
      .then(() => {
        dispatch({
          type: TYPES.DELET_EVENT,
          payload: eventId,
        });
      })
      .catch((error) => {
        dispatch({
          type: TYPES.FETCH_DATA,
          payload: error.data,
        });
      });
  };
}

export function editEvent(eventId, relURL) {
  const axiosConfig = {
    headers: { authorization: localStorage.getItem('token') },
  };
  return (dispatch) => {
    axios.get(`${ROOT_URL}/${relURL}/${eventId}`, axiosConfig)
    .then((response) => {
      dispatch({
        type: TYPES.FETCH_EVENT,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: TYPES.FETCH_DATA,
        payload: error.data,
      });
    });
  }
}

// end Events

export function fetchMessage() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/secret`, {
      headers: { authorization: localStorage.getItem('token') },
    })
      .then((response) => {
        dispatch({
          type: TYPES.FETCH_DATA,
          payload: response.data.secret,
        });
      })
      .catch((error) => {
        dispatch({
          type: TYPES.FETCH_DATA,
          payload: error.data,
        });
      });
  };
}

export function fetchData(relURL) {
  const axiosConfig = {
    headers: { authorization: localStorage.getItem('token') },
  };
  return (dispatch) => {
    axios.get(`${ROOT_URL}/${relURL}`, axiosConfig)
      .then((response) => {
        dispatch({
          type: TYPES.FETCH_USER,
          payload: response.data.user,
        });
      })
      .catch((error) => {
        dispatch({
          type: TYPES.FETCH_DATA,
          payload: error.data,
        });
      });
  };
}

export function addTodo(text: string) {
  return {
    type: TYPES.ADD_TODO,
    payload: {
      id: v4(),
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

// @flow

import axios from 'axios';
import { v4 } from 'uuid';

const ROOT_URL = process.env.ROOT_URL || '';

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
  FETCH_USER_ACTIVITIES: 'FETCH_USER_ACTIVITIES',
  FETCH_DATA: 'FETCH_DATA',
  FETCH_JSON: 'FETCH_JSON',
  POST_EVENT_ERROR: 'POST_EVENT_ERROR',
  POST_EVENT: 'POST_EVENT',
  EDIT_EVENT: 'EDIT_EVENT',
  CLEAR_EVENT: 'CLEAR_EVENT',
  DELET_EVENT: 'DELET_EVENT',
  FETCH_EVENT: 'FETCH_EVENT',
  FETCH_EVENTS: 'FETCH_EVENTS',
  SET_FAV_EVENT: 'SET_FAV_EVENT',
  FETCH_EVENT_STRAVA_ROUTE: 'FETCH_EVENT_STRAVA_ROUTE',
  SET_PAGE_NAME: 'SET_PAGE_NAME',
  SET_PAGE_DRAWER: 'SET_PAGE_DRAWER',
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
export function fetchEvents(relURL, stravaId) {
  const axiosConfig = {
    headers: {
      authorization: localStorage.getItem('token'),
      stravaId,
    },
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

// Posts new or updated Event to server
export function postForm(formProps, relURL, index) {
  const axiosConfig = {
    headers: { authorization: localStorage.getItem('token') },
  };
  return (dispatch) => {
    axios.post(`${ROOT_URL}/${relURL}`, formProps, axiosConfig)
      .then((response) => {
        const result = response.data;
        if (typeof(index) === 'number') {
          result.index = index;
          dispatch({
            type: TYPES.EDIT_EVENT,
            payload: result,
          });
        } else {
          dispatch({
            type: TYPES.POST_EVENT,
            payload: result,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: TYPES.POST_EVENT_ERROR,
          payload: error.response.data.errors,
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
      payload: { event: { postSuccess: true } },
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
  };
}

export function favEvent(eventId, relURL) {
  const axiosConfig = {
    headers: { authorization: localStorage.getItem('token') },
  };
  return (dispatch) => {
    axios.get(`${ROOT_URL}/${relURL}/${eventId}/fav`, axiosConfig)
    .then((response) => {
      dispatch({
        type: TYPES.SET_FAV_EVENT,
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

// end Events

// Strava api
const relURLStrava = 'apiv1/strava';
// FETCH_STRAVA_ROUTES
// fetchStravaRoutes
export function fetchStrava(path, id, index, stravatoken, context) {
  const axiosConfig = {
    headers: {
      authorization: localStorage.getItem('token'),
      access_token: stravatoken,
    },
  };
  const isId = id ? `/${id}` : '';
  return (dispatch) => {
    axios.get(`${relURLStrava}/${path}${isId}`, axiosConfig)
      .then((response) => {
        const result = {
          data: {},
        };
        switch (context) {
          case 'eventRoute':
            result.index = index;
            result.data.eventRouteURL = response.data.id;
            result.data.eventRouteName = response.data.name;
            result.data.eventType = response.data.type;
            result.data.evenSubType = response.data.sub_type;
            result.data.eventRouteAthlete = response.data.athlete.id;
            result.data.eventRouteDescription = response.data.description;
            result.data.eventRouteDistacne = response.data.distance;
            result.data.eventRouteElevationGain = response.data.elevation_gain;
            result.data.eventRouteTimestamp = response.data.timestamp;
            result.data.eventRouteSummaryPolyline = response.data.map.summary_polyline;
            result.data.eventRouteSegments = response.data.segments;
            dispatch({
              type: TYPES.FETCH_EVENT_STRAVA_ROUTE,
              payload: result,
            });
            break;
          case 'getUser':
            dispatch({
              type: TYPES.FETCH_USER,
              payload: response.data.user,
            });
            break;
          case 'getUserActivities':
            dispatch({
              type: TYPES.FETCH_USER_ACTIVITIES,
              payload: response.data.activityCount,
            });
            break;
        }
        // dispatch({
        //   type: TYPES.FETCH_STRAVA_ROUTES,
        //   payload: result,
        // });
      })
      .catch((error) => {
        dispatch({
          type: TYPES.FETCH_DATA,
          payload: error,
        });
      });
  };
}


// end Strava

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

export function setVisibilityFilter(filter: string) {
  return {
    type: TYPES.SET_VISIBILITY_FILTER,
    payload: {
      filter,
    },
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

// page

export function setPageName(name: string) {
  return {
    type: TYPES.SET_PAGE_NAME,
    payload: name,
  };
}

export function setDrawer(drawer: boolean) {
  return {
    type: TYPES.SET_PAGE_DRAWER,
    payload: drawer,
  };
}

// /page

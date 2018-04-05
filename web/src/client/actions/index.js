

import axios from 'axios';
import { v4 } from 'uuid';
import qs from 'qs';
import calcRangeInputData from './calcRangeInputData';

const axiosConfig = {
  headers: {
    authorization: localStorage.getItem('token'),
  },
};

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
  FETCH_WEEKLYTOTALS_ACTIVITIES: 'FETCH_WEEKLYTOTALS_ACTIVITIES',
  FETCH_ACTIVITIES_SEARCH: 'FETCH_ACTIVITIES_SEARCH',
  CLEAR_ACTIVITY_SEARCH: 'CLEAR_ACTIVITY_SEARCH',
  SET_ACTIVITY_SEARCH_CUSTOM: 'SET_ACTIVITY_SEARCH_CUSTOM',
  ACTIVITY_REMOVED: 'ACTIVITY_REMOVED',
  ACTIVITY_REFRESHED: 'ACTIVITY_REFRESHED',
  FETCH_USER_ROUTES: 'FETCH_USER_ROUTES',
  FETCH_ROUTES_SEARCH: 'FETCH_ROUTES_SEARCH',
  CLEAR_ROUTES_SEARCH: 'CLEAR_ROUTES_SEARCH',
  SET_ROUTE_SEARCH_CUSTOM: 'SET_ROUTE_SEARCH_CUSTOM',
  ROUTE_REMOVED: 'ROUTE_REMOVED',
  SET_WEEKLY_STATS: 'SET_WEEKLY_STATS',
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
  SET_IS_FETCHING: 'SET_IS_FETCHING',
  SET_IS_FETCHING_OFF: 'SET_IS_FETCHING_OFF',
  SET_MPREF_SWITCH: 'SET_MPREF_SWITCH',
  SET_CLUB_NOTICE: 'SET_CLUB_NOTICE',
  MESSAGE_FOR_USER: 'MESSAGE_FOR_USER',
  SERVER_MESSAGE: 'SERVER_MESSAGE',
  THEME_CHANGE_PALETTE_TYPE: 'THEME_CHANGE_PALETTE_TYPE',
  SOCKET_CONNECT: 'SOCKET_CONNECT',
  ACTIVITY_STATUS: 'ACTIVITY_STATUS',
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

export function toggleClubNotice(toggle) {
  return (dispatch) => {
    axios.patch(`${ROOT_URL}/auth/clubNotice`, { clubNotice: toggle }, axiosConfig)
      .then((response) => {
        dispatch({
          type: TYPES.SET_CLUB_NOTICE,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: TYPES.FETCH_DATA,
          paylaod: error.data,
        });
      });
  };
}

// Events

// Gets a list of Events
export function fetchEvents(relURL, stravaId) {
  axiosConfig.stravaId = stravaId;
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

export function editEvent(eventId, relURL, option) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/${relURL}/${eventId}`, axiosConfig)
    .then((response) => {
      if (option === 'copy') {
        delete response.data._id;
        delete response.data.eventDate;
        delete response.data.eventId;
        delete response.data.createdAt;
        delete response.data.updatedAt;
      }
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
  axiosConfig.access_token = stravatoken;
  const isId = id ? `/${id}` : '';
  return (dispatch) => {
    axios.get(`${relURLStrava}/${path}${isId}`, axiosConfig)
      .then((response) => {
        const result = {
          data: {},
        };
        if (response.data.signout) {
          localStorage.removeItem('token');
          localStorage.removeItem('state');
          window.location = '/';
          dispatch({ type: response.data.types });
        } else {
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
              dispatch({
                type: TYPES.SET_IS_FETCHING_OFF,
              });
              break;
            case 'getUserActivities':
              dispatch({
                type: TYPES.FETCH_USER_ACTIVITIES,
                payload: response.data,
              });
              dispatch({
                type: TYPES.SET_IS_FETCHING_OFF,
              });
              break;
          }
        }
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

// Activities

export function setWeeklyStats() {
  return {
    type: TYPES.SET_WEEKLY_STATS,
  };
}

export function clearActivitySearch() {
  return (dispatch) => {
    dispatch({
      type: TYPES.CLEAR_ACTIVITY_SEARCH,
    });
  };
}

export function setActivitySearchCustom() {
  return (dispatch) => {
    dispatch({
      type: TYPES.SET_ACTIVITY_SEARCH_CUSTOM,
    });
  };
}

export function fetchActivitiesWeeklyTotals(relURL, stravaId, weeksBack) {
  const isWeeksBack = weeksBack ? `/${weeksBack}` : '';
  return (dispatch) => {
    axios.get(`${relURL}${isWeeksBack}`, axiosConfig)
      .then((response) => {
        dispatch({
          type: TYPES.FETCH_WEEKLYTOTALS_ACTIVITIES,
          payload: response.data,
        });
        dispatch({
          type: TYPES.SET_IS_FETCHING_OFF,
        });
        if (response.data.serverMessage) {
          dispatch({
            type: TYPES.SERVER_MESSAGE,
            payload: response.data.serverMessage,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: TYPES.FETCH_DATA,
          payload: error.data,
        });
      });
  };
}

export function fetchActivitiesSearch(relURL, queryOptions) {
  // axiosConfig.data = qs.stringify(queryOptions);
  return (dispatch) => {
    axios.get(`${relURL}?${qs.stringify(queryOptions)}`, axiosConfig)
      .then((response) => {
        const rangeInputActivitiesAll = calcRangeInputData(response.data.activCalcAll, response.data.sortStrings);
        const rangeInputActivitiesFilter = calcRangeInputData(response.data.activCalcFilter, response.data.sortStrings);
        const data = {
          ...response.data,
          rangeInputActivitiesAll,
          rangeInputActivitiesFilter,
        };
        dispatch({
          type: TYPES.FETCH_ACTIVITIES_SEARCH,
          payload: data,
        });
        dispatch({
          type: TYPES.SET_IS_FETCHING_OFF,
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

export function manageActivity(action, activityId) {
  return (dispatch) => {
    axios.post(`apiv1/activity/${activityId}/${action}`, { activityId }, axiosConfig)
      .then((response) => {
        switch (action) {
          case 'delete':
            dispatch({
              type: TYPES.ACTIVITY_REMOVED,
              payload: response.data,
            });
            break;
          case 'refresh':
            dispatch({
              type: TYPES.ACTIVITY_REFRESHED,
              payload: response.data,
            });
            break;
          default:
            break;
        }

        dispatch({
          type: TYPES.SET_IS_FETCHING_OFF,
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

export function removeActivity(relURL, activityId) {
  return (dispatch) => {
    axios.post(`${relURL}`, { activityId }, axiosConfig)
      .then((response) => {
        dispatch({
          type: TYPES.ACTIVITY_REMOVED,
          payload: response.data,
        });
        dispatch({
          type: TYPES.SET_IS_FETCHING_OFF,
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

// end Activities
// Routeplan

export function clearRouteSearch() {
  return (dispatch) => {
    dispatch({
      type: TYPES.CLEAR_ROUTE_SEARCH,
    });
  };
}

export function setRouteSearchCustom() {
  return (dispatch) => {
    dispatch({
      type: TYPES.SET_ROUTE_SEARCH_CUSTOM,
    });
  };
}

export function fetchRouteplanSearch(relURL, queryOptions) {
  // axiosConfig.data = qs.stringify(queryOptions);
  return (dispatch) => {
    axios.get(`${relURL}?${qs.stringify(queryOptions)}`, axiosConfig)
      .then((response) => {
        dispatch({
          type: TYPES.FETCH_ROUTES_SEARCH,
          payload: response.data,
        });
        dispatch({
          type: TYPES.SET_IS_FETCHING_OFF,
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

export function removeRouteplan(relURL, activityId) {
  return (dispatch) => {
    axios.post(`${relURL}`, { activityId }, axiosConfig)
      .then((response) => {
        dispatch({
          type: TYPES.ROUTE_REMOVED,
          payload: response.data,
        });
        dispatch({
          type: TYPES.SET_IS_FETCHING_OFF,
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

// end Routeplan

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

export function setPageName(name: string, help: string = '') {
  return {
    type: TYPES.SET_PAGE_NAME,
    payload: { name, help },
  };
}

export function setDrawer(drawer: boolean) {
  return {
    type: TYPES.SET_PAGE_DRAWER,
    payload: drawer,
  };
}

export function setIsFetching() {
  return {
    type: TYPES.SET_IS_FETCHING,
  };
}

export function setIsFetchingOff() {
  return {
    type: TYPES.SET_IS_FETCHING_OFF,
  };
}

export function setMPrefSwitch() {
  return {
    type: TYPES.SET_MPREF_SWITCH,
  };
}

export function setMUITheme(paletteType: string) {
  return {
    type: TYPES.THEME_CHANGE_PALETTE_TYPE,
    payload: {
      paletteType: paletteType === 'light' ? 'dark' : 'light',
    },
  };
}


// SOCKET_CONNECT
// 'action', action.type, action.payload.user, action.payload.chat, action.payload.id, socket.id,
export const socketConnect = (action: string, data: object) => ({
  type: `SOCKET_CONNECT.${action}`,
  payload: {
    data,
  },
});

// @flow

import { TYPES } from '../actions';

import lib from './reducer-lib';

export default function (state = { events: [], event: { eventRoutes: [] } }, action) {
  switch (action.type) {
    case TYPES.POST_EVENT:
      return { ...state, event: action.payload.event, updated: action.payload.updated };
    case TYPES.POST_EVENT_ERROR:
      return { ...state, error: action.payload };
    case TYPES.EDIT_EVENT:
      return {
        ...state,
        event: action.payload.event,
        events: lib.replaceArrayItem(state.events, action.payload, 'updated'),
      };
    case TYPES.CLEAR_EVENT:
      return { ...state, event: {} };
    case TYPES.FETCH_EVENT:
      return { ...state, event: action.payload };
    case TYPES.FETCH_EVENT_STRAVA_ROUTE:
      return {
        ...state,
        event: {
          ...state.event,
          ...state.event.eventRoutes[action.payload.index] = action.payload.data,
        }
      };
    case TYPES.DELETE_EVENT:
      return {
        ...state,
        events: [
          ...state.events.filter(event => event.eventId !== action.payload),
        ],
      };
    case TYPES.FETCH_EVENTS:
      return { ...state, events: action.payload };
    case TYPES.SET_FAV_EVENT:
      return {
        ...state,
        events: state.events.map((event) => event.eventId === action.payload.eventId ? (
          { ...event, eventFavorites: action.payload.eventFavorites }
        ) : (
          event
        ),
      ) };
    default:
      return state;
  }
}

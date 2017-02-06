// @flow

import { TYPES } from '../actions';

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
        events: [
          ...state.events.slice(0, action.payload.index),
          state.events[action.payload.index] = action.payload.updated,
          ...state.events.slice(action.payload.index + 1),
        ],
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
    case TYPES.DELET_EVENT:
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

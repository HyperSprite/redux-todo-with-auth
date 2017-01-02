// @flow

import { TYPES } from '../actions';

export default function (state = { events: [], event: { eventRoutes: [] } }, action) {
  switch (action.type) {
    case TYPES.POST_EVENT:
      return { ...state, event: action.payload };
    case TYPES.CLEAR_EVENT:
      return { ...state, event: {} };
    case TYPES.FETCH_EVENT:
      return { ...state, event: action.payload };
    case TYPES.DELET_EVENT:
      return {
        ...state,
        events: [
          ...state.events.filter(event => event.eventId !== action.payload),
        ],
      };
    case TYPES.FETCH_EVENTS:
      return { ...state, events: action.payload };
    default:
      return state;
  }
}

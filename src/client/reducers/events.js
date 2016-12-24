// @flow

import { TYPES } from '../actions';

export default function (state = { events: [] }, action) {
  switch (action.type) {
    case TYPES.POST_EVENTS:
      return { ...state, message: action.payload };
    case TYPES.FETCH_EVENTS:
      return { ...state, message: action.payload };
    default:
      return state;
  }
}

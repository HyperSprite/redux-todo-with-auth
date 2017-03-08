// @flow

import { TYPES } from '../actions';

export default function (state = {}, action) {
  switch (action.type) {
    case TYPES.FETCH_WEATHER:
      return { ...state, ...state.action.payload };
    default:
      return state;
  }
}

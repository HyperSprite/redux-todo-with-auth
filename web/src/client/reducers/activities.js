// @flow

import { TYPES } from '../actions';

export default function (state = {
  weeks: [],
}, action) {
  switch (action.type) {
    case TYPES.FETCH_USER_ACTIVITIES:
      return { ...state, activityNewCount: action.payload };
    case TYPES.FETCH_WEEKS_ACTIVITIES:
      return { ...state, weeks: [...state.weeks.concat(action.payload)] };
    default:
      return state;
  }
}

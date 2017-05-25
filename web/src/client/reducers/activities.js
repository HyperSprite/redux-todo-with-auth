// @flow

import { TYPES } from '../actions';

export default function (state = {
  weeklyStats: [],
}, action) {
  switch (action.type) {
    case TYPES.FETCH_USER_ACTIVITIES:
      return { ...state, activityNewCount: action.payload };
    case TYPES.FETCH_WEEKLYTOTALS_ACTIVITIES:
      return { ...state, weeklyStats: [...state.weeklyStats.concat(action.payload)] };
    default:
      return state;
  }
}

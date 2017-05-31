// @flow

import { TYPES } from '../actions';

export default function (state = {
  activities: [],
  weeklyStats: [],
  weeklyStatsCount: 0,


}, action) {
  switch (action.type) {
    case TYPES.FETCH_USER_ACTIVITIES:
      return { ...state, activityNewCount: action.payload };
    case TYPES.SET_WEEKLY_STATS:
      return {
        ...state,
        weeklyStatsCount: state.weeklyStatsCount + 1,
      };
    case TYPES.FETCH_WEEKLYTOTALS_ACTIVITIES:
      return {
        ...state,
        weeklyStats: [...state.weeklyStats.concat(action.payload.stats)],
        activities: [...state.activities.concat(action.payload.week)],
      };

    default:
      return state;
  }
}

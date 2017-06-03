// @flow

import { TYPES } from '../actions';

import lib from './reducer-lib';

export default function (state = {
  activities: [],
  weeklyStats: [],
  weeklyStatsCount: 0,
}, action) {
  switch (action.type) {
    case TYPES.FETCH_USER_ACTIVITIES:
      return {
        ...state,
        activities: lib.insertOrReplaceArrayItem(state.activities, action.payload, 'week', 'activityId'),
        weeklyStats: lib.replaceArrayItem(state.weeklyStats, action.payload, 'stats'),
      };

    case TYPES.SET_WEEKLY_STATS:
      return {
        ...state,
        weeklyStatsCount: state.weeklyStatsCount + 1,
      };
    case TYPES.FETCH_WEEKLYTOTALS_ACTIVITIES:
      return {
        ...state,
        activities: [...state.activities.concat(action.payload.week)],
        weeklyStats: [...state.weeklyStats.concat(action.payload.stats)],
      };

    default:
      return state;
  }
}

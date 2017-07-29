// @flow

import { TYPES } from '../actions';

import lib from './reducer-lib';

export default function (state = {
  activities: [],
  activitySearch: [],
  activitySearchCount: 1,
  activitySearchCustom: false,
  weeklyStats: [],
  weeklyStatsCount: 0,
}, action) {
  switch (action.type) {
    case TYPES.FETCH_USER_ACTIVITIES:
      return {
        ...state,
        activities: lib.insertOrReplaceArrayItem(state.activities, action.payload, 'week', 'activityId'),
        weeklyStats: lib.replaceArrayItem(state.weeklyStats, action.payload, 'stats'),
        weeklyStatsCount: state.weeklyStats.length + 1,
      };

    case TYPES.SET_WEEKLY_STATS:
      return {
        ...state,
        // weeklyStatsCount: state.weeklyStatsCount + 1,
      };

    case TYPES.FETCH_WEEKLYTOTALS_ACTIVITIES:
      return {
        ...state,
        activities: [...state.activities.concat(action.payload.week)],
        weeklyStats: [...state.weeklyStats.concat(action.payload.stats)],
      };

    case TYPES.CLEAR_ACTIVITY_SEARCH:
      return {
        ...state,
        activitySearchCount: 1,
      };

    case TYPES.SET_ACTIVITY_SEARCH_CUSTOM:
      return {
        ...state,
        activitySearchCustom: !state.activitySearchCustom,
      };

    case TYPES.FETCH_ACTIVITIES_SEARCH:
      if (state.activitySearchCount === 1) {
        return {
          ...state,
          activities: action.payload.activities,
          activitySearch: action.payload.activitySearch,
          activitySearchCount: state.activitySearchCount + 1,
        };
      }
      return {
        ...state,
        activities: [...state.activities.concat(action.payload.activities)],
        activitySearch: [...state.activitySearch.concat(action.payload.activitySearch)],
        activitySearchCount: state.activitySearchCount + 1,
      };

    case TYPES.ACTIVITY_REMOVED:
      return {
        ...state,
        activities: lib.insertOrReplaceArrayItem(state.activities, action.payload, null, 'activityId'),
      };

    default:
      return state;
  }
}

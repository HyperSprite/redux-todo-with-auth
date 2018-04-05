// @flow

import { TYPES } from '../actions';

import lib from './reducer-lib';

export default function (state = {
  filterIEE: [],
  searchCount: 1,
  sortStrings: [],
  query: '',
  rangeInputActivitiesAll: [],
  rangeInputActivitiesFilter: [],
}, action) {
  switch (action.type) {

    case TYPES.CLEAR_ACTIVITY_SEARCH:
      return {
        ...state,
        // filterIEE: [],
        searchCount: 1,
        rangeInputActivitiesFilter: state.rangeInputActivitiesAll,
        query: '',
      };

    case TYPES.FETCH_ACTIVITIES_SEARCH:
      return {
        ...state,
        filterIEE: action.payload.filterIEE,
        searchCount: state.searchCount + 1,
        sortStrings: action.payload.sortStrings,
        query: action.payload.query,
        rangeInputActivitiesAll: action.payload.rangeInputActivitiesAll,
        rangeInputActivitiesFilter: action.payload.rangeInputActivitiesFilter,
      };

    default:
      return state;
  }
}

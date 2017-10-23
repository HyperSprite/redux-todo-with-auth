// @flow

import { TYPES } from '../actions';

import lib from './reducer-lib';

export default function (state = {
  routeplans: [],
  routeSearch: [],
  routeSearchCount: 1,
  routeSearchCustom: false,
}, action) {
  switch (action.type) {

    case TYPES.CLEAR_ROUTE_SEARCH:
      return {
        ...state,
        routeSearchCount: 1,
      };

    case TYPES.SET_ROUTE_SEARCH_CUSTOM:
      return {
        ...state,
        routeSearchCustom: !state.routeSearchCustom,
      };

    case TYPES.FETCH_ROUTES_SEARCH:
      if (state.routeSearchCount === 1) {
        return {
          ...state,
          routeplans: action.payload.routeplans,
          routeSearch: action.payload.routeSearch,
          routeSearchCount: state.routeSearchCount + 1,
        };
      }
      return {
        ...state,
        routeplans: [...state.routeplans.concat(action.payload.routeplans)],
        routeSearch: [...state.routeSearch.concat(action.payload.routeSearch)],
        routeSearchCount: state.routeSearchCount + 1,
      };

    case TYPES.ROUTE_REMOVED:
      return {
        ...state,
        routeplans: lib.insertOrReplaceArrayItem(state.routeplans, action.payload, null, 'routeplanId'),
      };

    default:
      return state;
  }
}

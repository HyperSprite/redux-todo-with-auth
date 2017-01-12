// @flow

import { TYPES } from '../actions';

function visibilityFilter(state = 'EVENTS_SHOW_ALL', action) {
  switch (action.type) {
    case TYPES.SET_VISIBILITY_FILTER:
      return action.payload.filter;
    default:
      return state;
  }
}
export default visibilityFilter;

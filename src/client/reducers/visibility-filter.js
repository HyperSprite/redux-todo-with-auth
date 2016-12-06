// @flow

import { TYPES } from '../actions';

function visibilityFilter(state: string = 'SHOW_ALL', action: ActionVisibilityFilterIF) {
  switch (action.type) {
    case TYPES.SET_VISIBILITY_FILTER:
      return action.payload.filter;
    default:
      return state;
  }
}
export default visibilityFilter;

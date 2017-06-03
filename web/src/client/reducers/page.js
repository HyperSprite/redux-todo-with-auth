// @flow

import { TYPES } from '../actions';

export default function (state = {
  name: '',
  drawer: false,
  isFetching: false,
}, action) {
  switch (action.type) {
    case TYPES.SET_PAGE_NAME:
      return { ...state, name: action.payload };
    case TYPES.SET_PAGE_DRAWER:
      return { ...state, drawer: !state.drawer };
    case TYPES.SET_IS_FETCHING:
      return { ...state, isFetching: true };
    case TYPES.SET_IS_FETCHING_OFF:
      return { ...state, isFetching: false };
    default:
      return state;
  }
}

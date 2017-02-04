// @flow

import { TYPES } from '../actions';

export default function (state = {
  name: '',
  drawer: false,
}, action) {
  switch (action.type) {
    case TYPES.SET_PAGE_NAME:
      return { ...state, name: action.payload };
    case TYPES.SET_PAGE_DRAWER:
      return { ...state, drawer: !state.drawer };
    default:
      return state;
  }
}

// @flow

import { TYPES } from '../actions';

export default function (state = { name: '' }, action) {
  switch (action.type) {
    case TYPES.SET_PAGE_NAME:
      return { ...state, name: action.payload };
    default:
      return state;
  }
}

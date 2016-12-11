// @flow

import { TYPES } from '../actions';

export default function (state = {}, action) {
  switch (action.type) {
    case TYPES.AUTH_USER:
      return { ...state, error: '', authenticated: true };
    case TYPES.UNAUTH_USER:
      return { ...state, authenticated: false };
    case TYPES.AUTH_ERROR:
      return { ...state, error: action.payload };
    case TYPES.FETCH_DATA:
      return { ...state, message: action.payload };
    default:
      return state;
  }
}

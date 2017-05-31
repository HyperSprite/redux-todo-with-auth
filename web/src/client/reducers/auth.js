// @flow

import { TYPES } from '../actions';

export default function (state = {
  user: {},
  authenticated: false,
  // },
}, action) {
  switch (action.type) {
    case TYPES.AUTH_USER:
      return { ...state, error: '', authenticated: true };
    case TYPES.UNAUTH_USER:
      return { ...state, authenticated: false };
    case TYPES.AUTH_ERROR:
      return { ...state, error: action.payload };
    case TYPES.FETCH_DATA:
      return { ...state, message: action.payload };
    case TYPES.FETCH_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

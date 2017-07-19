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
    case TYPES.SET_CLUB_NOTICE:
      return { ...state, user: { ...state.user, clubNotice: action.payload.clubNotice } };
    default:
      return state;
  }
}

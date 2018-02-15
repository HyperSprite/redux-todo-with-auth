// @flow

import { TYPES } from '../actions';

export default function (state = {
  data: {},
  errors: '',
  // },
}, action) {
  switch (action.type) {
    case TYPES.FETCH_DATA:
      return { ...state, error: action.payload };
    case TYPES.SERVER_MESSAGE:
      return { ...state, data: action.paylaod };
    default:
      return state;
  }
}

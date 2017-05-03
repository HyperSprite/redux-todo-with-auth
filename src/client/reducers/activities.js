// @flow

import { TYPES } from '../actions';

export default function (state = {}, action) {
  switch (action.type) {
    case TYPES.FETCH_USER_ACTIVITIES:
      return { ...state, activityCount: action.payload };
    default:
      return state;
  }
}

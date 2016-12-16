// @flow

import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import { TYPES } from '../actions';
import auth from './auth';
import todos from './todos';
import visibilityFilter from './visibility-filter';

const appReducer = combineReducers({
  auth,
  form,
  todos,
  visibilityFilter,
});

const rootReducer = (state, action) => {
  if (action.type === TYPES.UNAUTH_USER) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;

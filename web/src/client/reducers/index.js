// @flow

import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import auth from './auth';
import todos from './todos';
import visibilityFilter from './visibility-filter';

const app = combineReducers({
  auth,
  form,
  todos,
  visibilityFilter,
});

export default app;

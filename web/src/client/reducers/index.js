// @flow

import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import { TYPES } from '../actions';
import activities from './activities';
import auth from './auth';
import events from './events';
import page from './page';
import routeplans from './routeplan';
import search from './search';
import serverMessage from './server-messages';
import theme from './theme';
import visibilityFilter from './visibility-filter';

const appReducer = combineReducers({
  activities,
  auth,
  events,
  page,
  form,
  routeplans,
  search,
  serverMessage,
  theme,
  visibilityFilter,
});

const rootReducer = (state, action) => {
  if (action.type === TYPES.UNAUTH_USER) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;

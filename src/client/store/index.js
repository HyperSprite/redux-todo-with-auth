import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import logger from 'redux-logger';

import { loadState, saveState } from './localstorage';
import { TYPES } from '../actions';
import reducers from '../reducers';

const persitedState = loadState();
const token = localStorage.getItem('token');

const prodMiddleware = [
  promise(),
  thunk,
];

const devMiddleware = [
  promise(),
  thunk,
  logger(),
];

let middlewareOptions;

if (process.env.NODE_ENV === 'production') {
  middlewareOptions = applyMiddleware(...prodMiddleware);
} else {
  middlewareOptions = composeWithDevTools(
    applyMiddleware(...devMiddleware),
    // other store enhancers if any
  );
}

const store = createStore(reducers, persitedState, middlewareOptions);

store.subscribe(() => {
  saveState({
    todos: store.getState().todos,
  });
});

if (token) {
  store.dispatch({ type: TYPES.AUTH_USER });
}

export default store;

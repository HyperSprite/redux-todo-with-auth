import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import logger from 'redux-logger';

import { loadState, saveState } from './localstorage';
import { TYPES, fetchData } from '../actions';
import reducers from '../reducers';

const persistentState = loadState();
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

const store = createStore(reducers, persistentState, middlewareOptions);

store.subscribe(() => {
  saveState({
    todos: store.getState().todos,
  });
});

// actions/index.js fetchData(relURL)
if (token) {
  store.dispatch({ type: TYPES.AUTH_USER });
  store.dispatch(fetchData('auth/user'));
}

export default store;
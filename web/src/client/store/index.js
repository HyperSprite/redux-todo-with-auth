import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import logger from 'redux-logger';

import reducers from '../reducers';

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

const store = createStore(reducers, middlewareOptions);

export default store;

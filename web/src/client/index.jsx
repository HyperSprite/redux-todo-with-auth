// @flow
//
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import routes from './router';
import store from './store';

import App from './components/app';


render(
  <Provider store={store}>
    <BrowserRouter>
      <App >{ routes }</App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

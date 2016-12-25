// @flow
//
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import routes from './router';
import store from './store';

import App from './components/app';

injectTapEventPlugin();

render(
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider>
        <App >{ routes }</App>
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

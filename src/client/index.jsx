// @flow
//
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import injectTapEventPlugin from 'react-tap-event-plugin';

import routes from './router';
import store from './store';
import Theme from './styles/theme';

import App from './components/app';

injectTapEventPlugin();

render(
  <Provider store={store}>
    <Router>
      <MuiThemeProvider muiTheme={getMuiTheme(Theme)}>
        <App >{ routes }</App>
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

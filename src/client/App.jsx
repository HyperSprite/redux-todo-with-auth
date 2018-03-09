// @flow
//
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { MuiThemeProvider as OldMuiThemeProvider } from 'material-ui'; // muiV0
import getMuiTheme from 'material-ui/styles/getMuiTheme'; // muiV0


import MuiTheme from './styles/mui-theme';  // muiV1

import routes from './router';
import store from './store';
import oldTheme from './styles/theme'; // muiV0

import Template from './components/template';

const app = Component => (
  <Provider store={store}>
    <MuiTheme >
    <Router>

        <OldMuiThemeProvider muiTheme={getMuiTheme(oldTheme)}>
          <Component >{ routes }</Component>
        </OldMuiThemeProvider>

    </Router>
    </MuiTheme>
  </Provider>
);

export default app(Template);

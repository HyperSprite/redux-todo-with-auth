// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import MuiTheme from './styles/mui-theme';
import routes from './router';
import store from './store';
import Template from './components/template';

const app = Component => (
  <Provider store={store}>
    <MuiTheme >
      <Router>
        <Component >{routes}</Component>
      </Router>
    </MuiTheme>
  </Provider>
);

export default app(Template);

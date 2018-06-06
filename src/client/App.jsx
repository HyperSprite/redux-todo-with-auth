// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import withRoot from './with-root';


import routes from './router';
import store from './store';
import Template from './components/template';

const App = () => (
  <Provider store={store}>
    <Router>
      <Template >{routes}</Template>
    </Router>
  </Provider>
);

export default hot(module)(withRoot(App));

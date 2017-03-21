// @flow
//
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { AppContainer } from 'react-hot-loader';

import routes from './router';
import store from './store';
import Theme from './styles/theme';

import App from './components/app';

injectTapEventPlugin();

const renderApp = (Component) => {
  render(
    <AppContainer>
      <Provider store={store}>
        <Router>
          <MuiThemeProvider muiTheme={getMuiTheme(Theme)}>
            <Component >{ routes }</Component>
          </MuiThemeProvider>
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

renderApp(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/app', () => {
    renderApp(App);
  });
}

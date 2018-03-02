// @flow
//
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

// import { MuiThemeProvider, createMuiTheme } from 'material-ui-next/styles'; // muiV1
import { MuiThemeProvider as OldMuiThemeProvider } from 'material-ui'; // muiV0
import getMuiTheme from 'material-ui/styles/getMuiTheme'; // muiV0
import injectTapEventPlugin from 'react-tap-event-plugin';

import { AppContainer } from 'react-hot-loader';

import MuiTheme from './styles/mui-theme';  // muiV1

import routes from './router';
import store from './store';
import oldTheme from './styles/theme'; // muiV0

import App from './components/app';

// const theme = createMuiTheme({ palette, typography });

injectTapEventPlugin();

const renderApp = (Component) => {
  render(
    <AppContainer>
      <Provider store={store}>
        <Router>
          <MuiTheme >
            <OldMuiThemeProvider muiTheme={getMuiTheme(oldTheme)}>
              <Component >{ routes }</Component>
            </OldMuiThemeProvider>
          </MuiTheme>
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

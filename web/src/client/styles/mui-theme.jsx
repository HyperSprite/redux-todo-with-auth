import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from 'material-ui-next/styles';
import Reboot from 'material-ui-next/Reboot';

import palette from './mui-palette';
import typography from './mui-typography';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const theme = createMuiTheme({ palette, typography });

const Theme = props => (
  <MuiThemeProvider theme={theme} sheetsManager={new Map()} >
    <Reboot />
    {props.children}
  </MuiThemeProvider>
);

Theme.propTypes = propTypes;

export default Theme;

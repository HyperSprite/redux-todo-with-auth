import 'typeface-roboto/index.css';
import React from 'react';
import PropTypes from 'prop-types';
// import { create } from 'jss';
// import jssCompose from 'jss-compose';
// import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createMuiTheme /* , jssPreset */ } from 'material-ui-next/styles';
import Reboot from 'material-ui-next/Reboot';

import palette from './mui-palette';
import typography from './mui-typography';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

// Configure JSS
// const jss = create({ plugins: [...jssPreset().plugins, jssCompose()] });

const theme = createMuiTheme({ palette, typography });

const Theme = props => (
  // <JssProvider jss={jss} >
  <MuiThemeProvider theme={theme} sheetsManager={new Map()} >
    <Reboot />
    {props.children}
  </MuiThemeProvider>
  // </JssProvider>
);

Theme.propTypes = propTypes;

export default Theme;

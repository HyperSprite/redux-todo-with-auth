import 'typeface-roboto/index.css';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { create } from 'jss';
// import jssCompose from 'jss-compose';
// import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createMuiTheme /* , jssPreset */ } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';

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

const getTheme = theme => createMuiTheme({
  typography,
  direction: theme.direction,
  palette: {
    ...palette,
    type: theme.paletteType,
  },
});


let theme = getTheme({
  paletteType: 'light',
});

// const theme = createMuiTheme({ palette, typography });

class Theme extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.uiTheme.paletteType !== this.props.uiTheme.paletteType ||
      nextProps.uiTheme.direction !== this.props.uiTheme.direction
    ) {
      theme = getTheme(nextProps.uiTheme);
    }
  }

  render() {
    return (
      // <JssProvider jss={jss} >
      <MuiThemeProvider theme={theme} sheetsManager={new Map()} >
        <CssBaseline />
        {this.props.children}
      </MuiThemeProvider>
      // </JssProvider>
    );
  }
}

Theme.propTypes = propTypes;

export default connect(state => ({
  uiTheme: state.theme,
}))(Theme);

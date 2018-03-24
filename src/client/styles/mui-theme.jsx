import 'typeface-roboto/index.css';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';

import palette from './mui-palette';
import typography from './mui-typography';
import mapStyles from './map-styles';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const getTheme = theme => createMuiTheme({
  typography,
  palette: {
    ...palette,
    type: theme.paletteType,
  },
  mapStyles: mapStyles(theme),
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
      nextProps.uiTheme.paletteType !== this.props.uiTheme.paletteType
    ) {
      theme = getTheme(nextProps.uiTheme);
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={theme} >
        <CssBaseline />
        {this.props.children}
      </MuiThemeProvider>
    );
  }
}

Theme.propTypes = propTypes;

export default connect(state => ({
  uiTheme: state.theme,
}))(Theme);

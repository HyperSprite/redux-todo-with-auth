import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import LightbulbIcon from 'mdi-react/LightbulbIcon';
import LightbulbOutlineIcon from 'mdi-react/LightbulbOutlineIcon';
// eslint-disable-next-line
import * as actions from '../../actions';


const propTypes = {
  adminMember: PropTypes.bool.isRequired,
  uiTheme: PropTypes.object.isRequired,
  setMUITheme: PropTypes.func.isRequired,
};

class SwitcherTheme extends React.Component {
  constructor(props) {
    super(props);
    this.handleTogglePaletteType = this.handleTogglePaletteType.bind(this);
  }

  handleTogglePaletteType() {
    this.props.setMUITheme(this.props.uiTheme.paletteType);
  }

  render() {
    const { adminMember, uiTheme } = this.props;
    return (
      <div>
        {adminMember ? (
          <ListItem>
            <ListItemText primary={uiTheme.paletteType} />
            <ListItemSecondaryAction>
              <IconButton
                color="inherit"
                onClick={this.handleTogglePaletteType}
                aria-labelledby="appbar-theme"
              >
                {uiTheme.paletteType === 'light' ? (
                  <SvgIcon><LightbulbOutlineIcon color="inherit" /></SvgIcon>
                ) : (
                  <SvgIcon><LightbulbIcon color="inherit" /></SvgIcon>
                )}
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    adminMember: state.auth.user.adminMember,
    uiTheme: state.theme,
  };
}

SwitcherTheme.propTypes = propTypes;

export default connect(mapStateToProps, actions)(SwitcherTheme);

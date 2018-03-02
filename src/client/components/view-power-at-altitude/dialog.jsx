import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Dialog } from 'material-ui';
import Cancel from 'material-ui/svg-icons/navigation/cancel';

import RaisedButton from 'material-ui/RaisedButton';
import DialogMessage from './dialog-message';
import style from './style';

const propTypes = {
  dialogData: PropTypes.number.isRequired,
  closeToolTip: PropTypes.string,
};

const defaultProps = {
  closeToolTip: 'close',
};

class DialogAlert extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const actions = [
      <IconButton
        tooltip={this.props.closeToolTip}
        onTouchTap={this.handleClose}
      >
        <Cancel />
      </IconButton>,
    ];

    return (
      <span>
        <RaisedButton label={this.props.dialogData} onTouchTap={this.handleOpen} />
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={style.dialog}
        >
          <DialogMessage data={this.props.dialogData} />
        </Dialog>
      </span>
    );
  }
}

DialogAlert.propTypes = propTypes;
DialogAlert.defaultProps = defaultProps;

export default DialogAlert;

import React, { Component } from 'react';
import { Dialog, FlatButton } from 'material-ui';

export default class DialogExampleModal extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        disabled={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Modal Dialog" onTouchTap={this.handleOpen} />
        <Dialog
          title={title}
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          {text}
        </Dialog>
      </div>
    );
  }
}

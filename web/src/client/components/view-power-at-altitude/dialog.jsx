import React from 'react';
import PropTypes from 'prop-types';
import Dialog, {
  withMobileDialog,
} from 'material-ui-next/Dialog';

import Button from 'material-ui-next/Button';
import DialogMessage from './dialog-message';


const propTypes = {
  dialogData: PropTypes.number.isRequired,
  fullScreen: PropTypes.bool.isRequired,
};

class DialogAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { dialogData, fullScreen } = this.props;
    return (
      <span>
        <Button
          variant="raised"
          color="primary"
          onClick={this.handleOpen}
        >
          {dialogData}
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogMessage data={dialogData} handleClose={this.handleClose} print {...this.props} />
        </Dialog>
      </span>
    );
  }
}

DialogAlert.propTypes = propTypes;

export default withMobileDialog()(DialogAlert);

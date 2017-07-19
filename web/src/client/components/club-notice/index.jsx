import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IconButton, Dialog } from 'material-ui';
import Cancel from 'material-ui/svg-icons/navigation/cancel';
import RaisedButton from 'material-ui/RaisedButton';

import DialogMessage from '../form/dialog-message';
import Checkbox from '../form/checkbox-icon';

import * as actions from '../../actions';

const propTypes = {
  toggleClubNotice: PropTypes.func.isRequired,
  firstname: PropTypes.string.isRequired,
  clubMember: PropTypes.bool.isRequired,
  clubNotice: PropTypes.bool.isRequired,
};

const defaultProps = {
  firstname: '',
  clubMember: false,
  clubNotice: false,
};

class toggleClubNoticeDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.toggleNotice = this.toggleNotice.bind(this);
  }

  componentWillMount() {
    this.setState({ open: !this.props.clubNotice });
  }

  toggleNotice() {
    this.props.toggleClubNotice(!this.props.clubNotice);
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const buttonActions = [
      <IconButton
        key={1}
        tooltip="Close this message"
        onTouchTap={this.handleClose}
      >
        <Cancel />
      </IconButton>,
    ];

    const cardText = (
      <div>
        <h4>Congratulations {this.props.firstname}!</h4>
        <p>You have connected with Strava.</p>
        <p>{'Don\'t forget to join the '}
          <a href="https://www.strava.com/clubs/araceathlete" target="blank">
            A Race athlete Strava Club
          </a>
        </p>
        <p>Joining the club gets you additional features such as:</p>
        <ul>
          <li>Creating New Events</li>
          <li>Personalized Power at Altitude</li>
        </ul>
        <p>{'If you don\'t want to join now, the link to the club is always available from the Menu Drawer.'}
        </p>
      </div>
    );

    const dialog = (
      <span>
        <RaisedButton label="Open" onTouchTap={this.handleOpen} />
        <Dialog
          actions={buttonActions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <DialogMessage cardText={cardText} />
          <Checkbox option={this.props.clubNotice} onClick={this.toggleNotice} /> {'I don\'t want to see this agian'}
        </Dialog>
      </span>
    );

    if (this.props.firstname && !this.props.clubNotice && !this.props.clubMember) {
      return dialog;
    }
    return null;
  }
}

toggleClubNoticeDialog.propTypes = propTypes;
toggleClubNoticeDialog.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    clubMember: state.auth.user.clubMember,
    clubNotice: state.auth.user.clubNotice,
    firstname: state.auth.user.firstname,
  };
}

export default connect(mapStateToProps, actions)(toggleClubNoticeDialog);

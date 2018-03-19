import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog, { DialogActions } from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import SvgIcon from 'material-ui/SvgIcon';
import ButtonClose from '../button/close';

import Icon from '../icon';
import ButtonOpen from '../button/open';
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
      <ButtonClose
        key={1}
        tooltip="Close this message"
        onClick={this.handleClose}
        color="primary"
      />,
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
          <li>Activity Search</li>
        </ul>
        <p>{'If you don\'t want to join now, the link to the club is always available from the Menu Drawer.'}
        </p>
      </div>
    );

    const dialog = (
      <span>
        <ButtonOpen
          color="inherit"
          label="Club Notice"
          onClick={this.handleOpen}
        />
        <Dialog
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <DialogMessage cardText={cardText} />
          <Checkbox
            option={this.props.clubNotice}
            onClick={this.toggleNotice}
          />
          {'I don\'t want to see this agian'}
          <DialogActions>
            {buttonActions}
          </DialogActions>
        </Dialog>
      </span>
    );

    if (this.props.firstname && !this.props.clubMember) {
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

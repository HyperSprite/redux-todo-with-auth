import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel } from 'material-ui/Form';

import * as actions from '../../actions';

const propTypes = {
  toggleClubNotice: PropTypes.func.isRequired,
  firstname: PropTypes.string,
  clubMember: PropTypes.bool,
  clubNotice: PropTypes.bool,
};

const defaultProps = {
  firstname: '',
  clubMember: true,
  clubNotice: true,
};

const styles = theme => ({
  root: {
    padding: 6,
  },

});

class ClubNotice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.toggleNotice = this.toggleNotice.bind(this);
  }

  componentDidMount() {
    if (!this.state.open && !this.props.clubMember) {
      this.handleOpen();
    }
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
    const { classes, firstname, clubMember, clubNotice } = this.props;

    console.log('clubNotice', clubNotice, 'clubMember', clubMember);

    return (clubMember || clubNotice) ? null : (
      <Card>
        <CardHeader
          title={`Welcome ${firstname}`}
        />
        <CardContent>
          <Typography variant="body1">You have connected with Strava!</Typography>
          <Typography>{'Don\'t forget to join the '}
            <a href="https://www.strava.com/clubs/araceathlete" target="blank">
              A Race athlete Strava Club
            </a>
          </Typography>
          <Typography>Joining the club grants you additional features such as:</Typography>
          <ul>
            <li>Creating New Events</li>
            <li>Activity Search</li>
          </ul>
          <Typography>For more information, see our <a href="/blog/feature-requirements" target="new">Feature Requirements blog post</a> </Typography>
        </CardContent>
        <CardActions>
          <FormControlLabel
            control={
              <Checkbox
                checked={clubNotice}
                onChange={this.toggleNotice}
                color="primary"
              />
            }
            label="Disable this message"
          />
        </CardActions>
        <CardContent>
          <Typography>
            If at any time you want to see this message again, click the Club Notice button in the upper right
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

ClubNotice.propTypes = propTypes;
ClubNotice.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    clubMember: state.auth.user.clubMember,
    clubNotice: state.auth.user.clubNotice,
    firstname: state.auth.user.firstname,
  };
}

const StyledClubNotice = withStyles(styles, { name: 'styledClubNotice' })(ClubNotice);
export default connect(mapStateToProps, actions)(StyledClubNotice);

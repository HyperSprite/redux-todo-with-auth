import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ButtonRefresh from '../button/refresh';

const ClubNoticeView = ({
  clubNotice,
  firstname,
  handleUserStatus,
  toggleNotice,
}) => (
  <Card>
    <CardHeader
      title={`Welcome ${firstname}`}
    />
    <CardContent>
      <Typography variant="subheading">You have connected with Strava!</Typography>
      <br />
      <Typography variant="subheading">To switch features, click the <img src="/favicons/favicon-16x16.png" alt="A Race athlete icon" /> icon in the upper left corner.</Typography>
      <br />
      <Typography>{'Don\'t forget to join the '}
        <a href="https://www.strava.com/clubs/araceathlete" target="blank">
          A Race athlete Strava Club
        </a>
      </Typography>
      <Typography>Joining the club grants you additional features such as:</Typography>
      <ul>
        <li>Creating New Events</li>
        <li>Activity Search</li>
        <li>Weekly Stats</li>
        <li>Activity Search</li>
      </ul>
      <Typography>For more information, see our <a href="https://blog.araceathlete.com/feature-requirements" target="new">Feature Requirements blog post</a> </Typography>
    </CardContent>
    <CardActions>
      <FormControlLabel
        control={
          <Checkbox
            checked={clubNotice}
            onChange={toggleNotice}
            color="primary"
          />
        }
        label="Disable this message"
      />
      <ButtonRefresh onClick={handleUserStatus} label="Club Check" />
    </CardActions>
    <CardContent>
      <Typography>
        {'Use the "Club Check" button after you have joined to refresh your session.'}<br />
        {'If at any time you want to see this message again, click the Club Notice switch in the app menu.'}
      </Typography>
    </CardContent>
  </Card>
);

ClubNoticeView.propTypes = {
  clubNotice: PropTypes.bool.isRequired,
  firstname: PropTypes.string.isRequired,
  handleUserStatus: PropTypes.func.isRequired,
  toggleNotice: PropTypes.func.isRequired,
};

export default ClubNoticeView;

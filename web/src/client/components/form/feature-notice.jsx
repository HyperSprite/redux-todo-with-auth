import React from 'react';
import PropTypes from 'prop-types';

import CheckBox from './checkbox-icon';

const propTypes = {
  checks: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

const checkList = {
  clubMember: {
    field: 'clubMember',
    text: 'A Race athlete Strava Club membership',
  },
  premium: {
    field: 'premium',
    text: 'To be a Strava Premium user',
  },
  ftpHistory: {
    field: 'ftpHistory.length',
    text: 'An entry for FTP on Strava',
  },
  weightHistory: {
    field: 'weightHistory.length',
    text: 'An entry for Weight on Strava',
  },
  userGeoElevation: {
    field: 'userGeoElevation',
    text: 'An entry for City and Country on Strava',
  },
};

const featureNotice = ({ checks, title, user }) => (
  user.stravaId ? (
    <div style={{ margin: 20 }}>
      <h4>
        {'We\'re sorry, this is an A Race athlete Premium feature'}
      </h4>
      <p>
        To access this page you need the following:
      </p>
      <ul style={{ listStyle: 'none' }}>
        {checks.map(check => (
          <li key={checkList[check].field} >
            <CheckBox option={!!user[checkList[check].field]} />{checkList[check].text}
          </li>
        ))}
      </ul>
      <p>
        {`See "${title}" below for more information`}
      </p>
    </div>
  ) : (
    <div style={{ margin: 20 }}>
      <h4>Checking feature access...</h4>
    </div>
  )
);

featureNotice.propTypes = propTypes;

export default featureNotice;

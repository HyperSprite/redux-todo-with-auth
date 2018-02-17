import React from 'react';
import PropTypes from 'prop-types';

import CheckBox from '../form/checkbox-icon';
import checkList from './checklist-values';

const propTypes = {
  checks: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

const featureNotice = ({ checks, title, user }) => (
  user.stravaId ? (
    <div style={{ margin: 20 }}>
      <h4>
        {`Missing Feature Requirements for ${title}`}
      </h4>
      <p>
        {'We\'re sorry, you have a some missing requirements. To access this page, resolve the empty boxes below.'}
      </p>
      <ul style={{ listStyle: 'none' }}>
        {checks.map(check => (
          <li key={checkList[check].field} >
            <CheckBox option={!!user[checkList[check].field]} />{checkList[check].text}
          </li>
        ))}
      </ul>
      <p>
        {'For more information, see the '}
        <a href={'/blog/feature-requirements'} target="new" >Feature Requirements</a>
        {' blog post.'}
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

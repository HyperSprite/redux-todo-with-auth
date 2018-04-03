import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';

import CheckBox from '../form/checkbox-icon';
import checkList from './checklist-values';

const propTypes = {
  checks: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  optional: PropTypes.bool,
};

const defaultProps = {
  optional: false,
};

const styles = theme => ({
  root: {
    '& a': theme.typography.global.a,
    '& p': {
      margin: theme.spacing.unit,
    },
  },
});

const FeatureNotice = ({ classes, checks, title, user, optional }) => {
  const requiredNotice = (
    <div >
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
        {'For more information, see '}
        <a href={'/blog/feature-requirements'} target="new" >Feature Requirements</a>
      </p>
    </div>
  );
  const optionalNotice = (
    <div>
      <p>
        <strong>{`Non club mebers are limted to 30 activities. `}</strong>
        {'For more information, see '}
        <a href={'/blog/feature-requirements'} target="new" >Feature Requirements</a>
      </p>
    </div>
  );
  return (
    <Card className={classes.root}>
      {user.stravaId ? (
        <CardContent>
          {optional ? optionalNotice : requiredNotice }
        </CardContent>
    ) : (
      <h4>Checking feature access...</h4>
    )}
    </Card>
  );
};

FeatureNotice.propTypes = propTypes;
FeatureNotice.defaultProps = defaultProps;

export default withStyles(styles, { name: 'styledFeatureNotice' })(FeatureNotice);

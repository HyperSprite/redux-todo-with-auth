import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import Card from 'material-ui-next/Card';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  card: {
    width: 300,
    margin: 10,
    color: theme.palette.primary[500],
  },
});

const CardSmall = ({ classes, children }) => (
  <div className={classes.root}>
    <Card className={classes.card}>
      {children}
    </Card>
  </div>
);

CardSmall.propTypes = propTypes;

export default withStyles(styles, { name: 'StyledCardSmall' })(CardSmall);

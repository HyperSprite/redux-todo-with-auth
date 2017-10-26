import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'material-ui/Card';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = {
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  card: {
    width: 300,
    margin: 10,
    color: '#B71C1C',
  },
};

const CardSmall = ({ children }) => (
  <div style={styles.root}>
    <Card style={styles.card}>
      {children}
    </Card>
  </div>
);

CardSmall.propTypes = propTypes;

export default CardSmall;

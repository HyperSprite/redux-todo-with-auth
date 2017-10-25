import React from 'react';
// import PropTypes from 'prop-types';
import { Card } from 'material-ui/Card';

const styles = {
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  // paper: {
  //   padding: 16,
  //   textAlign: 'center',
  //   color: '#FAFAFA',
  //   display: 'flex',
  //   flexWrap: 'wrap',
  //   justifyContent: 'space-around',
  // },
  card: {
    width: 240,
    margin: 10,
    color: '#B71C1C',
  },
  // banner: {
  //   height: 130,
  //   display: 'flex',
  //   justifyContent: 'space-around',
  //   alignItems: 'center',
  // },
  // content: {
  //
  // },
};

const CardSmall = props => (
  <div style={styles.root}>
    <Card style={styles.card}>
      {props.children}
    </Card>
  </div>
);

export default CardSmall;

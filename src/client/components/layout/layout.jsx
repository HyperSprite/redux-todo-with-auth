import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import ButtonPrint from '../button/print';
import ClubNotice from '../club-notice';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  classes: PropTypes.object.isRequired,
};

const styles = () => ({
  root: {
    flexGrow: 1,
    marginTop: 70,
  },
  '@media print': {
    elevation2: {
      backgroundColor: 'inherit',
      boxShadow: 'none',
    },
    main: {
      maxWidth: '100%',
      width: '100%',
      flexBasis: 'auto',
      '& :before': {
      },
    },
    paper: {
      backgroundColor: 'inherit',
      boxShadow: 'none',
    },
    sidelight: {
      display: 'none',
    },
  },
});

function ExtLayoutSimple(props) {
  const classes = props.classes;

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item className={classes.sidelight} xs sm={1} md={1} lg={2} />
        <Grid item className={classes.main} xs={12} sm={10} md={9} lg={7} >
          <Paper className={classes.paper}>
            <ClubNotice />
            {props.children}
            {/* <ButtonPrint /> */}
          </Paper>
        </Grid>
        <Grid item className={classes.sidelight} xs sm={1} md={2} lg={3} />
      </Grid>
    </div>
  );
}

ExtLayoutSimple.propTypes = propTypes;

export default withStyles(styles, { name: 'StyledExtLayoutSimple' })(ExtLayoutSimple);

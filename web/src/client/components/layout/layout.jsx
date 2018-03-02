import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import Paper from 'material-ui-next/Paper';
import Grid from 'material-ui-next/Grid';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 10,
  },
  paper: {
    color: theme.palette.text.secondary,
  },
  card: {
    width: 240,
    margin: 10,
    color: theme.palette.primary[800],
  },
  banner: {
    height: 130,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

function ExtLayoutSimple(props) {
  const classes = props.classes;

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs sm={1} md={1} lg={2} />
        <Grid item xs={12} sm={10} md={9} lg={7} >
          <Paper className={classes.paper}>
            {props.children}
          </Paper>
        </Grid>
        <Grid item xs sm={1} md={2} lg={3} />
      </Grid>
    </div>
  );
}

ExtLayoutSimple.propTypes = propTypes;

export default withStyles(styles, { name: 'StyledExtLayoutSimple' })(ExtLayoutSimple);

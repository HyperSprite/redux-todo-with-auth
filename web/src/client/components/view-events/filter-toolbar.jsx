import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FilterLink from './filter-toolbar-connect';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-evenly',

  },
});

const EventFilter = ({ classes }) => (
  <MenuItem className={classes.root}>
    <FilterLink filter="EVENTS_SHOW_ALL" />
    <FilterLink filter="EVENTS_SHOW_FAVORITE" />
    <FilterLink filter="EVENTS_SHOW_OWNER" />
  </MenuItem>
);

EventFilter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { name: 'StyledEventFilter' })(EventFilter);

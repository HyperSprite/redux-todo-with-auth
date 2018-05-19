import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

import AccountIcon from 'mdi-react/AccountIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import SquareIcon from 'mdi-react/SquareIcon';
import SquareOutlineIcon from 'mdi-react/SquareOutlineIcon';
import StarIcon from 'mdi-react/StarIcon';
import StarOutlineIcon from 'mdi-react/StarOutlineIcon';

const propTypes = {
  classes: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
  filter: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const styles = theme => ({
  icon: {
    color: 'inherit',
  },
});

const EventTBLink = ({ classes, active, filter, onClick }) => {
  if (active) {
    switch (filter) {
      case 'EVENTS_SHOW_ALL': {
        return (
          <IconButton
            className={classes.icon}
            aria-label="Show All"
          >
            <SvgIcon><SquareIcon color="inherit" /></SvgIcon>
          </IconButton>
        );
      }
      case 'EVENTS_SHOW_FAVORITE': {
        return (
          <IconButton
            className={classes.icon}
            aria-label="Show Favorites"
          >
            <SvgIcon><StarIcon color="inherit" /></SvgIcon>
          </IconButton>
        );
      }
      case 'EVENTS_SHOW_OWNER': {
        return (
          <IconButton
            className={classes.icon}
            aria-label="Show Mine"
          >
            <SvgIcon><AccountIcon color="inherit" /></SvgIcon>
          </IconButton>
        );
      }
      default:
        return null;
    }
  }
  switch (filter) {
    case 'EVENTS_SHOW_ALL': {
      return (
        <IconButton
          className={classes.icon}
          aria-label="Show All"
          onClick={() => {
            onClick();
          }}
        >
          <SvgIcon><SquareOutlineIcon color="inherit" /></SvgIcon>
        </IconButton>
      );
    }
    case 'EVENTS_SHOW_FAVORITE': {
      return (
        <IconButton
          className={classes.icon}
          aria-label="Show Favorites"
          onClick={() => {
            onClick();
          }}
        >
          <SvgIcon><StarOutlineIcon color="inherit" /></SvgIcon>
        </IconButton>
      );
    }
    case 'EVENTS_SHOW_OWNER': {
      return (
        <IconButton
          className={classes.icon}
          aria-label="Show Mine"
          onClick={() => {
            onClick();
          }}
        >
          <SvgIcon><AccountOutlineIcon color="inherit" /></SvgIcon>
        </IconButton>
      );
    }
    default:
      return null;
  }
};

EventTBLink.propTypes = propTypes;

export default withStyles(styles, { name: 'StyledEventTBLink' })(EventTBLink);

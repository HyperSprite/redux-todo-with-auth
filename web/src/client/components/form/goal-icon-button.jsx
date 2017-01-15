import React, { PropTypes } from 'react';
import { IconButton } from 'material-ui';
import { ToggleRadioButton, ToggleRadioButtonChecked } from 'material-ui/svg-icons';

import style from '../../styles/style';

const propTypes = {
  authenticated: PropTypes.bool,
  fav: PropTypes.bool,
  favCount: PropTypes.number,
  favClick: PropTypes.func,
};

const goalIconButton = (authenticated, goal, goalClick) => {
  if (authenticated) {
    return (goal ? (
      <IconButton
        tooltip={'Your goal'}
        tooltipPosition="top-right"
        touch
        style={style.favButton}
        onClick={goalClick}
      >
        <ToggleRadioButtonChecked />
      </IconButton>
    ) : (
      <IconButton
        touch
        tooltip={'Set this as a goal!'}
        tooltipPosition="top-right"
        style={style.favButton}
        onClick={goalClick}
      >
        <ToggleRadioButton />
      </IconButton>
    ));
  }
  return (
    <IconButton
      disabled
      tooltipPosition="top-right"
      style={style.favButton}
    >
      <ToggleRadioButton />
    </IconButton>
  );
};

goalIconButton.propTypes = propTypes;

export default goalIconButton;

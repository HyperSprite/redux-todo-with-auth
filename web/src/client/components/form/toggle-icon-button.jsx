import React, { PropTypes } from 'react';
import { IconButton } from 'material-ui';
import {
  ActionBookmark,
  ActionBookmarkBorder,
  ActionFavorite,
  ActionFavoriteBorder,
  ToggleRadioButtonChecked,
  ToggleRadioButtonUnchecked,
  SocialPerson,
  SocialPersonOutline
} from 'material-ui/svg-icons';

import style from '../../styles/style';

const propTypes = {
  authenticated: PropTypes.bool,
  toggle: PropTypes.bool,
  toggleClick: PropTypes.func,
  toggleCount: PropTypes.number,
};

const toggleIconButton = (buttonType, authenticated, toggle, toggleClick, toggleCount) => {
  let buttonOn;
  let buttonOff;

  switch (buttonType) {
    case 'ActionBookmark':
      buttonOn = (<ActionBookmark />);
      buttonOff = (<ActionBookmarkBorder />);
      break;
    case 'ToggleRadioButtonChecked':
      buttonOn = (<ToggleRadioButtonChecked />);
      buttonOff = (<ToggleRadioButtonUnchecked />);
      break;
    case 'SocialPerson':
      buttonOn = (<SocialPerson />);
      buttonOff = (<SocialPersonOutline />);
      break;
    default:
      buttonOn = (<ActionFavorite />);
      buttonOff = (<ActionFavoriteBorder />);
      break;
  }

  if (authenticated) {
    return (toggle ? (
      <IconButton
        tooltip={toggleCount ? (`You + ${toggleCount - 1}`) : null}
        tooltipPosition="top-right"
        touch
        style={style.toggleIconButton}
        onClick={toggleClick}
      >
        {buttonOn}
      </IconButton>
    ) : (
      <IconButton
        touch
        tooltip={toggleCount ? (`${toggleCount}`) : null}
        tooltipPosition="top-right"
        style={style.toggleIconButton}
        onClick={toggleClick}
      >
        {buttonOff}
      </IconButton>
    ));
  }
  return (
    <IconButton
      disabled
      tooltipPosition="top-right"
      style={style.toggleIconButton}
    >
      {buttonOff}
    </IconButton>
  );
};

toggleIconButton.propTypes = propTypes;

export default toggleIconButton;

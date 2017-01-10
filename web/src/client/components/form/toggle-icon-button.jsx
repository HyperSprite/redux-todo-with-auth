import React, { PropTypes } from 'react';
import { IconButton } from 'material-ui';
import {
  ActionBookmark,
  ActionBookmarkBorder,
  ActionDelete,
  ActionDeleteForever,
  ActionFavorite,
  ActionFavoriteBorder,
  ContentCreate,
  ToggleRadioButtonChecked,
  ToggleRadioButtonUnchecked,
  SocialPerson,
  SocialPersonOutline,
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
  let tooltipOn;
  let tooltipOff;

  switch (buttonType) {
    case 'ActionBookmark':
      buttonOn = (<ActionBookmark />);
      buttonOff = (<ActionBookmarkBorder />);
      tooltipOn = toggleCount ? (`You + ${toggleCount - 1}`) : null;
      tooltipOff = toggleCount ? (`${toggleCount}`) : null;
      break;
    case 'ActionDelete':
      buttonOn = (<ActionDelete />);
      buttonOff = (<ActionDeleteForever />);
      tooltipOn = 'Delete?';
      tooltipOff = 'Delete?';
      break;
    case 'ContentCreate':
      buttonOn = (<ContentCreate />);
      buttonOff = (null);
      tooltipOn = 'Edit?';
      tooltipOff = 'Edit?';
      break;
    case 'ToggleRadioButtonChecked':
      buttonOn = (<ToggleRadioButtonChecked />);
      buttonOff = (<ToggleRadioButtonUnchecked />);
      tooltipOn = 'You\'ve set this as a Goal!';
      tooltipOff = 'Set this as a Goal?';
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
        tooltip={tooltipOn}
        tooltipPosition="top-right"
        style={style.toggleIconButton}
        onClick={toggleClick}
      >
        {buttonOn}
      </IconButton>
    ) : (
      <IconButton
        tooltip={tooltipOff}
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
      style={style.toggleIconButton}
    >
      {buttonOff}
    </IconButton>
  );
};

toggleIconButton.propTypes = propTypes;

export default toggleIconButton;

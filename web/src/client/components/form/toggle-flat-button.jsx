import React, { PropTypes } from 'react';
import { FlatButton } from 'material-ui';
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
  label: PropTypes.string,
  secondary: PropTypes.bool,
  toggleClick: PropTypes.func,
};

const toggleFlatButton = (buttonType, secondary, label, authenticated, toggle, toggleClick) => {
  let buttonOn;
  let buttonOff;

  switch (buttonType) {
    case 'ActionBookmark':
      buttonOn = (<ActionBookmark />);
      buttonOff = (<ActionBookmarkBorder />);
      break;
    case 'ActionDelete':
      buttonOn = (<ActionDelete />);
      buttonOff = (<ActionDeleteForever />);
      break;
    case 'ContentCreate':
      buttonOn = (<ContentCreate />);
      buttonOff = (null);
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
    const button = toggle ? buttonOn : buttonOff;
    return (
      <FlatButton
        label={label}
        secondary={secondary}
        style={style.button}
        onClick={toggleClick}
      >
        {button}
      </FlatButton>
    );
  }
  return (
    <FlatButton
      disabled
      label={label}
      style={style.button}
    >
      {buttonOff}
    </FlatButton>
  );
};

toggleFlatButton.propTypes = propTypes;

export default toggleFlatButton;

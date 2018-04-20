import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';

import PencilIcon from 'mdi-react/PencilIcon';
import PlaylistPlusIcon from 'mdi-react/PlaylistPlusIcon';
import PlaylistCheckIcon from 'mdi-react/PlaylistCheckIcon';
import HelpIcon from 'mdi-react/HelpIcon';
import SquareIcon from 'mdi-react/SquareIcon';
import SquareOutlineIcon from 'mdi-react/SquareOutlineIcon';
import StarIcon from 'mdi-react/StarIcon';
import StarOutlineIcon from 'mdi-react/StarOutlineIcon';
import DeleteIcon from 'mdi-react/DeleteIcon';
import DeleteForeverIcon from 'mdi-react/DeleteForeverIcon';
import AccountIcon from 'mdi-react/AccountIcon';

import style from '../../styles/style';

const propTypes = {
  authenticated: PropTypes.bool,
  toggle: PropTypes.bool,
  toggleClick: PropTypes.func,
  toggleCount: PropTypes.number,
};

const ToggleIconButton = ({ buttonType, authenticated, toggle, toggleClick, toggleCount }) => {
  let buttonOn;
  let buttonOff;
  let tooltipOn;
  let tooltipOff;

  switch (buttonType) {
    case 'ActionBookmark':
      buttonOn = (<SvgIcon size={24}><StarIcon color="inherit" /></SvgIcon>);
      buttonOff = (<SvgIcon size={24}><StarOutlineIcon color="inherit" /></SvgIcon>);
      tooltipOn = toggleCount ? (`You + ${toggleCount - 1}`) : null;
      tooltipOff = toggleCount ? (`${toggleCount}`) : null;
      break;
    case 'ActionDelete':
      buttonOn = (<SvgIcon size={24}><DeleteIcon color="inherit" /></SvgIcon>);
      buttonOff = (<SvgIcon size={24}><DeleteForeverIcon color="inherit" /></SvgIcon>);
      tooltipOn = 'Delete?';
      tooltipOff = 'Delete?';
      break;
    case 'ActionAddGoal':
      buttonOn = (<SvgIcon size={24}><PlaylistCheckIcon color="inherit" /></SvgIcon>);
      buttonOff = (<SvgIcon size={24}><PlaylistPlusIcon color="inherit" /></SvgIcon>);
      tooltipOn = 'You\'ve set this as a Goal!';
      tooltipOff = 'Set this as a Goal?';
      break;
    case 'ActionEdit':
      buttonOn = (<SvgIcon size={24}><PencilIcon color="inherit" /></SvgIcon>);
      buttonOff = (null);
      tooltipOn = 'Edit?';
      tooltipOff = 'Edit?';
      break;
    case 'ToggleRadioButtonChecked':
      buttonOn = (<SvgIcon size={24}><SquareIcon color="inherit" /></SvgIcon>);
      buttonOff = (<SvgIcon size={24}><SquareOutlineIcon color="inherit" /></SvgIcon>);
      tooltipOn = 'You\'ve set this as a Goal!';
      tooltipOff = 'Set this as a Goal?';
      break;
    case 'SocialPerson':
      buttonOn = (<SvgIcon size={24}><AccountIcon color="inherit" /></SvgIcon>);
      buttonOff = (null);
      break;
    default:
      buttonOn = (<SvgIcon size={24}><HelpIcon color="inherit" /></SvgIcon>);
      buttonOff = (<SvgIcon size={24}><HelpIcon color="inherit" /></SvgIcon>);
      break;
  }

  if (authenticated) {
    return (toggle ? (
      <IconButton
        color="primary"
        onClick={toggleClick}
      >
        {buttonOn}
      </IconButton>
    ) : (
      <IconButton
        color="primary"
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

ToggleIconButton.propTypes = propTypes;

export default ToggleIconButton;

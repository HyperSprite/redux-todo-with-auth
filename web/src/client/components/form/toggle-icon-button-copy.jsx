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
      buttonOn = (<SvgIcon size={24}><StarIcon /></SvgIcon>);
      buttonOff = (<SvgIcon size={24}><StarOutlineIcon /></SvgIcon>);
      tooltipOn = toggleCount ? (`You + ${toggleCount - 1}`) : null;
      tooltipOff = toggleCount ? (`${toggleCount}`) : null;
      break;
    case 'ActionDelete':
      buttonOn = (<SvgIcon size={24}><DeleteIcon /></SvgIcon>);
      buttonOff = (<SvgIcon size={24}><DeleteForeverIcon /></SvgIcon>);
      tooltipOn = 'Delete?';
      tooltipOff = 'Delete?';
      break;
    case 'ActionAddGoal':
      buttonOn = (<SvgIcon size={24}><PlaylistCheckIcon /></SvgIcon>);
      buttonOff = (<SvgIcon size={24}><PlaylistPlusIcon /></SvgIcon>);
      tooltipOn = 'You\'ve set this as a Goal!';
      tooltipOff = 'Set this as a Goal?';
      break;
    case 'ActionEdit':
      buttonOn = (<SvgIcon size={24}><PencilIcon /></SvgIcon>);
      buttonOff = (null);
      tooltipOn = 'Edit?';
      tooltipOff = 'Edit?';
      break;
    case 'ToggleRadioButtonChecked':
      buttonOn = (<SvgIcon size={24}><SquareIcon /></SvgIcon>);
      buttonOff = (<SvgIcon size={24}><SquareOutlineIcon /></SvgIcon>);
      tooltipOn = 'You\'ve set this as a Goal!';
      tooltipOff = 'Set this as a Goal?';
      break;
    case 'SocialPerson':
      buttonOn = (<SvgIcon size={24}><AccountIcon /></SvgIcon>);
      buttonOff = (null);
      break;
    default:
      buttonOn = (<SvgIcon size={24}><HelpIcon /></SvgIcon>);
      buttonOff = (<SvgIcon size={24}><HelpIcon /></SvgIcon>);
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

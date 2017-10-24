import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from 'material-ui';

import MdModeEdit from 'react-icons/lib/md/mode-edit';
import MdPlaylistAdd from 'react-icons/lib/md/playlist-add';
import MdPlaylistAddCheck from 'react-icons/lib/md/playlist-add-check';
import FaQuestion from 'react-icons/lib/fa/question';
import FaSquare from 'react-icons/lib/fa/square';
import FaSquareO from 'react-icons/lib/fa/square-o';
import FaStar from 'react-icons/lib/fa/star';
import FaStarO from 'react-icons/lib/fa/star-o';
import MdDelete from 'react-icons/lib/md/delete';
import MdDeleteForever from 'react-icons/lib/md/delete-forever';
import FaUser from 'react-icons/lib/fa/user';
// import FaUserO from 'react-icons/lib/fa/user-o'; // not in react-icon set

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
      buttonOn = (<FaStar size={24} />);
      buttonOff = (<FaStarO size={24} />);
      tooltipOn = toggleCount ? (`You + ${toggleCount - 1}`) : null;
      tooltipOff = toggleCount ? (`${toggleCount}`) : null;
      break;
    case 'ActionDelete':
      buttonOn = (<MdDelete size={24} />);
      buttonOff = (<MdDeleteForever size={24} />);
      tooltipOn = 'Delete?';
      tooltipOff = 'Delete?';
      break;
    case 'ActionAddGoal':
      buttonOn = (<MdPlaylistAddCheck size={24} />);
      buttonOff = (<MdPlaylistAdd size={24} />);
      tooltipOn = 'You\'ve set this as a Goal!';
      tooltipOff = 'Set this as a Goal?';
      break;
    case 'ActionEdit':
      buttonOn = (<MdModeEdit size={24} />);
      buttonOff = (null);
      tooltipOn = 'Edit?';
      tooltipOff = 'Edit?';
      break;
    case 'ToggleRadioButtonChecked':
      buttonOn = (<FaSquare size={24} />);
      buttonOff = (<FaSquareO size={24} />);
      tooltipOn = 'You\'ve set this as a Goal!';
      tooltipOff = 'Set this as a Goal?';
      break;
    case 'SocialPerson':
      buttonOn = (<FaUser size={24} />);
      buttonOff = (null);
      break;
    default:
      buttonOn = (<FaQuestion size={24} />);
      buttonOff = (<FaQuestion size={24} />);
      break;
  }

  if (authenticated) {
    return (toggle ? (
      <IconButton
        tooltip={tooltipOn}
        tooltipPosition="top-right"
        className="icon-on"
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

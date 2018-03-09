// TODO setup tool tips again
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui-next/IconButton';
import SvgIcon from 'material-ui-next/SvgIcon';

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

  const iconType = {
    ActionBookmark: {
      buttonOn: (<SvgIcon size={24}><StarIcon /></SvgIcon>),
      buttonOff: (<SvgIcon size={24}><StarOutlineIcon /></SvgIcon>),
      tooltipOn: toggleCount ? (`You + ${toggleCount - 1}`) : null,
      tooltipOff: toggleCount ? (`${toggleCount}`) : null,
    },
    ActionDelete: {
      buttonOn: (<SvgIcon size={24}><DeleteIcon /></SvgIcon>),
      buttonOff: (<SvgIcon size={24}><DeleteForeverIcon /></SvgIcon>),
      tooltipOn: 'Delete?',
      tooltipOff: 'Delete?',
    },
    ActionAddGoal: {
      buttonOn: (<SvgIcon size={24}><PlaylistCheckIcon /></SvgIcon>),
      buttonOff: (<SvgIcon size={24}><PlaylistPlusIcon /></SvgIcon>),
      tooltipOn: 'You\'ve set this as a Goal!',
      tooltipOff: 'Set this as a Goal?',
    },
    ActionEdit: {
      buttonOn: (<SvgIcon size={24}><PencilIcon /></SvgIcon>),
      buttonOff: null,
      tooltipOn: 'Edit?',
      tooltipOff: 'Edit?',
    },
    ToggleRadioButtonChecked: {
      buttonOn: (<SvgIcon size={24}><SquareIcon /></SvgIcon>),
      buttonOff: (<SvgIcon size={24}><SquareOutlineIcon /></SvgIcon>),
      tooltipOn: 'You\'ve set this as a Goal!',
      tooltipOff: 'Set this as a Goal?',
    },
    SocialPerson: {
      buttonOn: (<SvgIcon size={24}><AccountIcon /></SvgIcon>),
      buttonOff: null,
    },
  };

  if (authenticated) {
    return (
      <IconButton
        color="primary"
        onClick={toggleClick}
      >
        {iconType[buttonType][toggle ? 'buttonOn' : 'buttonOff']}
      </IconButton>
    );
  }
  return (
    <IconButton
      disabled
      style={style.toggleIconButton}
    >
      {iconType[buttonType]['buttonOff']}
    </IconButton>
  );
};

ToggleIconButton.propTypes = propTypes;

export default ToggleIconButton;

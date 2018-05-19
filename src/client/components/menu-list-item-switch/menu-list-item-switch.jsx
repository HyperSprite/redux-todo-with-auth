import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';

const propTypes = {
  checked: PropTypes.bool.isRequired,
  color: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const defaultProps = {
  color: 'secondary',
};

const MenuListItemSwitch = (props) => {
  const { checked, color, label, onChange } = props;
  return (
    <ListItem>
      <ListItemText primary={label} />
      <ListItemSecondaryAction>
        <Switch
          onChange={onChange}
          checked={checked}
          color={color}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

MenuListItemSwitch.propTypes = propTypes;
MenuListItemSwitch.defaultProps = defaultProps;

export default MenuListItemSwitch;

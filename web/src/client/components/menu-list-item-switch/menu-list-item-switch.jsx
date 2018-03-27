import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import Switch from 'material-ui/Switch';

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

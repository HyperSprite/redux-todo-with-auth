import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { FormLabel } from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import List, { ListItem } from 'material-ui/List';
import SvgIcon from 'material-ui/SvgIcon';
import DeleteIcon from 'mdi-react/DeleteIcon';

import EditSwitch from '../form/edit/switch';
import ButtonAdd from '../button/add';
// TODO material-ui - still needs formatting
import style from '../../styles/style';

const propTypes = {
  fields: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};

const formValues = {
  type: 'text',
  component: 'InputText',
};

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    // minWidth: 120,
    maxWidth: '99%',
    paddingLeft: 6,
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  listItem: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  iconButton: {
    marginTop: 8,
  },
});

const SingleFieldArray = ({ classes, form, fields, label }) => (
  <div className={classes.formControl}>
    <FormLabel htmlFor={label} >{label}</FormLabel>
    <List className={classes.list}>
      {fields.map((item, index) =>
        (<ListItem
          key={`${item}`}
          className={classes.listItem}
        >
          <EditSwitch
            form={form}
            formValues={{
              ...formValues,
              form,
              name: `${item}`,
              value: item,
              label: 'label',
            }}
          />
          <IconButton
            className={classes.iconButton}
            type="button"
            tooltip={`Remove ${label}`}
            onClick={() => fields.remove(index)}
          >
            <SvgIcon>
              <DeleteIcon />
            </SvgIcon>
          </IconButton>
        </ListItem>),
      )}
    </List>
    <ButtonAdd
      onClick={() => fields.push()}
      color="secondary"
      label={`Add ${label}`}
      size="small"
    />
  </div>

);

SingleFieldArray.propTypes = propTypes;

export default withStyles(styles, { name: 'StyledSingleFieldArray' })(SingleFieldArray);

import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { FlatButton, IconButton, List, ListItem } from 'material-ui';
import { ActionDeleteForever, ContentAddCircle } from 'material-ui/svg-icons';
import { TextField } from 'redux-form-material-ui';

import style from '../../styles/style';

const propTypes = {
  fields: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};

const singleFieldArray = ({ fields, label }) => (
  <List style={style.list}>
    {fields.map((item, index) =>
      <ListItem
        key={`${index}${item}`}
        disableTouchRipple
        hoverColor="#fffefe"
        style={style.listItem}
      >
        <div>
          <Field
            name={item}
            type="text"
            component={TextField}
            floatingLabelText={`Add ${label}`}
          />
          <IconButton
            type="button"
            tooltip={`Remove ${label}`}
            style={style.iconButton}
            onClick={() => fields.remove(index)}
          >
            <ActionDeleteForever
              style={style.iconStyles}
            />
          </IconButton>
        </div>
      </ListItem>,
    )}
    <ListItem
      disableTouchRipple
      hoverColor="#fffefe"
    >
      <FlatButton
        type="button"
        label={`Add ${label}`}
        primary
        style={style.button}
        icon={<ContentAddCircle />}
        onClick={() => fields.push()}
      />
    </ListItem>
  </List>
);

singleFieldArray.propTypes = propTypes;

export default singleFieldArray;

import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { FlatButton, IconButton, List, ListItem, Subheader } from 'material-ui';
import { ActionDeleteForever } from 'material-ui/svg-icons';
import { TextField } from 'redux-form-material-ui';

import style from '../../styles/style';

const propTypes = {
  fields: PropTypes.object,
};

const renderEventHashtags = ({ fields }) => (
  <List style={style.list}>
    {fields.map((hashtag, index) =>
      <ListItem
        key={`${index}${hashtag}`}
        disableTouchRipple
        hoverColor="#fffefe"
        style={style.listItem}
      >
        <div>
          <Field
            name={hashtag}
            type="text"
            component={TextField}
            floatingLabelText="Add a hashtag"
          />
          <IconButton
            type="button"
            tooltip="Remove Hashtag"
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
        label="Add hashtag"
        primary
        style={style.button}
        onClick={() => fields.push()}
      />
    </ListItem>
  </List>
);

renderEventHashtags.propTypes = propTypes;

export default renderEventHashtags;

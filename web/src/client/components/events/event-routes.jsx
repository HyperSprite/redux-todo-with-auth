import React from 'react';
import { Field } from 'redux-form';
import { FlatButton, IconButton, List, ListItem, Subheader } from 'material-ui';
import { ActionDeleteForever } from 'material-ui/svg-icons';
import { TextField } from 'redux-form-material-ui';

import style from '../../styles/style';

const renderEventRoutes = ({ fields }) => (
  <List style={style.list}>
    {fields.map((eventRoutes, index) =>
      <ListItem
        key={index}
        disableTouchRipple
        hoverColor="#fffefe"
        style={style.listItem}
      >
        <Subheader
          style={style.subheader}
        >
          Route {index + 1}
          <IconButton
            type="button"
            tooltip="Remove Route"
            style={style.iconButton}
            onClick={() => fields.remove(index)}
          >
            <ActionDeleteForever
              style={style.iconStyles}
            />
          </IconButton>
        </Subheader>
        <div>
          <Field
            name={`${eventRoutes}.eventRouteURL`}
            type="text"
            component={TextField}
            floatingLabelText="Route URL"
          />
        </div>
      </ListItem>,
    )}
    <ListItem
      disableTouchRipple={true}
      hoverColor="#fffefe"
    >
      <FlatButton
        type="button"
        label="Add Route Link"
        primary={true}
        style={style.button}
        onClick={() => fields.push({})}
      />
    </ListItem>
  </List>
);

export default renderEventRoutes;

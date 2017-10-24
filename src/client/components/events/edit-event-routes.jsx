import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FlatButton, IconButton, List, ListItem, Subheader } from 'material-ui';
import { ActionDeleteForever } from 'material-ui/svg-icons';
import { TextField } from 'redux-form-material-ui';

import style from '../../styles/style';

const propTypes = {
  fields: PropTypes.object,
};

const defaultValues = {
  eventSelector: [
    {
      eventRouteName: '',
      eventRouteDescription: '',
      eventRouteDistacne: '',
      eventRouteElevationGain: '',
    },
  ],
};

const renderEventRoutes = ({ fields, fetchStravaRoutes, eventSelector }) => (
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
            floatingLabelText="Strava Route ID"
            hintText="1201587"
            onBlur={() => fetchStravaRoutes(eventSelector[index].eventRouteURL, index)} // TODO this is not right yet
          />
        </div>
      </ListItem>,
    )}
    <ListItem
      disableTouchRipple
      hoverColor="#fffefe"
    >
      <FlatButton
        type="button"
        label="Add Route Link"
        primary
        style={style.button}
        onClick={() => fields.push({})}
      />
    </ListItem>
  </List>
);

renderEventRoutes.propTypes = propTypes;
renderEventRoutes.defaultValues = defaultValues;

export default renderEventRoutes;

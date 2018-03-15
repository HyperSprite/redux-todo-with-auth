import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { List, ListItem, Subheader } from 'material-ui';
import { TextField } from 'redux-form-material-ui';

import ButtonDelete from '../button/delete';
import ButtonAdd from '../button/add';
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
    {fields.map((eventRoutes, index) => (
      <ListItem
        key={index}
        // disableTouchRipple
        // hoverColor="#fffefe"
        // style={style.listItem}
      >
        <Subheader
          // style={style.subheader}
        >
          Route {index + 1}
          <ButtonDelete
            onClick={() => fields.remove(index)}
            color="secondary"
            label="Delete Route"
            size="small"
            toolTip={`Remove Route`}
            toolTipId="tooltip-delete"
            toolTipPlacement="bottom"
          />
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
      </ListItem>
    ))}
    <ListItem
      // disableTouchRipple
      hoverColor="#fffefe"
    >
      <ButtonAdd
        onClick={() => fields.push()}
        label={`Add Route`}
        size="small"
      />
    </ListItem>
  </List>
);

renderEventRoutes.propTypes = propTypes;
renderEventRoutes.defaultValues = defaultValues;

export default renderEventRoutes;

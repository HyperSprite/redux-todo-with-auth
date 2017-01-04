import React, { PropTypes } from 'react';
import { Paper, FloatingActionButton, FlatButton } from 'material-ui';
import { ActionDeleteForever, ContentAdd, ContentCreate } from 'material-ui/svg-icons';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';

// import {  } from 'material-ui';

import Static from './../form/static';

import style from '../../styles/style';

const propTypes = {
  content: PropTypes.any,
  contentLabel: PropTypes.string,
  contentType: PropTypes.string,
  contentAlt: PropTypes.string,
};

const renderViewEvent = ({ ...event, canEdit, deleteClick, editClick, weeksToGo, niceEventDate, contentLabel, content, contentType, contentAlt }) => (
  <Card
    style={style.card}
  >
    <CardHeader
      style={style.cardHeader}
      title={event.eventTitle}
      subtitle={`${weeksToGo} weeks to go`}
      actAsExpander
      showExpandableButton
    />
    <CardText expandable>
      <Static
        contentLabel="Event Date"
        content={niceEventDate}
        contentType="text"
      />
      <Static
        contentLabel="Type"
        content={event.eventType}
        contentType="text"
      />
      <Static
        contentLabel="Location"
        content={`${event.eventLocCity}, ${event.eventLocState}, ${event.eventLocCountry}`}
        contentType="text"
      />
      <Static
        contentLabel="Event Link"
        content={event.eventURL}
        contentType="url"
        baseURL=""
      />
      <Static
        contentLabel="Description"
        content={event.eventDesc}
        contentType="text"
      />
      {event.eventRoutes.map((route) => {
        return (
          <Static
            key={route.eventRouteURL}
            contentLabel="Route Link"
            content={route.eventRouteURL}
            contentType="url"
            baseURL="https://www.strava.com/routes/"
          />
        );
      })}
      {canEdit ? (
        <div>
          <FlatButton
            label="Edit"
            secondary
            style={style.button}
            icon={<ContentCreate />}
            onClick={editClick}
          />
          <FlatButton
            label="Delete"
            secondary
            style={style.button}
            icon={<ActionDeleteForever />}
            onClick={deleteClick}
          />
        </div>
      ) : (
        <span />
      )}
    </CardText>
  </Card>
);

renderViewEvent.propTypes = propTypes;

export default renderViewEvent;

// eventId: String,
// eventCreator: String,
// eventDeleted: Boolean,
// eventRoutes:

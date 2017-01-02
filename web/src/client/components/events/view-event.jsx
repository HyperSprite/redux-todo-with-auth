import React, { PropTypes } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
// import {  } from 'material-ui';

import Static from './../form/static';

const propTypes = {
  content: PropTypes.any,
  contentLabel: PropTypes.string,
  contentType: PropTypes.string,
  contentAlt: PropTypes.string,
};

const renderViewEvent = ({ ...event, weeksToGo, niceEventDate, contentLabel, content, contentType, contentAlt }) => (
  <Card>
    <CardHeader
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
          />
        );
      })}
    </CardText>
  </Card>
);

renderViewEvent.propTypes = propTypes;

export default renderViewEvent;

// eventId: String,
// eventCreator: String,
// eventDeleted: Boolean,
// eventRoutes:

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FlatButton, IconButton } from 'material-ui';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { ActionDeleteForever, ActionFavoriteBorder, ActionFavorite, ContentCreate } from 'material-ui/svg-icons';

import favIconButton from './../form/fav-icon-button';
import Static from './../form/static';


import style from '../../styles/style';

const propTypes = {
  authenticated: PropTypes.bool,
  canEdit: PropTypes.bool,
  deleteClick: PropTypes.func,
  editClick: PropTypes.func,
  expanded: PropTypes.bool,
  eventLink: PropTypes.component,
  fav: PropTypes.bool,
  favClick: PropTypes.func,
  favCount: PropTypes.number,
  niceEventDate: PropTypes.string,
  subTitleName: PropTypes.string,
  weeksToGo: PropTypes.number,
};

// props are passed in from component/list-events
const renderViewEvent = ({
  ...event,
  authenticated,
  canEdit,
  deleteClick,
  editClick,
  expanded,
  eventLink,
  fav,
  favClick,
  favCount,
  niceEventDate,
  subTitleName,
  weeksToGo,
}) => (
  <Card
    style={style.card}
    initiallyExpanded={expanded}
  >
    <CardHeader
      style={style.cardHeader}
      title={eventLink}
      subtitle={`${weeksToGo} weeks to go ${subTitleName}`}
      avatar={favIconButton(authenticated, fav, favCount, favClick)}
      actAsExpander={false}
      showExpandableButton
    />
    <CardText
      expandable
    >
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
        contentLabel="Series"
        content={event.eventSeries}
        contentType="text"
      />
      <Static
        contentLabel="Organizer"
        content={event.eventOrg}
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
// eventOwner: String,
// eventDeleted: Boolean,
// eventRoutes: []

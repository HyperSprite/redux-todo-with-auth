import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FlatButton } from 'material-ui';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { ActionDeleteForever, ContentCreate } from 'material-ui/svg-icons';

import ToggleIconButton from './../form/toggle-icon-button';

import Static from './../form/static';


import style from '../../styles/style';

const propTypes = {
  authenticated: PropTypes.bool,
  canEdit: PropTypes.bool,
  deleteClick: PropTypes.func,
  editClick: PropTypes.func,
  expanded: PropTypes.bool,
  eventLink: PropTypes.object,
  fav: PropTypes.bool,
  favClick: PropTypes.func,
  favCount: PropTypes.number,
  goal: PropTypes.bool,
  goalClick: PropTypes.func,
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
  fav,
  favClick,
  favCount,
  eventLink,
  goal,
  goalClick,
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
      actAsExpander
      showExpandableButton
    />
    <CardActions>
      debugger;
      {ToggleIconButton('ActionBookmark', authenticated, fav, favClick, favCount)}
      {ToggleIconButton('ToggleRadioButtonChecked', authenticated, goal, goalClick, favCount)}
      {canEdit ? (
        <span>
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
        </span>
      ) : (
        <span />
      )}
    </CardActions>
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
    </CardText>
  </Card>
);

renderViewEvent.propTypes = propTypes;

export default renderViewEvent;

// eventId: String,
// eventOwner: String,
// eventDeleted: Boolean,
// eventRoutes: []

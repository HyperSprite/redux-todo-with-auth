import React, { PropTypes } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';

import ToggleIconButton from './../form/toggle-icon-button';

import Static from './../form/static';

import style from '../../styles/style';

const propTypes = {
  adminMember: PropTypes.bool,
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
};

// props are passed in from component/list-events
const renderViewEvent = ({
  ...event,
  adminMember,
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
}) => (
  <Card
    style={style.card}
    initiallyExpanded={expanded}
  >
    <CardHeader
      style={style.cardHeader}
      title={eventLink}
      subtitle={subTitleName}
      actAsExpander
      showExpandableButton
    />
    <CardActions>
      {ToggleIconButton('ActionBookmark', authenticated, fav, favClick, favCount)}
      {adminMember ? (
        <span>{ToggleIconButton('ToggleRadioButtonChecked', authenticated, goal, goalClick, null)}</span>
      ) : (
        <span />
      )}
      {canEdit ? (
        <span>
          {ToggleIconButton('ContentCreate', authenticated, true, editClick, null)}
          {ToggleIconButton('ActionDelete', authenticated, true, deleteClick, null)}
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
        contentLabel="Activity Type"
        content={event.eventAthleteType}
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
        content={[event.eventLocStreet, event.eventLocCity, event.eventLocState, event.eventLocZip, event.eventLocCountry]}
        contentType="address"
        baseURL="http://maps.google.com/?q="
        contentAlt={event.eventGeoFormattedAddress}
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

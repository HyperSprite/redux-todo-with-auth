import React, { PropTypes } from 'react';
import { Chip } from 'material-ui';
import { Card, CardHeader, CardText, CardTitle } from 'material-ui/Card';

import ShareButtons from '../form/share-button';
import ToggleIconButton from './../form/toggle-icon-button';

import style from '../../styles/style';
import Static from './../form/static';

const propTypes = {
  adminMember: PropTypes.bool,
  authenticated: PropTypes.bool,
  canEdit: PropTypes.bool,
  deleteClick: PropTypes.func,
  editClick: PropTypes.func,
  elevation: PropTypes.string,
  expanded: PropTypes.bool,
  eventFullURL: PropTypes.string,
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
  elevation,
  eventLink,
  expanded,
  fav,
  favClick,
  favCount,
  goal,
  goalClick,
  niceEventDate,
  subTitleName,
}) => (
  <Card
    className="card"
    initiallyExpanded={expanded}
  >
    <CardHeader
      className="card-header"
      showExpandableButton
      avatar={ToggleIconButton('ActionBookmark', authenticated, fav, favClick, favCount)}
      title={eventLink}
      subtitle={subTitleName}
    />
    <CardText
      expandable
    >
      <ShareButtons
        hashtags={event.eventHashtags.concat('ARaceathlete')}
        title={event.eventTitle}
        urlHash={event.eventId}
        urlPath="events"
        urlRoot="https://www.araceathlete.com"
      />
      {adminMember ? ( // hiding for adminMember only unitl this works
        <span>{ToggleIconButton('ActionAddGoal', authenticated, goal, goalClick, null)}</span>

      ) : (null)}
      {canEdit ? (
        <span>
          {ToggleIconButton('ActionEdit', authenticated, true, editClick, null)}
          {event.eventFavorites.length < 2 || adminMember ? (
            <span>{ToggleIconButton('ActionDelete', authenticated, true, deleteClick, null)}</span>
          ) : (null)}
        </span>
      ) : (null)}
      <div className="div-flexwrap" >
        {event.eventHashtags.map((hashtag) => {
          return (
            <span key={`${event.eventId}${hashtag}`} className="chip">
              <Chip className="chip" >
                {`#${hashtag}`}
              </Chip>
            </span>
          );
        })}
      </div>
      <Static
        contentLabel="Event Date"
        content={niceEventDate}
        contentType="text"
      />
      <Static
        contentLabel="Time Zone"
        content={event.eventGeoTzName}
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
        contentLabel="Description"
        content={event.eventDescHTML}
        contentType="html"
      />
      <Static
        contentLabel="Event Link"
        content={event.eventURL}
        contentType="url"
        baseURL=""
      />
      <Static
        contentLabel="Location"
        content={[event.eventLocStreet, event.eventLocCity, event.eventLocState, event.eventLocZip, event.eventLocCountry]}
        contentType="address"
        baseURL="http://www.google.com/maps/dir//"
        contentAlt={event.eventGeoFormattedAddress}
      />
      <Static
        contentLabel="Starting Elevation"
        content={elevation}
        contentType="text"
      />

      {event.eventRoutes.map((route) => {
        return (
          <Static
            key={`${event.eventId}${route.eventRouteURL}`}
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

import React, { PropTypes } from 'react';
import { ShareButtons, ShareCounts, generateShareIcon } from 'react-share';
import { Chip } from 'material-ui';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';

import ToggleIconButton from './../form/toggle-icon-button';

import Static from './../form/static';

const { FacebookShareButton, TwitterShareButton } = ShareButtons;

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
    className="card"
    initiallyExpanded={expanded}
  >
    <CardHeader
      className="card-header"
      title={eventLink}
      subtitle={subTitleName}
      actAsExpander
      showExpandableButton
    />
    <CardActions>

      {ToggleIconButton('ActionBookmark', authenticated, fav, favClick, favCount)}
      {adminMember ? ( // hiding unitl this works
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

    </CardActions>
    <CardText
      expandable
    >
      <div className="div-flexwrap" >
        {event.eventHashtags.map((hashtag) => {
          return (
            <span className="chip">
              <Chip key={hashtag} className="chip" >
                {hashtag}
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
      <Static
        contentLabel="#Hashtags"
        conten={event.eventHashtags}
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

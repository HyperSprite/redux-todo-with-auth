import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Chip from 'material-ui/Chip';
import Card, { CardActions, CardHeader, CardContent } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';

import justFns from 'just-fns';
import MultiDayWeather from './../weather/multi-day-weather';
import ShareButtons from '../form/share-button';
import ToggleIconButton from './../form/toggle-icon-button';
import GetViewRoute from './get-route-view';

import Static from './../form/static';

const propTypes = {
  adminMember: PropTypes.bool,
  authenticated: PropTypes.bool,
  canEdit: PropTypes.bool,
  deleteClick: PropTypes.func,
  editClick: PropTypes.func,
  expanded: PropTypes.bool,
  // eventFullURL: PropTypes.string,
  eventLink: PropTypes.string,
  fav: PropTypes.bool,
  favClick: PropTypes.func,
  favCount: PropTypes.number,
  getWeather: PropTypes.bool,
  goal: PropTypes.bool,
  goalClick: PropTypes.func,
  mPref: PropTypes.bool,
  niceEventDate: PropTypes.string,
  subTitleName: PropTypes.string,
  urlPath: PropTypes.string,
  urlRoot: PropTypes.string,
};

const styles = theme => ({
  chip: {
    margin: 4,
    paddingLeft: 10,
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  flexedWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cardHeader: {
    ...theme.typography.title,
    color: theme.palette.primary.dark,
  },
  '@media print': {
    expand: {
      display: 'none',
    },
  },
});

// props are passed in from component/list-events
class renderViewEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const {
      classes,
      adminMember,
      authenticated,
      canEdit,
      deleteClick,
      editClick,
      eventLink,
      expanded,
      fav,
      favClick,
      favCount,
      getWeather,
      goal,
      goalClick,
      mPref,
      niceEventDate,
      subTitleName,
      urlPath,
      urlRoot,
      ...event
    } = this.props;

    return (
      <Card>

        <CardHeader
          className={classes.cardHeader}
          title={eventLink}
          subheader={subTitleName}
          avatar={
            <ToggleIconButton
              buttonType="ActionBookmark"
              authenticated={authenticated}
              toggle={fav}
              toggleClick={favClick}
              toggleCount={favCount}
            />}

          action={
            <IconButton
              className={classNames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <SvgIcon size={24} >
                <ChevronDownIcon />
              </SvgIcon>
            </IconButton>
          }
        />

        <Collapse
          in={this.state.expanded}
          timeout="auto"
          unmountOnExit
        >
          <CardContent>
            <Helmet>
              <title>{`${event.eventTitle} : Events : A Race athlete`}</title>
              <link rel="canonical" href={`${urlRoot}/${urlPath}#${event.urlHash}`} />
              <meta property="og:url" content={`${urlRoot}/${urlPath}#${event.urlHash}`} />
              <meta property="og:title" content={event.eventTitle} />
              <meta property="og:image" content={`${urlRoot}/images/logo-192x192.png`} />
            </Helmet>
            <CardActions>
              <ShareButtons
                {...event}
                hashtags={event.eventHashtags.concat('ARaceathlete')}
                title={event.eventTitle}
                urlHash={event.eventId}
                urlPath={urlPath}
                urlRoot={urlRoot}
              />
              {adminMember ? ( // hiding for adminMember only unitl this works
                <span>
                  <ToggleIconButton
                    buttonType="ActionAddGoal"
                    authenticated={authenticated}
                    toggle={goal}
                    toggleClick={goalClick}
                    toggleCount={null}
                  />
                </span>

            ) : (null)}
              {canEdit ? (
                <span>
                  <ToggleIconButton
                    buttonType="ActionEdit"
                    authenticated={authenticated}
                    toggle
                    toggleClick={editClick}
                    toggleCount={null}
                  />
                  {event.eventFavorites.length < 2 || adminMember ? (
                    <span>
                      <ToggleIconButton
                        buttonType="ActionDelete"
                        authenticated={authenticated}
                        toggle
                        toggleClick={deleteClick}
                        toggleCount={null}
                      />
                    </span>
                  ) : (null)}
                </span>
              ) : (null)}
            </CardActions>
            <div className={classes.flexedWrap} >
              {event.eventHashtags.map(hashtag => (
                <Chip
                  key={`${event.eventId}${hashtag}`}
                  className={classes.chip}
                  label={`#${hashtag}`}
                />
              ))}
            </div>
            <Static
              contentLabel="Event Date"
              content={niceEventDate}
              contentType="text"
            />
            <Static
              contentLabel="Number of Days"
              content={event.eventDays}
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
              content={`${justFns.statsConversions('elev', null, event.eventGeoElevation, mPref)} ${justFns.mPrefLabel('dstS', mPref).display}`}
              contentType="text"
            />
            <Static
              contentLabel="Routes"
              content={event.eventRoutes && event.eventRoutes.length}
              contentType="text"
            />
            {authenticated && event.eventRoutes.map(route => (
              <GetViewRoute
                key={`${event.eventId}${route.eventRouteURL}`}
                {...route}
                mPref={mPref}
                adminMember={adminMember}
              />
            ))}
          </CardContent>
        </Collapse>
        {getWeather && event.eventGeoTzRawOffset ? (
          <MultiDayWeather
            geoCoordinates={`${event.eventGeoLongitude},${event.eventGeoLatitude}`}
            dstOffset={event.eventGeoTzDSTOffset}
            tzOffset={event.eventGeoTzRawOffset}
            date={new Date(event.eventDate)}
            eventDays={event.eventDays || 1}
            mPref={mPref}
            expanded={expanded}
            noShowExtender
          />
        ) : null }
      </Card>
    );
  }
}


renderViewEvent.propTypes = propTypes;

export default withStyles(styles, { name: 'StyledrenderViewEvent' })(renderViewEvent);

// eventId: String,
// eventOwner: String,
// eventDeleted: Boolean,
// eventRoutes: []

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import SvgIcon from 'material-ui/SvgIcon';
import PlusIcon from 'mdi-react/PlusIcon';

import { differenceInCalendarWeeks, differenceInCalendarDays, format, isValid } from 'date-fns';
import ScrollIntoView from '../../containers/scroll-into-view';

import * as actions from '../../actions';
import Layout from '../layout';
import ViewEvent from './view-event';
import EditEvent from './edit-event';

const styles = theme => ({
  floatActButton: {
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    position: 'fixed',
  },
  '@media print': {
    floatActButton: {
      display: 'none',
    },
  },
});

const propTypes = {
  classes: PropTypes.object,
  adminMember: PropTypes.bool,
  authenticated: PropTypes.bool,
  clearEvent: PropTypes.func,
  clubMember: PropTypes.bool,
  deleteEvent: PropTypes.func,
  editEvent: PropTypes.func,
  favEvent: PropTypes.func,
  events: PropTypes.array,
  fetchEvents: PropTypes.func,
  forEdit: PropTypes.object,
  mPref: PropTypes.bool,
  stravaId: PropTypes.number,
  setPageName: PropTypes.func,
  user: PropTypes.object,
};

const relURL = 'apiv1/events';

class ListEvent extends React.Component {

  componentDidMount() {
    this.props.fetchEvents(relURL, this.props.stravaId);
    this.props.clearEvent();
    this.props.setPageName('Events', '/blog/events');
  }

  editThisEvent = this.editThisEvent.bind(this);

  editThisEvent(eventId, option) {
    switch (option) {
      case 'delete':
        history.pushState('', document.title, window.location.pathname);
        this.props.deleteEvent(eventId, `${relURL}/delete`);
        break;
      case 'edit':
        window.location.hash = eventId;
      default: // eslint-disable-line no-fallthrough
        this.props.editEvent(eventId, relURL, option);
    }
  }

  favThisEvent(eventId) {
    history.pushState('', document.title, window.location.pathname);
    this.props.favEvent(eventId, relURL);
  }

  goalThisEvent(eventId) {
    return (<Redirect to="/goals/addgoal" />);
  }

  renderActionButton() {
    return (this.props.authenticated ? (
      <Link to="/events/addevent">
        <Button
          variant="fab"
          color="primary"
          aria-label="add"
          className={this.props.classes.floatActButton}
          disabled={!this.props.clubMember}
        >
          <SvgIcon >
            <PlusIcon />
          </SvgIcon>
        </Button>
      </Link>
    ) : null);
  }

  render() {
    const {
      classes,
      authenticated,
      events,
      forEdit,
      stravaId,
      mPref,
      adminMember,
      user,
    } = this.props;

    // For case of copyEvent
    if (forEdit.eventTitle && !forEdit.eventDate) {
      return <Redirect to="/events/addevent" />;
    }

    return (
      <Layout>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{'Events : A Race athlete'}</title>
          <link rel="canonical" href="https://www.araceathlete.com/events" />
        </Helmet>
        <ScrollIntoView
          id={location.hash}
          headerHeight={70}
        />
        {events.map((event, i) => {
          let getWeather = false;
          if (isValid(new Date(event.eventDate))) {
            const daysToGo = differenceInCalendarDays(
              new Date(event.eventDate),
              new Date(),
            );
            getWeather = (daysToGo < 5);
          }

          let subTitleName = '';

          const niceEventDate = format(
            event.eventDate, 'MMM Do YYYY',
          );

          if (event.eventSeries) {
            subTitleName = `- ${event.eventSeries}`;
          } else if (event.eventOrg) {
            subTitleName = `- ${event.eventOrg}`;
          }

          if (isValid(new Date(event.eventDate))) {
            let timeToGo = differenceInCalendarWeeks(
              new Date(event.eventDate),
              new Date(),
              { weekStartsOn: 1 },
            );
            if (timeToGo < 2) {
              timeToGo = differenceInCalendarDays(
                new Date(event.eventDate),
                new Date(),
              );
              subTitleName = `${timeToGo} days, ${niceEventDate} ${subTitleName}`;
            } else {
              subTitleName = `${timeToGo} weeks, ${niceEventDate} ${subTitleName}`;
            }
          }

          let elevation = '';
          if (event.eventGeoElevation) {
            if (user.measurement_preference === 'feet') {
              elevation = `${Math.round(event.eventGeoElevation * 3.281)} feet`;
            } else {
              elevation = `${Math.round(event.eventGeoElevation)} meters`;
            }
          }

          // Expands Card on render if hash matchs eventid
          const expanded = (window.location.hash === `#${event.eventId}`);
          const fav = event.eventFavorites.indexOf(stravaId) !== -1;
          const favCount = event.eventFavorites.length;
          const goal = true;
          const urlPath = 'events';
          const urlRoot = 'https://www.araceathlete.com';
          const canEdit = (eCreator = [], sId, aMember) => (eCreator.some(e=> e === sId) || aMember);

          if (forEdit.eventId === event.eventId) {
            return (
              <EditEvent key={`${event.eventId}-edit`} index={i} />
            );
          }

          return (
            <div key={event.eventId} id={`${event.eventId}`} >
              <ViewEvent
                {...event}
                adminMember={adminMember}
                authenticated={authenticated}
                canEdit={canEdit(event.eventOwners, stravaId, adminMember)}
                handleEventClick={this.editThisEvent}
                elevation={elevation}
                eventLink={event.eventTitle}
                expanded={expanded}
                fav={fav}
                favClick={() => this.favThisEvent(event.eventId)}
                favCount={favCount}
                getWeather={getWeather}
                goal={goal}
                goalClick={() => this.goalThisEvent(event.eventId)}
                index={i}
                niceEventDate={niceEventDate}
                mPref={mPref}
                subTitleName={subTitleName}
                urlPath={urlPath}
                urlRoot={urlRoot}
              />
            </div>
          );
        })}
        { this.renderActionButton() }
      </Layout>
    );
  }
}

ListEvent.propTypes = propTypes;

const getVisibleEvents = (events, filter, stravaId) => {
  switch (filter) {
    case 'EVENTS_SHOW_ALL': {
      return events;
    }
    case 'EVENTS_SHOW_FAVORITE': {
      return events.filter(t => t.eventFavorites.indexOf(stravaId) !== -1);
    }
    case 'EVENTS_SHOW_OWNER': {
      return events.filter(t => t.eventOwners.some(e => e === stravaId));
    }
    default:
      return events;
  }
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    stravaId: state.auth.user.stravaId,
    clubMember: state.auth.user.clubMember,
    adminMember: state.auth.user.adminMember,
    user: state.auth.user,
    events: getVisibleEvents(state.events.events, state.visibilityFilter, state.auth.user.stravaId),
    mPref: state.page.mPref,
    forEdit: state.events.event,
  };
}

const styledListEvent = withStyles(styles, { name: 'StyledListEvent' })(ListEvent);
export default connect(mapStateToProps, actions)(styledListEvent);

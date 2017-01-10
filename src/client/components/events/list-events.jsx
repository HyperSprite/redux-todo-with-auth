import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Paper, FlatButton, FloatingActionButton } from 'material-ui';
import { Toolbar, ToolbarTitle, ToolbarGroup } from 'material-ui/Toolbar';
import { ActionBookmark, ActionBookmarkBorder, ActionFavoriteBorder, ContentAdd, SocialPersonOutline, ToggleRadioButtonChecked } from 'material-ui/svg-icons';
import { differenceInCalendarWeeks as diffInCalWeeks, format } from 'date-fns';
// import ScrollIntoView from 'scroll-component';
import ScrollIntoView from '../../containers/scroll-into-view';

import * as actions from '../../actions';
import ViewEvent from './view-event';
import AddEvent from './add-event';

import style from '../../styles/style';

const propTypes = {
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
  stravaId: PropTypes.number,
};

const relURL = 'apiv1/events';

class ListEvent extends Component {
  componentDidMount() {
    this.props.fetchEvents(relURL, this.props.stravaId);
    this.props.clearEvent();
  }

  deleteThisEvent = this.deleteThisEvent.bind(this);

  deleteThisEvent(eventId) {
    this.props.deleteEvent(eventId, `${relURL}/delete`);
  }

  editThisEvent(eventId) {
    window.location.hash = eventId;
    this.props.editEvent(eventId, relURL);
  }

  favThisEvent(eventId) {
    window.location.hash = eventId;
    this.props.favEvent(eventId, relURL);
  }

  goalThisEvent(eventId) {
    window.location.hash = eventId;
    console.log('goalThisEvent', eventId);
  }

  renderActionButton() {
    switch (true) {
      case (this.props.clubMember):
        return (
          <Link to="/events/addevent">
            <FloatingActionButton
              style={style.floatingActionButton}
            >
              <ContentAdd />
            </FloatingActionButton>
          </Link>
        );
      case (this.props.authenticated):
        return (
          <FloatingActionButton
            style={style.floatingActionButton}
            disabled
          >
            <ContentAdd />
          </FloatingActionButton>
        );
      default:
        return null;
    }
  }

  renderToolbarFilter() {
    switch (true) {
      case (this.props.authenticated):
        return (
          <ToolbarGroup>
            <FlatButton
              style={style.toolbar.button}
            >
              <ToggleRadioButtonChecked
                style={style.favButton}
              />
            </FlatButton>
            <FlatButton
              style={style.toolbar.button}
            >
              <ActionBookmarkBorder
                style={style.favButton}
              />
            </FlatButton>
            <FlatButton
              style={style.toolbar.button}
            >
              <ActionFavoriteBorder
                style={style.favButton}
              />
            </FlatButton>
            <FlatButton
              style={style.toolbar.button}
            >
              <SocialPersonOutline
                style={style.favButton}
              />
            </FlatButton>
          </ToolbarGroup>
        );
      default:
        return null;
    }
  }

  render() {
    const { authenticated, events, forEdit, stravaId, adminMember } = this.props;
    return (

      <Paper
        style={style.paper1}
        zDepth={1}
      >
        <ScrollIntoView
          id={location.hash}
          headerHeight={70}
        />
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle
              text="Events"
              style={style.toolbar.title}
            />
          </ToolbarGroup>
          {this.renderToolbarFilter()}
        </Toolbar>

        {events.map((event, i) => {

          const weeksToGo = diffInCalWeeks(
            new Date(event.eventDate),
            new Date(),
            { weekStartsOn: 1 },
          );

          let subTitleName = event.eventSeries || event.eventOrg;
          subTitleName = subTitleName ? ` - ${subTitleName}` : '';

          const niceEventDate = format(
            event.eventDate, 'MMM Do YYYY',
          );
          // Expends Card on render if hash matchs eventid
          const expanded = (window.location.hash === `#${event.eventId}`);

          const fav = event.eventFavorites.indexOf(stravaId) !== -1;

          const favCount = event.eventFavorites.length;

          const goal = true;

          const canEdit = (eCreator, sId, aMember) => (eCreator === sId || aMember);

          if (forEdit.eventId === event.eventId) {
            return (
              <AddEvent key={i} index={i} />
            );
          }

          const eventLink = (
            <Link to={`/events#${event.eventId}`} style={style.cardHeaderTitleLink}>{event.eventTitle}</Link>
          );

          return (
            <div key={i} id={`${event.eventId}`} >
              <ViewEvent
                authenticated={authenticated}
                canEdit={canEdit(event.eventOwner, stravaId, adminMember)}
                deleteClick={() => this.deleteThisEvent(event.eventId)}
                editClick={() => this.editThisEvent(event.eventId, i)}
                eventLink={eventLink}
                expanded={expanded}
                fav={fav}
                favClick={() => this.favThisEvent(event.eventId)}
                favCount={favCount}
                goal={goal}
                goalClick={() => this.goalThisEvent(event.eventId)}
                index={i}
                niceEventDate={niceEventDate}
                subTitleName={subTitleName}
                weeksToGo={weeksToGo}
                {...event}
              />
            </div>
          );
        })}
        { this.renderActionButton() }
      </Paper>

    );
  }
}

ListEvent.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    stravaId: state.auth.user.stravaId,
    clubMember: state.auth.user.clubMember,
    adminMember: state.auth.user.adminMember,
    events: state.events.events,
    forEdit: state.events.event,
  };
}

export default connect(mapStateToProps, actions)(ListEvent);

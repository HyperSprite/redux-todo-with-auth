import React, { Component, PropTypes } from 'react';
import { Paper, FloatingActionButton, FlatButton } from 'material-ui';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { ActionDeleteForever, ContentAdd, ContentCreate } from 'material-ui/svg-icons';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { differenceInCalendarWeeks as diffInCalWeeks, format } from 'date-fns'

import * as actions from '../../actions';
import ViewEvent from './view-event';
import AddEvent from './add-event';

import style from '../../styles/style';

const propTypes = {

};
const relURL = 'apiv1/events';
const query = '{eventDate:{$gt:stringDate}}';

const ListEvent = class ListEvent extends Component {
  componentDidMount() {
    this.props.fetchEvents(relURL, query);
    this.props.clearEvent();
  }

  deleteThisEvent = this.deleteThisEvent.bind(this);

  deleteThisEvent(eventId) {
    console.log('eventId', eventId);
    this.props.deleteEvent(eventId, `${relURL}/delete`);
  }

  editThisEvent(eventId, i) {
    console.log(i, 'Edit eventId >>>>>>>>>>>>>>>>>', eventId);
    this.props.editEvent(eventId, relURL);
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
    }
  }

  render() {
    const { events, forEdit, authenticated, stravaId, adminMember, clubMember } = this.props;
    return (

      <Paper
        style={style.paper1}
        zDepth={1}
      >
        <Toolbar>
          <ToolbarTitle
            text="Events"
          />
        </Toolbar>
        {events.map((event, i) => {
          const weeksToGo = diffInCalWeeks(
            new Date(event.eventDate),
            new Date(),
            { weekStartsOn: 1 },
          );

          const niceEventDate = format(
            event.eventDate, 'MMM Do YYYY',
          );

          const canEdit = (eCreator, sId, aMember) => (eCreator === sId || aMember);

          if (forEdit.eventId === event.eventId) {
            return (
              <AddEvent key={i} index={i} />
            );
          }
          return (
            <div key={i} >
              <ViewEvent
                weeksToGo={weeksToGo}
                niceEventDate={niceEventDate}
                editClick={() => this.editThisEvent(event.eventId, i)}
                deleteClick={() => this.deleteThisEvent(event.eventId)}
                canEdit={canEdit(event.eventCreator, stravaId, adminMember)}
                index={i}
                {...event}
              />
            </div>
          );
        })}
        { this.renderActionButton() }
      </Paper>

    );
  }
};

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

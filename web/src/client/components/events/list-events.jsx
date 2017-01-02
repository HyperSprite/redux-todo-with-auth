import React, { Component, PropTypes } from 'react';
import { Paper, FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { differenceInCalendarWeeks as diffInCalWeeks, format } from 'date-fns'

import * as actions from '../../actions';
import ViewEvent from './view-event';

import style from '../../styles/style';

const propTypes = {

};
const relURL = 'apiv1/events';
const query = '{eventDate:{$gt:stringDate}}';

const ListEvent = class ListEvent extends Component {
  componentDidMount() {
    this.props.fetchEvents(relURL, query);
  }

  renderActionButton() {
    if (this.props.clubMember) {
      return (
        <Link to="/events/addevent">
          <FloatingActionButton
            style={style.floatingActionButton}
          >
            <ContentAdd />
          </FloatingActionButton>
        </Link>
      );
    } else if (this.props.authenticated) {
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
    const { events, authenticated, clubMember } = this.props;
    return (
      <Paper
        style={style.paper1}
        zDepth={1}
      >
        {events.map((event) => {
          console.log(event.eventTitle);
          const weeksToGo = diffInCalWeeks(
            new Date(event.eventDate),
            new Date(),
            { weekStartsOn: 1 },
          );
          const niceEventDate = format(
            event.eventDate, 'MMM Do YYYY'
          );
          return (
            <ViewEvent
              key={event.eventId}
              weeksToGo={weeksToGo}
              niceEventDate={niceEventDate}
              {...event}
            />
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
    clubMember: state.auth.user.clubMember,
    events: state.events.events,
  };
}

export default connect(mapStateToProps, actions)(ListEvent);

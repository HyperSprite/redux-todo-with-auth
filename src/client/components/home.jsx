import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from './../actions';
import ScrollIntoView from './../containers/scroll-into-view';

// import ARaceAthleteSVG from '../assets/araceathlete-w-noname.svg';

const propTypes = {
  setPageName: PropTypes.func.isRequired,
};

class Home extends Component {
  componentDidMount() {
    this.props.setPageName('');
  }

  render() {
    return (
      <div>
        <ScrollIntoView
          id=""
          headerHeight={70}
        />
        <div className="home-jumbotron">
          <div className="side-lite left-pane" />
          <div className="brand">
            <div>
              {/* <img src={ARaceAthleteSVG} alt="A Race Athlete logo" /> */}
            </div>
          </div>
          <div className="side-lite right-pane" />
        </div>
        <div className="main-flex-container" >
          <div className="side-lite left-pane" />
          <div className="main" >
            <div>
              <h1 className="welcome"><span className="wrap-here">Welcome to</span>{' '}<span className="wrap-here"><span className="plus-h1">A Race</span> athlete</span><div className="sub-header">It{"'"}s time to level up!</div></h1>
            </div>
            <div className="quote-box">
              <p>ARaceAthlete is a place to share and track events, primarily your <strong>A Race</strong> for the year. What is an <strong>A Race</strong> you ask? While you may have other important events, an    <strong>A Race</strong> is that event you plan all year for. It is the pinnacle of your season. The point of hours of preparation and training.</p>
              <ul>
                <li>Guest athletes can view existing event information, just click on the ARaceAthlete icon on the top left and pick <em>Events</em>.</li>
                <li>Strava connected athletes can also <em>favorite</em> events, making it easy to see your whole season at a glance using the favorite filter.</li>
                <li><a href="https://www.strava.com/clubs/araceathlete">ARaceAthlete club members</a> can also add new events.<br /><em>Currently club level access is restricted to private beta. If you would like to be notified when we go live, request access now and we will let you know when we are ready.</em></li>
              </ul>
              <blockquote>
                <p>Note: The  original organizer should be considered the source of truth regarding all information listed (just like you should never trust a newspaper for movie times).</p>
              </blockquote>
            </div>
          </div>
          <div className="side-lite right-pane" />
        </div>
      </div>
    );
  }
}

Home.propTypes = propTypes;

export default connect(null, actions)(Home);

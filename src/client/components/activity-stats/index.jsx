import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IconButton, Paper } from 'material-ui';
import FaRefresh from 'react-icons/lib/fa/refresh';


import * as actions from '../../actions';
import WeeklyStats from './weekly-stats';
import ScrollIntoView from '../../containers/scroll-into-view';
import style from '../../styles/style';

const propTypes = {
  datePref: PropTypes.string,
  fetchActivitiesWeeklyTotals: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  fetchStrava: PropTypes.func.isRequired,
  measurementPref: PropTypes.bool.isRequired,
  stravaId: PropTypes.number,
  setPageName: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  weeksBack: PropTypes.number,
  weeklyStats: PropTypes.array.isRequired,
};

const defaultProps = {
  weeksBack: 0,
  stravaId: null,
};

const relURL = 'apiv1/activities/weekly-stats';

class activeStats extends Component {
  constructor(props) {
    super(props);
    this.fetchAnotherWeek = this.fetchAnotherWeek.bind(this);
    this.updateUserActivities = this.updateUserActivities.bind(this);
  }

  componentDidMount() {
    this.props.fetchData('auth/user');
    if (!this.props.weeklyStats.length) {
      this.props.fetchActivitiesWeeklyTotals(relURL, this.props.stravaId, this.props.weeksBack);
    }
    this.props.setPageName('Weekly Stats');
  }

  fetchAnotherWeek() {
    this.props.fetchActivitiesWeeklyTotals(relURL, this.props.stravaId, this.props.weeksBack);
  }

  updateUserActivities() {
    this.props.fetchStrava('user-activities', null, null, this.props.user.stravatoken, 'getUserActivities');
  }

  render() {
    const { weeklyStats, datePref, measurementPref } = this.props;

    return (
      <div className="main-flex-container" >
        <div className="side-lite left-pane" />
        <div className="main" >
          <ScrollIntoView
            id={location.hash}
            headerHeight={70}
          />
          <Paper
            zDepth={1}
          >
            {!weeklyStats ? (
              <p>Loading Activities</p>
            ) : (
              <div>
                { weeklyStats.map(oneWeek => (
                  <WeeklyStats
                    key={oneWeek.weeklyTotals.date}
                    week={oneWeek.weeklyTotals.date}
                    stats={oneWeek}
                    datePref={datePref}
                    measurementPref={measurementPref}
                  />
                ))}
              </div>
            )}
            <button onClick={this.fetchAnotherWeek} >Get Another Week</button>
            <div className="flex-row">
              <IconButton onClick={this.updateUserActivities} style={style.toggleIconButton} >
                <FaRefresh size={20} />
              </IconButton>
              <p>Get Latest Activities</p>
            </div>
          </Paper>
        </div>
        <div className="side-lite right-pane" />
      </div>
    );
  }
}

activeStats.propTypes = propTypes;
activeStats.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    datePref: state.auth.user.date_preference,
    measurementPref: state.auth.user.measurement_preference === 'feet',
    stravaId: state.auth.user.stravaId,
    weeklyStats: state.activities.weeklyStats,
    weeksBack: state.activities.weeklyStats.length || null,
  };
}

export default connect(mapStateToProps, actions)(activeStats);

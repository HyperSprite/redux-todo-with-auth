import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Collapse from 'material-ui/transitions/Collapse';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import { FormControlLabel } from 'material-ui/Form';
import Typography from 'material-ui/Typography';
import Switch from 'material-ui/Switch';

import BarChart from '../bar-chart';
import GearTotals from './../gear-totals';
import ActivitySingle from '../activity-single';

const propTypes = {
  week: PropTypes.string.isRequired, // "2017-05-02"
  stats: PropTypes.object.isRequired,
  datePref: PropTypes.string,
  mPref: PropTypes.bool,
};

const defaultProps = {
  datePref: '%m/%d/%Y',
  // mPref: false,
};

const styles = theme => ({
  boxes: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

class WeeklyStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  handleToggle = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { classes, week, stats, mPref } = this.props;
    return (
      <Card>
        <CardHeader
          title={<Typography variant="subheading">{`Week of ${week}`}</Typography>}
        />
        <CardContent>
          {stats.weeklyTotals.names[0] && <div>
            <div className={classes.boxes}>
              <BarChart
                contentLabel="Moving Time"
                content={`${stats.weeklyTotals.time.total}`}
                contentType="text"
                metric="time"
                weeklyTotals={stats.dayTotals}
              />

              <BarChart
                contentLabel="Distance"
                content={`${stats.weeklyTotals.dst.total}`}
                contentType="text"
                metric="dst"
                weeklyTotals={stats.dayTotals}
                mPref={mPref}
              />

              <BarChart
                contentLabel="Elevation"
                content={`${stats.weeklyTotals.elev.total}`}
                contentType="text"
                metric="elev"
                weeklyTotals={stats.dayTotals}
                mPref={mPref}
              />
            </div>
            <div className={classes.boxes}>
              {stats.weeklyTotals.tss.total ? (
                <BarChart
                  contentLabel="TSS"
                  content={`${stats.weeklyTotals.tss.total}`}
                  contentType="text"
                  metric="tss"
                  weeklyTotals={stats.dayTotals}
                />
              ) : (null)}

              {stats.weeklyTotals.kj.total ? (
                <BarChart
                  contentLabel="Kilojoules"
                  content={`${stats.weeklyTotals.kj.total}`}
                  contentType="text"
                  metric="kj"
                  weeklyTotals={stats.dayTotals}
                />
              ) : (null)}

              {stats.weeklyTotals.ss.total ? (
                <BarChart
                  contentLabel="Relative Effort"
                  content={`${stats.weeklyTotals.ss.total}`}
                  contentType="text"
                  metric="ss"
                  weeklyTotals={stats.dayTotals}
                />
              ) : (null)}

              {stats.weeklyTotals.cal.total ? (
                <BarChart
                  contentLabel="Calories"
                  content={`${stats.weeklyTotals.cal.total}`}
                  contentType="text"
                  metric="cal"
                  weeklyTotals={stats.dayTotals}
                />
              ) : (null)}
            </div>
          </div>}
        </CardContent>
        <GearTotals activityIds={stats.weeklyTotals.names.map(acts => acts.activityId)} />

        {stats.weeklyTotals.names[0] && (
          <CardActions>
            <div className={classes.boxes}>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.expanded}
                    onChange={this.handleToggle}
                    color="primary"
                  />
                }
                label="Show this weeks activities"
              />
            </div>
          </CardActions>
        )}
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent >
            {stats.weeklyTotals.names.map(act => (
              <ActivitySingle
                key={act.activityId}
                {...act}
              />
            ))}
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

WeeklyStats.propTypes = propTypes;
WeeklyStats.defaultProps = defaultProps;

export default withStyles(styles, { name: 'styledWeeklyStats' })(WeeklyStats);

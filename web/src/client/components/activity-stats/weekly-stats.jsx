import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';

import BarChart from './bar-chart';
import GearTotals from './../gear-totals';
import SingleActivity from '../form/single-activity';
import style from './style';

const propTypes = {
  week: PropTypes.string.isRequired, // "2017-05-02"
  stats: PropTypes.object.isRequired,
  datePref: PropTypes.string,
  measurementPref: PropTypes.bool,
};

const defaultProps = {
  datePref: '%m/%d/%Y',
  measurementPref: false,
};

class weeklyStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  handleExpandChange = (expanded) => {
    this.setState({ expanded: expanded });
  };

  handleToggle = (event, toggle) => {
    this.setState({ expanded: toggle });
  };

  handleExpand = () => {
    this.setState({ expanded: true });
  };

  handleReduce = () => {
    this.setState({ expanded: false });
  };

  render() {
    const { week, stats, measurementPref } = this.props;

    return (
      <Card expanded={this.state.expanded} >
        <CardHeader
          title={`Week of ${week}`}
        />
        <CardActions>
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>

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
                contentLabel="Suffer Score"
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
              mPref={measurementPref}
            />

            <BarChart
              contentLabel="Elevation"
              content={`${stats.weeklyTotals.elev.total}`}
              contentType="text"
              metric="elev"
              weeklyTotals={stats.dayTotals}
              mPref={measurementPref}
            />

          </div>
        </CardActions>
        <GearTotals actNameAndId={stats.weeklyTotals.names} />
        <Toggle
          toggled={this.state.expanded}
          onToggle={this.handleToggle}
          labelPosition="right"
          label="Show this weeks activities"
          style={style.toggle}
        />
        <CardText
          expandable
        >

          {stats.weeklyTotals.names.map(act => (
            <SingleActivity
              key={act.activityId}
              {...act}
            />
          ))}

        </CardText>
      </Card>
    );
  }
}

weeklyStats.propTypes = propTypes;
weeklyStats.defaultProps = defaultProps;

export default weeklyStats;

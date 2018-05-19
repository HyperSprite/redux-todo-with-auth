// TODO material-ui - complete redo with charts, still not public
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ActivityMetric from '../activity-metric';
import returnValues from './return-values';

const propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.any.isRequired,
  mPref: PropTypes.bool.isRequired,
  title: PropTypes.string,
};

const defaultProps = {
  title: 'Loading...',
};

const displayTypes = {
  range: 'Range',
  avg: 'Avg',
  sum: 'Sum',
};

const styles = theme => ({
  title: {
    display: 'flex',
    verticalAlign: 'middle',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontWeight: 600,
    fontSize: 16,
  },
  container: {
    fontSize: 16,
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    maxWidth: 800,
  },
});


const activityTypeMod = (rv, mod) => {
  const tmpObj = Object.assign({}, rv);
  // tmpObj.activityType = `${rv.activityType}`;
  // tmpObj.conversionData = `${rv.conversionData}`;
  tmpObj.activityLabel = `${displayTypes[mod]}`;
  // tmpObj.arg1 = `${rv.activityType}}` || null;
  return tmpObj;
};

const buildData = (data, aT, mod, i) => ({
  [aT]: (mod === 'range') ? data[aT][mod][i] : data[aT][mod],
});

const ActivityCalc = ({
  classes,
  data,
  mPref,
  title,
}) => (
  <div>

    <div className={classes.title}>
      <div>
        {title}
      </div>
    </div>
    <div className={classes.container} >
      <ActivityMetric
        key={'count'}
        data={{ count: data.count }}
        rV={{ activityType: 'count', activityLabel: 'Total Activities' }}
        mPref={mPref}
      />
      {returnValues.map(rV => (
        <div key={rV.activityType}>
          <div>
            {[rV.activityLabel]}
            {rV.displayType.map(rVDT => (
              <div key={`${rV.activityType}${data[rV.activityType][rVDT]}`}>
                {(rVDT === 'range') ? (
                  <div>
                    <ActivityMetric
                      data={buildData(data, rV.activityType, rVDT, 0)}
                      rV={activityTypeMod(rV, rVDT)}
                      mPref={mPref}
                    />
                    <ActivityMetric
                      data={buildData(data, rV.activityType, rVDT, 1)}
                      rV={activityTypeMod(rV, rVDT)}
                      mPref={mPref}
                    />
                  </div>
              ) : (
                <div>
                  <ActivityMetric
                    data={buildData(data, rV.activityType, rVDT)}
                    rV={activityTypeMod(rV, rVDT)}
                    mPref={mPref}
                  />
                </div>
              )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);
ActivityCalc.propTypes = propTypes;
ActivityCalc.defaultProps = defaultProps;

export default withStyles(styles, { name: 'styledActivityCalc' })(ActivityCalc);

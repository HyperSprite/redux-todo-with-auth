import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import justFNS from 'just-fns';
import EditSwitch from '../form/edit/switch';

// const objHasKeys = (obj) => {
//   if (Object.keys(obj).length) return true;
//   return false;
// };

const propTypes = {
  mPref: PropTypes.bool.isRequired,
  /** Object */
  valuesDefaults: PropTypes.object,
  /** Array */
  valueItems: PropTypes.array.isRequired,
};

const styles = theme => ({
  flexParent: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '10px 0 10px 0',
    minHeight: 80,
  },
});

const RangeInput = (props) => {

    const {
      classes,
      form,
      mPref,
      datePref,
      valueItems,
      valuesDefaults,
      input,
      label,
      placeholder,
      type,
      initialValues,
      rangeInputData,
      rangeInputActivitiesAll,
    } = props;
  return (
    <div className={classes.flexParent} >
      {rangeInputActivitiesAll.length && valuesDefaults ? (
        <div className={classes.flexColumn} >
          {(rangeInputActivitiesAll.map(rA => (
            <div key={rA.name} >
              {rA.name !== 'count' ||
                rA.name !== 'maxSpeed' ||
                rA.name !== 'maxHeartrate' ||
                rA.name !== 'maxWatts' ||
                !rA.contentDefautls[0] ? (
                  <EditSwitch
                    form={form}
                    formValues={rA}
                    defaultValue={rA.contentDefautls}
                    min={rA.contentDefautls[0]}
                    max={rA.contentDefautls[1]}
                    mPref={mPref}
                    datePref={datePref}
                    rangeValue={rA.rangeValue}
                  />
              ) : null }
            </div>
          )))}
        </div>
      ) : null }
    </div>
  );
};

RangeInput.propTypes = propTypes;

function mapStateToProps(state) {
  const { activities, page, search } = state;
  return {
    valuesDefaults: activities.activCalcAll,
    query: search.query,
    valueItems: search.sortStrings,
    rangeInputActivitiesAll: search.rangeInputActivitiesAll,
    mPref: page.mPref,
  };
}

const styledRangeInput = withStyles(styles, { name: 'StyledRangeInput' })(RangeInput);
export default connect(mapStateToProps)(styledRangeInput);

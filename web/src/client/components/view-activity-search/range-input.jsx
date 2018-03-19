import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import justFNS from 'just-fns';
import EditSwitch from '../form/edit/switch';

const propTypes = {
  mPref: PropTypes.bool.isRequired,
  /** Object */
  valuesDefaults: PropTypes.object.isRequired,
  /** Array */
  valueItems: PropTypes.array.isRequired,
  /** Object */
  valuesRange: PropTypes.object.isRequired,
};

const styles = theme => ({
  flexParent: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  flexcontainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    padding: '10px 0 10px 0',
    minHeight: 80,
  },
});

class RangeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rangeArr: [],
    };
  }

  componentWillReceiveProps() {
    this.shapeData();
  }

  shapeData() {
    let buildRangeArr = [];
    const {
      valueItems,
      valuesRange,
      valuesDefaults,
    } = this.props;
    if (valuesRange) {
      Object.values(valueItems).forEach((element) => {
        const vals = {
          conDef0: valuesDefaults[element.value].range[0],
          conDef1: valuesDefaults[element.value].range[1],
          conVal0: valuesRange[element.value].range[0],
          conVal1: valuesRange[element.value].range[1],
        };
        if (
          justFNS.isValid(vals.conDef0) &&
          justFNS.isValid(vals.conDef1) &&
          (vals.conDef0 < vals.conDef1)) {
          if (element.value !== 'count') {
            buildRangeArr = [...buildRangeArr, {
              component: 'InputRange',
              name: element.value,
              label: element.option,
              type: 'text',
              contentDefautls: [
                justFNS.round(vals.conDef0, 0),
                justFNS.round(vals.conDef1, 0),
              ],
              contentValue: [
                justFNS.round(vals.conVal0, 0),
                justFNS.round(vals.conval1, 0),
              ],
            }];
          }
        } else if (element.value === 'date') {
          buildRangeArr = [...buildRangeArr, {
            component: 'InputRangeDates',
            name: element.value,
            label: element.option,
            contentDefautls: [vals.conDef0, vals.conDef1],
            contentValue: [vals.conVal0, vals.conVal1],
          }];
        }
      });
    }
    this.setState({
      rangeArr: buildRangeArr,
    });
  }

  render() {
    const {
      classes,
      form,
      mPref,
      datePref,
      valueItems,
      valuesRange,
      valuesDefaults,
      input,
      label,
      placeholder,
      type,
      initialValues,
    } = this.props;

    const ranges = (
      <div className={classes.flexParent} >
        <div className={classes.flexcontainer} >
          {(this.state.rangeArr.map(rA => (
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
      </div>
    );

    return ranges;
  }
}

RangeInput.propTypes = propTypes;

function mapStateToProps(state) {
  const { activities, page, search } = state;
  return {
    valuesDefaults: activities.activCalcAll,
    valuesRange: activities.activCalcFilter,
    query: search.query,
    valueItems: search.sortStrings,

    mPref: page.mPref,
  };
}

const styledRangeInput = withStyles(styles, { name: 'StyledRangeInput' })(RangeInput);
export default connect(mapStateToProps)(styledRangeInput);

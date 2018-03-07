import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import justFNS from 'just-fns';
import EditSwitch from '../form/edit/switch';
import style from './style';

const propTypes = {
  mPref: PropTypes.bool.isRequired,
  /** Object */
  valuesDefaults: PropTypes.object.isRequired,
  /** Array */
  valueItems: PropTypes.array.isRequired,
  /** Object */
  valuesRange: PropTypes.object.isRequired,
};

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
    if (valueItems && valuesRange && valuesDefaults) {
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
              componentType: 'InputRange',
              contentName: element.value,
              contentLabel: element.option,
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
            componentType: 'InputRangeDates',
            contentName: element.value,
            contentLabel: element.option,
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
      <div style={style.flexParent} >
        <div style={style.flexcontainer} >
          {(this.state.rangeArr.map(rA => (
            <div key={rA.contentName} >
              {rA.contentName !== 'count' ||
                  rA.contentName !== 'maxSpeed' ||
                  rA.contentName !== 'maxHeartrate' ||
                  rA.contentName !== 'maxWatts' ||
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
              ) : <div>hi</div> }
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

export default connect(mapStateToProps)(RangeInput);

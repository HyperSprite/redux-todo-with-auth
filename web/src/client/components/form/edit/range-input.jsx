import React from 'react';
import PropTypes from 'prop-types';
import justFNS from 'just-fns';
import EditSwitch from './switch';
import style from './styles';

const propTypes = {
  mPref: PropTypes.bool.isRequired,
  // valueItems: PropTypes.shape([
  //   {
  //     value: PropTypes.string,
  //     option: PropTypes.string,
  //   },
  // ]).isRequired,
  valuesRange: PropTypes.object.isRequired,
};

const RangeInput = (props) => {

  const {
    form,
    mPref,
    valueItems,
    valuesRange,
    valuesDefaults,
    input,
    label,
    placeholder,
    type,
    initialValues,
    rangeValues,
  } = props;
  let rangeArr = [];

  if (valueItems && valuesRange) {
    Object.values(valueItems).forEach((element) => {
      const vals = {
        conDef0: valuesDefaults[element.value].range[0],
        conDef1: valuesDefaults[element.value].range[1],
        conVal0: valuesRange[element.value].range[0],
        conVal1: valuesRange[element.value].range[1],
      };
      if (justFNS.isValid(vals.conDef0) && justFNS.isValid(vals.conDef1) && (vals.conDef0 < vals.conDef1)) {
        if (element.value !== 'date' && element.value !== 'count') {
          rangeArr.push(
            {
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
              rangeValue: rangeValues[element.value] || { conMetric: null },
            },
          );
        }
        // add date range here
      }
    });
  }

  return (
    <div style={style.flexParent} >
      <div style={style.flexcontainer} >
        {(valueItems && rangeArr.length && valuesRange) && rangeArr.map(rA => (
          <div key={rA.contentName} >
            {rA.contentName !== 'date' || rA.contentName !== 'count' || !rA.contentDefautls[0] ? (
              <EditSwitch
                form={form}
                formValues={rA}
                defaultValue={rA.contentValue}
                min={rA.contentDefautls[0]}
                max={rA.contentDefautls[1]}
                mPref={mPref}
                rangeValue={rA.rangeValue}
              />
            ) : null }
          </div>
        ))}
      </div>
    </div>
  );
};

RangeInput.propTypes = propTypes;

export default RangeInput;

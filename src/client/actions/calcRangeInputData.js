import justFNS from 'just-fns';

// This builds the array of range inputs for Activity Search
// Uses API results and then passes them to Redux
/**
[
  {
    component: "InputRangeDates",
    contentDefautls: ["2013-05-04T13:25:59Z", "2018-03-23T12:24:35Z"],
    label: "Date",
    name: "date",
  },
  {
    component: "InputRange",
    contentDefautls: [0, 219546],
    label: "Distance",
    name: "distance",
    type: "text",
  },
]
*/

const rangeInputData = (activCalcAll, sortStrings) => {
  const buildRangeArr = Object.values(sortStrings).reduce((accArr, element) => {
    const vals = {
      conDef0: activCalcAll[element.value].range[0],
      conDef1: activCalcAll[element.value].range[1],
    };
    if (
      justFNS.isValid(vals.conDef0) &&
      justFNS.isValid(vals.conDef1) &&
      (vals.conDef0 < vals.conDef1)) {
      if (element.value !== 'count') {
        return accArr = [...accArr, {
          component: 'InputRange',
          name: element.value,
          label: element.option,
          type: 'text',
          contentDefautls: [
            justFNS.round(vals.conDef0, 0),
            justFNS.round(vals.conDef1, 0),
          ],
        }];
      }
    } else if (element.value === 'date') {
      return accArr = [...accArr, {
        component: 'InputRangeDates',
        name: element.value,
        label: element.option,
        contentDefautls: [vals.conDef0, vals.conDef1],
      }];
    }
    return accArr;
  }, Promise.all([]));
  return buildRangeArr;
};

export default rangeInputData;

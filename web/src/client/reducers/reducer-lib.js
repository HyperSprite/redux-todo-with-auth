
const lib = {};

lib.insertArrayItem = (array, action) => {
  return [
    ...array.slice(0, action.index),
    action.item,
    ...array.slice(action.index),
  ];
};

lib.removeArrayItem = (array, action) => {
  return [
    ...array.slice(0, action.index),
    ...array.slice(action.index + 1),
  ];
};

lib.replaceArrayItem = (array, action, item) => {
  const result = array;
  const actionItem = item ? action[item] : action;
  return [
    ...result.slice(0, action.index),
    result[action.index] = actionItem,
    ...result.slice(action.index + 1),
  ];
};

lib.insertOrReplaceArrayItem = (array, action, item, id) => {
  const actionItem = action[item] || action;
  // let result = array;
  const result = actionItem.reduce((acc, aI) => {
    const index = acc.map(i => i[id]).indexOf(aI[id]);
    if (index !== -1) {
      const payload = { item: aI, index };
      return lib.replaceArrayItem(acc, payload, 'item');
    }
    return acc.concat(aI);
  }, array);
  return result;
};

export default lib;

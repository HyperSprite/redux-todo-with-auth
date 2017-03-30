import React, { PropTypes } from 'react';

import Static from '../form/static';

const propTypes = {
  ftpHistory: PropTypes.array.isRequired,
  weightHistory: PropTypes.array.isRequired,
};

function getLastInArray(arr, arrType) {
  let item;
  if (arr && arr.length > 0 && arr[arr.length - 1][arrType] != null) {
    item = arr[arr.length - 1][arrType];
  }
  return item;
}

const ftpWeight = ({ ftpHistory, weightHistory }) => (
  <div>
    <Static
      contentLabel="Watts per Kg"
      content={(getLastInArray(ftpHistory, 'ftp') / getLastInArray(weightHistory, 'weight')).toFixed(2)}
      contentType="text"
    />
    {/* TODO - this is all ugly */}
    {getLastInArray(ftpHistory, 'ftp') ? (
      <Static
        contentLabel="FTP"
        content={getLastInArray(ftpHistory, 'ftp')}
        contentType="text"
      />
    ) : null }
    {getLastInArray(weightHistory, 'weight') ? (
      <Static
        contentLabel="Weight"
        content={getLastInArray(weightHistory, 'weight')}
        contentType="text"
      />
    ) : null }
  </div>
  );

ftpWeight.propTypes = propTypes;

export default ftpWeight;

import React from 'react';
import PropTypes from 'prop-types';

import withData from '../../containers/withData';
import ActivityProcessing from '../activity-processing';
import ButtonRefresh from '../button/refresh';

const url = '/apiv1/admin/activities/processing-status-all';

const ProcessingStatusAll = (props) => {
  return (
    <div>
      {props.data && props.data.map(d => (
        <div key={d.stravaId}>
          {d.stravaId}
          <ActivityProcessing
            processed={d.RESOURCE_STATE.state3}
            queued={d.RESOURCE_STATE.state2}
          />
        </div>
      ))}
      <ButtonRefresh onClick={props.onClick} />
    </div>
  );
};

const withAutoData = withData(url);
export default withAutoData(ProcessingStatusAll);
